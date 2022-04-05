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

//return a string containing the condition of the player's health
Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}`;
};

//return true/false depending if player is alive or dead
Player.prototype.isAlive = function() {
    if(this.health === 0){
        return false;
    }
    return true;
};

//reduces the player's health based on the value passed
Player.prototype.reduceHealth = function(health){
    this.health -= health;

    //set a limit on how low the health can go
    if(this.health < 0){
        this.health = 0;
    }
};

// generate a random value for the player's attack
Player.prototype.getAttackValue = function(){
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max-min) + min);
};

//adds a potion to the player's inventory
Player.prototype.addPotion = function(potion){
    this.inventory.push(potion);
};

//uses a potion that a user selects
Player.prototype.usePotion = function(index){
    //grab the potion from the "index" and then splice that index and of the grabbed item(s), get index 0 (since there is only 1 item, all that is there is index 0)
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name){
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
    }
}

module.exports = Player;