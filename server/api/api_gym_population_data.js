const router = require('express').Router();
const xlsx = require('xlsx');

// GET request for gym pop data
router.get('/api/gympopulationdata', async (req, res) => {
    res.json({currentPop: getGymPopData()});
});


function getGymPopData() {
    // Get data from xlsx file
    const workbook = xlsx.readFile('./server/database/occupation-data-xpert-gym.xlsx');
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    console.log(data);
    // Get current hour
    const date = new Date();
    const hour = date.getHours();

    // Get monday/sunday of current week
    const day = date.getDay();
    const fetchData = fetchSingular(day, data, hour);
    if (fetchData === "closed") {
        return "closed";
    }
    return (Math.trunc(fetchData * 100));
}

function fetchSingular(dayInteger, dataSheet, hour){
    hour -= 6;
    switch (dayInteger) {
        case 0:
            return dataSheet[hour].Sunday;
        case 1:
            return dataSheet[hour].Monday;
        case 2:
            return dataSheet[hour].Tuesday;
        case 3:
            return dataSheet[hour].Wednesday;
        case 4:
            return dataSheet[hour].Thursday;
        case 5:
            if (hour < 9 || hour > 20)
                return "closed";
            return dataSheet[hour].Friday;
        case 6:
            if (hour < 9 || hour > 20)
                return "closed";
            return dataSheet[hour].Saturday;
    }
}


module.exports = router;