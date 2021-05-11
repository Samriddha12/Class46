var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var hunters, hunter1, hunter2, hunter3, hunter4;

var track, hunter1_img, hunter2_img, hunter3_img, hunter4_img;

function preload(){
 
  B1_img = loadImage("B1.png");
  B2_img = loadImage("B2.png");
  B3_img = loadImage("B3.png");
  B4_img = loadImage("B4.png");
  //ground = loadAnimation("back1.jpg","back2.jpg");
  ground= loadImage("back1.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  
  
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
