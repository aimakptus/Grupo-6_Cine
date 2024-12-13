const express = require('express');
const {createMovie, getMovies} = require('../controllers/movieController');
const router = express.Router();

// Ruta para la creación de la película
router.post('/', createMovie);

// Ruta para obtener todas las películas
router.get('/', getMovies);

module.exports = router;