module.exports = function(){
    let res = [];

    while(res.length < 9){
        let rand = Math.floor(Math.random() * 9 + 0)
        if(res.indexOf(rand) == -1){
        res.push(rand)}
    }
    
    return res

};


    
    