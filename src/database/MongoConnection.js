import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const { MONGO_USER, MONGO_PASSWORD } = process.env;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@clusterntvc.mib10go.mongodb.net/?retryWrites=true&w=majority`;

const connectToDatabase = async () => {
    if (isConnected) {
        console.log('Utilizando la conexión existente.');
        return;
    }

    try {
        const connect = await mongoose.connect(uri);        
        isConnected = connect.connections[0].readyState;
        console.log('Mongo connection successfully!');
    } catch (e) {
        console.error('Error to connect Mongo: ', e.message);
    }    
};

const closeDatabaseConnection = async () => {
    if (!isConnected) {
        console.log('No hay conexión para cerrar.');
        return;
    }

    try {
        await mongoose.connection.close();
        isConnected = false;
        console.log('Conexión a MongoDB cerrada.');
    } catch (error) {
        console.error('Error al cerrar la conexión a MongoDB:', error);
    }
};

export { connectToDatabase, closeDatabaseConnection };
