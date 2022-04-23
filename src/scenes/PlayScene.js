import * as Phaser from "phaser";
import { Bot } from "../gameobjects/bot";
import { Gold } from "../gameobjects/gold";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
    this.CAMERA_SPEED = 10;
  }

  preload() {
    this.load.image("map", "/static/sci-fi-tiles.png");
    this.load.image("bot-right", "/static/robot-right.png");
    this.load.image("bot-left", "/static/robot-left.png");
    this.load.image("gold", "/static/gold.png");
    this.load.tilemapCSV("tilemap", "/static/tilemap.csv");
    window.state = {
      bots: [],
      gold: []
    }
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
    window.state.bots.push(newBot);
    this.add.existing(newBot);

    function addGold() {
      if (Math.floor(Math.random() * 25) == 1) {
        let mapSize = 64 * 32;
        let newX = Math.floor(Math.random() * mapSize);
        let newY = Math.floor(Math.random() * mapSize);
        let newGold = new Gold(this, newX, newY);
        window.state.gold.push(newGold);
        this.add.existing(newGold);
        console.log(`New gold located at x${newX}, y${newY}`);
      }
    }

    for (let i = 0; i < 25; i++) {
      let mapSize = 64 * 32;
      let newX = Math.floor(Math.random() * mapSize);
      let newY = Math.floor(Math.random() * mapSize);
      let newGold = new Gold(this, newX, newY);
      window.state.gold.push(newGold);
      this.add.existing(newGold);
    }

    this.time.addEvent({
      callback: addGold,
      callbackScope: this,
      delay: 100,
      loop: true,
    });
  }

  update() {
    window.state.bots.forEach((x) => x.update());
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
