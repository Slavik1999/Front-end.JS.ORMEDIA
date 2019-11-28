var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if(ev.target.tagName === "LI") {
        ev.target.classList.toggle('checked');
    } else if(ev.target.tagName === "SPAN") {
        var div = ev.target.parentNode;
    div.remove();
    }
}, false);



function newElement() {
    var li = document.createElement('li');
    var inputText = document.getElementById('text').value;
    var inputTime = document.getElementById('time').value;
    li.innerHTML=inputText + " " + getTimer();
    if(inputText == "" || inputTime == "") {
        alert("Введите дело и время");
    } else {
        document.getElementById('list').appendChild(li);
    }
    document.getElementById('text').value = "";
    var span = document.createElement('SPAN');
    var txt = document.createTextNode("X");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
}


function getTimer(){
    var now = new Date();
    var newTime = new Date(document.getElementById('time').value);
    var diff = Math.ceil((newTime-now) / 1000);

    var days = Math.floor(diff / (60 * 60 * 24));
    var diff = diff % (60 * 60 * 24);

    var hours = Math.floor(diff / (60 * 60));
    var diff = diff % (60 * 60);

    var minutes = Math.floor(diff / 60);
    var diff = diff % 60;

    var seconds = diff;
    console.log(`${days}d ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`);

    return `${days}d ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
}

setInterval(getTimer,1000);
setInterval(()=> {
    console.log('lol');
    getTimer();
},1000);

function addZero(num){
    if(num <= 9){
        num= "0" + num;
    }
    return num;
}

/*
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var now = new Date();
    var newTime = new Date(document.getElementById('time').value);
    var diff = Math.ceil((newTime-now) / 1000);

    var days = Math.floor(diff / (60 * 60 * 24));
    var diff = diff % (60 * 60 * 24);

    var hours = Math.floor(diff / (60 * 60));
    var diff = diff % (60 * 60);

    var minutes = Math.floor(diff / 60);
    var diff = diff % 60;

    var seconds = diff;
    
    function updateClock() {
        var t = getTimeRemaining(endtime);

        days.innerHTML = t.days;
        hours.innerHTML = ('0' + t.hours).slice(-2);
        minutes.innerHTML = ('0' + t.minutes).slice(-2);
        seconds.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
        clearInterval(timeinterval);
        }
    }
    
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline=document.getElementById('time').value;; //for Ukraine
    var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
    initializeClock('list', deadline);
*/