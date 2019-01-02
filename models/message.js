var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    message: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);