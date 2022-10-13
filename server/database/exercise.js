const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    muscleGroup: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    custom: {
        type: Boolean,
        required: true
    }
},{collection: 'exercises'});

const model = mongoose.model('ExerciseSchema', exerciseSchema);

module.exports = model;