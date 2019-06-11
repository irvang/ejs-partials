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

  // Fetch returns a promsie. When the promise is fulfilled it triggers the
  // .then method with the value returned by the promise as an argument (fetchResponse in this case).
  fetch('https://gist.githubusercontent.com/irvang/0184e891e958e4fbf498b8e9432c378e/raw/21f513c369ffcb7e0f3b202de41da4d48d8ae5e9/test-fetch.json')
    .then(fetchResponse => {

      // When we return a promise within .then (line 25),  we can concatenate to another .then(), creating a promise chain
      // .json() returns a promise, therefore we can use .then afterwards
      // .json() extracts the body and creates an object
      return fetchResponse.json()
    })
    .then(body => {

      // console.log(body)
      res.render('index', { data: body });
    })
    //catch any error within promise chain,
    // and log to console 
    .catch(err => console.log(err));

});

app.get('/two', async (req, res) => {

  // Similar to promises, here, isntead of using .then(), we "await" for the 
  // return and store it in a variable. Note that await can only be used within
  // a function declared as async
  let fetchResponse = await fetch('https://gist.githubusercontent.com/irvang/0184e891e958e4fbf498b8e9432c378e/raw/21f513c369ffcb7e0f3b202de41da4d48d8ae5e9/test-fetch.json')

  // we "await" for the fulfillment of the promise and store it in body
  let body = await fetchResponse.json(); 

  // console.log(body)
  res.render('index', { data: body });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));