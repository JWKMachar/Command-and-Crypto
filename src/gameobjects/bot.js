export class Bot extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
      super(scene, x, y, "bot-right");
      this.setDepth(1);
    }

    update() {
        let isMovingLeft = false;
        this.setFlipX(isMovingLeft)
        this.x += 1;
    }
  }