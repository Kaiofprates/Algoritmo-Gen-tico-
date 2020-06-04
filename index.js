const Rand  = require('./src/randomGene');
const Gene  = require('./src/Gene');

const distance = [
[0],
[20,0],
[50, 30, 0],
[45, 26, 30, 0],
[300, 130, 20, 40, 0],
[120, 700, 37, 500, 20, 0],
[245, 300, 290, 120, 300, 45, 0], 
[30, 120, 300, 30, 40, 90, 340, 0],
[50, 230, 130, 50, 90, 30, 20, 200, 0],
[120, 200, 200, 440, 500, 60, 70, 300, 120]
];

const gene  = new Gene(distance);

console.log(gene.sumPath(Rand()))


