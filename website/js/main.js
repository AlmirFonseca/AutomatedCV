// Importing JSON data for various categories (personal, talks, publications, etc.)
import personalData from '../../static/author_data/personal_data.json' with { type: "json" };
import talksData from '../../static/autogenerated_files/json_files/talks.json' with { type: "json" };
import publicationsData from '../../static/autogenerated_files/json_files/publications.json' with { type: "json" };
import preprintsData from '../../static/autogenerated_files/json_files/preprints.json' with { type: "json" }; 

import { populateTable, populateEducation, populateExperience, renderCsv, displayArticles } from './utils.js';

/**
 * Populates the personal data section in the HTML with the data from the JSON.
 * @param {Object} personalData - The object containing personal data of the author.
 */
function populatePersonalInformation(personalData) {

    // Populate the name, title, and biography sections
    document.getElementById('name').innerHTML = personalData.name;
    document.getElementById('title').innerHTML = personalData.title;
    document.getElementById('affiliation').innerHTML = personalData.affiliation.institution;

    let biographyParagraphs = personalData.biography.split(/\n/);
    let biography = biographyParagraphs.map(paragraph => `<p class='biography-text'>${paragraph}</p>`).join('');
    document.getElementById('biography-text').innerHTML = biography;

    // Populate the list of interests
    const interestsListElement = document.getElementById('interests-list');
    personalData.interests.forEach(interest => {
        const interestListItem = document.createElement('li');
        interestListItem.innerHTML = interest;
        interestsListElement.appendChild(interestListItem);
    });
}

/**
 * Populates the contact information section in the HTML with the data from the JSON.
 * @param {Object} contactData - The object containing contact information of the author.
 */
function populateContactInformation(contactData) {
    // Select the container elements for the contact section
    const contactEmailElement = document.getElementById('contact-email');
    const contactAddressElement = document.getElementById('contact-address');
    const contactMapElement = document.getElementById('contact-map');

    // Email section with an envelope icon
    const emailAnchor = document.createElement('a');
    emailAnchor.href = `mailto:${contactData.email}`;
    emailAnchor.innerHTML = `<i class="fas fa-envelope"></i> ${contactData.email}`; // Font Awesome icon
    contactEmailElement.appendChild(emailAnchor);

    // Address section with a map marker icon
    const addressDiv = document.createElement('div');
    addressDiv.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${contactData.address}`; // Font Awesome marker icon
    contactAddressElement.appendChild(addressDiv);

    // Leaflet Map section
    const latitude = contactData.geoposition.latitude;
    const longitude = contactData.geoposition.longitude;

    // Create a map using Leaflet
    const map = L.map(contactMapElement).setView([latitude, longitude], 15);

    // Add OpenStreetMap tile layer (free to use, no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add a marker for the given location
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`<b>${contactData.address}</b>`);
}

/**
 * Initialize the page content by populating personal data and rendering CSV tables and articles.
 */
function initializePageContent() {
    // Populate personal information from JSON data
    populatePersonalInformation(personalData);

    // Render the CSV data as HTML tables
    renderCsv("../static/author_data/education.csv", 'education-list', populateEducation);
    renderCsv("../static/author_data/professional_experience.csv", 'professional-experience-list', populateExperience);
    renderCsv("../static/author_data/students.csv", 'students-table', populateTable);
    renderCsv("../static/author_data/teaching_experience.csv", 'teaching-table', populateTable);

    // Display articles (talks, publications, preprints) in the respective sections
    displayArticles(talksData, 'talks-list', 'talks', 3);
    displayArticles(publicationsData, 'publications-list', 'publications', 3);
    displayArticles(preprintsData, 'preprints-list', 'preprints', 3);

    // Populate contact information
    populateContactInformation(personalData.contact_information);
}

// Wait for the document to fully load before executing the initialization
document.addEventListener('DOMContentLoaded', initializePageContent);

document.getElementById('menu-toggle').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
});

