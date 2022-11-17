var bg, backgroundImg;
var explosion, explosionImg;
var spaceShip, spaceShipImg;
var meteor, meteorImg1, meteorImg2, meteorGp;
var laser, laserImg, laserGP;
var gameOver, gameOverImg;
var restart, restartImg;
var score = 0;
var isShoot = false
var play = 1;
var end = 0;
var win = 2;
var gameState = play;


function preload() {

  explosionImg = loadImage("explosion.png");
  spaceShipImg = loadImage("spaceShip.png");
  meteorImg1 = loadImage("meteor1.png");
  meteorImg2 = loadImage("meteor2.png");
  laserImg = loadImage("laserbeam.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  backgroundImg = loadImage("background.jpg");

}

function setup() {
  createCanvas(700, 800);

  spaceShip = createSprite(350, 730, 50, 50);
  spaceShip.addImage("ship", spaceShipImg);
  spaceShip.scale = 0.5;
  spaceShip.debug = false
  spaceShip.setCollider("circle", 0, 0, 90)
  spaceShip.addImage("explosion", explosionImg)

  gameOver = createSprite(width / 2, height / 2 - 20, 50, 50);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false

  restart = createSprite(width / 2, height / 2 + 60, 50, 50);
  restart.addImage("restart", restartImg);
  restart.scale = 1;
  restart.visible = false;

  laserGP = new Group()
  meteorGp = new Group()
  
}

function draw() {
  background("blue")
  image(backgroundImg, 0, 0, width, height)

  if (meteorGp.isTouching(spaceShip)) {
    spaceShip.changeImage("explosion")
    gameState = end;
  }

  if (gameState === play) {
    if (keyIsDown(UP_ARROW) && this.spaceShip.y > 50) {
      spaceShip.y -= 5;
    }

    if (keyIsDown(DOWN_ARROW) && this.spaceShip.y < 740) {
      spaceShip.y += 5;
    }

    if (keyIsDown(RIGHT_ARROW) && this.spaceShip.x < 645) {
      spaceShip.x += 5;

    }

    if (keyIsDown(LEFT_ARROW) && this.spaceShip.x > 60) {
      spaceShip.x -= 5;
    }

    if(keyDown("space") && isShoot === false){
      laserShoot()
      isShoot = true;
      setTimeout(()=>{
        isShoot = false;
      },1000)
    }

    showMeteors()

    if (laserGP.isTouching(meteorGp)) {
      laserGP.overlap(meteorGp, function (collector, collected) {
        score += 5;
        collected.remove();
      })
    }
  }

  if (gameState === end) {
    gameOver.visible = true;
    restart.visible = true;
    meteorGp.setVelocityYEach(0)
    meteorGp.setLifetimeEach(-1)
    if (mousePressedOver(restart)) {
      reset()
    }
  }

  if (gameState === win) {
    spaceShip.velocityX = 0;
    spaceShip.velocityY = 0;
    meteorGp.setVelocityYEach(0)
    meteorGp.setLifetimeEach(-1)
  }

  if (score >= 500) {

    fill("white")
    textSize(35)
    textAlign(CENTER, TOP)
    text("você ganhou", width / 2, height / 2)
    gameState = win;
  }

  drawSprites()
  fill("white")
  textSize(25)
  textAlign(CENTER, TOP)
  text("pontuação:" + score, 70, 25)
}

function laserShoot() {
  if (keyDown("space")) {
    laser = createSprite(spaceShip.x, spaceShip.y, 11, 11)
    laser.addImage("laser", laserImg)
    laser.scale = 0.1;
    laser.velocityY = -15
    laser.lifetime = height / laser.velocityY
    laser.depth = spaceShip.depth - 1,
      laserGP.add(laser)
  }
}

function showMeteors() {

  if (frameCount % 15 === 0) {

    
    meteor = createSprite(random(50, 750), -50, 12, 12)
    meteor.velocityY = 3
    meteor.lifetime = 350
    meteorGp.add(meteor)
    //meteor.debug = true
    meteor.setCollider("circle",0,50,75)
    var sorteio = Math.round(random(1, 2))
    switch (sorteio) {
      case 1: meteor.addImage(meteorImg1)
        meteor.scale = random(0.1, 0.3);
        break;
      case 2: meteor.addImage(meteorImg2)
        meteor.scale = random(0.2, 0.4);
        break;
    }
  }
}

function reset() {
  gameState = play
  gameOver.visible = false;
  restart.visible = false;
  spaceShip.visble = true;
  spaceShip.changeImage("ship")
  meteorGp.destroyEach()
  spaceShip.x = 350;
  spaceShip.y = 730;
  score = 0;
}