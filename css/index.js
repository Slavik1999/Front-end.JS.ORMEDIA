let tableList = document.getElementById("items");
let addBtn = document.getElementById("btn")

let pointDeparture= document.getElementById("pointDeparture")
let pointArrival= document.getElementById("pointArrival")
let depatureTime = document.querySelectorAll("input")[0]
let arrivalTime = document.querySelectorAll("input")[1]
let dayTrip = document.querySelectorAll("input")[2]
let methodTansportation= document.getElementById("methodTansportation")
let costTrip = document.querySelectorAll("input")[3]

let transport = [];
let arrayData = [];
let arr = function addToArr(array){
    array.push(pointDeparture.value, pointArrival.value, depatureTime.value, arrivalTime.value, dayTrip.value, methodTansportation.value, costTrip.value );
}

let itemId = 0;

function add(){
    arr(arrayData);
    localStorage.setItem("tripInfo", JSON.stringify(arrayData));
}

function create(){
    li = document.createElement("li");
    li.id = `trip${itemId}`;
    arrayData = JSON.parse(localStorage.getItem("tripInfo"))
    li.innerHTML = `Точка отправления: ${arrayData[0]} <br>
    Место прибытия: ${arrayData[1]} <br>
    Время отправления: ${arrayData[2]} <br>
    Время прибытия: ${arrayData[3]} <br>
    День поездки: ${arrayData[4]} <br>
    Способ перевозки: ${arrayData[5]} <br>
    Стоимость поездки: ${arrayData[6]} USD or ${arrayData[6]*2} BYN  <br>
    <i class="fa fa-trash-o" id = "btnDelete${itemId}" onclick = "deletLi(this)" ></i>
    <i class="fa fa-star-o" id = "btnStar${itemId}" onclick = "favourites(this)" ></i>    
    `
    tableList.appendChild(li);
}

function addToTable(){
    itemId ++;
    add();
    create();
    arrayData = [];
}

function deletLi(e){
    e.parentNode.remove();
}

function favourites(e){
    console.log(e.parentNode);
}

