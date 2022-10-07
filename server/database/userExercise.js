const mongoose = require('mongoose');

const userExerciseSchema = new mongoose.Schema({
    id_exercise: {
        type: String,
        required: true,
        unique: true
    },
    id_user: {
        type: String,
        required: true
    },
    id_number: {
        type: String,
        required: true,
        unique: true
    }
},{collection: 'userExercises'});

const model = mongoose.model('UserExerciseSchema', userExerciseSchema);

module.exports = model;