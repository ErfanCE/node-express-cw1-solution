const { join } = require('node:path');
const express = require('express');
const usersData = require('./dev-data/user-data.json');

const app = express();
const port = 8000;
const host = '127.0.0.1';

// exe1-1
// root Route(end-point)
app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

// exe1-2
app.get('/home', (req, res) => {
  res.status(200).sendFile(join(__dirname, './views/home.html'));
});

app.get('/about', (req, res) => {
  res.status(200).send('About Route');
});

app.get('/contact', (req, res) => {
  res.status(200).send('Contact Route');
});

// exe1-3
app.get('/get-all-users', (req, res) => {
  res.status(200).json(usersData);
});

app.get('/admin', (req, res) => {
  const admins = usersData.filter((user) => user.role === 'admin');

  res.status(200).json(admins);
});

// exe1-4
app.get('/picture', (req, res) => {
  res.status(200).sendFile(join(__dirname, './public/images/login-bg.jpg'));
});

// exe1-5
app.get('/page-1', (req, res) => {
  res.status(200).sendFile(join(__dirname, './views/page-1.html'));
});
app.get('/page-2', (req, res) => {
  res.status(200).sendFile(join(__dirname, './views/page-2.html'));
});
app.get('/page-3', (req, res) => {
  res.status(200).sendFile(join(__dirname, './views/page-3.html'));
});
app.get('/page-4', (req, res) => {
  res.status(200).sendFile(join(__dirname, './views/page-4.html'));
});
app.get('/page-5', (req, res) => {
  res.status(200).sendFile(join(__dirname, './views/page-5.html'));
});

// exe1-6
// express: params
app.get('/product/:page', (req, res) => {
  const { page } = req.params;
  const validPages = ['page-1', 'page-2', 'page-3', 'page-4', 'page-5'];

  if (!validPages.includes(page)) {
    return res.status(404).send('Not-Found');
  }

  res.status(200).sendFile(join(__dirname, `./views/${page}.html`));
});

// http: query string
app.get('/product', (req, res) => {
  const { page = 1 } = req.query;

  if (isNaN(Number(page)) || Number(page) > 5 || Number(page) < 1) {
    return res.status(404).send('Not-Found');
  }

  res.status(200).sendFile(join(__dirname, `./views/page-${page}.html`));
});

// 404: not-found
app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, host, () => {
  console.info(`Listening on ${host}:${port} ...`);
});
