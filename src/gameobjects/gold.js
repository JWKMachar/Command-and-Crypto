import * as Phaser from "phaser";

export class Gold extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
      super(scene, x, y, "gold");
      this.setDepth(0);
    }
  }