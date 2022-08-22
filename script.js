// Time and Date
const location_button = document.querySelector('.location-button');
const location_name = document.querySelector('.location');

const date = new Date();
const date_dayname = document.querySelector('.date-dayname');
const date_day = document.querySelector('.date-day');
const options = {day: 'numeric', month: 'short', year: 'numeric'};

const current_day = document.querySelector('.current-day');
const second_day = document.querySelector('.second-day');
const third_day = document.querySelector('.third-day');
const fourth_day = document.querySelector('.fourth-day');

let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

date_dayname.textContent = date.toLocaleDateString('en-us', {  weekday: 'long' });
date_day.textContent = date.toLocaleDateString('en-us', options);

current_day.textContent = date.toLocaleDateString('en-us', {  weekday: 'short' });

let day = date.getDay();
if (day === 6) {
  day = 0;
  second_day.textContent = weekday[day];
  third_day.textContent = weekday[day + 1];
  fourth_day.textContent = weekday[day + 2];
}
else if (day === 5) {
  second_day.textContent = weekday[day + 1];
  day = 0;
  third_day.textContent = weekday[day];
  fourth_day.textContent = weekday[day + 1];
}
else if (day === 4) {
  second_day.textContent = weekday[day + 1];
  third_day.textContent = weekday[day + 2];
  day = 0;
  fourth_day.textContent = weekday[day];
}
else {
  second_day.textContent = weekday[day + 1];
  third_day.textContent = weekday[day + 2];
  fourth_day.textContent = weekday[day + 3];
}

// Weather

const weather_temp = document.querySelector('.weather-temp');
const current_day_temp = document.querySelector('.current-day_temp');
const precipitation_value = document.querySelector('.precipitation-value');
const humidity_value = document.querySelector('.humidity-value');
const wind_value = document.querySelector('.wind-value');
const weather_desc = document.querySelector('.weather-desc');
const weatherIcon = document.querySelector('.weather-icon');
const current_day_icon = document.querySelector('.current-day_icon');
const second_day_temp = document.querySelector('.second-day_temp');
const second_day_icon = document.querySelector('.second-day_icon');
const third_day_temp = document.querySelector('.third-day_temp');
const third_day_icon = document.querySelector('.third-day_icon');
const fourth_day_temp = document.querySelector('.fourth-day_temp');
const fourth_day_icon = document.querySelector('.fourth-day_icon');
let city_name = 'Kyiv';



location_button.addEventListener('click', () => {
    city_name = prompt('Enter your city: ');
    if (city_name === null || city_name === '') {
      let city_name_default = 'Kyiv';
      city_name = city_name_default;
    }
    location_name.textContent = city_name;
    getWeather();
});

async function getWeather() {  
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weather_temp.textContent = `${Math.round(data.main.temp)}°C`;
    current_day_temp.textContent = `${Math.round(data.main.temp)}°C`;
    precipitation_value.textContent = `${data.main.pressure} hPa`;
    humidity_value.textContent = `${data.main.humidity} % `
    wind_value.textContent = `${data.wind.speed} m/s`;

    let ffff = location_name.textContent;
    location_name.textContent = ffff + `, ${data.sys.country}`;

    let str = data.weather[0].description;
    str = str[0].toUpperCase() + str.slice(1);
    weather_desc.textContent = str;

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    current_day_icon.className = 'weather-icon owf';
    current_day_icon.classList.add(`owf-${data.weather[0].id}`);

    const url_f = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res_f = await fetch(url_f);
    const data_f = await res_f.json();
  
    second_day_temp.textContent = `${Math.round(data_f.list[9].main.temp)}°C`;
    second_day_icon.className = 'weather-icon owf';
    second_day_icon.classList.add(`owf-${data_f.list[9].weather[0].id}`);

    third_day_temp.textContent = `${Math.round(data_f.list[17].main.temp)}°C`;
    third_day_icon.className = 'weather-icon owf';
    third_day_icon.classList.add(`owf-${data_f.list[17].weather[0].id}`);

    fourth_day_temp.textContent = `${Math.round(data_f.list[25].main.temp)}°C`;
    fourth_day_icon.className = 'weather-icon owf';
    fourth_day_icon.classList.add(`owf-${data_f.list[25].weather[0].id}`);
  }
  catch {
    location_name.textContent = 'Error! Enter correct city!';
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
