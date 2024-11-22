const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./Users/userRoutes'); // Ruta para el controlador de usuarios

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Conexión a la base de datos MongoDB usando la URI desde las variables de entorno
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a la base de datos');
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
    });


// Usar las rutas para la API
app.use('/api/users', userRoutes);

// Iniciar el servidor con el puerto definido en las variables de entorno
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


console.log('MONGO_URI:', process.env.MONGO_URI);  // Esto debería mostrar tu URI de conexión a MongoDB
console.log('PORT:', process.env.PORT);  // Esto debería mostrar el puerto 5000 o el valor que hayas definido
