export class Enemy extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
    console.log(scene);
      super(scene, x, y, "bot-evil");
      this.setDepth(2);
      this.targetX = 10000
      this.targetY = 10000
      this.busy = false;
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
        }
      }
      currEucl = Math.sqrt((this.x-this.targetX)*(this.x-this.targetX)+(this.y-this.targetY)*(this.y-this.targetY))

      let isMovingLeft = false;
      this.setFlipX(isMovingLeft)

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
        
        if(currEucl < 32)
        {
            this.busy = true;
            var minPos = 0;
            var minEucl = Math.sqrt((this.x-window.state.bots[0].x)*(this.x-window.state.bots[0].x) + (this.y-window.state.bots[0].y)*(this.y-window.state.bots[0].y))
            for (var i = 1; i < window.state.bots.length; i++)
            {
              var tempx = window.state.bots[i].x
              var tempy = window.state.bots[i].y
              var tempEucl = Math.sqrt((this.x-tempx)*(this.x-tempx) + (this.y-tempy)*(this.y-tempy))
              if(tempEucl < minEucl)
              {
                minPos = i;
                minEucl = tempEucl
              }
            }
            this.workingOn = window.state.bots[minPos];
            window.state.bots = window.state.bots.filter(x => x != this.workingOn);
            setTimeout(() => {
              this.workingOn.destroy();
              this.busy = false
              this.targetX = 10000
              this.targetY = 10000
            } ,500);
        }
    }
}