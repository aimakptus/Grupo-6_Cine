const Movie = require('../models/Movie');

// Creación de una nueva película
const createMovie = async (req, res) => {
    const {name, director, genre} = req.body;

    try {
        const newMovie = await Movie.create({name, director, genre});
        res.status(201).json({message: 'Película añadida exitosamente', movie: newMovie});
    } catch (error) {
        res.status(500).json({message: 'Error al añadir la película', error});
    }
};

// Obtener todas las películas
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener las películas', error});
    }
};

module.exports = {createMovie, getMovies};