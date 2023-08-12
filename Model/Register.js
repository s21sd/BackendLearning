const mongoose = require('mongoose');
const registerScema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        required: true
    },
})

const Register = mongoose.model('Register', registerScema);

module.exports = Register;