//import the potion constructor
const Potion = require('../lib/Potion');
//import the Character constructor
const Character = require('./Character');

//create a player using a provided name
class Player extends Character{
    constructor(name = ''){
        //call parent constructor and pass in the name given
        super(name);

        //set player inventory with 2 potions, one health and the other one random
        this.inventory = [new Potion('health'), new Potion()];
    };

    getStats(){
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };

    getInventory(){
        //if there are items in the inventory, return that array
        if(this.inventory.length){
            return this.inventory;
        }
        //else, return false
        return false;
    };

    addPotion(potion){
        this.inventory.push(potion);
    };

    usePotion(index){
        //grab the potion from the "index" and then splice that index and of the grabbed item(s), get index 0 (since there is only 1 item, all that is there is index 0)
        const potion = this.inventory.splice(index, 1)[0];
    
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
    
}

module.exports = Player;