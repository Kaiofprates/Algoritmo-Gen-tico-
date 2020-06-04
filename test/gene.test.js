const Rand  = require('../src/randomGene')

function testRand(){
    let setRand = new Set(Rand())
    return setRand.size
}


test('Test randomic function', () => {
    expect(testRand()).toBe(9);
  });