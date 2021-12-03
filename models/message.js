
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
    message: {
        type: String,
        require: true
    }

});

module.exports = model('Message', MessageSchema);