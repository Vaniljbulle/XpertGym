const mongoose = require('mongoose');

const userExerciseSchema = new mongoose.Schema({
    id_exercise: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{collection: 'userExercises'});

const model = mongoose.model('UserExerciseSchema', userExerciseSchema);

module.exports = model;