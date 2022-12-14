const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshTokens: {
        type: Array,
        required: false
    }
},{collection: 'users'});

const model = mongoose.model('UserSchema', userSchema);

module.exports = model;