const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => res.render('beers', {beersFromApi}))
  .catch(e => console.error(e));
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beersFromApi => res.render('random-beer', {beersFromApi}))
  .catch(e => console.error(e));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));