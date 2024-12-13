require('dotenv').config();
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('mongoDB Conectado');
    } catch (error) {
        console.error('Error conectando a mongoDB:', error)
        process.exit(1);
    }
};

module.exports = connectDB;