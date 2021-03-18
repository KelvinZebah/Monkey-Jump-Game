var bananai,bananag,bananae,rocki, rockg, jungle, junglei, score, monkey,monkeyr,iground,gameova;
var RUN = "run";
var gameState = RUN;

function preload(){
  bananai = loadImage("banana.png");
  rocki = loadImage("stone.png");
  junglei = loadImage("jungle.jpg");
  gameova = loadImage("game_over_PNG57 (1).png")
  monkeyr = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
}

function setup() {
  
  jungle = createSprite(200,200,400,400);
  jungle.addImage(junglei);
  monkey = createSprite(50,350,20,20);
  monkey.addAnimation("monkeyr",monkeyr);
  monkey.scale = 0.1;
  createCanvas(400, 400);
  iground = createSprite(200,370,400,5)
  iground.visible = false;
  bananag = new Group();
  rockg = new Group();
  bananae = 0;
  score = 0;
}

function draw() {
  background(220);
  
  if(gameState === "run"){
    
    jungle.velocityX = -5;
    
    bananaf();
    rockf();
    
    if(jungle.x<=-100){
      jungle.x = width/2;
    }
    
    if(keyDown("space") && monkey.y >= 330){
      monkey.velocityY = -17; 
    }
    
    switch(score){
      case 30: monkey.scale = 0.12
        break;
      case 60: monkey.scale = 0.14
        break;
      case 100: monkey.scale = 0.16
        break;
      default: break;
    }
    
    if(World.frameCount % 10===0){
      score = score+1;
      //console.log(score)
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
    if(monkey.isTouching(bananag)){
    bananag.destroyEach();
    bananae = bananae+1;
  }
    if(monkey.isTouching(rockg)){
      monkey.scale = 0.1;
    }
    if(monkey.isTouching(rockg)&&monkey.scale===0.1){
      gameState = "stop";
      jungle.destroy();
      monkey.destroy();
      bananag.destroyEach();
      bananag.setVelocityXEach(0);
      rockg.destroyEach();
      rockg.setVelocityXEach(0);
      gameov = createSprite(200,200);
      gameov.addImage(gameova);
      gameov.scale = 0.2;
    }
  }
  monkey.collide(iground);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,250,50);
}

function bananaf(){
  if(World.frameCount%80===0){
    var banana = createSprite(400,200,20,20);
    banana.addAnimation("Banana",bananai);
    banana.scale = 0.05;
    banana.y = random(130,220);
    banana.velocityX = -5;
    bananag.add(banana);
    banana.lifetime = 100;
  }
}

function rockf(){
  if(World.frameCount%200===0){
    var rock = createSprite(400,350,20,20); 
    //rock.debug = true;
    rock.addAnimation("Stone",rocki);
    //rock.collide(iground);
    rock.scale = 0.25;
    rock.velocityX = -5;
    rock.setCollider("rectangle",0,0,300,300);
    rockg.add(rock);
  }
}
