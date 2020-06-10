const Rand  = require('../src/randomGene');
const Gene = require('../src/Gene');
const Torneio  = require('../Torneio/Torneio');
const Roleta  = require('../seleção/Select');
const Reproduction = require('../Reproduction/Reproduction')

const distance = [
    [0],
    [20,0],
    [20,30,0]
]

let gene = new Gene(distance);
let population  = gene.setGen(20);
let fitnes  = [ 90, 100, 110, 120 ]


function testRand(){
    let setRand = new Set(Rand())
    return setRand.size
}

/**
 *  funções de  seleção: torneio e roleta
 */


test('Test randomic function', () => {
    expect(testRand()).toBe(10);
  });

test('Test Gene Class - Get Distance', () => {
    expect(gene.getDistance(0,1)).toBe(20);
  });

test('Test Gene Class - Get Path', () => {
    let {total} = gene.sumPath([0,1,2])
    expect(total).toBe(50);
  });

test('Test Selection with Roleta', () => {

  let select  = Roleta(population,fitnes);
  
  if( select ){
    expect(select.length).toBe(1)
  } else{
    expect(select).toBe(undefined)
  }

})  

test('Test Selecion with Torneio', ()=>{
  let select  = Torneio(population,fitnes,2);
  expect(select.length).toBe(2)
})


test('Test generation of new Child', ()=>{
  let { child }   = Reproduction([4,1,2,7,9,3,8,0,6,5],[4,1,2,7,9,3,8,0,6,5]);
  expect(child).toStrictEqual([4,1,2,7,9,3,8,0,6,5])
})