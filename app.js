if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const API_BASE_URL = process.env.API_BASE_URL;


const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Middleware 
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({  extended: false }));

//imperial & metric
// Routes
app.post('/weather', (req, res) => {
  const url = `${API_BASE_URL}weather?lat=${req.body.latitude}&lon=${req.body.longitude}&units=metric&appid=${WEATHER_API_KEY}`
  axios({
    url: url,
    responseType: 'json'
  }).then(data => res.json(data.data))
    .catch(err => { console.log(err); })
});

app.get('/', (req,res) => {
  res.render('index');
})


// Listen to server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Connected to server ${PORT}...`);
});