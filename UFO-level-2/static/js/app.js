// from data.js
var tableData = data;

// Assign variables to html elements

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

// Function: doNothing
// Called when the enter key is pressed from the date input field  
// Only want to search when the button is clicked
function doNothing() {
    d3.event.preventDefault();
}

// Function: resetFilters
// Called when the reset button is clicked
function resetFilters() {

    // Clear the date input field
    var inputDate = d3.select("#datetime");
    inputDate.property("value", "");

    // Call functions to populate each drop down using the entire dataset
    populateSelectList(tableData.map(obj => obj.country),"#selcountry");
    populateSelectList(tableData.map(obj => obj.state),"#selstate");
    populateSelectList(tableData.map(obj => obj.city),"#selcity");
    populateSelectList(tableData.map(obj => obj.shape),"#selshape");

    // Call buildTable to display the html table with all data
    buildTable(tableData);
}

// Function: buildTable
// Parameter: data, contains either the entire dataset or filtered data
// Creates the html table
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

// Function: runSearch
// Searches the dataset for records meeting all search criteria
function runSearch() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get value of each element
    var inputDateValue = d3.select("#datetime").property("value");
    var inputCountryValue = d3.select("#selcountry").property("value");
    var inputStateValue = d3.select("#selstate").property("value");
    var inputCityValue = d3.select("#selcity").property("value");
    var inputShapeValue = d3.select("#selshape").property("value")

    // Set filtered data to the entire dataset
    var filteredData = tableData;

    // Check if date is entered, if yes filter on date
    if (inputDateValue != "") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.datetime === inputDateValue);
    }

    // Check if country is not All, if it is not all filter on country
    if (inputCountryValue != "All") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.country === inputCountryValue);
    }

    // Check if state is not All, if it is not all filter on state
    if (inputStateValue != "All") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.state === inputStateValue);
    }

    // Check if city is not All, if it is not all filter on city
    if (inputCityValue != "All") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.city === inputCityValue);
    }

    // Check if shape is not All, if it is not all filter on shape
    if (inputShapeValue != "All") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.shape === inputShapeValue);
    }

    // Call buildTable to display the html table with filtered data
    buildTable(filteredData);
}

// Function: resetStateList
// Called when the Country is changed
function resetStateList() {
    // Select the country element and get the value
    var inputCountryValue = d3.select("#selcountry").property("value");

    // Set filtered data to the entire dataset
    var filteredData = tableData;

    // Check if country is not All, if it is not all filter on the country
    if (inputCountryValue != "All") {
        var filteredData = tableData.filter(UFOSighting => UFOSighting.country === inputCountryValue);
    }

    // Call functions to populate both the state and city lists
    populateSelectList(filteredData.map(obj => obj.state),"#selstate");
    populateSelectList(filteredData.map(obj => obj.city),"#selcity");
}

// Function: resetCityList
// Called when the State is changed
function resetCityList() {
    // Select the country element and get the value
    var inputStateValue = d3.select("#selstate").property("value");

    // Set filtered data to the entire dataset
    var filteredData = tableData;

    // Check if state is not All, if it is not all filter on the state and call function to populate the city list
    if (inputStateValue != "All") {
        var filteredData = tableData.filter(UFOSighting => UFOSighting.state === inputStateValue);
        populateSelectList(filteredData.map(obj => obj.city),"#selcity");
    }
    else {
        // Since state is all, call function to reset the state list which will populate both the state and city lists
        resetStateList();
    }
}

// Function: populateSelectList
// Parameters: data, contains the data to be put in the select list
//             selID, contains the html id of the select list to be populated
function populateSelectList(data,selID) {
    // set up empty array and get the select list element
    var values = [];
    var valueList = d3.select(selID);

    // Loop through the data passed in
    data.forEach((UFOSighting) => {
        // Determine if the value has already been added to the array
        var bFound = false;
        for (var i = 0; i < values.length; i++) {
            if (UFOSighting === values[i]) {
                bFound = true;
            }
        }
        // If value is not in the array, push it into the array
        if (!bFound) {
            values.push(UFOSighting);
        }
    });

    // Sort the array
    values.sort();
    // Clear the html for the select list element
    valueList.html("");
    // Set the first element to All
    valueList.append("option").property("value", "All").text("All");
    // Loop through the array to set the select options
    for (var i = 0; i < values.length; i++) {
        valueList.append("option").property("value", values[i]).text(values[i]);
    }
}

// Call resetFilers on initial open of the page and on refresh to display the entire dataset
resetFilters();
