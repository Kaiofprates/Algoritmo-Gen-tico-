
/**
 * Definição de método de torneio
 * 
 * Inicio
 *   t = soma dos valores da aptição de todos os indivíduos da população 
 *
 *  repita N vezes para selecionar N indivíduos
 *                 r = valor aleatório entre  0 e T
 *                  percorra sequencialmente os indivíduos da população, acumulando  em S o valor de aptidão 
 *                 dos indivíduos já percorridos
 *                 se S > = r então 
 *                      Selecione o indivíduo concorrente
 *                 fim se
 * fim repita
 * 
 * fim
 * 
 */

 // espera receber um objeto população com o elemento total, 
 // um é consequentemente Object.values( população.total )

module.exports = function( population , sum ){

    let t  = sum.reduce((a,b) => a + b)
    let select  = []
    for( let i  = 0; i < population.length; i++ ){
        let r = Math.floor(Math.random() * 0 + t)
        let s  = population[i].total; 
        if( s >= r ){
            select.push(population[i].gene)
        }
    }

    return select; 
}