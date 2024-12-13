const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar usuario
const registerUser = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        // Verificación de usuario existente
        const userExist = await User.findOne({email});
        if (userExist) return res.status(400).json({message: 'El usuario ya existe'});

        // Hashear la constraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Registrar nuevo usuario
        const newUser = await User.create({fullName, email, password: hashedPassword});

        res.status(201).json({message: 'Usuario registrado con éxito', userId: newUser._id});
    } catch (error) {
        res.status(500).json({message: 'Error al registrar usuario', error});
    }
};

// Iniciar sesión
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Buscar el usuario por email
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: 'Datos incorrectos'});

        // Verificación de constraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: 'Datos incorrectos'});

        // Creación del token JWT
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({message: 'Inicio de sesión exitoso', token});
    } catch (error) {
        res.status(500).json({message: 'Error al iniciar sesión', error});
    }
};

module.exports = {registerUser, loginUser};