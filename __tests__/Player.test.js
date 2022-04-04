//import the player constructor
const { test, expect } = require('@jest/globals');
const expectExport = require('expect');
const Player = require('../lib/Player');
//import the potion constructor
const Potion = require('../lib/Potion')
//set up the mock potion file for testing
jest.mock('../lib/Potion');
console.log(new Potion());

//check that a player() returns a player
test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expectExport(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );

});

//check that player.getStats() returns an object with 4 properties
test("gets player's stats as an object", () => {
    const player = new Player('Dave');


    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

//check that player.getInventory() returns an inentory
test('gets inventory form player or returns false', () => {
    const player = new Player('Dave');
    //expect an inventory containing an array
    expect(player.getInventory()).toEqual(expect.any(Array));

    //simulate an exmty inventory
    player.inventory = [];
    //now expect an empty inventory 
    expect(player.getInventory()).toEqual(false);
});