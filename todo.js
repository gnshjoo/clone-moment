const toDoForm = document.querySelector(".js-toDoForm"),
    toDoinput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let idNumbers = 1;

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;
    idNumbers +=1;
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    li.id = newId; 
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoinput.value;
    paintToDo(currentValue);
    toDoinput.value = "";
}


function loadToDos(){
    const loadtoDos = localStorage.getItem(TODOS_LS);
    if(loadtoDos !== null){
        const parsedToDos = JSON.parse(loadtoDos);
        parsedToDos.forEach(toDo => {
            paintToDo(toDo.text);
        }); 
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();