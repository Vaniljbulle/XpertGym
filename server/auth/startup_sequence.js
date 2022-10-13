const User = require('../database/user');
const Membership = require('../database/membership');
const Exercise = require('../database/exercise');
const UserExercise = require('../database/userExercise');
const Schedule = require('../database/schedule');
const ScheduleLink = require('../database/scheduleLink');
const bcrypt = require("bcrypt");

const admin_username = "Admin";
const admin_password = "admin";
const admin_id = "1111";

async function setupAdmin() {
    let membership = await Membership.findOne({membership_id: admin_id}).lean();

    if (!membership) {
        await Membership.create({user_id: null, membership_id: admin_id, user_level: 2}); // 2 = admin level
        await Membership.create({user_id: null, membership_id: "2222", user_level: 0});
        membership = await Membership.findOne({membership_id: admin_id}).lean();
        console.log("Admin membership created");
        console.log(membership);
    } else {
        console.log("Admin membership exists");
        console.log(membership);
    }

    let user = await User.findOne({_id: membership.user_id}).lean();

    console.log("user found: ");
    console.log(user);
    if (!user) {
        const hashedPassword = await bcrypt.hash(admin_password, 10);
        await User.create({username: admin_username, password: hashedPassword});
        user = await User.findOne({username: admin_username}).lean();

        console.log("Admin user created");
        console.log(user);

        await Membership.updateOne({membership_id: admin_id}, {$set:{user_id: user._id}});
        membership = await Membership.findOne({membership_id: admin_id}).lean();

        console.log("Membership user_id was set to Admin's _id");
        console.log(membership.user_id);
        console.log(user._id);

        console.log("Membership");
        console.log(membership);
    } else {
        console.log("Admin user exists");
        console.log(user);
    }
}

async function printAll(db, name) {
    let all = await db.find({}).lean();
    console.log("All " + name);
    for (const a of all) {
        console.log(a);
    }
}

async function run() {
    // Printing all existing memberships
    // let memberships = await Membership.find({}).lean();
    // console.log("All memberships");
    // for (const m of memberships) {
    //     console.log(m);
    // }
    // // Printing all existing users
    // let users = await User.find({}).lean();
    // console.log("All users");
    // for (const user of users) {
    //     console.log(user);
    // }

    await printAll(Membership, "Membership");
    await printAll(User, "User");
    await printAll(Exercise, "Exercise");
    await printAll(UserExercise, "UserExercise");
    await printAll(Schedule, "Schedule");
    await printAll(ScheduleLink, "ScheduleLink");

    await setupAdmin();
}

module.exports = {run};