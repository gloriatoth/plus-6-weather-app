let now = new Date();

//show day
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let todayDay = days[now.getDay()];

let showDay = document.querySelector("#day");
showDay.innerHTML = todayDay;

// show hours
let todayHours = now.getHours();
let todayMinutes = now.getMinutes();
let todayTime = `${todayHours}:${todayMinutes}`;
let showTime = document.querySelector("#time");

showTime.innerHTML = todayTime;

// Task

function showWeather(response) {
  // display City
  document.querySelector(".mainLocation").innerHTML = response.data.name;
  // display Desc
  document.querySelector(".statusToday").innerHTML =
    response.data.weather[0].main;
  // display Temp
  let tempCity = Math.round(response.data.main.temp);
  let tempText = document.querySelector(".celsiusToday");
  tempText.innerHTML = tempCity;
  // display Humidity
  let humidityMain = document.querySelector("#humidityToday");
  humidityMain.innerHTML = response.data.main.humidity;
  // display Wind
  let windMain = document.querySelector("#windToday");
  windMain.innerHTML = response.data.wind.speed;
}

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".inputCity").value;

  let apiKey = "5c67d9771dba3f2ffddccbc1dceb6a67";
  let apiSource = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUnits = "metric";
  let apiUrl = `${apiSource}q=${inputCity}&appid=${apiKey}&units=${apiUnits}`;
  axios.get(apiUrl).then(showWeather);
}

let cityButton = document.querySelector(".search-form");
cityButton.addEventListener("submit", showCity);

// Bonus

function showUserLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5c67d9771dba3f2ffddccbc1dceb6a67";
  let apiSource = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUnits = "metric";
  let apiUrl = `${apiSource}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${apiUnits}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showUserLocation);
}

let buttonCurrent = document.querySelector("#currentButton");
buttonCurrent.addEventListener("click", getCurrentLocation);
