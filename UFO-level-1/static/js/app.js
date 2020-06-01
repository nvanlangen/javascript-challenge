// from data.js
var tableData = data;

// YOUR CODE HERE!

var button = d3.select("#filter-btn");
button.on("click", runEnter);

function buildTable(data) {
    var tbody = d3.select("tbody");
    tbody.html("");
    data.forEach((UFOSighting) => {
        var row = tbody.append("tr");
        Object.entries(UFOSighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

buildTable(tableData);

function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    var filteredData = tableData.filter(UFOSighting => UFOSighting.datetime === inputValue);

    buildTable(filteredData);

}