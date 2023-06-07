
function displayTemperature(response) {
    document.querySelector("#current-temperature").innerHTML = ` ${Math.round(response.data.temperature.current)}º`;
    document.querySelector("#city").innerHTML = (response.data.city);
    document.querySelector("#description").innerHTML = (response.data.condition.description);
    document.querySelector("#feels-like").innerHTML = `Feels like: ${Math.round(response.data.temperature.feels_like)}º`;
    document.querySelector("#humidity").innerHTML = `Humidity: ${(response.data.temperature.humidity)}%`;
    document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} Km/H`;
    console.log(response.data);
}

let apiKey = "3oa2c4504acf0t98cfbd9f4b11f24965";
let endPoint = "https://api.shecodes.io/weather/v1/current?";
let query = "Ubatuba";
let unit = "metric";
let apiUrl = `${endPoint}query=${query}&key=${apiKey}&=${unit}`;

axios.get(apiUrl).then(displayTemperature);
