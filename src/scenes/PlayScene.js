import * as Phaser from "phaser";
import { Bot } from "../gameobjects/bot";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
    this.CAMERA_SPEED = 10;
  }

  preload() {
    this.load.image("map", "/static/sci-fi-tiles.png");
    this.load.image("bot-right", "/static/robot-right.png");
    this.load.image("bot-left", "/static/robot-left.png");
    this.load.tilemapCSV("tilemap", "/static/tilemap.csv");
    this.bots = [];
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
    this.cameras.main.setBounds(0, 0, 64 * 32, 64 * 32);
    const newBot = new Bot(this, 0, 200);
    this.bots.push(newBot);
    this.add.existing(newBot);
  }

  update() {
    this.bots.forEach(x => x.update())
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
