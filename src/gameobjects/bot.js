export class Bot extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
    console.log(scene);
      super(scene, x, y, "bot-right");
      this.setDepth(2);
    }

    update() {
        let isMovingLeft = false;
        this.setFlipX(isMovingLeft)
        this.x += 1;
    }
  }