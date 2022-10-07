const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id_user: {
        type: String,
        required: true
    }
},{collection: 'schedules'});

const model = mongoose.model('ScheduleSchema', scheduleSchema);

module.exports = model;