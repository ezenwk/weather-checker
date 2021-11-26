const button = document.querySelector('.search-btn');
const searchBar = document.querySelector('#search-input');

const locationWeather = document.querySelector('.location-weather');

const fetchWeather = async () => {
    try {
        // fetch data using openweather api
        const city = document.querySelector('#search-input').value;
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=20fa4cff61bd954426c342a784d0f972`);
        const data = await res.json();
        console.log(data);

        const { name } = data;
        const { temp, humidity } = data.main;
        const { icon, main } = data.weather[0];
        const { speed } = data.wind;

        let displayWeather =
            // convert temp from kalvin to Celsius
            `<div class="main-info">
        <h2 class="location">${name}</h2>
        <div class="location-weather-info">
            <p class="temperature">${Math.floor(temp - 273)}°C</p>
            <span class="weather-icon">
                <figure>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
                </figure>
            </span>
        </div>
        </div>
        <div class="descriptive-info">
        <p class="weather-type"><b>Condition</b>: ${main}</p>
        <p class="humidity"><b>Humidity</b>: ${humidity}</p>
        <p class="wind"><b>Wind</b>: ${speed}km/h</p>
        </div>`

        // append information to the html
        locationWeather.innerHTML = displayWeather;


    } catch {
        console.log('could not fetch data');

        let displayMessage = `<h3 class="valid-message">&#9888; Please enter a valid City &#9888;</h3>`;

        locationWeather.innerHTML = displayMessage;
    }

}


button.addEventListener('click', fetchWeather);

searchBar.addEventListener('keyup', function (event) {
    console.log(event.key);
    if (event.key === 'Enter') {
        fetchWeather();
    }
})
