
const {Schema, model } = require('mongoose');

const ServiceSchema = Schema({

    name: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    desc: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    keywords: { type: String, text: true },
    phone: Number,
    facebook: String,
    instagram: String,
    twitter: String,
    website: String,
});

ServiceSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
}


module.exports = model('Service', ServiceSchema);