import express from 'express'
import cors from 'cors'
import { mongoClient, postgresClient } from './dbClient.js'

const app = express()
app.use(cors())
app.use(express.json())
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

app.post('/product', (req, res) => {
    const PRICE_LIMIT = 100000
    const { name, description, price: p, quantity: q } = req.body
    const price = Number.parseInt(p)
    const quantity = Number.parseInt(q)
    if (price > PRICE_LIMIT ) {
        postgresClient.addProduct({ name, description, price, quantity })
        .then(() => res.status(204).send())
        .catch((e) => res.status(500).send(`${e}`))
    } else {
        mongoClient.addProduct({ name, description, price, quantity })
        .then(() => res.status(204).send())
        .catch((e) => res.status(500).send(`${e}`))
    }
})

app.get('/summary', (req, res) => {
    Promise.all([
        postgresClient.getProducts(),
        mongoClient.getProducts()
    ]).then(resolved => {
        const pgProducts = resolved[0]
        const mongoProducts = resolved[1]
        res.send({
            products: pgProducts.reduce((a, p) => a + p.quantity, 0) + mongoProducts.reduce((a, p) => a + p.quantity, 0),
            prices: pgProducts.reduce((a, p) => a + p.price, 0) + mongoProducts.reduce((a, p) => a + p.price, 0),
        })
    })
})

app.listen(port, () => {
    console.log('Server ready')
})