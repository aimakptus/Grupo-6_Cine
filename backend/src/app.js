const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Importar las rutas
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const functionRoutes = require('./routes/functionRoutes');

// Configurar dotenv
dotenv.config();

// Uso de Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la DB
connectDB();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/functions', functionRoutes);

module.exports = app;