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
  document.querySelector("#new-city").innerHTML = response.data.name;

  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = temp + "°C";
}

function searchCity(city) {
  let apiKey = "ecdb6eb1190bca80c0fc58c1b82b1674";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTemp);
}
console.log(apiUrl);
