import mongoose from 'mongoose';
// Si es necesario, se configura acá también el dotenv
import dotenv from "dotenv"
dotenv.config();
// El string de conexión debe estar siempre protegido en el .env
const mongoUri = process.env.MONGO_URI;
mongoose.set('strictQuery', true);
mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('DB conectada');
    })
    .catch((err) => {
        console.log('ERROR: ' + err);
    }); 