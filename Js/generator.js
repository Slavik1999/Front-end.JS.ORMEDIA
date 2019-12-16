    
    //Генератор произвольный
    function* generate(start, end){
        for (let i = start; i<= end; i++) yield i;
    }

    function* generateNum(){
        yield* generate(48, 57)
        yield* generate(65, 90)
        yield* generate(97, 122)
    }
    
    let str = "";

    for(let num of generateNum()){
        str += String.fromCharCode(num);
    }
    alert(str);

