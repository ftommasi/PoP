
function PoPGame (width,height,id,isServer,color){
    this.id =0; //may need id for plaryer AND game
    this.isServer=false; //prevent server from drawing
    this.playerList = [];
    this.stage = new PIXI.Container();
    this.localPlayer;
    this.renderer = PIXI.autoDetectRenderer(width,height,{backgroundColor : color});
    this.now=0;
    this.then=0;
    
}

PoPGame.prototype.getPlayerCount = function(){
    return this.playerList.length;
}


PoPGame.prototype.animate = function(){
    this.renderer.render(this.stage);
    
};

PoPGame.prototype.update = function(modifier,keysDown){
  var collision= false;
  var gravity = false;
   
    for(var item1 in this.playerList){
        for(var item2 in this.playerList){
            if(item1!==item2){
                if(this.playerList[item1].collision(this.playerList[item2])){
                    collision = true;
                }
            } 
          }
        }
 //Debug text TODO(front-end): remove when not needed before release
 // debugText1.setText('1 x: '+ this.playerList[0].sprite.x + ' y: '+ (this.playerList[0].sprite.y));
  //debugText2.setText('2 x: '+ this.playerList[1].sprite.x + ' y: '+ (this.playerList[1].sprite.y));        
  //END Debug
    //get keys and call corresponding function 
    if(38 in keysDown && !collision){ //up
        //HACK 
        //TODO(front-end): fix this collision work around
        this.localPlayer.sprite.old_y = this.localPlayer.sprite.y + 10;
        //end HACK
        if(!collision && this.localPlayer.y > this.localPlayer.max_height){
             this.localPlayer.moveY(-2,modifier);
             gravity = true;
        }
       
    }
    if(40  in keysDown && !collision){ //down
         //HACK 
        //TODO(front-end): fix this collision work around
        this.localPlayer.sprite.old_y = this.localPlayer.sprite.y - 10;
        //end HACK
        if(!collision){
            this.localPlayer.moveY(1,modifier);
        }
       
    }
    if (37  in keysDown && !collision){ // left
        //HACK 
        //TODO(front-end): fix this collision work around
        this.localPlayer.sprite.old_x = this.localPlayer.sprite.x + 10;
        //end HACK
        if(!collision){
            this.localPlayer.moveX(-1,modifier);
        }
            
    }
    if(39 in keysDown && !collision){ // right
        //HACK 
        //TODO(front-end): fix this collision work around
        this.localPlayer.sprite.old_x = this.localPlayer.sprite.x - 10;
        //end HACK
        if(!collision){
            this.localPlayer.moveX(1,modifier);
        }
    }
    
    if(gravity){
        //Gravity effect
        this.localPlayer.moveY(1,modifier);
        
    }
    if(collision){
        for(var i in this.playersList){
            if(this.playersList[i]!==this.localPlayer){
            
            this.localPlayer.max_height = this.localPlayer.y - 250;
             if(this.localPlayer.collisionLeft(this.playersList[i])){
                this.localPlayer.moveX(1,modifier);
               // gravity = false;
             }
              if(this.localPlayer.collisionRight(this.playersList[i])){
                this.localPlayer.moveX(-1,modifier);
               // gravity = false;
            }
             if(this.localPlayer.collisionBot(this.playersList[i])){
                this.localPlayer.moveY(-1,modifier);
                gravity = false;
            }
             if(this.localPlayer.collisionTop(this.playersList[i])){
                this.localPlayer.moveY(1,modifier);
                //gravity = false;
            }
       
        }
        
        collision = false;
        }
    }
   
    
};

PoPGame.prototype.updatePlayers = function(){
    //TODO(Fausto) implement
};

PoPGame.prototype.addPlayers = function(player){
    this.stage.addChild(player.sprite);
    this.playerList.push(player);
};

PoPGame.prototype.setLocalPLayer = function(player){
    //TODO(Fausto): implement with addPlayers()
    this.localPlayer = player;
   // this.addPlayers(player);
};
