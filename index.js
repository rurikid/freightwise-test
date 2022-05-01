/* provided js */

'use strict';

import { Test } from "./src/Test.js";
import { WeatherController } from "./src/weather/controller.js";
import { State } from "./src/state.js";

// Create the Test and add a button to the UI for running the test
const test = new Test();
const button = document.getElementById('button-container');
test.render(button);

const canvas = document.getElementById('canvas');
const weather = new WeatherController(State.CurrentLocation.Latitude, State.CurrentLocation.Longitude);

weather.run();
