// from data.js
var tableData = data;

// Assign button and form elements using d3

var button = d3.select("#filter-btn");
var form = d3.select("form");

// Create event handlers 
button.on("click", runSearch);
form.on("submit", runSearch);

// Function: buildTable
// Parameter: data, contains all data or filtered data
// Formats the html table
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
// Triggerd by either buttob click or clicking enter in the date input box
function runSearch() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get value
    var inputValue = d3.select("#datetime").property("value");

    // Set filered data to the entire dataset
    var filteredData = tableData;

    // Check if a date was entered, if yes filter on that date
    if (inputValue != "") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.datetime === inputValue);
    }

    // Call function to build the html table
    buildTable(filteredData);
}

// Builds table with all data on initial opening of the page and on refresh
buildTable(tableData);
