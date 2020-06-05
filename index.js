const Rand  = require('./src/randomGene');
const Gene  = require('./src/Gene');

const Select  = require('./seleção/Select');
const Torneio  = require('./Torneio/Torneio')

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
[120, 200, 200, 440, 500, 60, 70, 300, 12]
];

const gene  = new Gene(distance);

//console.log(gene.sumPath(Rand()))


let population  = gene.setGen(20);

let fitnes = population.map((e) => gene.sumPath(e).total)

//console.log(Select(population,feling));
console.log(Torneio(population,fitnes, 2))