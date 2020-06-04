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