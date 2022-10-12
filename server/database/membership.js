const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    membership_id: {
        type: String,
        required: true,
        unique: true
    },
    user_level: {
        type: Number,
        required: true
    }
},{collection: 'memberships'});

const model = mongoose.model('MembershipSchema', membershipSchema);

module.exports = model;