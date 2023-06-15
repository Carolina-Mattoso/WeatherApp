function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} at ${hours}:${minutes}`;
}

function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement =  document.querySelector("#forecast");
    let forecastHTML = `<ul>`;
    let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
    days.forEach(function(day){
forecastHTML = forecastHTML + `
    <li id="weather-forecast-list">
      <div class="forecast-date">
      
          ${day}
        
      </div>
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" class="forecast-icon" alt="...">
      <div class="forecast-temp">
      <span class="max-temp">23º</span>
      <span class="min-temp">11º</span>
    </div>
    </div>
  </div>
</li> `;
    })
forecastHTML = forecastHTML + `</ul>`;
forecastElement.innerHTML = forecastHTML;

}

function getforecast(currentCity) {
    let apiKey = "3oa2c4504acf0t98cfbd9f4b11f24965";
    let endPoint = "https://api.shecodes.io/weather/v1/forecast?";
    let unit = "metric";
    let apiUrl = `${endPoint}query=${currentCity}&key=${apiKey}&units${unit}`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    document.querySelector("#current-temperature").innerHTML = ` ${Math.round(response.data.temperature.current)}º`;
    document.querySelector("#city").innerHTML = (response.data.city);
    document.querySelector("#description").innerHTML = (response.data.condition.description);
    document.querySelector("#feels-like").innerHTML = `Feels like: ${Math.round(response.data.temperature.feels_like)}º`;
    document.querySelector("#humidity").innerHTML = `Humidity: ${(response.data.temperature.humidity)}%`;
    document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} Km/H`;
    document.querySelector("#last-updated").innerHTML = `Last updated: ${formatDate(response.data.time * 1000)}`;
    document.querySelector("#icon").setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
      );
      celsiusTemperature = response.data.temperature.current;
      getforecast(response.data.city);
    }

function searchCity(city) {
let apiKey = "3oa2c4504acf0t98cfbd9f4b11f24965";
let endPoint = "https://api.shecodes.io/weather/v1/current?";
let unit = "metric";
let apiUrl = `${endPoint}query=${city}&key=${apiKey}&=${unit}`;
axios.get(apiUrl).then(displayTemperature);


}

function handleSubmit(event){
    event.preventDefault()
    let cityInput = document.querySelector("#city-input");
    searchCity(cityInput.value);
}
function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32; 
    document.querySelector("#current-temperature").innerHTML = Math.round(fahrenheitTemperature);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}
function displayCelsiusTemperature(event){
    event.preventDefault();
    document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}



let celsiusTemperature = null;

document.getElementById("search-form").addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("São Paulo");
