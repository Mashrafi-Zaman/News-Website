const apiKey = 'd4df6761460d48cfa39fc4ed47095e92';
const newsContainer = document.getElementById('newsContainer');

async function fetchNews(query) {
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

async function displayNews(query) {
  const articles = await fetchNews(query);
  newsContainer.innerHTML = '';

  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');

    const thumbnail = article.urlToImage ? article.urlToImage : 'placeholder.jpg';
    const title = article.title;
    const description = article.description;
    const source = article.source.name;
    const url = article.url;

    articleElement.innerHTML = `
      <img src="${thumbnail}" alt="${title}">
      <div>
        <h2>${title}</h2>
        <p>${description}</p>
        <p>Source: ${source}</p>
        <a href="${url}" target="_blank">Read more</a>
      </div>
    `;

    newsContainer.appendChild(articleElement);
  });
}

function searchNews() {
  const query = document.getElementById('searchInput').value;
  displayNews(query);
}

displayNews("Politics");
