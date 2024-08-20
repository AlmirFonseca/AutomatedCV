import personalData from '../../author_data/personal_data.json' with { type: "json" };

// Importing the personal data from the json file

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

document.addEventListener('DOMContentLoaded', function() {
    displayCSVAsTable("../author_data/education.csv", 'educationTable');
    displayCSVAsTable("../author_data/professional_experience.csv", 'professionalTable');
    displayCSVAsTable("../author_data/students.csv", 'alumniTable');
    displayCSVAsTable("../author_data/awards.csv", 'awardsTable');
});

function displayCSVAsTable(csvPath, tableId) {
    fetch(csvPath)
        .then(response => response.text())
        .then(data => {
            console.log(data);
            textToTable(data, tableId);
        })
        .catch(error => console.error('Error loading CSV file:', error));
}

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
