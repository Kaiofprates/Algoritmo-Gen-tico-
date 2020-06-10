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