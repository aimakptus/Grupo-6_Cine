const mongoose = require('mongoose');
// falta poner el usuario wn

const functionSchema = new mongoose.Schema ({
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
    room: {type: String, required: true},
    seat: {type: String, required: true},
    date: {type: Date, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});

module.exports = mongoose.model('Function', functionSchema);