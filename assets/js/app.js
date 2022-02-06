"use strict";
const main = document.querySelector('.main');
const back_icon = document.querySelector('.back-icon');
const enter_city = document.querySelector('.Enter-city');
const get_city = document.querySelector('.get-btn');
const info_txt = document.querySelector('.info-txt');
const img = document.querySelector('.weather_img');
//--------- search city ---------------------------------------------------
const apiKey = '94ed61b10959d4c04998c5afb0b7d527';
enter_city.addEventListener('keydown',(e) => {
    if (e.target.value != "" && e.code == 'Enter' || e.code == 'NumpadEnter'){
        getCity(e.target.value);
        e.target.value = "";
    };
})
function getCity(input_value) {
    const cityName = input_value;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    info_txt.textContent = 'Geting Weather details...';
    info_txt.classList.add('pending');

    fetch(api,{method: "GET"})
        .then(respon => {return respon.json()})
        .then(data => weatherDetail(data))
}
//--------- get city ---------------------------------------------------
get_city.addEventListener('click',() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(navSuccess,navEror);
    }else{
        alert('your browser not support location !');
    }
})
function navSuccess(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`; 
    info_txt.textContent = 'Geting Weather details...';
    info_txt.classList.add('pending');

    fetch(api,{method: "GET"})
        .then(respon => {return respon.json()})
        .then(data => weatherDetail(data))
}
function navEror(err) {
    info_txt.textContent = err.message;
    info_txt.classList.add('error');
}

//------main code ---------------------------------------------
function weatherDetail(data) {
    if (data.cod == 404) {
        info_txt.textContent = `${data.message}`;
        info_txt.classList.replace('pending','error');
    }else{
        const city = data.name;
        const {country,sunset,sunrise} = data.sys;
        const {temp,humidity,feels_like} = data.main;
        const {description,id} = data.weather[0];

        info_txt.classList.remove('pending','error');
        main.classList.add('active');

        if (id >= 200 && id <= 232) {
            img.src = `assets/img/storm.svg`;
        }else if (id >= 300 && id <= 321) {
            img.src = `assets/img/rain.svg`;
        }else if (id >= 600 && id <= 622) {
            img.src = `assets/img/snow.svg`;
        }else if (id >= 701 && id <= 781) {
            img.src = `assets/img/haze.svg`;
        }else if (id >= 801 && id <= 804) {
            img.src = `assets/img/cloudy.svg`;
        }else if (id == 800) {
            img.src = `assets/img/clear.svg`;
        }
        document.querySelector('.numb').textContent = `${Math.round(temp)}° C`;
        document.querySelector('.description').textContent = description;
        document.querySelector('.country').textContent = `${city}, ${country}`;
        document.querySelector('.feels').textContent = `${Math.round(feels_like)}° C`;
        document.querySelector('.humidity').textContent = `${humidity} %`;
    }
}
//---- back icone ---------------------------
back_icon.addEventListener('click', () => {
    main.classList.remove('active');
})