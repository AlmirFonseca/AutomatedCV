/**
 * Fetches and processes CSV data, then populates the specified list or table.
 * @param {string} csvPath - The path to the CSV file.
 * @param {string} containerId - The ID of the container to populate.
 * @param {Function} populateFunction - The function to populate the data.
 */
export async function renderCsv(csvPath, containerId, populateFunction) {
    try {
        const response = await fetch(csvPath);
        if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);

        const csvData = await response.text();
        populateFunction(csvData, containerId);
    } catch (error) {
        console.error(`Error loading CSV from ${csvPath}:`, error);
    }
}

/**
 * Populates an HTML table with the data from the CSV file.
 * @param {string} csvText - The CSV data as a string.
 * @param {string} tableId - The ID of the HTML table element to display the data.
 */
export function populateTable(csvText, tableId) {
    const rows = csvText.split('\n');
    const tableElement = document.getElementById(tableId);

    if (!tableElement) {
        console.error(`Element with id '${tableId}' not found.`);
        return;
    }

    // Clear the table content before populating it with new data
    tableElement.innerHTML = '';

    // Process each row in the CSV data
    rows.forEach((row, rowIndex) => {
        const newRow = tableElement.insertRow(-1); // Insert a new row at the end of the table
        let cells = [];

        // Split the row by commas
        cells = row.split(',');

        // Add each cell to the row (th for headers, td for data cells)
        cells.forEach(cellText => {
            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td');
            cellElement.textContent = cellText.trim();
            newRow.appendChild(cellElement);
        });
    });
}

/**
 * Populates an education section with the data from the CSV file.
 * @param {string} csvText - The CSV data as a string.
 * @param {string} divId - The ID of the div to populate.
 */
export function populateEducation(csvText, divId) {
    const lines = csvText.split('\n').slice(1).filter(line => line.trim() !== '');
    const divElement = document.getElementById(divId);
    if (!divElement) {
        console.error(`Element with id '${divId}' not found.`);
        return;
    }

    divElement.innerHTML = ''; // Clear previous content

    lines.forEach(line => {
        const [course, institution, year] = line.split(',');

        if (course && institution && year) {
            divElement.appendChild(createEducationEntry(course, institution, year));
        }
    });
}

/**
 * Creates a div for a single education entry.
 * @param {string} course - The course name.
 * @param {string} institution - The institution name.
 * @param {string} year - The year of completion.
 * @returns {HTMLElement} - A div element containing the education entry.
 */
function createEducationEntry(course, institution, year) {
    const entryDiv = document.createElement('div');
    entryDiv.innerHTML = `
        <p style="font-weight: bold;">${course}, ${year}</p>
        <p>${institution}</p>
    `;
    return entryDiv;
}


/**
 * Populates an experience list with data from a CSV file.
 * @param {string} csvText - The CSV data as a string.
 * @param {string} listId - The ID of the list element to populate.
 */
export function populateExperience(csvText, listId) {
    const lines = csvText.split('\n').slice(1).filter(line => line.trim() !== '');
    const listElement = document.getElementById(listId);

    if (!listElement) {
        console.error(`Element with id '${listId}' not found.`);
        return;
    }

    // Sort the data by date in descending order
    const sortedLines = lines.sort((a, b) => new Date(b.split('","')[4]) - new Date(a.split('","')[4]));

    listElement.innerHTML = ''; // Clear previous content

    sortedLines.forEach(line => {
        const [title, company, companyURL, location, startDate, endDate] = parseCsvRow(line);
        listElement.appendChild(createExperienceItem(title, company, companyURL, location, startDate, endDate));
    });
}

/**
 * Parses a CSV row taking into account potential quotes and commas within fields.
 * @param {string} row - The CSV row as a string.
 * @returns {string[]} - An array of cell values.
 */
function parseCsvRow(row) {
    const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
    return row.match(regex).map(cell => cell.replace(/(^"|"$)/g, ''));
}

/**
 * Creates an HTML list item for a single experience entry.
 * @param {string} title - The job title.
 * @param {string} company - The company name.
 * @param {string} companyURL - The URL of the company.
 * @param {string} location - The location of the job.
 * @param {string} startDate - The start date of the job.
 * @param {string} endDate - The end date of the job (optional).
 * @returns {HTMLElement} - An HTML list item representing the experience entry.
 */
function createExperienceItem(title, company, companyURL, location, startDate, endDate) {
    const listItem = document.createElement('li');

    const dateFormatted = `${formatDate(startDate)} – ${endDate.trim() ? formatDate(endDate) : 'Present'}`;
    listItem.innerHTML = `
        <p style="font-weight: bold;">${title}</p>
        <p><a href="${companyURL}" target="_blank">${company}</a></p>
        <p>${dateFormatted} 🔹 ${location}</p>
    `;

    return listItem;
}

/**
 * Formats a date string into a human-readable format (e.g., Sep 2022).
 * @param {string} dateStr - The date string (e.g., "2022-09-01").
 * @returns {string} - The formatted date.
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
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
