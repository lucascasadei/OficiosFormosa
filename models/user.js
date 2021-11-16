const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],

    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
        
    },
    google: {
        type: Boolean,
        default: false
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        max: 1024,
        min: 6
        
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true

    },
    status: {
        type: Boolean,
        default: true
    },
});

userSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}


module.exports = model('User', userSchema)