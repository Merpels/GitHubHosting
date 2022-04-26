let now = new Date();

let dete = now.getDate();
let years = now.getFullYear();

let weeklys = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
let weekly = weeklys[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let menth = months[now.getMonth()];

let hinichi = document.querySelector("#main-day");
hinichi.innerHTML = `${weekly} <br> ${menth}, ${dete}`;

let hours = now.getHours();
let mins = now.getMinutes();
let jikan = document.querySelector("#main-time");
jikan.innerHTML = `${hours}:${mins}`;

function convertC(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = "17";
}
let celsius = document.querySelector("#in-celsius");
celsius.addEventListener("click", convertC);

function convertF(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = "66";
}
let fahrenheit = document.querySelector("#in-fahrenheit");
fahrenheit.addEventListener("click", convertF);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#precipitation").innerHTML = Math.round(
    response.data.wind.deg
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function typeSend(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", typeSend);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Sydney");
