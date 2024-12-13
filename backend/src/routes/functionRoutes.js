const express = require('express');
const {createFunction, getFunction} = require('../controllers/functionController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Ruta para crear una función con autenticación
router.post('/', authMiddleware, createFunction);

// Ruta para obtener las funciones ya creadas
router.get('/', getFunction);

module.exports = router;