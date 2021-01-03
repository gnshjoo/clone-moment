const form = document.querySelector(".js-form"),
    input = document.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault(); // enter 내용 사라지지 않음
    const currentValue = input.value;
    paintGreeing(currentValue);
    saveName(currentValue);

}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeing(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeing(currentUser);
    }
}

function init(){
    loadName();
}

init();