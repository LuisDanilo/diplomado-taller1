import express from 'express'
import cors from 'cors'
import { mongoClient, postgresClient } from './dbClient.js'

const app = express()
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/products', (req, res) => {
    Promise.all([
        postgresClient.getProducts(),
        mongoClient.getProducts()
    ]).then(resolved => {
        const pgProducts = resolved[0]
        const mongoProducts = resolved[1]
        res.send([...pgProducts, ...mongoProducts])
    })
})

app.listen(port, () => {
    console.log('Server ready')
})