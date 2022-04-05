//Character's purpose is to have Player and Enemy objects inherit its methods and should never be called on it's own
class Character{
    constructor(name = ''){
        //the name has a set default if no name is provided, and is set to an empty string
        this.name = name;
        //set player health between 95 and 105
        this.health = Math.floor(Math.random() * 10 + 95);
        //set player strength between 7 and 12
        this.strength = Math.floor(Math.random() * 5 + 7);
        //set player agility between 7 and 12
        this.agility = Math.floor(Math.random() * 5 + 7);
    };

    isAlive(){
        if(this.health === 0){
            return false;
        }
        return true
    };
    
    getHealth(){
        return `${this.name}'s health is now ${this.health}!`;
    };

    reduceHealth(health){
        this.health -= health;
    
        if(this.health < 0){
            this.health = 0;
        }
    };

    getAttackValue(){
        const min = this.strength - 5;
        const max = this.strength + 5;
    
        return Math.floor(Math.random() * (max-min) + min);
    };
}

module.exports = Character;

console.log(new Character().getHealth())