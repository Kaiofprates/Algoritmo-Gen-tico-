(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function(population, n){
    console.log('-------------------------------------------------------  Mutação')  

    let newPop  = population.map((e) => {
        let gene  = Math.floor(Math.random() * 10 + 0)
        let sort  = Math.floor(Math.random() * 100 + 0)

        if(sort <= n + 10){
            let b = e.splice( 0 , gene).sort()
            let a  = e.splice( 0, e.length)
            let c = [...a, ...b]
            return c 
        }else{
            return e
        }

    })
   
    return newPop
}
},{}],2:[function(require,module,exports){
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
   return result
 }
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
const Gene  = require('./src/Gene');

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

let ind  = 80 
let  taxa  = 30
let generation  = 5

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
//runModel()
let but  = document.getElementsByTagName('input') 
but[0].addEventListener('click', (e) => { alert('eita') }, false) 

},{"./Mutation/mutation":1,"./Reproduction/Reproduction":2,"./Torneio/Torneio":3,"./src/Gene":5}],5:[function(require,module,exports){
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

   toChar(n){
    return n.map((e) => String.fromCharCode(e + 65) ).join() ; 
   }

}
},{"./randomGene":6}],6:[function(require,module,exports){
module.exports = function(){
    let res = [];

    while(res.length <= 9){
        let rand = Math.floor(Math.random() * 10 + 0)
        if(res.indexOf(rand) == -1){
        res.push(rand)}
    }
    
    return res

};


    
    
},{}]},{},[4]);
