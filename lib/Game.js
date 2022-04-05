const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function(){
    //add the enemies
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    //keep track of which enemy the player is fighting by starting at 0
    this.currentEnemy = this.enemies[0];
    //prompt the user for their name to start the game
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        //destructure name from the prompt
        //"this" still refers to the game object, whereas we used a regular function, it would refer to the name
        .then( ({name}) => {
            //assign the name
            this.player = new Player(name);
            //then start the battle
            this.startNewBattle();
        })

};

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }

    console.log("Your stats are as follows:");
    //display the player stats as a table
    console.table(this.player.getStats());
    //let the user know who they are fighting
    console.table(this.currentEnemy.getDescription());
    //stat the battle
    this.battle();
};

Game.prototype.battle = function(){
    if(this.isPlayerTurn){
        //player turn
        //prompt the user to attack or use a potion
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            //destructure the action
            .then( ({action}) => {
                if(action === 'Use potion'){
                    //check the user's inventory
                    if(!this.player.getInventory()){
                        console.log("You don't have any potions!");
                        //end the round
                        return this.checkEndOfBattle();
                    }
                    //if there are potions, display themn to the user
                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            //display the potions using the getInventory method and the map function
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then( ({action}) => {
                            //use .split() to obtain the potion details, splitting from the ":"
                            const potionDetails = action.split(': ');
                            //apply the potion to the user
                            this.player.usePotion(potionDetails[0] - 1);
                            //let the user know what potion they used
                            console.log(`You used a ${potionDetails[1]} potion.`);
                            //end the round
                            this.checkEndOfBattle();
                        })
                } else {
                    //get the player's attack value
                    const damage = this.player.getAttackValue();
                    //and attack
                    this.currentEnemy.reduceHealth(damage);
                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    //display enemy health
                    console.log(this.currentEnemy.getHealth());
                    //end the round
                    this.checkEndOfBattle();
                }
            })
    } else {
        //enemy turn
        //get the enemy damage
        const damage = this.currentEnemy.getAttackValue();
        //and attack
        this.player.reduceHealth(damage);
        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        //display player health
        console.log(this.player.getHealth());
        //end the round
        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function(){
    //if the player and enemy are still alive...
    if(this.player.isAlive() && this.currentEnemy.isAlive()){
        //swap the turns
        this.isPlayerTurn = !this.isPlayerTurn;
        //and run another round
        this.battle();
    //if the player is alive but the enemy was defeated...
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()){
        console.log(`You've defeated the ${this.currentEnemy.name}`);
        //icrease the round number (move to the next enemy index)
        this.roundNumber++;
        //check to see if all enemies have been defeated
        if(this.roundNumber < this.enemies.length){
            //move to the next opponent
            this.currentEnemy = this.enemies[this.roundNumber];
            //start the next round
            this.startNewBattle();
        //if all enemies have been defeated...
        } else {
            console.log('You win!');
        }
    //if the player has been defeated...
    } else {
        console.log("You've been defeated!");
    }
};

module.exports = Game;