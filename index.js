// localStorage.clear();
var list = document.querySelector('ul');
var data = [];
if(localStorage.getItem('timerArrayData')){
    data = JSON.parse(localStorage.getItem('timerArrayData'));
    console.log(data);
}
if(data){
    for(var i = 0; i< data.length; i++){
        data[i].time = dateParse(data[i].time);
        unloadElement(data[i]);
    }
}
list.addEventListener('click', function (ev) {
    if(ev.target.tagName === "LI") {
        ev.target.classList.toggle('checked');
    } else if(ev.target.tagName === "SPAN") {
        var div = ev.target.parentNode;
        var target = ev.target.parentNode.classList[0];
        var interval = data.find(item => target == item.element).intervalId;
        clearInterval(interval);
        data = data.filter(item => target != item.element);
        localStorage.setItem('timerArrayData', JSON.stringify(data, null, 2));
        console.log(data);
    div.remove();
    }
}, false);

function unloadElement(elementData){
    var li = document.createElement('li');
    li.classList.add(`item${elementData.index}`);
    updateElement(li, elementData.text, elementData.time);
    document.getElementById('list').appendChild(li);
}

function newElement() {
    var li = document.createElement('li');
    li.classList.add(`item${data.length}`);
    var inputText = document.getElementById('text').value;
    var inputTime = document.getElementById('time').value;
    var timerValue = new Date(document.getElementById('time').value);
    var timerData = {
        intervalId: '',
        index: data.length,
        element: li.classList[0],
        text: inputText,
        time: inputTime
    }
    data.push(timerData);
    localStorage.setItem('timerArrayData', JSON.stringify(data, null, 2));
    updateElement(li, inputText, timerValue);
    if(inputText == "" || inputTime == "") {
        alert("Введите дело и время");
    } else {
        document.getElementById('list').appendChild(li);
    }
   
}

function updateElement(element, inputText, timerValue){
    var intervalId = setInterval(() => {
        var timerElement = data.find(item => element.classList == item.element);
        data[timerElement.index].intervalId = intervalId;
        data[timerElement.index].time = getTimer(timerValue);
        localStorage.setItem('timerArrayData', JSON.stringify(data, null, 2));
        element.innerHTML=inputText + " " + getTimer(timerValue);
        console.log(localStorage.getItem('timerArrayData'));
        var span = document.createElement('SPAN');
        var txt = document.createTextNode("X");
        span.className = "close";
        span.appendChild(txt);
        element.appendChild(span);
    }, 1000);
}


function getTimer(newTime){
    var now = new Date();
    // var newTime = new Date(document.getElementById('time').value);
    var diff = Math.ceil((newTime-now) / 1000);

    var days = Math.floor(diff / (60 * 60 * 24));
    var diff = diff % (60 * 60 * 24);

    var hours = Math.floor(diff / (60 * 60));
    var diff = diff % (60 * 60);

    var minutes = Math.floor(diff / 60);
    var diff = diff % 60;

    var seconds = diff;
    // console.log(`${days}d ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`);

    return `${days}:${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
    // return `${days}:${(hours)}:${(minutes)}:${(seconds)}`


}

function dateParse(date){
    var dateArray = date.split(':');
    console.log(dateArray);
    var date = new Date();
    date.setSeconds(date.getSeconds()+ +dateArray[0] * 86400 + +dateArray[1] * 3600 + +dateArray[2] * 60 + +dateArray[3]);
    return date;
}

function addZero(num){
    if(num <= 9){
        num= "0" + num;
    }
    return num;
}

function saveElements(){
    console.log('lul');
}
