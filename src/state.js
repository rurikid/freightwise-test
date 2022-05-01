const Constants = {
  NashvilleCoordinates: {
    Latitude: 36.162222,
    Longitude: -86.774444
  }
}

let State = {
  CurrentLocation: Constants.NashvilleCoordinates,
  WeatherHistory: []
}

export { State, Constants };