# javascript-challenge

## Javascript and DOM Manipulation

### Level 1: Automatic Table and Date Search

Data containing UFO Sightings is provided as a javascript object.

The html form contains an entry field and a button.  

The seach is triggered two different ways.  One method is to enter a date in the field and press the enter key. Theother is to enter a date in the field and click the Filter button.

The provided data is searched for by data and displayed on the page.  If not data is found a message is displayed that no data is found for that date.

If the date field contains the default of All Dates, the entire set of provided data is displayed.

### Level 2: Multiple Search Categories

The same data that was used for the Level 1 page will also be used for Level 2.

The html form contains an entry field for date and drop down lists for country, state, city, and shape.  There are two buttons on the form, filter and reset.

On the initial opening of the page, the entire data set is displayed and the default value of All is set for each search criterion.

The search can only be triggred by clicking the filter button.  This was done because hitting enter from the date field may prevent additional filters to be selected.

To make the locations easier to choose the City drop down list will only display cities for the selected Country and State. The state drop down list will only display entries for the selected Country.

The filtering is performed using the "AND" approach, meaning all of the criteria entered must be satisfied to be displayed.

As in Level 1 if there is not any data meeting the criteria a message is displayed that no data is found.

