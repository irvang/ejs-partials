const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();

// Port
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {

  fetch('https://gist.githubusercontent.com/irvang/0184e891e958e4fbf498b8e9432c378e/raw/f39f3514541d402be03ce1932f330ff150aa3675/test-fetch.json')
    .then(fetchResponse => {
      return fetchResponse.json()
    })
    .then(body => {

      // console.log(body)
      res.render('index', { data: body });
    });
});

app.get('/two', async (req, res) => {

  let fetchResponse = await fetch('https://gist.githubusercontent.com/irvang/0184e891e958e4fbf498b8e9432c378e/raw/f39f3514541d402be03ce1932f330ff150aa3675/test-fetch.json')

  let body = await fetchResponse.json();

  // console.log(body)
  res.render('index', { data: body });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));