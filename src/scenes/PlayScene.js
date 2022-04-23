import * as Phaser from "phaser";
import { Bot } from "../gameobjects/bot";
import { Gold } from "../gameobjects/gold";
import { Shop } from "../gameobjects/shop";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
    this.CAMERA_SPEED = 10;
    this.handleMouseDown.bind(this);
    this.goldGUI = document.getElementById("gold");
    this.shopGui = document.getElementById("shop-container");
    document.getElementById("shop-close").onclick = function () {
      window.state.shopGUIOpen = false;
    }

    window.scene = this;

    document.getElementById("farm-bot").onclick = this.buyBot;
    document.getElementById("bot-speed").onclick = this.buySpeed;


  }

  preload() {
    this.load.image("map", "/static/sci-fi-tiles.png");
    this.load.image("bot-right", "/static/robot-right.png");
    this.load.image("gold", "/static/gold.png");
    this.load.image("shop", "/static/shop.png");
    this.load.tilemapCSV("tilemap", "/static/tilemap.csv");
    window.state = {
      bots: [],
      gold: [],
      shopGUIOpen: false,
      goldCollected: 100
    };
  }

  buyBot() {
    if(window.state.goldCollected >= 100) {
      window.state.goldCollected -= 100;
      const newBot = new Bot(window.scene, window.state.shop.x, window.state.shop.y);
      window.state.bots.push(newBot);
      window.scene.add.existing(newBot);
      window.state.shopGUIOpen = false;
    }
  }

  buySpeed() {
    if(window.state.goldCollected >= 1000) {
      window.state.goldCollected -= 1000;
      window.state.botSpeed += 10;
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
    const newBot = new Bot(this, 200, 200);
    window.state.bots.push(newBot);
    this.add.existing(newBot);

    window.state.shop = new Shop(this, 200, 200);
    this.add.existing(window.state.shop);

    function addGold() {
      if (Math.floor(Math.random() * 25) == 1) {
        let mapSize = 64 * 32;
        let newX = Math.floor(Math.random() * mapSize);
        let newY = Math.floor(Math.random() * mapSize);
        let newGold = new Gold(this, newX, newY);
        window.state.gold.push(newGold);
        this.add.existing(newGold);
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

    this.input.on("pointerdown", this.handleMouseDown);
  }

  handleMouseDown() {
    if (!window.state.shop.placed) {
      window.state.shop.place();
    }
  }

  update() {
    this.goldGUI.innerText = "Gold: " + window.state.goldCollected;
    if (window.state.shopGUIOpen) {
      this.shopGui.style = "top: 0;";
    } else {
      this.shopGui.style = "top: -120vh;";
    }
    if (!window.state.shop.placed) {
      window.state.shop.update(
        this.input.mousePointer.worldX,
        this.input.mousePointer.worldY
      );
    }
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