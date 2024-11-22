const express = require('express');
const { registerUser, loginUser } = require('../Users/userController'); // Ruta hacia Users

const router = express.Router();

router.post('/register', (req, res) => {
    registerUser(req, res)
        .then((result) => res.status(result.status).json(result.data))
        .catch((error) => res.status(error.status).json({ error: error.message }));
});

router.post('/login', (req, res) => {
    loginUser(req, res)
        .then((result) => res.status(result.status).json(result.data))
        .catch((error) => res.status(error.status).json({ error: error.message }));
});

module.exports = router;
