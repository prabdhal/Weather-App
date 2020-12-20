require('dotenv').config();

const api = {
  key: SECRET_KEY,
  baseurl: "http://api.openweathermap.org/data/2.5/"
}

const body = document.querySelector('body');
const searchBox = document.querySelector('.search-box');
let city = document.querySelector('.location .city');
let date = document.querySelector('.location .date');
let temp = document.querySelector('.current .temp');
let weather_el = document.querySelector('.current .weather'); 
let hiLow = document.querySelector('.hi-low');

searchBox.addEventListener('keypress', searchLocation);

function searchLocation(e) {
 if (e.keyCode == 13) {
   getResults(searchBox.value);
 }
}

function getResults(location) {
  let locArray = location.split(",");
  let cityName = locArray[0];
  let stateCode = null;
  if(locArray[1] !=null) {
    stateCode = locArray[1];
  } 

  fetch(`${api.baseurl}weather?q=${cityName},${stateCode}&units=metric&appid=${api.key}`)
    .then(weather => {
      console.log(weather);
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  console.log(weather);
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  date.innerText = dateBuilder(now);

  temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>&#176;c</span>`;

  weather_el.innerText = weather.weather[0].main;

  hiLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`

  body.classList.remove('sunny');
  body.classList.remove('clouds');
  body.classList.remove('rain');
  body.classList.remove('snow');
  body.classList.remove('clear');
  body.classList.remove('misty');
  body.classList.remove('default');

  console.log(weather_el.innerText);

  switch (weather_el.innerText) {
    case 'Sunny': 
      body.classList.add('sunny')
      break;
    case 'Clouds': 
      body.classList.add('clouds')
      break;
      case 'Rain': 
      body.classList.add('rain')
      break;
    case 'Snow': 
      body.classList.add('snow')
      break;
    case 'Clear': 
      body.classList.add('clear')
      break;
    case 'Mist': 
      body.classList.add('misty')
      break;
    default:
      body.classList.add('default');
  }
}

function dateBuilder(d) {
  const months = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"];
  const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}