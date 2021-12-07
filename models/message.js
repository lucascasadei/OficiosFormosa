
const {Schema, model } = require('mongoose');

const MessageSchema = Schema({

    emisor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receptor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
    },
    message: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = model('Message', MessageSchema);