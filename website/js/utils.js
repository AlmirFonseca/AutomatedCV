/**
 * Converts a CSV string into a table format and appends it to the specified HTML table element.
 * @param {string} csvText - The CSV data as a string.
 * @param {string} tableId - The ID of the HTML table element to display the data.
 */
function convertCsvToTable(csvText, tableId) {
    const rows = csvText.split('\n');
    const tableElement = document.getElementById(tableId);

    // Clear the table content before populating it with new data
    tableElement.innerHTML = '';

    // Process each row in the CSV data
    rows.forEach((row, rowIndex) => {
        const newRow = tableElement.insertRow(-1); // Insert a new row at the end of the table
        let cells = [];

        // If the row starts with a quotation mark, split by the quotation and comma
        if (row.startsWith('"') || row.startsWith("'")) {
            const quoteChar = row[0];
            cells = row.split(`${quoteChar},`).map(cell => cell.replace(quoteChar, ''));
        } else {
            cells = row.split(',');
        }

        // Add each cell to the row (th for headers, td for data cells)
        cells.forEach(cellText => {
            const cellElement = rowIndex === 0 ? document.createElement('th') : document.createElement('td');
            cellElement.textContent = cellText.replace(/,/g, ''); // Remove stray commas
            newRow.appendChild(cellElement);
        });
    });
}

/**
 * Fetches a CSV file from a given path and renders its content as a table.
 * @param {string} csvPath - The path to the CSV file.
 * @param {string} tableId - The ID of the HTML table element where the data will be displayed.
 */
export function renderCsvAsTable(csvPath, tableId) {
    fetch(csvPath)
        .then(response => response.text())
        .then(csvData => {
            console.log(csvData);
            convertCsvToTable(csvData, tableId);
        })
        .catch(error => console.error('Error loading CSV file:', error));
}


/**
 * Generates a string of HTML representing a publication.
 * @param {object} publication - The publication object containing its details.
 * @returns {string} - The HTML string representing the publication card.
 */
function generatePublicationHtml(publication) {
    return `
        <h3><a href="article.html?id=${publication.ID}&type=${publication.ENTRYTYPE}">${publication.title}</a></h3>
        <p><strong>Authors:</strong> ${publication.author}</p>
        <p><strong>Published in:</strong> ${publication.journal}, Volume ${publication.volume}, ${publication.year}</p>
    `;
}

/**
 * Generates a string of HTML representing a talk.
 * @param {object} talk - The talk object containing its details.
 * @returns {string} - The HTML string representing the talk card.
 */
function generateTalkHtml(talk) {
    const talkAbstract = talk.abstract ? talk.abstract.substring(0, 200) + '...' : ''; // Truncate abstract if too long
    return `
        <h3>${talk.title}</h3>
        <p>${talkAbstract}</p>
        <p>${talk.year} - ${talk.journal}</p>
        <a href="${talk.url}" target="_blank">PDF</a> | CITE
    `;
}

/**
 * Adds a card representing an article to a specified container.
 * @param {object} article - The article object containing its details.
 * @param {HTMLElement} container - The container element where the article card will be appended.
 * @param {string} articleType - The type of the article ('publications' or 'talks').
 */
function appendArticleCard(article, container, articleType) {
    const articleCard = document.createElement('div');
    articleCard.classList.add('article-card');

    // Select the appropriate card template based on the article type
    switch (articleType) {
        case 'talks':
            articleCard.innerHTML = generateTalkHtml(article);
            break;
        default:
            articleCard.innerHTML = generatePublicationHtml(article);
            break;
    }

    container.appendChild(articleCard);
}

/**
 * Displays a list of articles (e.g., publications or talks) within a specified container.
 * @param {object} articlesData - The data object containing articles to display.
 * @param {string} containerId - The ID of the container element where the articles will be rendered.
 * @param {string} articleType - The type of articles to display (e.g., 'publications', 'talks').
 * @param {number} [limit=Infinity] - The maximum number of articles to display (default is unlimited).
 */
export function displayArticles(articlesData, containerId, articleType, limit = Infinity) {
    console.log(articlesData);

    const containerElement = document.getElementById(containerId);
    
    // Clear any existing content in the container
    containerElement.innerHTML = '';

    // Loop through the articles and append them to the container, respecting the limit
    let articleCount = 0;
    for (const articleKey in articlesData) {
        if (articleCount >= limit) break;
        
        appendArticleCard(articlesData[articleKey], containerElement, articleType);
        articleCount++;
    }
}
