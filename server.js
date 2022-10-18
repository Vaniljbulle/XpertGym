const express = require('express');
const mongoose = require('mongoose');

const registerRoute = require('./server/api/api_register.js');
const loginRoute = require('./server/api/api_login.js');
const htmlRoutes = require('./server/api/api_html.js');
const logoutRoute = require('./server/api/api_logout.js');
const exerciseRoute = require('./server/api/api_exercise.js');
const scheduleRoute = require('./server/api/api_schedule.js');
const startupSequence = require('./server/auth/startup_sequence');
const gymPopData = require('./server/api/api_gym_population_data.js');
const devRoutes = require('./server/api/api_dev.js');
const membershipRoute = require('./server/api/api_membership.js');
const databaseClearRoute = require('./server/api/api_database.js');

const app = express();

app.use(express.json());

app.use(registerRoute);
app.use(loginRoute);
app.use(htmlRoutes);
app.use('/img', express.static('img'));
app.use(logoutRoute);
app.use(exerciseRoute);
app.use(scheduleRoute);
app.use(gymPopData);
app.use(devRoutes);
app.use(membershipRoute);
app.use(databaseClearRoute);


mongoose.connection.on('disconnected', function() {
    fatalError(-2);
})

console.log("Connecting to MongoDB...");
mongoose.connect('mongodb://127.0.0.1:27017/xpertdb', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to MongoDB, starting server...");
    app.listen(3000, () => console.log('Server started\nListening on port 3000...'));

    startupSequence.run().then(r => console.log("Sequence completed"));
}).catch(() => {
    fatalError(-1);
});

function fatalError(code){
    switch (code) {
        case -1:
            console.log("Unable to connect to MongoDB");
            break;
        case -2:
            console.log("Disconnected from MongoDB");
            break;
    }

    process.exit(code);
}
