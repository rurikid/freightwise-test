'use strict';

import { WeatherConfig } from "./config.js";
import { Utilities } from "../utilities.js";
import { Constants, State } from "../state.js";
import { Controls } from "../controls.js";

class WeatherController {
  city;
  weather;
  name;

  constructor (city) {
    this.city = city;
  }

  async run() {
    console.log(new Date().toISOString(), '[Test]', 'Running the test');

    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=5&appid=${WeatherConfig.ApiKey}`)
      .then(cityResponse => {

        let cityData = cityResponse.data[0];

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${WeatherConfig.ApiKey}`)
        .then(response => {
          this.weather = response.data;
  
          State.WeatherHistory.push(response.data);
          State.CurrentLocation = this.city;
  
          WeatherController.render(this.weather);
        })
        .catch(error => console.error(error));

      });
  }

  static render(weather) {
    document.getElementById('city').innerHTML = `${weather.name}, ${weather.sys.country}`;
    document.getElementById('date').innerHTML = `${new Date().toDateString()}`;
    document.getElementById('temp').innerHTML = 
      `<span>Temp: </span>${Utilities.kelvinToFahrenheit(weather.main.temp).toFixed(1)}°`;
    document.getElementById('feelsLike').innerHTML = 
      `<span>Feels Like: </span>${Utilities.kelvinToFahrenheit(weather.main.feels_like).toFixed(1)}°`;
    document.getElementById('minTemp').innerHTML = 
      `<span>Min: </span>${Utilities.kelvinToFahrenheit(weather.main.temp_min).toFixed(1)}°`;
    document.getElementById('maxTemp').innerHTML = 
      `<span>Max: </span>${Utilities.kelvinToFahrenheit(weather.main.temp_max).toFixed(1)}°`;
    document.getElementById('pressure').innerHTML = 
      `<span>Pressure: </span>${weather.main.pressure}hPa`;
    document.getElementById('humidity').innerHTML = 
      `<span>Humidity: </span>${weather.main.humidity}%`;
    document.getElementById('weather').innerHTML = 
      `<i class="wi wi-owm-${weather.weather[0].id}"></i><p class="weather">${weather.weather[0].description}`;
    document.getElementById('sunrise').innerHTML = 
      new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById('sunset').innerHTML = 
      new Date(weather.sys.sunset * 1000).toLocaleTimeString();

    let homeBtn = document.getElementById('homeBtn');
    if (this.city === Constants.Nashville) {
      homeBtn.innerText = 'Already Home';
      homeBtn.disabled = true;

      State.CurrentIndex = 0;
      State.WeatherHistory = [];
    } else {
      homeBtn.innerText = 'Go Home';
      homeBtn.disabled = false;
    }
  }
}

export { WeatherController };