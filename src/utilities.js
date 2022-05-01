class Utilities {
  static kelvinToFahrenheit(val) {
    return (((val - 273.15) * 9) / 5) + 32;
  }

  static kelvinToCelsius(val) {
    return val - 273.15;
  }
}

export { Utilities };