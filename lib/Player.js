//import the potion constructor
const Potion = require('../lib/Potion')

//create a player using a provided name
function Player(name = ''){
    //the name has a set default if no name is provided, and is set to an empty string
    this.name = name;
    //set player health between 95 and 105
    this.health = Math.floor(Math.random() * 10 + 95);
    //set player strength between 7 and 12
    this.strength = Math.floor(Math.random() * 5 + 7);
    //set player agility between 7 and 12
    this.agility = Math.floor(Math.random() * 5 + 7);
    //set player inventory with 2 potions, one health and the other one random
    this.inventory = [new Potion('health'), new Potion()];
}


//create player.getStats() that returns an object with various player properties
Player.prototype.getStats = function(){
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

//create player.getInventory() returns the inventory array or false if empty
Player.prototype.getInventory = function(){
    //if there are items in the inventory, return that array
    if(this.inventory.length){
        return this.inventory;
    }
    //else, return false
    return false;
};

module.exports = Player;