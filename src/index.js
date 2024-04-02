import './style.css';

const weatherKey = "de8a152ecb1a479a92120939242703"

async function requestWeather(weatherKey, location) {
    const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key="+weatherKey+"&q="+location+"&days=3", {mode: 'cors'});
    if (response.status == 200) {
        let json = await response.json();
        return json;
    }

    throw new Error(response.status);
}

const mainContainer = document.getElementById("mainContainer")
const currentWeatherDiv = document.getElementById("currentWeather")
const currentWeatherIcon = document.getElementById("currentWeatherIcon")
const futureDays = document.getElementsByClassName("futureDay")

function updateForecast(result, farenheit) {
    currentWeatherDiv.children[0].innerHTML = result.location.name + ", " + result.location.region;
    currentWeatherDiv.children[1].innerHTML = result.current.condition.text;
    if (farenheit) {
        currentWeatherDiv.children[2].innerHTML = result.current.temp_f + " &degF";
    } else {
        currentWeatherDiv.children[2].innerHTML = result.current.temp_c + " &degC";
    }
    currentWeatherIcon.src = "https:"+result.current.condition.icon;
    mainContainer.style.backgroundColor = formatColor(result)
    fillFutureDays(result, farenheit)
}

function fillFutureDays(result, farenheit) {
    for (let i = 0; i < futureDays.length; i++) {
        let futureDay = futureDays[i];
        let forecast = result.forecast.forecastday[i]
        futureDay.children[0].innerHTML = forecast.date.split("-")[1] + "/" + forecast.date.split("-")[2]
        if (farenheit) {
            futureDay.children[1].innerHTML = forecast.day.maxtemp_f + " / " + forecast.day.mintemp_f + " &degF"
        } else {
            futureDay.children[1].innerHTML = forecast.day.maxtemp_c + " / " + forecast.day.mintemp_c + " &degC"
        }
        futureDay.children[2].innerHTML = forecast.day.daily_chance_of_rain + "%"
    }
}

function formatColor(result) {
    if (result.current.condition.text == "Overcast" || 
        result.current.condition.text == "Cloudy" || 
        result.current.condition.text == "Raining") {
        return "#494949"
    } else {
        return "#2970ff"
    }
}



requestWeather(weatherKey, "Honolulu").then((result) => {
    updateForecast(result, degFar.checked)
})

const searchCity = document.getElementById("searchCity")
const searchButton = document.getElementById("searchButton")
const degFar = document.getElementById("Far")

searchButton.addEventListener('click', () => {
    requestWeather(weatherKey, searchCity.value).then((result) => {
        updateForecast(result, degFar.checked)
    })
})
