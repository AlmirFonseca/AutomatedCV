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
 * @param {HTMLElement} publicationCard - The publication card element to append the HTML to
 * @returns {string} - The HTML string representing the publication card.
 */
function generatePublicationHtml(publication, publicationCard) {
    // Create a title element with an onclick event to open the modal in the publication card
    const titleElement = document.createElement('h3');

    titleElement.textContent = publication.title;

    titleElement.onclick = function() {
        showArticleDetails(publication);
    };

    // Create a paragraph element with the publication details
    const publicationDetails = document.createElement('p');
    const publicationVolume = publication.volume ? `Volume ${publication.volume}` : '';

    var publishedInfo = "";
    publishedInfo = [publication.journal, publicationVolume, publication.year].filter(Boolean).join(', ');

    publicationDetails.innerHTML = `
        <strong>Authors:</strong> ${publication.author}<br>
        <strong>Published in:</strong> ${publishedInfo}
    `;

    // Append the title and details to the publication card
    publicationCard.appendChild(titleElement);
    publicationCard.appendChild(publicationDetails);

    return publicationCard;
}

/**
 * Generates a string of HTML representing a talk.
 * @param {object} talk - The talk object containing its details.
 * @param {HTMLElement} talkCard - The talk card element to append the HTML to
 * @returns {string} - The HTML string representing the talk card.
 */
function generateTalkHtml(talk, talkCard) {
    // Create a title element with an onclick event to open the modal in the talk card
    const titleElement = document.createElement('h3');
    
    titleElement.textContent = talk.title;

    titleElement.onclick = function() {
        showArticleDetails(talk);
    }

    // Create a paragraph element with the talk details
    const talkDetails = document.createElement('p');

    // Truncate abstract if too long
    const talkAbstract = talk.abstract ? talk.abstract.substring(0, 200) + '...' : ''; 

    talkDetails.innerHTML = `
        <p>${talkAbstract}</p>
        <p>${talk.year} - ${talk.journal}</p>
        <a href="${talk.url}" target="_blank">PDF</a> | CITE
    `;

    // Append the title and details to the talk card
    talkCard.appendChild(titleElement);
    talkCard.appendChild(talkDetails);

    return talkCard;
}

/**
 * Adds a card representing an article to a specified container.
 * @param {object} article - The article object containing its details.
 * @param {HTMLElement} container - The container element where the article card will be appended.
 * @param {string} articleType - The type of the article ('publications' or 'talks').
 */
function appendArticleCard(article, container, articleType) {
    let articleCard = document.createElement('div');
    articleCard.classList.add('article-card');

    // Select the appropriate card template based on the article type
    switch (articleType) {
        case 'talks':
            articleCard = generateTalkHtml(article, articleCard);
            break;
        default:
            articleCard = generatePublicationHtml(article, articleCard);
            break;
    }

    container.appendChild(articleCard);
}

/**
 * Opens a modal window with the details of an article.
 * @param {object} content - The content to display in the modal window.
 */
function openModal(content) {
    const modal = document.getElementById('articleModal');
    const modalContent = document.getElementById('modalContent');

    // Set the content and display the modal 
    modalContent.innerHTML = content;
    modal.style.display = 'block';

    // Close the modal if the user clicks outside of it
    window.onclick = function(event) {
        modal.style.display = event.target === modal ? 'none' : modal.style.display;
    };
    
    // Close the modal if the user clicks the close button
    const closeBtn = document.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
}


function showArticleDetails(article) {
    const content = `
      <h1>${article.title}</h1>
      <p><strong>(${article.year})</strong> ${article.author}</p>
      <h3>Abstract</h3>
      <p>${article.abstract || 'No abstract available.'}</p>
      <p>${article.journal ? `${article.journal}, Volume ${article.volume}` : ''}</p>
      <p><a href="${article.doi || article.url}" target="_blank">${article.doi ? 'DOI' : 'PDF'}</a></p>
    `;
    openModal(content);
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
