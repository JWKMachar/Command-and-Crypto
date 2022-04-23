export class Defender extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
    console.log(scene);
      super(scene, x, y, "bot-defenderd");
      this.setDepth(2);
      this.targetX = 10000
      this.targetY = 10000
      this.busy = false;
      this.friendly = true;
    }
    update() 
    {
        if(this.busy) return;

        let found = window.state.bots.find(x => x.x == this.targetX && x.y == this.targetY);
        if(!found) {
            this.targetX = 10000;
            this.targetY = 10000;
        }

    
      let currEucl = Math.sqrt((this.x-this.targetX)*(this.x-this.targetX)+(this.y-this.targetY)*(this.y-this.targetY))
      for (var i = 0; i < window.state.bots.length; i++)
      {
        var tempx = window.state.bots[i].x
        var tempy = window.state.bots[i].y
        var tempEucl = Math.sqrt((this.x-tempx)*(this.x-tempx)+(this.y-tempy)*(this.y-tempy))
        if(tempEucl < currEucl)
        {
          this.targetX = tempx
          this.targetY = tempy
          this.friendly = true;
        }
      }


      currEucl = Math.sqrt((this.x-this.targetX)*(this.x-this.targetX)+(this.y-this.targetY)*(this.y-this.targetY))


      let isMovingLeft = false;
      this.setFlipX(isMovingLeft)

      let currEucl = Math.sqrt((this.x-this.targetX)*(this.x-this.targetX)+(this.y-this.targetY)*(this.y-this.targetY))
      for (var i = 0; i < window.state.Enemy.length; i++)
      {
        var tempx = window.state.Enemy[i].x
        var tempy = window.state.Enemy[i].y
        var tempEucl = Math.sqrt((this.x-tempx)*(this.x-tempx)+(this.y-tempy)*(this.y-tempy))
        if(tempEucl < currEucl)
        {
          this.targetX = tempx
          this.targetY = tempy
          this.friendly = false;
        }
      }

      currEucl = Math.sqrt((this.x-this.targetX)*(this.x-this.targetX)+(this.y-this.targetY)*(this.y-this.targetY))
      
      if(currEucl < 32)
      {
        if (this.friendly)
        {
            return;
        }
        else
        {
            var minPos = 0;
            var minEucl = Math.sqrt((this.x-window.state.Enemy[0].x)*(this.x-window.state.Enemy[0].x) + (this.y-window.state.Enemy[0].y)*(this.y-window.state.Enemy[0].y))
    
            for (var i = 1; i < window.state.Enemy.length; i++)
            {
              var tempx = window.state.Enemy[i].x
              var tempy = window.state.Enemy[i].y
              var tempEucl = Math.sqrt((this.x-tempx)*(this.x-tempx) + (this.y-tempy)*(this.y-tempy))
              if(tempEucl < minEucl)
              {
                minPos = i;
                minEucl = tempEucl
              }
            }
            this.workingOn = window.state.Enemy[minPos];
            window.state.gold = window.state.Enemy.filter(x => x != this.workingOn);
            setTimeout(() => {
              this.workingOn.destroy();
              this.busy = false
              this.targetX = 10000
              this.targetY = 10000
            }, 100);
        }

      }
        var diffX = this.x - this.targetX
        var diffY = this.y - this.targetY
        if( diffX != 0 && diffY != 0)
        {
            if (Math.abs(diffX) > Math.abs(diffY))
            {
                if(diffX > 0)
                {
                    this.x -= 1;
                    isMovingLeft = false;
                }
                else
                {
                    this.x += 1;
                    isMovingLeft = true;
                }
            }
           else
           {
                if(diffY > 0)
                {
                    this.y -= 1;
                }
                else
                {
                    this.y += 1;
                }
            }
        }
         
        

    }
}