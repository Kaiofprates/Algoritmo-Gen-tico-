function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('#212732');
  translate(50,200)
  frameRate(6); 
            
  let cities  = randomDNA();
  
  for(let i = 0; i <= 9; i++){
   fill(cities[i] * 3, cities[i] * 28, 225) 
   
    ellipse(i * 33,cities[i] * 10, 25)
   textSize(30)
   let cit  = String.fromCharCode(cities[i] + 65); 
   text(cit, i * 35, -40) ;
  }
  
  
  
}



function randomDNA( ){
    let res = [];

    while(res.length <= 9){
        let rand = Math.floor(Math.random() * 10 + 0)
        if(res.indexOf(rand) == -1){
        res.push(rand)}
    }
    
    return res
}
