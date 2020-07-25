//Create variables here
var database;
var dog,foodS,foodStock,dogIMG,happyDogIMG;
var foodS = 0;
function preload()
{
dogIMG=loadImage("images/dogImg.png")
happyDogIMG=loadImage("images/dogImg1.png")

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog=createSprite(250,300)
  dog.scale=0.15;
  dog.addImage(dogIMG)

  
  foodStock=database.ref('food');
  foodStock.on('value',readStock);
  foodS=20;
  
 console.log(foodS)
}


function draw() {  
  background(46,139,87);
  fill("black")
  text("Food Remaining: "+foodS,100,200)
if(keyWentDown(UP_ARROW)){
  
  writeStock(foodS)
  dog.addImage(happyDogIMG);

}

drawSprites();
  //add styles here
  textSize(20);
  /*fill("black")
  text("Food Remaining: "+foodStock,100,200);*/
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref("/").update({
    food:x
  })
}