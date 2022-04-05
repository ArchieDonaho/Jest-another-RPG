const { test, expect } = require('@jest/globals');
const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');
//mock the potion file
jest.mock('../lib/Potion.js');

test('creates an enemy object', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});

test("gets enemy's health value", () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

//run test to see if it correctly tells if enemy is alive or dead
test('checks if enemy is alive or not', () => {
    const enemy = new Enemy('goblin', 'sword');

    //check if enemy is alive
    expect(enemy.isAlive()).toBeTruthy();
    //set enemy health to 0
    enemy.health = 0;
    //ckeck if enemy is dead
    expect(enemy.isAlive()).toBeFalsy();
});

//verifies that a enemy's attack value is within range
test("gets enemy's attack value", () => {
    const enemy = new Enemy('goblin', 'sword');
    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

//test if the reduction of enemy health works properly
test("subtracts from enemy's health", () => {
    const enemy = new Enemy('goblin', 'sword');
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);

    expect(enemy.health).toBe(oldHealth - 5);

    enemy.reduceHealth(99999);

    expect(enemy.health).toBe(0);
});

test('gets a description of the enemy', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'))
    expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'))
})



