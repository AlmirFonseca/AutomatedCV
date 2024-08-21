// Importing the personal data from the json file
import personalData from '../../static/author_data/personal_data.json' with { type: "json" };

// Importing talks data from the json file
import talksData from '../../static/talk/json/talks.json' with { type: "json" };

// Importing publications data from the json file
import publicationsData from '../../static/publication/json/publications.json' with { type: "json" };

// Importing preprint data from the json file
import preprintsData from '../../static/publication/json/preprints.json' with { type: "json" };


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
function fillPersonalData(data) {
    console.log(data);

    document.getElementById('name').innerHTML = data.name;
    document.getElementById('title').innerHTML = data.title;
    document.getElementById('biography').innerHTML = data.biography;

    // Interests list
    let interestsList = document.getElementById('interests');
    data.interests.forEach(interest => {
        let li = document.createElement('li');
        li.innerHTML = interest;
        interestsList.appendChild(li);
    });
}


// Function to display information about the talks
function displayTalks(data) {
    console.log(data);

    const talksContainer = document.getElementById('talks');

    data.forEach(talk => {
        const talkCard = document.createElement('div');
        talkCard.classList.add('talk-card');

        talkCard.innerHTML = `
            <h3>${talk.title}</h3>
            <p>${talk.year} - ${talk.journal}</p>
        `;

        talksContainer.appendChild(talkCard);
    });
}


// Function to display information about the publications
function displayPublications(data, containerId) {
    console.log(data);

    const publicationsContainer = document.getElementById(containerId);

    data.forEach(publication => {
        const publicationCard = document.createElement('div');
        publicationCard.classList.add('publication-card');

        publicationCard.innerHTML = `
            <h3><a href="article.html?id=${publication.ID}&type=${publication.ENTRYTYPE}">${publication.title}</a></h3>
            <p><strong>Authors:</strong> ${publication.author}</p>
            <p><strong>Published in:</strong> ${publication.journal}, Volume ${publication.volume}, ${publication.year}</p>
        `;

        publicationsContainer.appendChild(publicationCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fillPersonalData(personalData);

    // Display the CSV files as tables when the page is loaded
    displayCSVAsTable("../static/author_data/awards.csv", 'awards-table');
    displayCSVAsTable("../static/author_data/education.csv", 'education-table');
    displayCSVAsTable("../static/author_data/professional_experience.csv", 'professional-table');
    displayCSVAsTable("../static/author_data/students.csv", 'alumni-table');

    displayTalks(talksData);
    displayPublications(publicationsData, 'publications');
    displayPublications(preprintsData, 'preprints');
});

