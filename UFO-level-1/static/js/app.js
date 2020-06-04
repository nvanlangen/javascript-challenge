// from data.js
var tableData = data;

// YOUR CODE HERE!

var button = d3.select("#filter-btn");
var form = d3.select("form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit", runEnter);

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

function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputValue = d3.select("#datetime").property("value");

    var filteredData = tableData;

    if (inputValue != "") {
        filteredData = filteredData.filter(UFOSighting => UFOSighting.datetime === inputValue);
    }

    buildTable(filteredData);
}

buildTable(tableData);
