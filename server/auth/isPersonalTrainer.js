const Membership = require("../database/membership");

async function isPersonalTrainer(user){
    const membership = await Membership.findOne({user_id: user.id}).lean();
    if (membership === null) return false;
    return membership.user_level === 1;
}

module.exports = isPersonalTrainer;