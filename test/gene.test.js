const Rand  = require('../src/randomGene');
const Gene = require('../src/distance');

const distance = [
    [0],
    [20,0],
    [20,30,0]
]

let gene = new Gene(distance);

function testRand(){
    let setRand = new Set(Rand())
    return setRand.size
}


test('Test randomic function', () => {
    expect(testRand()).toBe(9);
  });

test('Test Gene Class - Get Distance', () => {
    expect(gene.getDistance(0,1)).toBe(20);
  });

test('Test Gene Class - Get Path', () => {
    let {total} = gene.sumPath([0,1,2])
    expect(total).toBe(50);
  });