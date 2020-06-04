// from data.js
var tableData = data;

// YOUR CODE HERE!

var button = d3.select("#filter-btn");
var form = d3.select("form");
var reset = d3.select("#reset-btn");
var cntrySel = d3.select("#selcountry");
var stateSel = d3.select("#selstate");

// Create event handlers 
button.on("click", runSearch);
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

    populateSelectList(tableData.map(obj => obj.country),"#selcountry");
    populateSelectList(tableData.map(obj => obj.state),"#selstate");
    populateSelectList(tableData.map(obj => obj.city),"#selcity");
    populateSelectList(tableData.map(obj => obj.shape),"#selshape");

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

function runSearch() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputDateValue = d3.select("#datetime").property("value");
    var inputCountryValue = d3.select("#selcountry").property("value");
    var inputStateValue = d3.select("#selstate").property("value");
    var inputCityValue = d3.select("#selcity").property("value");
    var inputShapeValue = d3.select("#selshape").property("value")

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

function resetStateList() {
    var inputCountryValue = d3.select("#selcountry").property("value");

    var filteredData = tableData;
    if (inputCountryValue != "All") {
        var filteredData = tableData.filter(UFOSighting => UFOSighting.country === inputCountryValue);
    }

    populateSelectList(filteredData.map(obj => obj.state),"#selstate");
    populateSelectList(filteredData.map(obj => obj.city),"#selcity");
}

function resetCityList() {
    var inputStateValue = d3.select("#selstate").property("value");

    var filteredData = tableData;
    if (inputStateValue != "All") {
        var filteredData = tableData.filter(UFOSighting => UFOSighting.state === inputStateValue);
        populateSelectList(filteredData.map(obj => obj.city),"#selcity");
    }
    else {
        resetStateList();
    }
}

function populateSelectList(data,selID) {
    var values = [];
    var valueList = d3.select(selID);

    data.forEach((UFOSighting) => {
        var bFound = false;
        for (var i = 0; i < values.length; i++) {
            if (UFOSighting === values[i]) {
                bFound = true;
            }
        }
        if (!bFound) {
            values.push(UFOSighting);
        }
    });
    values.sort();
    valueList.html("");
    valueList.append("option").property("value", "All").text("All");
    for (var i = 0; i < values.length; i++) {
        valueList.append("option").property("value", values[i]).text(values[i]);
    }
}

resetFilters();
