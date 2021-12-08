const Blockchain = require('./blockchain')
const bitcoin = new Blockchain()

const bc1 = {
    "chain": [
        {
            "index": 1,
            "timestamp": 1634516017295,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1634516059234,
            "transactions": [],
            "nonce": 18140,
            "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
            "previousBlockHash": "0"
        },
        {
            "index": 3,
            "timestamp": 1634516228692,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "a4162fbc4f724d628077747287549641",
                    "transactionId": "897bf4a10776406db9302635d17dcd77"
                },
                {
                    "amount": 1222,
                    "sender": "ZXSDASFDAFKJ",
                    "recipient": "ZADFKJLKSAFA"
                },
                {
                    "amount": 220,
                    "sender": "ZXSDASFDAFKJ",
                    "recipient": "ZADFKJLKSAFA"
                },
                {
                    "amount": 300,
                    "sender": "ZXSDASFDAFKJ",
                    "recipient": "ZADFKJLKSAFA"
                }
            ],
            "nonce": 25158,
            "hash": "00002603d2b50ca8286d3d5f1090206241453c090dd7424b557e22ece1565606",
            "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
        },
        {
            "index": 4,
            "timestamp": 1634516267076,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "a4162fbc4f724d628077747287549641",
                    "transactionId": "7e5e1f03afef4d0ca8c3ee18a618ee3c"
                },
                {
                    "amount": 400,
                    "sender": "ZXSDASFDAFKJ",
                    "recipient": "ZADFKJLKSAFA"
                },
                {
                    "amount": 500,
                    "sender": "ZXSDASFDAFKJ",
                    "recipient": "ZADFKJLKSAFA"
                },
                {
                    "amount": 600,
                    "sender": "ZXSDASFDAFKJ",
                    "recipient": "ZADFKJLKSAFA"
                },
                {
                    "amount": 700,
                    "sender": "ZXSDASFDAFKJ",
                    "recipient": "ZADFKJLKSAFA"
                }
            ],
            "nonce": 7077,
            "hash": "00002d75616944cd2153abf34c5ee3d9570529d511d72eea374f7aaeb02dc1b6",
            "previousBlockHash": "00002603d2b50ca8286d3d5f1090206241453c090dd7424b557e22ece1565606"
        },
        {
            "index": 5,
            "timestamp": 1634516290140,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "a4162fbc4f724d628077747287549641",
                    "transactionId": "54472f83d6614547ab7b4b2136208373"
                }
            ],
            "nonce": 4958,
            "hash": "0000173fdbb9070d6cc4c9b9e125aa5fe6d1cfa070d2ba5d188bab2df1c6a3e0",
            "previousBlockHash": "00002d75616944cd2153abf34c5ee3d9570529d511d72eea374f7aaeb02dc1b6"
        },
        {
            "index": 6,
            "timestamp": 1634516293252,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "a4162fbc4f724d628077747287549641",
                    "transactionId": "de6b98af38744c7eb3b4023ae2a7606e"
                }
            ],
            "nonce": 73321,
            "hash": "000065ddee55263d9e02e3f35786e605e7ac99fa05dbcf87681fd657d9f8ea38",
            "previousBlockHash": "0000173fdbb9070d6cc4c9b9e125aa5fe6d1cfa070d2ba5d188bab2df1c6a3e0"
        }
    ],
    "pendingTransactions": [
        {
            "amount": 12.5,
            "sender": "00",
            "recipient": "a4162fbc4f724d628077747287549641",
            "transactionId": "b2a3d7aec4b84cc0b407e22a2773a212"
        }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "newtworkNodes": []
}

console.log('VALID: ' + bitcoin.chainIsValid(bc1.chain))

// const previousBlockHash = 'DALSKF3LKJ342LKJ'
// const currentBlockData = [
//     {
//         amount:10,
//         sender: 'JHONMLSADKF',
//         recipient: 'ALEXLSDFAS'
//     },
//     {
//         amount:100,
//         sender: 'PEDROMLSADKF',
//         recipient: 'JHONLSDFAS'
//     },
//     {
//         amount:200,
//         sender: 'LUCIALSADKF',
//         recipient: 'JHONLSDFAS'
//     }
// ]

// const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)

// console.log(nonce)

// const hash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)

// console.log(hash)





// const strHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)

// console.log(strHash)


// bitcoin.createNewBlock(232, 'OSAFDJASLK', 'LKSAJDFLKAS')

// bitcoin.createNewTransaction(100, 'ALEX22332', 'JHON13442')
// bitcoin.createNewBlock(111, 'SAFDAASDFD', 'LKSAJDFSAFS')

// bitcoin.createNewTransaction(50, 'ALEX22332', 'JHON13442')
// bitcoin.createNewTransaction(150, 'ALEX22332', 'JHON13442')
// bitcoin.createNewTransaction(200, 'ALEX22332', 'JHON13442')

// bitcoin.createNewBlock(230, 'DSADFAFSL1', 'DSAFJDFLKAS')


// console.log(bitcoin.chain[2])

// bitcoin.createNewBlock(111, 'SAFDAASDFD', 'LKSAJDFSAFS')
// bitcoin.createNewBlock(230, 'DSADFAFSL1', 'DSAFJDFLKAS')

// console.log(bitcoin)
