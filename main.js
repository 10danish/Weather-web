const apiKey = 'EPgHroey2WvNhLbNdfIGZNprXXbvtePB'; 
// Function to fetch the location key
async function getLocationKey(city) {
    const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
    const response = await fetch(locationUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch location key');
    }
    const locationData = await response.json();
    return locationData[0].Key; // Assuming the first item in the response contains the location key
}

// Function to fetch the weather information using the location key
async function getWeatherInfo(locationKey) {
    const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;
    const response = await fetch(weatherUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    const weatherData = await response.json();
    return weatherData[0]; // Assuming the first item in the response contains the weather information
}

async function fetchWeather(city) {
    try {
        const locationKey = await getLocationKey(city);
        const weatherInfo = await getWeatherInfo(locationKey);
        const temper = weatherInfo.Temperature.Metric.Value;
        const wd = weatherInfo.Wind.Speed.Metric.Value;
        const hd = weatherInfo.RelativeHumidity;
        document.getElementById('ct').textContent=`${city}`;
        document.getElementById('temp').textContent=`${temper}°C`;
        document.getElementById('w').textContent=`${wd} km/h`;
        // document.getElementById('H').textContent=`${hd}%`;
        document.querySelector("#H").innerHTML=weatherInfo.RelativeHumidity+'%';//another way.
        const icon=document.querySelector('#wicon');
        if(weatherInfo.WeatherText=='Partly Sunny'|| weatherInfo.WeatherText=='Mist')
        {
            icon.src='images/mist.png'
        }
        if(weatherInfo.WeatherText=='Sunny'|| weatherInfo.WeatherText=='Clear'||weatherInfo.WeatherText=='Mostly clear'||weatherInfo.WeatherText=='Hazy sunshine')
        {
            icon.src='images/clear.png'
        }
        if(weatherInfo.WeatherText=='Cloudy'|| weatherInfo.WeatherText=='Mostly cloudy')
        {
            icon.src='images/clouds.png'
        }
        if(weatherInfo.WeatherText=='Light rain')
        {
            icon.src='images/drizzle.png'
        }
        if(weatherInfo.WeatherText=='Rain')
        {
            icon.src='images/rain.png'
        }
        if(weatherInfo.WeatherText=='Snow')
        {
            icon.src='images/snow.png'
        }
        console.log(weatherInfo);
    } catch (error) {
        console.error('Error:', error);
    }
}

var city;
document.getElementById('btn').onclick=function(){

    city=document.getElementById('city').value;
    fetchWeather(city);
}
