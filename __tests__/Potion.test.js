const Potion = require('../lib/Potion.js');

test('creates a helath potion object', () => {
    const potion = new Potion();

    //expect the potion name to be a string...
    expect(potion.name).toEqual(expect.any(String));
    //...with more than 0 characters...
    expect(potion.name.length).toBeGreaterThan(0);
    //...and any value
    expect(potion.value).toEqual(expect.any(Number));
})