const Rand  = require('./src/randomGene');
const Gene  = require('./src/Gene');

const Select  = require('./seleção/Select');
const Torneio  = require('./Torneio/Torneio')

const Reproduction = require('./Reproduction/Reproduction')

const Mutation  = require('./Mutation/mutation')

const distance = [
[0],
[1,0],
[50, 1, 0],
[45, 26, 1, 0],
[300, 130, 20, 1, 0],
[120, 700, 37, 500, 1, 0],
[245, 300, 290, 120, 300, 1, 0], 
[30, 120, 300, 30, 40, 90, 1, 0],
[50, 230, 130, 50, 90, 30, 20, 1, 0],
[120, 200, 200, 440, 500, 60, 70, 300, 1, 0]
];

const gene  = new Gene(distance);

//console.log(gene.sumPath(Rand()))

const ind  = 80 
const taxa  = 30
const generation  = 5

let population  = gene.setGen(ind);

function newGeneration(p){
let pop  = [];
let fitnes = p.map((e) => gene.sumPath(e).total)

while(pop.length !== ind){
    let champions = Torneio(population,fitnes,5)
    const validate  = champions[0] && champions[1]
    if(validate){
        pop.push(Reproduction(champions[0], champions[1]))
    }
}
return Mutation(pop, taxa)
}

function nextGeneration(p){
    let pop = [];
    let fitnes = p.map((e) => gene.sumPath(e).total)

    while(pop.length !== 40){
        let champions = Select(population,fitnes)
        if(champions){
            pop.push(champions)
        }
    }
    return Mutation(pop, taxa)
}


function show (e){
    if( gene.sumPath(e).total <= 9 ){
        return console.log(`${gene.toChar(e)} --------------------------------------------------------------- individuo encontrado!`)
    } else{
        console.log(`
        ${gene.toChar(e)} ------ ${gene.sumPath(e).total}
        `)
    }
    
}


function runModel(){
  for( let i  = 0; i < generation  ; i ++ ){
      population.map(show);
      population = newGeneration(population) 
  }
}
runModel()
