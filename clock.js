const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const miniutes = date.getMinutes();
    const hours = date.getHours();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${miniutes < 10 ? `0${miniutes}` : miniutes}`;

}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();