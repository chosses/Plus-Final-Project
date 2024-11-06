function displayWeatherIcon(response) {
  let weatherIcon = document.querySelector(".current-temperature-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
}

function displayWindspeed(response) {
  let windspeed = document.querySelector("#current-windspeed");
  windspeed.innerHTML = response.data.wind.speed.toFixed(1);
}

function displayHumidity(response) {
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = response.data.temperature.humidity;
}

function weatherDescription(response) {
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.condition.description;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}

function formatDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day.getDay()];
}

function getForecast(city) {
  let apiKey = "a53197b4c084be4oe4f4e3t0f5e087ce";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecast = document.querySelector("#weather-forecast");
  console.log(response.data);

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            ${formatDay(day.time)}
            <img
              src="${day.condition.icon_url}"
              alt="weather-icon"
              class="weather-forecast-icon"
            />
            <div class="weather-forecast-temp"><strong>${Math.round(
              day.temperature.minimum
            )}</strong> ${Math.round(day.temperature.maximum)}</div>
          </div> 
          `;
    }
  });
  forecast.innerHTML = forecastHtml;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "a53197b4c084be4oe4f4e3t0f5e087ce";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(weatherDescription);
  axios.get(apiUrl).then(displayHumidity);
  axios.get(apiUrl).then(displayWindspeed);
  axios.get(apiUrl).then(displayWeatherIcon);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

getForecast("Berlin");
