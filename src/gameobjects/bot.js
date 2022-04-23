export class Bot extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
      super(scene, x, y, "bot-right");
    }

    update() {
        let isMovingLeft = flase;
        this.setFlipX(isMovingLeft)
        this.x += 1;
    }
  }