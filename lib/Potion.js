//create a potion object using a constructor funciton
function Potion(name) {
    this.types = ['strength', 'agility', 'health'];
    //set the name equal to the name passed through if name is truthy, 
    //...but if name is falsy, set it to a random index from the types array
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    //if it is a health potion, set the value between 30 and 40
    if(this.name === 'health'){
        this.value = Math.floor(Math.random() * 10 + 30);
    } else {
        //if it is not a health potion, set the value between 7 and 12
        this.value = Math.floor(Math.random() * 5 + 7);
    }
}

//export the potion object
module.exports = Potion;