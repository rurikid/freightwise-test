'use strict';

import { Config } from "./config.js";
import { Utilities } from "../utilities.js";
import { Constants } from "../state.js";

class WeatherController {
  latitude;
  longitude;
  weather;

  constructor (latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  async run() {
    console.log(new Date().toISOString(), '[Test]', 'Running the test');

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${Config.OpenWeatherApiKey}`)
      .then(response => {
        this.weather = response.data;

        console.log(`Get weather`, this.weather);
        this.render();
      })
      .catch(error => console.error(error));
  }

  render() {
    document.getElementById('city').innerHTML = `${this.weather.name}, ${this.weather.sys.country}`;
    document.getElementById('date').innerHTML = `${new Date().toDateString()}`;
    document.getElementById('temp').innerHTML = 
      `<span>Temp: </span>${Utilities.kelvinToFahrenheit(this.weather.main.temp).toFixed(1)}°`;
    document.getElementById('feelsLike').innerHTML = 
      `<span>Feels Like: </span>${Utilities.kelvinToFahrenheit(this.weather.main.feels_like).toFixed(1)}°`;
    document.getElementById('minTemp').innerHTML = 
      `<span>Min: </span>${Utilities.kelvinToFahrenheit(this.weather.main.temp_min).toFixed(1)}°`;
    document.getElementById('maxTemp').innerHTML = 
      `<span>Max: </span>${Utilities.kelvinToFahrenheit(this.weather.main.temp_max).toFixed(1)}°`;
    document.getElementById('pressure').innerHTML = 
      `<span>Pressure: </span>${this.weather.main.pressure}hPa`;
    document.getElementById('humidity').innerHTML = 
      `<span>Humidity: </span>${this.weather.main.humidity}%`;
    document.getElementById('weather').innerHTML = 
      `<i class="wi wi-owm-${this.weather.weather[0].id}"></i><p class="weather">${this.weather.weather[0].description}`;
    document.getElementById('sunrise').innerHTML = 
      new Date(this.weather.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById('sunset').innerHTML = 
      new Date(this.weather.sys.sunset * 1000).toLocaleTimeString();

    let homeBtn = document.getElementById('homeBtn');
    if (this.weather.coord.lat.toFixed(1) === Constants.NashvilleCoordinates.Latitude.toFixed(1) &&
      this.weather.coord.lon.toFixed(1) === Constants.NashvilleCoordinates.Longitude.toFixed(1)) {
      homeBtn.innerText = 'Already Home';
      homeBtn.disabled = true;
    } else {
      homeBtn.innerText = 'Go Home';
      homeBtn.disabled = false;
    }
  }
}

export { WeatherController };