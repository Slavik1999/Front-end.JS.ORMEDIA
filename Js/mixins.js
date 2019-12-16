//Наследство классов с миксинами
    
class Track{ 
    constructor(name){
        this.name = name;
    }
}

class PlayList{ 
    constructor(name){
        this.name = name;
    }
}

let nameMixin = {
    getName: function(){
        return this.name;
    }
}

let controlsMixin = {
    play: function(){
        console.log(this.name + ' started palying')
    }
}

Object.assign(Track.prototype, nameMixin, controlsMixin);
Object.assign(PlayList.prototype, nameMixin, controlsMixin);

let track = new Track('Cooltrack')
let playList = new PlayList('Coolplaylist')

console.log(track.getName());
console.log(playList.play());