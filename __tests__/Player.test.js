//import the player constructor
const { test, expect } = require('@jest/globals');
const { TestResult } = require('@jest/types');
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

test("gets player's health value", () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

//run test to see if it correctly tells if player is alive or dead
test('checks if player is alive or not', () => {
    const player = new Player('Dave');

    //check if player is alive
    expect(player.isAlive()).toBeTruthy();
    //set player health to 0
    player.health = 0;
    //ckeck if player is dead
    expect(player.isAlive()).toBeFalsy();
});

//test if the reduction of player health works properly
test("subtracts from player's health", () => {
    const player = new Player('dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

//verifies that a player's attack value is within range
test("gets player's attack value", () => {
    const player = new Player('Dave');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test('adds a potion to the inventory', () => {
    const player = new Player('Dave');
    //capture the current inventory size
    const oldCount = player.inventory.length;
    //add a potion to the inventory
    player.addPotion(new Potion());
    //compare the new and old inventory size
    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', ()=>{
    const player = new Player('Dave');
    //add 3 new potions to the user;s inventory
    player.inventory = [new Potion(), new Potion(), new Potion()];
    //record the current inventory size
    const oldCount = player.inventory.length;
    //have the player use a potion
    player.usePotion(1);
    expect(player.inventory.length).toBeLessThan(oldCount);
})