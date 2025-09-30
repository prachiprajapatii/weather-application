let cityName = document.querySelector(".place");
let dateNdTime = document.querySelector(".date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".icon");
let w_temp = document.querySelector(".weather_temperature");
let w_temp_min = document.querySelector(".min");
let w_temp_max = document.querySelector(".max");
let feelsLike = document.querySelector(".feels_like");
let humidity = document.querySelector(".humidity");
let w_wind = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");
let search = document.querySelector(".search");

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
    console.log(curDate);
    // // const date = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    console.log(formatter);
    return formatter.format(curDate);
};

let city = "vadodara";

search.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
})


const getWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3801e31f8f3f360e18e869f4f14e2bff&units=metric`;
    try {
        const res = await fetch(url);
        const data = await res.json();
           console.log(data);

        const { main, name, weather, wind, sys, dt } = data;

        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateNdTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main; 
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        w_temp.innerHTML = `${main.temp}&#176`;
        w_temp_min.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_temp_max.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
        feelsLike.innerHTML = `${main.feels_like}&#176`;
        humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        pressure.innerHTML = `${main.pressure} hPa`

    } catch (error) {
        console.log(error);
    }
};
window.addEventListener("load", getWeatherData());
