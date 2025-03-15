const api = 'e96ef467c8a3bfd7a93792647cf7f837';

// Get the all section part
const weatehrInfoSection = document.querySelector('.weather-info-part');
const searchCitySection = document.querySelector('.search-city');
const notFoundFunction = document.querySelector('.not-found');


// Get all specific for dynamic changes
const countryName = document.querySelector('.country-text');
const tempText = document.querySelector('.temp-value');
const conditionText = document.querySelector('.weather-condition-text');
const humidityValueText = document.querySelector('.humidity-value-text');
const windValueText = document.querySelector('.wind-value-text');
const weatherSummerImage = document.querySelector('.weather-summary-iamge');
const currentDateText = document.querySelector('.current-date-text');


document.getElementById('search-btn').addEventListener('click', function(){
    // get the city name from input filed
    const cityName= document.querySelector('.city-search-input-filed');
    if(cityName.value.trim() != ''){
       
        updateWeatherInfo(cityName.value);

        cityName.value = '';
        cityName.blur() 
    
    }
    
});
 
async function getFetchData(endPoint, city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${api}&units=metric`;
    const response = await fetch(apiUrl);
    
    return response.json();

}


function getWeatherIcon(id){
    if(id <= 232) return 'thunderstorm.svg';
    if(id <= 321) return 'drizzle.svg';
    if(id <= 531) return 'rain.svg';
    if(id <= 622) return 'snow.svg';
    if(id <= 800) return 'clear.svg';
    if(id <= 804) return 'clouds.svg';
    if(id <= 781) return 'atmosphere.svg';

    else return 'clouds.svg'
}

function getCurrentDate(){
    const currentDate = new Date();
    const option = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-GB', option)
}

async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather', city);
    if(weatherData.cod != 200){
        ShowdisplaySection(notFoundFunction);
        return
    }
    const{
        name: country,
        main: {temp, humidity},
        weather: [{id, main}],
        wind: {speed}
    } = weatherData;


    // Update on UI
    countryName.textContent = country;
    tempText.textContent = Math.round(temp);
    conditionText.textContent = main;
    humidityValueText.textContent = humidity;
    windValueText.textContent = speed + ' M/s';

    weatherSummerImage.src = `./assets/weather/${getWeatherIcon(id)}`
    currentDateText.textContent = getCurrentDate();
    

    ShowdisplaySection(weatehrInfoSection);
}

function ShowdisplaySection(section){
        [weatehrInfoSection, searchCitySection, notFoundFunction].forEach(section => section.style.display = 'none');
    
    
    section.style.display = 'flex';

}