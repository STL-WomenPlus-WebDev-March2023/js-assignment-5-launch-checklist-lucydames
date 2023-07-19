// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   let div = document.getElementById("missionTarget");
        div.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">`;
}

function validateInput(testInput) {
   if (testInput === "") {
    return "Empty";
   } else if (isNan(testInput)) {
    return "Not a Number";
   } else if (isNan(testInput) === false) {
    return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || 
        validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
            alert("All fields required");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || 
    validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Please enter valid information");
    } else {
        let launchStatus = document.getElementById("launchStatus")
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch.`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch.`;

            if (fuelLevel < 10000 && cargoMass > 10000) {
                faultyItems.style.visibility = "visible";
                fuelStatus.innerHTML = "Fuel level too low for launch";
                cargoStatus.innerHTML = "Cargo mass too high for launch";
                launchStatus.innerHTML = "Shuttle not ready for launch";
                launchStatus.style.color = "#C7254E";
            } else if (fuelLevel < 10000) {
                faultyItems.style.visibility = "visible";
                fuelStatus.innerHTML = "Fuel level too low for launch";
                launchStatus.innerHTML = "Shuttle not ready for launch";
                launchStatus.style.color = "#C7254E";
            } else if (cargoMass > 100000) {
                faultyItems.style.visibility = "visible";
                cargoStatus.innerHTML = "Cargo mass too high for launch";
                launchStatus.innerHTML = "Shuttle not ready for launch";
                launchStatus.style.color = "#C7254E";
            } else {
                list.style.visibility = "visible";
                fuelStatus.innerHTML = `Fuel level passes`;
                cargoStatus.innerHTML = `Cargo mass passes`;
                launchStatus.innerHTML = `Shuttle is ready to launch!`;
                launchStatus.style.color = "#419f6A"; 
            }

        }

    }

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = Math.floor(Math.random() * planets.length);
    return planets [randomPlanet];
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
