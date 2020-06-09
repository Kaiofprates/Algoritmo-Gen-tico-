const Rand  = require('./src/randomGene');
const Gene  = require('./src/Gene');

const Select  = require('./seleção/Select');
const Torneio  = require('./Torneio/Torneio')

const Reproduction = require('./Reproduction/Reproduction')

const Mutation  = require('./Mutation/mutation')

const distance = [
[0],
[20,0],
[50, 30, 0],
[45, 26, 30, 0],
[300, 130, 20, 40, 0],
[120, 700, 37, 500, 20, 0],
[245, 300, 290, 120, 300, 45, 0], 
[30, 120, 300, 30, 40, 90, 40, 0],
[50, 230, 130, 50, 90, 30, 20, 20, 0],
[120, 200, 200, 440, 500, 60, 70, 300, 12, 0]
];

const gene  = new Gene(distance);

//console.log(gene.sumPath(Rand()))


let population  = gene.setGen(5);

let fitnes = population.map((e) => gene.sumPath(e).total)
console.log(population)
console.log( Mutation(population, 5))




// console.log(`
// ------------------------------escolhidos pelo metodo de Torneiro--------------------------------
// `)
// let champions = Torneio(population,fitnes,2)
// const validate  = champions[0] && champions[1]

// if(validate) console.log(`
// pai ----- ${gene.toChar(champions[0])}
// mae ----- ${gene.toChar(champions[1])}
// `)

// console.log(`
// ------------------------------Novo indivíduo ---------------------------------------------------
// `)

// if(validate) console.log(gene.toChar(Reproduction(champions[0], champions[1]).child))

// //console.log(gene.toChar())