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
  document.querySelector("#new-city").innerHTML = response.data.city;

  let temp = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  tempElement.innerHTML = temp + "°C";
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.main.speed);
}

function searchCity(city) {
  let apiKey = "84fc8tob0a63d91c4609042a3b47d99c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTemp);
}
console.log(apiUrl);
