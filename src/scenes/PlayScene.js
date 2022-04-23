import * as Phaser from "phaser";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
    this.CAMERA_SPEED = 10;
  }

  preload() {
    this.load.image("map", "/static/sci-fi-tiles.png");
    this.load.tilemapCSV("tilemap", "/static/tilemap.csv");
  }

  create() {
    const map = this.make.tilemap({
      key: "tilemap",
      tileWidth: 32,
      tileHeight: 32,
    });
    map.addTilesetImage("tilemap", "map", 16, 16);

    const layer = map.createLayer(0, "tilemap");
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, 64 * 32, 64 * 32)
  }

  update() {
    let camera = this.cameras.main;
    if (this.cursors.left.isDown) {
      camera.scrollX -= this.CAMERA_SPEED;
    } else if (this.cursors.right.isDown) {
      camera.scrollX += this.CAMERA_SPEED;
    }

    if (this.cursors.up.isDown) {
      camera.scrollY -= this.CAMERA_SPEED;
    } else if (this.cursors.down.isDown) {
      camera.scrollY += this.CAMERA_SPEED;
    }
  }
}
