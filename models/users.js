var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
}, {
    timestamps: true
});

var User = mongoose.model('User', userSchema);
module.exports = User;