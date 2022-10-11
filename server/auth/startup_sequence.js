const User = require('../database/user');
const Membership = require('../database/membership');
const Exercise = require('../database/exercise');
const UserExercise = require('../database/userExercise');
const Schedule = require('../database/schedule');

function adminMembership() {
    const admin_id = "1111";
    const membership = Membership.findOne({membership_id: admin_id}).lean();

    if (!membership) {
        const created = Membership.create({user_id: undefined, membership_id: admin_id, user_level: 2}); // 2 = admin level

        console.log(created);
    }

    const user = User.findOne({username: membership});
    console.log(user);
}

function setupAdmin() {

}

async function run() {
    User.create({username: "testName", password: "test"}).then(r => {
        console.log("User created");
    }).catch(err => {
        console.log("Encountered error during sign up: ", err);
    });
    const users = User.find({}).lean();
    console.log("All users: ");
    for (let i = 0; i < users.size; i++) {
        console.log(users[i]);
    }
    adminMembership();
    setupAdmin();
}

module.exports = {run};