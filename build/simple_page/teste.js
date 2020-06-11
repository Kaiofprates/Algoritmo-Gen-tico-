let but  = document.getElementById('run') 
but.addEventListener('click', (e) => { runModel() }, false) 


let text  = document.getElementsByClassName('result')


function Rand(){
    let res = [];

    while(res.length <= 9){
        let rand = Math.floor(Math.random() * 10 + 0)
        if(res.indexOf(rand) == -1){
        res.push(rand)}
    }
    
    return res

};


class Gene{

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

function Torneio(population, sum, n){

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

function Mutation(population, n){
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


 function Reproduction(father, mother){
   let rand  =  selectRandom(4)
   father = fatherGens(rand, father)
   mother =  makeChild(rand,father,mother).m
   result =  makeChild(rand,father,mother).ind
   return result
 }

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
    
    // //console.log(gene.sumPath(Rand()))
    // let pop = document.getElementById('population')
    // pop.value = 20
    
    // let t  = document.getElementById('mutation')
    // t.value  = 40

    // let g = document.getElementById('generation')
    // g.value  = 5

    let ind  = 20 ;  
    let taxa  = 6 ;
    let generation = 10 ;
    let population = gene.setGen(ind) 

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
        let lista  = document.getElementsByTagName('ul')
        let li  = document.createElement('li') 

        if( gene.sumPath(e).total <= 9 ){
            li.className  = "list-group-item active"
            li.innerText = `${gene.toChar(e)} individuo encontrado!`
            lista[0].appendChild(li)

        } else{
            li.className  = "list-group-item disabled"
             li.innerText = ` \n  ${gene.toChar(e)} --------   ${gene.sumPath(e).total} `
             lista[0].appendChild(li)
        }    
    }
    
    
    function runModel(){

      for( let i  = 0; i < 20  ; i ++ ){
          population.map(show);
          population = newGeneration(population);
      }
    }

