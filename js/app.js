const api = 'e96ef467c8a3bfd7a93792647cf7f837';


const weatehrInfoSection = document.querySelector('.weather-info-part');
const searchCitySection = document.querySelector('.search-city');
const notFoundFunction = document.querySelector('.not-found');


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


async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather', city);
    if(weatherData.cod != 200){
        ShowdisplaySection(notFoundFunction);
        return
    }
    ShowdisplaySection(weatehrInfoSection);
}

function ShowdisplaySection(section){
        [weatehrInfoSection, searchCitySection, notFoundFunction].forEach(section => section.style.display = 'none');
    
    
    section.style.display = 'flex';

}