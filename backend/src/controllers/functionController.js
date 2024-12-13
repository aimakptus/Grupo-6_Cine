const functionModel = require('../models/Function');

// Crear la función
const createFunction = async (req, res) => {
    const {movie, room, seat, date} = req.body;
    const userId = req.user.id; // <- para el id del usuario

    try {
        const newFunction = await functionModel.create({movie, room, seat, date, user: userId});
        res.status(201).json({message: 'Función creada exitosamente', function: newFunction});
    } catch (error) {
        res.status(500).json({message: 'Error al crear la función', error});
    }
};

// Obtener funciones (por si lo necesitamos)
const getFunction = async (req, res) => {
    try {
        const functions = await functionModel.find().populate('user');
        res.status(200).json(functions);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener las funciones', error});
    }
};

module.exports = {createFunction, getFunction};