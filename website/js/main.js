// Importing the personal data from the json file
import personalData from '../../static/author_data/personal_data.json' with { type: "json" };


// Function to convert a CSV string to a table
function textToTable(csvText, tableId) {
    const lines = csvText.split('\n');
    const table = document.getElementById(tableId);

    // Clear the table before rendering
    table.innerHTML = '';

    // Process each line of the CSV
    lines.forEach((line, index) => {
        const row = table.insertRow(-1); // Add a new row at the end of the table
        var cells = [];

        // If the strings start with " or ', split by those characters
        if (line.startsWith('"') || line.startsWith("'")) {
            const quoteChar = line[0];
            cells = line.split(quoteChar + ',').map(cell => cell.replace(quoteChar, ''));
        }
        else {
            cells = line.split(',');
        }

        // Process each cell in the line
        cells.forEach(cellText => {
            const cell = index === 0 ? document.createElement('th') : document.createElement('td');
            cell.textContent = cellText.replace(/,/g, ''); // Remove remaining commas
            row.appendChild(cell);
        });
    });
}


// Function to display a CSV file as a table
function displayCSVAsTable(csvPath, tableId) {
    fetch(csvPath)
        .then(response => response.text())
        .then(data => {
            console.log(data);
            textToTable(data, tableId);
        })
        .catch(error => console.error('Error loading CSV file:', error));
}


// Function to fill the personal data in the HTML
function fillPersonalData(personalData) {
    console.log(personalData);

    document.getElementById('name').innerHTML = personalData.name;
    document.getElementById('title').innerHTML = personalData.title;
    document.getElementById('biography').innerHTML = personalData.biography;

    // Interests list
    let interestsList = document.getElementById('interests');
    personalData.interests.forEach(interest => {
        let li = document.createElement('li');
        li.innerHTML = interest;
        interestsList.appendChild(li);
    });
}


fillPersonalData(personalData);


// Display the CSV files as tables when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayCSVAsTable("../static/author_data/awards.csv", 'awards-table');
    displayCSVAsTable("../static/author_data/education.csv", 'education-table');
    displayCSVAsTable("../static/author_data/professional_experience.csv", 'professional-table');
    displayCSVAsTable("../static/author_data/students.csv", 'alumni-table');
});
