// models/user.js
const mongoose = require('mongoose');

// Definir el esquema de la colección 'cine'
const cineSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        required: true
    }
});

// Crear el modelo basado en el esquema y asociarlo a la colección 'cine'
const Cine = mongoose.model('Cine', cineSchema, 'cine');

module.exports = Cine;
