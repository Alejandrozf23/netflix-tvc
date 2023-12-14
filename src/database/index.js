import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const { MONGO_USER, MONGO_PASSWORD } = process.env;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@clusterntvc.mib10go.mongodb.net/?retryWrites=true&w=majority`;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Mongo connection successfully!');
    } catch (e) {
        console.error('Error to connect Mongo: ', e.message);
    }
}

export default connectMongoDB;