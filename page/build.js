const Gene  = require('../src/Gene');

const Torneio  = require('../Torneio/Torneio')

const Reproduction = require('../Reproduction/Reproduction')


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


let population  = gene.setGen(20);

let fitnes = population.map((e) => gene.sumPath(e).total)

let champions = Torneio(population,fitnes,2)


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('#212732');
  translate(50,200)
  frameRate(6); 
              
  if(champions[0] && champions[1]) cities  = (Reproduction(champions[0], champions[1]))

  for(let i = 0; i <= 9; i++){
   fill(cities[i] * 3, cities[i] * 28, 225) 
   
    ellipse(i * 33,cities[i] * 10, 25)
   textSize(30)
   let cit  = String.fromCharCode(cities[i] + 65); 
   text(cit, i * 35, -40) ;
  }
  
}
