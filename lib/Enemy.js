const Potion = require('./Potion');

function Enemy(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();

    this.health = Math.floor(Math.random() * 10 + 85);
    this.strength = Math.floor(Math.random() * 5 + 5);
    this.agility = Math.floor(Math.random() * 5 + 5);
};

//return true/false depending if Enemy is alive or dead
Enemy.prototype.isAlive = function() {
    if(this.health === 0){
        return false;
    }
    return true;
};

//return a string containing the condition of the Enemy's health
Enemy.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}`;
};

// generate a random value for the Enemy's attack
Enemy.prototype.getAttackValue = function(){
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max-min) + min);
};

//reduces the Enemy's health based on the value passed
Enemy.prototype.reduceHealth = function(health){
    this.health -= health;

    //set a limit on how low the health can go
    if(this.health < 0){
        this.health = 0;
    }
};

Enemy.prototype.getDescription = function(){
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
};




module.exports = Enemy;