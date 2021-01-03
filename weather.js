const weather = document.querySelector(".js-weather");

const API_KEY ="17e2c3a68816301ce54c5172e1d6504a";
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp}@${place}`;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handelGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}   

function handelGeoError(){
    console.log("Can't access geo location");
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handelGeoSuccess, handelGeoError);
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();