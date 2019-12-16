//Первый итератор
let randomGenerator = {
    [Symbol.iterator](){
        let count = 0;
        return{
            next(){
                let value = Math.ceil(Math.random() * 100);
                let done = count > 9;
                count += 1;
                return{value, done};
            }
        }
    }
}

for(let num of randomGenerator){
    console.log(num);
}

//Второй итератор 
class arrayIterator{
    constructor(array){
        this.array = array.map(item => item).sort();
        this.index = 0;
    }
    next(){
        let result = {value: undefined, done: true};
        if(this.index < this.array.length){
            result.value = this. array[this.index];
            result.done = false;
            this.index += 1;
        }
        return result;
    }
}

class taskList{
    constructor(){
        this.tasks = [];
    }
    addTasks(...tasks){
        this.tasks = this.tasks.concat(tasks);
    }
    [Symbol.iterator](){
        return new arrayIterator(this.tasks);
    }
}

let taskLists = new taskList();
taskLists.addTasks('First', 'Second', 'Third');

for (let task of taskLists){
    console.log(task);
}