import { domStrings } from './views/domstrings';
import Weather from './models/Search';
import * as time from './models/Time';
import * as searchView from './views/searchView';


//Search button 
domStrings.button.addEventListener('click', function (e) {
  e.preventDefault()
  if (domStrings.input.value) {
    searchView.deleteError();
    searchView.deleteIcon();
    controlData(domStrings.input.value);
    searchView.clearInput();
  }
});


// State of the app
const state = {}


// Control and process weather-data
const controlData = async (input = 'Amsterdam') => {
  try {

    if (domStrings.input.value === "") {
      domStrings.city.textContent = 'Amsterdam'
      domStrings.city2.textContent = 'Amsterdam'
    }

    // Weather class instance
    state.weather = new Weather(input);
    await state.weather.getData();

    // City name
    const name = state.weather.city
    domStrings.city.textContent = name
    domStrings.city2.textContent = name

    // Dates of today and tomorrow
    const dateToday = searchView.getDate()[0]
    domStrings.day.textContent = dateToday;

    const dateTomorrow = searchView.getDate()[1]
    domStrings.day2.textContent = dateTomorrow;

    // Array of weather reports througout the day
    let list = state.weather.data.data.list

    //Weather icons
    const icon = list[0].weather[0].icon;
    domStrings.weatherIcon.insertAdjacentHTML('afterbegin', `<img src="http://openweathermap.org/img/w/${icon}.png">`);
    const icon2 = list[8].weather[0].icon;
    domStrings.weatherIcon2.insertAdjacentHTML('afterbegin', `<img src="http://openweathermap.org/img/w/${icon2}.png">`);

    // Temperatures of today and tomorrow
    state.tempC = list[0].main.temp;
    domStrings.temperature.textContent = Math.round(state.tempC) + ' \xB0' + "C";

    state.tempC2 = list[8].main.temp;
    domStrings.temperature2.textContent = Math.round(state.tempC2) + ' \xB0' + "C";

    //To Fahrenheit (?°C x 1.8) + 32 = ?°F
    state.tempF = (state.tempC * 1.8) + 32
    state.tempF2 = (state.tempC2 * 1.8) + 32

    // Weather condition description
    const forecast = list[0].weather[0].description;
    domStrings.foreCast.textContent = forecast.toLowerCase();
    const forecast2 = list[8].weather[0].description;
    domStrings.foreCast2.textContent = forecast2.toLowerCase();

    // Sunrise and sunset
    let sRise = time.convertTime(state.weather.data.data.city.sunrise);
    let sSet = time.convertTime(state.weather.data.data.city.sunset);
    domStrings.sunRise.textContent = `: today at ${sRise}(CEST)`;
    domStrings.sunSet.textContent = `: today at ${sSet}(CEST)`;

  } catch (error) {
    domStrings.errorMessage.textContent = 'Oooops something went wrong!';
  }

};

controlData();


//Toggle Celsius/Fahrenheit
const tempCF = [...document.querySelectorAll('.toggleCF')]
tempCF.forEach(temp => {
  temp.addEventListener('click', function (e) {

    if (domStrings.temperature.textContent.includes('C')) {
      domStrings.temperature.textContent = Math.round(state.tempF) + ' \xB0' + "F"
      domStrings.temperature2.textContent = Math.round(state.tempF2) + ' \xB0' + "F"
    } else if (domStrings.temperature.textContent.includes('F')) {
      domStrings.temperature.textContent = Math.round(state.tempC) + ' \xB0' + "C"
      domStrings.temperature2.textContent = Math.round(state.tempC2) + ' \xB0' + "C"
    }

  })
})

console.log(state)