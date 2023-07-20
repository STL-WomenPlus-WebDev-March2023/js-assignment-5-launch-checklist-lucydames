// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   let div = document.getElementById("missionTarget");
        div.innerHTML =`
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`;
}

function validateInput(testInput) {
   if (testInput === "") {
    return "Empty";
   } else if (isNaN(testInput)) {
    return "Not a Number";
   } else if (isNaN(testInput) === false) {
    return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.getElementById("faultyIems");
 
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || 
        validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields required");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || 
        validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Please enter valid information");
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
 
        if (fuelLevel < 10000 || cargoLevel > 10000) {
            list.style.visibility = "visible";
 
            if (fuelLevel < 10000) {
                fuelStatus.innerHTML = "Fuel level too low for launch";
            } else {
                fuelStatus.innerHTML = "Fuel level is high enough for launch";
            }
 
            if (cargoLevel => 10000) {
                cargoStatus.innerHTML = "Cargo mass too high for launch";
            } else {
                cargoStatus.innerHTML = "Cargo mass is low enough for launch";
            }
 
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "#C7254E";
        } else {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level passes";
            cargoStatus.innerHTML = "Cargo mass passes";
            launchStatus.innerHTML = "Shuttle is ready to launch!";
            launchStatus.style.color = "#419f6A";
        }
    }
 }
 

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = Math.floor(Math.random() * planets.length);
    return planets[randomPlanet];
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
