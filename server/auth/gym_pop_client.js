const population_data = document.getElementById("population_data_ID");

fetch('/api/gympopulationdata')
    .then(response => response.json())
    .then(data => {
        if (isNaN(data.currentPop) || data.currentPop === undefined) {
            population_data.innerHTML = "";
        } else {
            population_data.innerHTML = "Gym population: " + data.currentPop + "%";
        }
    });