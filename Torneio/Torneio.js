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