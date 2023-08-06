// current date and time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12;

let dateTime = document.getElementById("date-time");
dateTime.innerHTML =
  day + " " + hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + ampm;

// search engine
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#exampleInputCity");
  document.querySelector("#new-city").innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", changeCity);

// week 5: search engine
function changeTemp(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#new-city").innerHTML = response.data.city;

  let temp = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = temp + "°C";

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity + "%";

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed + " km/h";

  let weatherDescription = response.data.condition.description;
  let weatherElement = document.querySelector("#weather");
  weatherElement.innerHTML = weatherDescription;

let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

iconElement.setAttribute("alrt", response.data.condition.description);
}

let celsiusTemperature = null;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 +32;
  let temperatureElement = document.querySelector("#temperature");
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  celsiusLink.classList.remove("checked")
  fahrenheitLink.classList.add("checked")
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + "°F";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  celsiusLink.classList.add("checked");
  fahrenheitLink.classList.remove("checked");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + "°C"
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function searchCity(city) {
  let apiKey = "84fc8tob0a63d91c4609042a3b47d99c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTemp);
}

searchCity("Calgary");

window.addEventListener("load", defaultCtiy);