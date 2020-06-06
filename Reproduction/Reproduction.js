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

    // a  = mother
    // b = father
    // c = rand
    // variável provisória para fatiamento dos genes da mae  
    let aux = [];

    mother.forEach((e,i,a)=>{
        if(rand.indexOf(i) > -1){
        aux.push(NaN)
        }else{
        aux.push(e)
        }
    });

    let res = []


    for( let i = 0; i < 9; i++){
        if(!isNaN(father[i])){
            res.push(father[i])
        }else{
            res.push(aux[i])
        }
    }

    return {
        m: aux,
        ind: res
    }

 }


 module.exports = function(father, mother){
    console.log(father +'----' + mother)
   let rand  =  selectRandom(4)
   let initial = {
       father, 
       mother, 
       rand
   }
   father = fatherGens(rand, father)
   mother =  makeChild(rand,father,mother).m
   result =  makeChild(rand,father,mother).ind
   return {
       initial,
       father, 
       mother,
       result
   }
 }