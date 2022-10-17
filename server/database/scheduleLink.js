const mongoose = require('mongoose');

const scheduleLinkSchema = new mongoose.Schema({
    id_exercise: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_schedule: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
},{collection: 'scheduleLinks'});

const model = mongoose.model('ScheduleLinkSchema', scheduleLinkSchema);

module.exports = model;