import { Constants, State } from "./state.js";
import { WeatherController } from "./weather/controller.js";
import { Cities } from "../api/cities.js";

class Controls {
  static leftArrowClick() {
    State.CurrentIndex--;
    if (State.CurrentIndex == 0)
    {
      document.getElementById("nav-left").disabled = true;
    }

    WeatherController.render(State.WeatherHistory[State.CurrentIndex]);
  }
  
  static async rightArrowClick() {
    State.CurrentIndex++;

    if (State.CurrentIndex < State.WeatherHistory.length)
    {
      WeatherController.render(State.WeatherHistory[State.CurrentIndex]);
      return;
    }

    let city = Cities[Math.floor(Math.random()*Cities.length)];

    let weather = new WeatherController(city.Name);
    weather.run();

    document.getElementById("nav-left").disabled = false;
  }

  static homeBtnClick() {
    State.CurrentLocation = Constants.Nashville;
    State.WeatherHistory = [];
    let weather = new WeatherController(State.CurrentLocation);
    weather.run();

    document.getElementById("nav-left").disabled = true;
  }

  static render() {
    let context = document.getElementById("controls");

    let navLeft = document.createElement("button");
    navLeft.onclick = () => this.leftArrowClick();
    navLeft.innerText = "«";
    navLeft.className = "btn";
    navLeft.id = "nav-left";
    navLeft.disabled = true;

    let navRight = document.createElement("button");
    navRight.onclick = () => this.rightArrowClick();
    navRight.innerText = "»";
    navRight.className = "btn";
    navRight.id = "nav-right";

    let homeBtn = document.createElement("button");
    homeBtn.onclick = () => this.homeBtnClick();
    homeBtn.innerText = "Already Home";
    homeBtn.className = "btn";
    homeBtn.id = "homeBtn";

    context.appendChild(navLeft);
    context.appendChild(homeBtn);
    context.appendChild(navRight);
  }
}

export { Controls };