"use strict";
const enter_city = document.querySelector('.Enter-city');
const get_city = document.querySelector('.get-btn');
//--------- search city ---------------------------------------------------
const apiKey = '94ed61b10959d4c04998c5afb0b7d527';
enter_city.addEventListener('keydown',(e) => {
    if (e.code == 'Enter' || e.code == 'NumpadEnter') getCity(e.target.value);
})
function getCity(input_value) {
    const cityName = input_value;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(api,{method: "GET"})
        .then(respon => {return respon.json()})
        .then(data => {
            console.log(data);
            // const{temp,humidity,feels_like} = data.main;
            // console.log(temp);
        })
}
//--------- get city ---------------------------------------------------
get_city.addEventListener('click',() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(navSuccess,navEror);
    }
})

function navSuccess(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`; 

    fetch(api,{method: "GET"})
        .then(respon => {return respon.json()})
        .then(data => {
            console.log(data);
            const{temp,humidity,feels_like} = data.main;
            console.log(temp);
        })
}
function navEror() {
    alert('pleaz Allow your location');
}
