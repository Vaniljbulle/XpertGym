const Membership = require("../database/membership");

async function isAdmin(user){
    const membership = await Membership.findOne({user_id: user.id}).lean();
    if (membership === null) return false;
    return membership.user_level === 2;
}

module.exports = isAdmin;