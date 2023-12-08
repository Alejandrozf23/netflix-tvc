import dotenv from 'dotenv';
const { MongoClient } = require('mongodb');

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_OPTIONS } = process.env;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}?${MONGO_OPTIONS}`;
console.log(uri);

const connectMongoDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Mongo connection successfully!');
    } catch (e) {
        console.error('Error to connect Mongo: ', e.message);
    }
}

export default connectMongoDB;