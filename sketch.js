
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;

var backgroundImg;
var explosion, explosionImg;
var spaceShip, spaceShipImg;
var meteor, meteorImg1, meteorImg2;
var laser, laserImg;
var gameOver, gameOverImg;
var restart, restartImg


function preload(){

  explosionImg = loadImage("explosion.png");
  spaceShipImg = loadImage("spaceShip.png");
  meteorImg1 = loadImage("meteor1.png");
  meteorImg2 = loadImage("meteor2.png");
  laserImg = loadImage("laserbeam.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  backgroundImg= loadImage("background.jpg");

}

function setup() {
  createCanvas(1500, 700);
  engine = Engine.create();
  world = engine.world;
 
}

function draw() {
  
}