const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    message_log: {
        type: Array,
        required: false
    }
},{collection: 'schedules'});

const model = mongoose.model('ScheduleSchema', scheduleSchema);

module.exports = model;