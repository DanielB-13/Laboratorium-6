import "./style.css";
import dayjs from "dayjs";

const fetchArticles = async () => {
  try {
    const response = await fetch(
    'https://bjkypruheektazlbbfua.supabase.co/rest/v1/article?select=*', {
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqa3lwcnVoZWVrdGF6bGJiZnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NzA0NjksImV4cCI6MjA5NTI0NjQ2OX0.mpNQ51jJ-AU1KX8dWqSgyqhYXBi-77GbOLSrvJmG-7c',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqa3lwcnVoZWVrdGF6bGJiZnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NzA0NjksImV4cCI6MjA5NTI0NjQ2OX0.mpNQ51jJ-AU1KX8dWqSgyqhYXBi-77GbOLSrvJmG-7c',
      },
    });
  const data = await response.json();
  console.log(data);
  return data;
  } catch (error) {
  console.error('Fetch error:', error);
  }
};

async function renderArticles() {
  const articles = await fetchArticles();

  const container = document.getElementById('articles');

  container.innerHTML = '';

  articles.forEach(article => {
    const element = document.createElement('article');

    element.innerHTML = `
      <h1 class="text-primary text-2xl font-bold">${article.title}</h1>
      <h2>${article.subtitle}</h2>
      <h3>Autor: ${article.author}</h3>
      <h4>Data: ${dayjs(article.created_at).format("DD-MM-YYYY")}</h4>
      <p>${article.content}</p>
    `;

    container.appendChild(element);
  });
}

const createNewArticle = async (title, subtitle, author, created_at, content) => {
  try {
    const response = await fetch('https://bjkypruheektazlbbfua.supabase.co/rest/v1/article', {
    method: 'POST',
    headers: {
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqa3lwcnVoZWVrdGF6bGJiZnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NzA0NjksImV4cCI6MjA5NTI0NjQ2OX0.mpNQ51jJ-AU1KX8dWqSgyqhYXBi-77GbOLSrvJmG-7c',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqa3lwcnVoZWVrdGF6bGJiZnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NzA0NjksImV4cCI6MjA5NTI0NjQ2OX0.mpNQ51jJ-AU1KX8dWqSgyqhYXBi-77GbOLSrvJmG-7c',
      'Content-Type' : 'application/json' ,
  },
  body: JSON.stringify({ title, subtitle, author, created_at, content }),
  });

console.log(response.status);
console.log(await response.text());

  if (response.status !== 201) {
    throw new Error(`Status: ${response.status}`);
  }
  } catch (error) {
    console.error('Fetch error:' , error);
  }
};

document.getElementById('nowy').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const author = document.getElementById('author').value;
  const created_at = document.getElementById('created_at').value;
  const content = document.getElementById('content').value;

  await createNewArticle(title, subtitle, author, created_at, content);

  await renderArticles();
});
renderArticles();
