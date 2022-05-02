/* provided js */

'use strict';

import { Controls } from "./src/controls.js";
import { WeatherController } from "./src/weather/controller.js";
import { Constants } from "./src/state.js";

// const controls = new Controls();
Controls.render();

const weather = new WeatherController(Constants.Nashville);
weather.run();