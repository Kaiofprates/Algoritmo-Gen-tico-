(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * 
 * [  [ 4, 2, 0, 6, 3, 5, 1, 8, 7],
      [ 5, 1, 8, 6, 0, 3, 7, 2, 4] ]
 */

 /**
  * Retorna um array de tres numeros aleatórios e únicos
  */
function selectRandom(n){
    let res = [];

    while(res.length < n ){
        let rand = Math.floor(Math.random() * 9 + 0)
        if(res.indexOf(rand) == -1){
        res.push(rand)}
    }
    
    return res

};
/**
 * retorna metade os genes de um individuo
 */
function fatherGens(res, individual){
    let child  = [];

    for(let i = 0; i < 9; i++){
        if( res.indexOf(i) > -1 ){
            child.push(individual[i])
        }else{
            child.push(NaN)
        }
    }
  
    return child
}

/**
 * Retorna a localização dos genes do pai na cadeia de dna da mae
 */
function motherGens(father, mother){
    
    let result = []
    mother.forEach((e,i,a) => {
        if(father.indexOf(father[i]) > -1){
            result.push(i)
        }
    });
    
    return result
}

/**
 * Geração de novo individuo
 */

function makeChild(rand, father, mother){

    let aux = [];

    mother.forEach((e,i,a)=>{
        if(father.indexOf(e) > -1 ){
        aux.push(NaN)
        }else{
        aux.push(e)
        }
    });

    let res = []


    for( let i = 0; i <= 9; i++){
        if(!isNaN(father[i])){
            res.push(father[i])
        }
        if(!isNaN(aux[i])){
           res.push(aux[i])
        }
    }

    return {
        m: aux,
        ind: res
    }

 }


 module.exports = function(father, mother){
   let rand  =  selectRandom(4)
   father = fatherGens(rand, father)
   mother =  makeChild(rand,father,mother).m
   result =  makeChild(rand,father,mother).ind
   return { child : result}
 }
},{}],2:[function(require,module,exports){
/**
 * Método de Seleção por torneio 
 * Inicio
k = 0.75
Repita N vezes
Escolha 2 indivíduos da população aleatoriamente
r = valor aleatório entre 0 e 1
Se r < k
O melhor indivíduo é escolhido
Senão
O pior indivíduo é escolhido
Fim se
Fim Repita
Fim
 */


module.exports = function(population, sum, n){

    let k = 0.75
    let geration = [] 

    for( let i = 0; i < n; i++){
        let choice  = Math.floor(Math.random() * population.length + 0)
        let r = Math.floor(Math.random() * 1 + 0)
        let one  = {
            individual: population[choice],
            fitnes: sum[choice]
        }
        let two  = {
           individual : population[choice - 1],
           fitnes: sum[choice - 1]
        } 

        if(r < k){
            if( one.fitnes > two.fitnes){
                geration.push(one.individual)
            }else{
                geration.push(two.individual)
            }
        }else{
            if( one.fitnes < two.fitnes){
                geration.push(one.individual)
            }else{
                geration.push(two.individual)
            }
        }
    }
    
    return geration; 


}
},{}],3:[function(require,module,exports){
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

},{"../Reproduction/Reproduction":1,"../Torneio/Torneio":2,"../src/Gene":4}],4:[function(require,module,exports){
const Rand  = require('./randomGene')


module.exports = class Gene{

    constructor(distance){
        this.distance = distance
    }

/**
*  obtains the distance between two cities
*/
    getDistance(a,b){
    let aux = [a,b].sort().reverse()
    return this.distance[aux[0]][aux[1]]
    }


/**
 * returns the sum of the entire path
 */    

    sumPath(gene){
    let fullDistance  = [];
    gene.forEach((e,i,a) => {
      let next = a[i+1]
      if(next){
       fullDistance.push(this.getDistance(e,next))  
    }  
    });  
    let dis =  fullDistance.reduce((a,b) => a + b)
    return {
        gene, 
        total: dis
    }
   }
/**
 * generate the first geration of individuals 
 */
   setGen(n){
       let population  = [];
       for(let i = 0; i < n; i++){
         let r = Rand();
         population.push(r)
       }
       return population
   }

}
},{"./randomGene":5}],5:[function(require,module,exports){
module.exports = function(){
    let res = [];

    while(res.length <= 9){
        let rand = Math.floor(Math.random() * 10 + 0)
        if(res.indexOf(rand) == -1){
        res.push(rand)}
    }
    
    return res

};


    
    
},{}]},{},[3]);
