class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    hunter1 = createSprite(random(100,300),random(50,300));
    hunter1.addImage("hunter1",B1_img);
    hunter1.scale=0.5;
    hunter2 = createSprite(random(200,400),random(50,300));
    hunter2.addImage("hunter2",B2_img);
    hunter2.scale=0.5;
    hunter3 = createSprite(random(0,200),random(100,300));
    hunter3.addImage("hunter3",B3_img);
    hunter3.scale=0.5;
    hunter4 = createSprite(random(300,500),random(70,300));
    hunter4.addImage("hunter4",B4_img);
    hunter4.scale=0.5;
    hunters = [hunter1, hunter2, hunter3, hunter4];
  }

  play(){
    form.hide();
    
    Player.getHunterInfo();
    player.getHunterAtEnd();
    
    if(allPlayers !== undefined){
      background(0);
    //  image(ground, 0,displayHeight,displayWidth, displayHeight);

    image(ground, 0,0,displayWidth,displayHeight);
      //animation(ground,300,200);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;

        hunters[index-1].x = x;
        hunters[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          //cars[index - 1].shapeColor = "red";
          //camera.position.x = displayWidth/2;
          //camera.position.y = hunter[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3900){
      gameState = 2;
      player.rank +=1
      Player.updateHuntersAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}