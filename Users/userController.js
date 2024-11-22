const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Users/user'); // Asegúrate de que la ruta sea correcta

// Registro de usuario
const registerUser = (req, res) => {
    return new Promise((resolve, reject) => {
        const { userName, userEmail, userPassword } = req.body;

        // Validación de campos requeridos
        if (!userName || !userEmail || !userPassword) {
            return reject({ status: 400, message: 'Todos los campos son obligatorios' });
        }

        // Verificar si el correo ya está registrado
        User.findOne({ userEmail }, (err, user) => {
            if (err) return reject({ status: 500, message: 'Error al buscar usuario' });
            if (user) return reject({ status: 409, message: 'El correo ya está registrado' });

            // Hash de la contraseña
            bcrypt.hash(userPassword, 12, (err, hashedPassword) => {
                if (err) return reject({ status: 500, message: 'Error al encriptar la contraseña' });

                // Crear y guardar un nuevo usuario
                const newUser = new User({ userName, userEmail, userPassword: hashedPassword });
                newUser.save((err, savedUser) => {
                    if (err) return reject({ status: 500, message: 'Error al guardar el usuario' });
                    resolve({ status: 201, data: { message: 'Usuario registrado exitosamente', user: savedUser } });
                });
            });
        });
    });
};

// Inicio de sesión
const loginUser = (req, res) => {
    return new Promise((resolve, reject) => {
        const { userEmail, userPassword } = req.body;

        // Validación de campos requeridos
        if (!userEmail || !userPassword) {
            return reject({ status: 400, message: 'Todos los campos son obligatorios' });
        }

        // Buscar usuario por correo
        User.findOne({ userEmail }, (err, user) => {
            if (err) return reject({ status: 500, message: 'Error al buscar usuario' });
            if (!user) return reject({ status: 404, message: 'Usuario no encontrado' });

            // Comparar contraseña ingresada con la almacenada
            bcrypt.compare(userPassword, user.userPassword, (err, isMatch) => {
                if (err) return reject({ status: 500, message: 'Error al verificar la contraseña' });
                if (!isMatch) return reject({ status: 401, message: 'Contraseña incorrecta' });

                // Generar un token JWT
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                resolve({
                    status: 200,
                    data: { message: 'Inicio de sesión exitoso', token, userName: user.userName },
                });
            });
        });
    });
};

module.exports = { registerUser, loginUser };
