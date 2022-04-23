export class Bot extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
      super(scene, x, y, "bot-right");
      this.setDepth(2);
      this.targetX = 10000
      this.targetY = 10000
      this.busy = false;
      this.speed = 1;
      this.workingOn = undefined;
    }

    update() {
      this.speed = window.state.botSpeed
      if(this.busy) return;
      let found = window.state.gold.find(x => x.x == this.targetX && x.y == this.targetY);
      if(!found) {
          this.targetX = 10000;
          this.targetY = 10000;
      }
      //check nearest Gold Locations
      let currEucl = Math.sqrt((this.x-this.targetX)*(this.x-this.targetX)+(this.y-this.targetY)*(this.y-this.targetY))
      
      for (var i = 0; i < window.state.gold.length; i++)
      {
        var tempx = window.state.gold[i].x
        var tempy = window.state.gold[i].y
        var tempEucl = Math.sqrt((this.x-tempx)*(this.x-tempx)+(this.y-tempy)*(this.y-tempy))
        if(tempEucl < currEucl)
        {
          this.targetX = tempx
          this.targetY = tempy
        }
      }
      currEucl = Math.sqrt((this.x-this.targetX)*(this.x-this.targetX)+(this.y-this.targetY)*(this.y-this.targetY))

      //move robot
      let isMovingLeft = false;
      this.setFlipX(isMovingLeft)
      //this.x += 1;
      
      ///*
      var diffX = this.x - this.targetX
      var diffY = this.y - this.targetY
      if( diffX != 0 && diffY != 0)
      {
          if (Math.abs(diffX) > Math.abs(diffY))
          {
              if(diffX > 0)
              {
                  this.x -= this.speed;
                  isMovingLeft = false;
              }
              else
              {
                  this.x += this.speed;
                  isMovingLeft = true;
              }
          }
         else
         {
              if(diffY > 0)
              {
                  this.y -= this.speed;
              }
              else
              {
                  this.y += this.speed;
              }
          }
      }
      //*/

      if(currEucl < 32)
      {
        this.busy = true;
        var minPos = 0;
        var minEucl = Math.sqrt((this.x-window.state.gold[0].x)*(this.x-window.state.gold[0].x) + (this.y-window.state.gold[0].y)*(this.y-window.state.gold[0].y))

        for (var i = 1; i < window.state.gold.length; i++)
        {
          var tempx = window.state.gold[i].x
          var tempy = window.state.gold[i].y
          var tempEucl = Math.sqrt((this.x-tempx)*(this.x-tempx) + (this.y-tempy)*(this.y-tempy))
          if(tempEucl < minEucl)
          {
            minPos = i;
            minEucl = tempEucl
          }
        }
        this.workingOn = window.state.gold[minPos];
        window.state.gold = window.state.gold.filter(x => x != this.workingOn);
        setTimeout(() => {
          this.workingOn.destroy();
          window.state.goldCollected += 50;
          window.state.lifeTimeGold += 50;
          this.busy = false
          this.targetX = 10000
          this.targetY = 10000
        } ,2000);
        }
      }
}