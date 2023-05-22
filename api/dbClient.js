import pg from 'pg'
import mongoose from 'mongoose'
import { v4 } from 'uuid'

/**
 * Concret postgres client.
 * Allow use a postgres client and perform queries.
 * Also this is a singleton, so it is ensured that one single client is being used.
 */
class PostgresClient {
    static postgresClientInstance = null
    _pool = new pg.Pool({
        user: 'usr1',
        host: 'db1',
        database: 'demo',
        password: '8c7a2b1bb12f96b1',
        port: 5432
    })

    constructor() {
        if (PostgresClient.postgresClientInstance) {
            return PostgresClient.postgresClientInstance
        }
        // Singleton is approached by assigning "this" to static property.
        PostgresClient.postgresClientInstance = this
    }

    /**
     * Method that perform query to obtain products.
     * @returns List of products
     */
    async getProducts() {
        let client = null
        try {
            client = await this._pool.connect()
            const products = await client.query('SELECT * FROM products;')
            client.release()
            return products.rows
        } catch(e) {
            console.log(e)
            client && client.release()
            return []
        }
    }

    /**
     * Method that perform query to add product.
     */
    async addProduct({ name, description, price, quantity }) {
        let client = null
        try {
            client = await this._pool.connect()
            const product = await client.query(`INSERT INTO products(uuid, name, description, price, quantity) VALUES ('${v4()}', '${name}', ${description ? `'${description}'` : null}, ${price}, ${quantity});`)
            client.release()
            // console.log(product)
            // return product.rows
        } catch(e) {
            console.log(e)
            client && client.release()
            // return []
        }
    }
}

/**
 * Concret mongo client.
 * Allow use a mongo client and perform queries.
 * Also this is a singleton, so it is ensured that one single client is being used.
 */
class MongoClient {
    static mongoClientInstance = null
    _productModel = mongoose.model('Product', new mongoose.Schema({ uuid: String, name: String, description: String, price: Number, quantity: Number }))

    constructor() {
        if (MongoClient.mongoClientInstance) {
            return MongoClient.mongoClientInstance
        }
        // Singleton is approached by assigning "this" to static property.
        MongoClient.mongoClientInstance = this
        mongoose.connect(`mongodb://db2:27017/demo`, { 
            useNewUrlParser: true,
            authSource: 'admin',
            user: 'usr2',
            pass: '573d87e87e0d5200'
        }).then(() => console.log('Connected'))
    }

    async getProducts() {
        try {
            const docs = await this._productModel.find()
            // await mongoose.connection.close()
            return docs
        } catch(e) {
            console.log("Catch error on getProducts")
            console.log(e)
            return []
        }
    }

    /**
     * Method that perform query to add product.
     */
    async addProduct({ name, description, price, quantity }) {
        try {
            const docs = await new this._productModel({ uuid: v4(), name, description, price, quantity }).save()
            // await mongoose.connection.close()
            // return docs
        } catch(e) {
            console.log("Catch error on addProduct")
            console.log(e)
            // return []
        }
    }
}

/**
 * Concret non sql database clients factory.
 * Allows to create clients for non sql databases.
 * Also this is a singleton, so it is ensured that one single factory is being used.
 */
class NonSQLFactory {
    static nonSqlFactoryInstance = null

    constructor() {
        if (NonSQLFactory.nonSqlFactoryInstance) {
            return NonSQLFactory.nonSqlFactoryInstance
        }
        // Singleton is approached by assigning "this" to static property.
        NonSQLFactory.nonSqlFactoryInstance = this
    }

    /**
     * Method that performs mongoDB client creation
     * @returns Instance of MongoClient
     * @see MongoClient
     */
    createMongoDBClient() {
        return new MongoClient()
    }
}

/**
 * Concret non sql database clients factory.
 * Allows to create clients for sql databases.
 * Also this is a singleton, so it is ensured that one single factory is being used.
 */
class SQLFactory {

    static sqlFactoryInstance = null

    constructor() {
        if (SQLFactory.sqlFactoryInstance) {
            return SQLFactory.sqlFactoryInstance
        }
        SQLFactory.sqlFactoryInstance = this
    }

    /**
     * Method that performs postgresSQL client creation
     * @returns Instance of PostgresClient
     * @see PostgresClient
     */
    createPostgresClient() {
        return new PostgresClient()
    }
}

/**
 * Concret database factories factory.
 * Allows to create database clients factories.
 * Also this is a singleton, so it is ensured that one single factory is being used.
 */
class DBFactory {
    static dbFactoryInstance = null

    constructor() {
        if (DBFactory.dbFactoryInstance) {
            return DBFactory.dbFactoryInstance
        }
        // Singleton is approached by assigning "this" to static property.
        DBFactory.dbFactoryInstance = this
    }

    /**
     * Method that performs non sql clients factory creation
     * @returns Instance of NonSQLFactory
     * @see NonSQLFactory
     */
    createNonSQLFactory() {
        return new NonSQLFactory()
    }

     /**
     * Method that performs sql clients factory creation
     * @returns Instance of SQLFactory
     * @see SQLFactory
     */
    createSQLFactory() {
        return new SQLFactory()
    }
}

// Unique instance required to create the rest of the stuff.
const dbFactory = new DBFactory()

// Using DBFactory to obtain sql and non-sql factories.
const nonSqlFactory = dbFactory.createNonSQLFactory()
const sqlFactory = dbFactory.createSQLFactory()

export const postgresClient = sqlFactory.createPostgresClient()
export const mongoClient = nonSqlFactory.createMongoDBClient()