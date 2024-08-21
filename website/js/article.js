// Importing publications data from the json file
import publicationsData from '../../static/publication/json/publications.json' with { type: "json" };

// Importing preprint data from the json file
import preprintsData from '../../static/publication/json/preprints.json' with { type: "json" };


function fillArticleData(articleID, articleType) {
    const articles = articleType === 'article' ? publicationsData : preprintsData;
    const article = articles.find(article => article.ID === articleID);

    if (article) {
        document.getElementById('title').textContent = article.title;
        document.getElementById('author').textContent = article.author;
        document.getElementById('journal').textContent = `${article.journal}, Volume ${article.volume}, ${article.year}`;
        document.getElementById('abstract').textContent = article.abstract;
        document.getElementById('readMore').setAttribute('href', article.url);
    } else {
        document.body.innerHTML = '<h2>Artigo não encontrado</h2>';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const articleID = params.get('id');
    const articleType = params.get('type');

    console.log(articleID, articleType);

    fillArticleData(articleID, articleType);
});