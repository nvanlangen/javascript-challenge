// from data.js
var tableData = data;

// YOUR CODE HERE!

var button = d3.select("#filter-btn");
var form = d3.select("form");
var reset = d3.select("#reset-btn");

var cntrySel = d3.select("#selcountry");
var stateSel = d3.select("#selstate");

// Create event handlers 
button.on("click", runEnter);
form.on("submit", doNothing);
reset.on("click", resetFilters);
cntrySel.on("change", resetStateList);
stateSel.on("change", resetCityList);

function doNothing() {
    d3.event.preventDefault();
}

function resetFilters() {

    var inputDate = d3.select("#datetime");
    inputDate.property("value", "");
    populateCountryList(tableData);
    populateCityList(tableData);
    populateStateList(tableData);
    populateShapeList();

    buildTable(tableData);

}

function buildTable(data) {
    var tbody = d3.select("tbody");
    tbody.html("");
    if (data.length > 0) {
        data.forEach((UFOSighting) => {
            var row = tbody.append("tr");
            Object.entries(UFOSighting).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        });
    }
    else {
        var row = tbody.append("tr");
        var cell = row.append("td").attr("colspan", 7).attr("style","text-align:center;");
        cell.text("No results meeting the criteria were found.");
    }
}

function populateCountryList(data) {
    console.log("popCountry");
    var countries = [];
    var countryList = d3.select("#selcountry");
    data.forEach((UFOSighting) => {
        var bFound = false;
        for (var i = 0; i < countries.length; i++) {
            if (UFOSighting.country === countries[i]) {
                bFound = true;
            }
        }
        if (!bFound) {
            countries.push(UFOSighting.country);
        }
    });
    countries.sort();
    countryList.html("");
    countryList.append("option").property("value", "All").text("All");
    for (var i = 0; i < countries.length; i++) {
        countryList.append("option").property("value", countries[i]).text(countries[i]);
    }
}

function populateStateList(data) {
    console.log("popState");
    var states = [];
    var stateList = d3.select("#selstate");
    data.forEach((UFOSighting) => {
        var bFound = false;
        for (var i = 0; i < states.length; i++) {
            if (UFOSighting.state === states[i]) {
                bFound = true;
            }
        }
        if (!bFound) {
            states.push(UFOSighting.state);
        }
    });
    states.sort();
    stateList.html("");
    stateList.append("option").property("value", "All").text("All");
    for (var i = 0; i < states.length; i++) {
        stateList.append("option").property("value", states[i]).text(states[i]);
    }
}

function populateCityList(data) {
    console.log("popCity");
    var cities = [];
    var cityList = d3.select("#selcity");
    data.forEach((UFOSighting) => {
        var bFound = false;
        for (var i = 0; i < cities.length; i++) {
            if (UFOSighting.city === cities[i]) {
                bFound = true;
            }
        }
        if (!bFound) {
            cities.push(UFOSighting.city);
        }
    });
    cities.sort();
    cityList.html("");
    cityList.append("option").property("value", "All").text("All");
    for (var i = 0; i < cities.length; i++) {
        cityList.append("option").property("value", cities[i]).text(cities[i]);
    }
}

function populateShapeList() {
    var shapes = [];
    var shapeList = d3.select("#selshape");

    tableData.forEach((UFOSighting) => {
        var bFound = false;
        for (var i = 0; i < shapes.length; i++) {
            if (UFOSighting.shape === shapes[i]) {
                bFound = true;
            }
        }
        if (!bFound) {
            shapes.push(UFOSighting.shape);
        }
    });
    shapes.sort();
    shapeList.html("");
    shapeList.append("option").property("value", "All").text("All");
    for (var i = 0; i < shapes.length; i++) {
        shapeList.append("option").property("value", shapes[i]).text(shapes[i]);
    }
}




function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputDate = d3.select("#datetime");
    var inputCountry = d3.select("#selcountry");
    var inputState = d3.select("#selstate");
    var inputCity = d3.select("#selcity");
    var inputShape = d3.select("#selshape")

    // Get the value property of the input element
    var inputDateValue = inputDate.property("value");
    var inputCountryValue = inputCountry.property("value");
    var inputStateValue = inputState.property("value");
    var inputCityValue = inputCity.property("value");
    var inputShapeValue = inputShape.property("value");

    var filteredData = tableData;

    if (inputDateValue != "") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.datetime === inputDateValue);
    }

    if (inputCountryValue != "All") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.country === inputCountryValue);
    }

    if (inputStateValue != "All") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.state === inputStateValue);
    }

    if (inputCityValue != "All") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.city === inputCityValue);
    }

    if (inputShapeValue != "All") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.shape === inputShapeValue);
    }

    buildTable(filteredData);

}

resetFilters();

function resetStateList() {
    console.log("ResetState");
    var inputCountry = d3.select("#selcountry");
    var inputCountryValue = inputCountry.property("value");

    var filteredData = tableData;
    if (inputCountryValue != "All") {
        var filteredData = tableData.filter(UFOSighting => UFOSighting.country === inputCountryValue);
    }
    populateStateList(filteredData);
    populateCityList(filteredData);
}

function resetCityList() {
    console.log("resetCity");
    var inputState = d3.select("#selstate");
    var inputStateValue = inputState.property("value");

    var filteredData = tableData;
    if (inputStateValue != "All") {
        var filteredData = tableData.filter(UFOSighting => UFOSighting.state === inputStateValue);
        populateCityList(filteredData);
    }
    else {
        resetStateList();
    }
}