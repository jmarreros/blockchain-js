const express = require('express')
const Blockchain = require('./blockchain')
const { v4: uuid} = require('uuid')
const app = express()
const port = process.argv[2]
const axios = require('axios');


const nodeAddress = uuid().split('-').join('')


app.use(express.json())

const bitcoin = new Blockchain()

app.get('/blockchain', function (req, res) {
    res.send(bitcoin)
})

app.post('/transaction', function(req, res) {
    const newTransaction = req.body
    const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction)

    res.json({
        note: `Transaction will be added in block ${blockIndex}.`
    })
    // const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    // res.json({ note: `Transaction will be added in block ${blockIndex}.`})
})

app.post('/transaction/broadcast', (req, res) => {
    const {amount, sender, recipient} = req.body
    const newTransaction = bitcoin.createNewTransaction(amount, sender, recipient)

    bitcoin.addTransactionToPendingTransactions(newTransaction)

    const regNodePromises = []
    bitcoin.newtworkNodes.forEach( networkNodeUrl => {
        const axiosPromise = axios.post( networkNodeUrl + '/transaction', newTransaction)
        regNodePromises.push(axiosPromise)
    })

    Promise.all(regNodePromises)
        .then( function( data ){
            res.json({
                note: 'Transaction created and broadcast successfully'
            })
        })
})

app.get('/mine', function(req, res){
    const lastBlock = bitcoin.getLastBlock()
    const previusBlockHash = lastBlock['hash']

    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    }

    const nonce = bitcoin.proofOfWork(previusBlockHash, currentBlockData)
    const blockHash = bitcoin.hashBlock(previusBlockHash, currentBlockData, nonce)

    const newBlock = bitcoin.createNewBlock(nonce, previusBlockHash, blockHash)

    const regNodePromises = []
    bitcoin.newtworkNodes.forEach(networkNodeUrl => {
        const axiosPromise = axios.post( networkNodeUrl + '/receive-new-block', {
            newBlock
        })
        regNodePromises.push(axiosPromise)
    })

    Promise.all(regNodePromises)
        .then(  () => {
            const reward = axios.post(bitcoin.currentNodeUrl + '/transaction/broadcast', {
                amount: 12.5,
                sender: '00',
                recipient: nodeAddress
            })
            return reward
        })
        .then( () => {
            res.json({
                note: 'New block mined and broadcast successfully',
                block: newBlock
            })
        })
})

app.post('/receive-new-block', function(req, res) {
    const newBlock = req.body.newBlock
    const lastBlock = bitcoin.getLastBlock()
    const correctHash = lastBlock.hash === newBlock.previousBlockHash
    const correctIndex = lastBlock['index'] + 1 === newBlock['index']

    if ( correctHash && correctIndex ) {
        bitcoin.chain.push(newBlock)
        bitcoin.pendingTransactions = []
        res.json({
            note: 'New block received and accepted.',
            newBlock
        })
    } else {
        res.json({
            note:'New block Rejected'
        })
    }
})

// Register node and brodcast it the network
app.post('/register-and-broadcast-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl

    if ( bitcoin.newtworkNodes.indexOf(newNodeUrl) == -1 ){
        bitcoin.newtworkNodes.push(newNodeUrl)
    }

    // bitcoin.newtworkNodes.push('http://localhost:3002')

    const regNodePromises = []
    bitcoin.newtworkNodes.forEach( networkNodeUrl => {
        const axiosPromise = axios.post( networkNodeUrl + '/register-node', {
            newNodeUrl: newNodeUrl
        })
        regNodePromises.push(axiosPromise)
    })

    Promise.all(regNodePromises)
        .then( function( data ){

            const axiosBulk = axios.post(newNodeUrl + '/register-nodes-bulk', {
                allNetworkNodes: [...bitcoin.newtworkNodes, bitcoin.currentNodeUrl]
            })

            return axiosBulk

        })
        .then( function(data){
            // console.log(data)
            res.json({
                note: 'New node registered with network successfully'
            })
        })

})

// Register a node with the network
app.post('/register-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl
    const nodeNotAlreadyPresent = bitcoin.newtworkNodes.indexOf(newNodeUrl) == -1
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl

    if ( nodeNotAlreadyPresent && notCurrentNode ){
        bitcoin.newtworkNodes.push(newNodeUrl)
    }

    res.json({
        note: 'New node registered successfully with node  '
    })

})

// register multiple nodes at once
app.post('/register-nodes-bulk', function(req, res){
    const allNetworkNodes = req.body.allNetworkNodes

    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = bitcoin.newtworkNodes.indexOf(networkNodeUrl) == -1
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl

        if ( nodeNotAlreadyPresent && notCurrentNode ){
            bitcoin.newtworkNodes.push(networkNodeUrl)
        }
    })

    res.json({
        note: 'Bulk registration successfull'
    })
})


//Consensus
app.get('/consensus', function(req, res) {
    const regNodePromises = []
    bitcoin.newtworkNodes.forEach( networkNodeUrl => {
        const axiosPromise = axios.get( networkNodeUrl + '/blockchain')
        regNodePromises.push(axiosPromise)
    })

    Promise.all(regNodePromises)
        .then( ( blockchains ) => {
            const currentChainLength = bitcoin.chain.length
            let maxChainLength = currentChainLength
            let newLongestChain = null
            let newPendingTransaction = null

            blockchains.forEach(blockchain => {
                if (blockchain.data.chain.length > maxChainLength) {
                    maxChainLength = blockchain.data.chain.length
                    newLongestChain = blockchain.data.chain
                    newPendingTransaction = blockchain.data.pendingTransactions
                }
            })

            if ( ! newLongestChain ||  ! bitcoin.chainIsValid(newLongestChain) ){
                res.json({
                    note: 'Current chain has not been replaced',
                    chain: bitcoin.chain
                })
            } else {
                bitcoin.chain = newLongestChain
                bitcoin.pendingTransactions = newPendingTransaction
                res.json({
                    note: 'This chain has been replaced',
                    chain: bitcoin.chain
                })
            }

        })
})

// For the explorer
app.get('/block/:blockHash', function(req, res){
    const { blockHash } = req.params
    const block = bitcoin.getBlock(blockHash)

    res.json({
        block
    })
})

app.get('/transaction/:transactionId', function(req, res){
    const { transactionId } = req.params
    const transactionData = bitcoin.getTransaction(transactionId)

    res.json({
        transaction: transactionData.transaction,
        block: transactionData.block
    })
})

app.get('/address/:address', function(req, res){
    const address = req.params.address
    const addressData = bitcoin.getAdressData(address)

    res.json({
        addressData
    })
})

app.get('/block-explorer', function(req, res){
    res.sendFile('./block-explorer/index.html', {
        root: __dirname
    })
})

// Listen
app.listen(port, function(){
    console.log(`Listening on port ${port}...`)
})

