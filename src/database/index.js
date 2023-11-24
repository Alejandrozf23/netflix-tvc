import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const { MONGO_USER, MONGO_PASSWORD, MONGO_URI } = process.env;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            auth: { user: MONGO_USER, password: MONGO_PASSWORD },
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa a MongoDB');
    } catch (e) {
        console.error('Error al conectar a MongoDB:', e.message);
    }
}

export default connectMongoDB;