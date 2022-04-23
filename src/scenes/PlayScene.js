import * as Phaser from "phaser";
import { BitcoinMarket } from "../gameobjects/bitcoinMarket";
import { Bot } from "../gameobjects/bot";
import { Enemy } from "../gameobjects/enemy";
import { Gold } from "../gameobjects/gold";
import { Shop } from "../gameobjects/shop";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
    this.CAMERA_SPEED = 10;
    this.handleMouseDown.bind(this);
    this.goldGUI = document.getElementById("gold");
    this.shopGui = document.getElementById("shop-container");
    this.marketGUI = document.getElementById("market-container");
    this.bitcoin = document.getElementById("bitcoin");
    this.b2g = document.getElementById("b2g")
    window.buyBitcoin = document.getElementById("buy-bitcoin");
    window.sellBitcoin = document.getElementById("sell-bitcoin")

    document.getElementById("shop-close").onclick = function () {
      window.state.shopGUIOpen = false;
    }

    document.getElementById("market-close").onclick = function () {
      window.state.marketGUIOpen = false;
    }

    window.scene = this;

    document.getElementById("farm-bot").onclick = this.buyBot;
    document.getElementById("bot-speed").onclick = this.buySpeed;
    document.getElementById("bitcoin-market").onclick = this.buyMarket;
    document.getElementById("bitcoin-container").onclick = this.buyBitcoin;
    document.getElementById("sell-bitcoin-container").onclick = this.sellBitcoin;
    document.getElementById("bot-defender").onclick = this.buyDefender;
  }

  buyBitcoin() {
    if(window.state.goldCollected > window.state.bitcoinToGoldFactor) {
      window.state.goldCollected -= window.state.bitcoinToGoldFactor;
      window.state.bitcoin += 1;
      window.state.marketGUIOpen = false;
    }
  }

  buyDefender() {
    if(window.state.goldCollected >= 2500) {
      window.state.goldCollected -= 2500;
      
    }
  }

  sellBitcoin() {
    if(window.state.bitcoin > 0) {
      window.state.bitcoin -= 1;
      window.state.goldCollected += window.state.bitcoinToGoldFactor;
      window.state.lifeTimeGold += window.state.bitcoinToGoldFactor;
      window.state.marketGUIOpen = false;
    }
  }

  preload() {
    this.load.image("map", "/static/sci-fi-tiles.png");
    this.load.image("bot-right", "/static/robot-right.png");
    this.load.image("market", "/static/market.png");
    this.load.image("bot-evil", "/static/Enemy-right.png");
    this.load.image("gold", "/static/gold.png");
    this.load.image("shop", "/static/shop.png");
    this.load.tilemapCSV("tilemap", "/static/tilemap.csv");
    window.state = {
      bots: [],
      gold: [],
      Enemy: [],
      shopGUIOpen: false,
      goldCollected: 1002,
      botSpeed: 1,
      lifeTimeGold: 100,
      marketGUIOpen: false,
      bitcoinToGoldFactor: 1000,
      bitcoin: 0
    };
  }

  buyMarket() {
    if(window.state.goldCollected >= 5000) {
      window.state.goldCollected -= 5000;
      const market = new BitcoinMarket(window.scene, 0, 0);
      window.state.market = market;
      window.scene.add.existing(market);
      window.state.shopGUIOpen = false;
    }
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
      window.state.botSpeed += 0.2;
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

    function adjustBitcoin() {
      let adjustment = Math.floor(Math.random() * 100);
      adjustment -= 40;
      window.state.bitcoinToGoldFactor += adjustment;
      window.buyBitcoin.innerText = window.state.bitcoinToGoldFactor;
      window.sellBitcoin.innerText = window.state.bitcoinToGoldFactor;
    }

      this.time.addEvent({
      callback: addGold,
      callbackScope: this,
      delay: 100,
      loop: true,
    });

    this.time.addEvent({
      callback: adjustBitcoin,
      callbackScope: this,
      delay: 2000,
      loop: true
    });

    this.input.on("pointerdown", this.handleMouseDown);

    this.active = false;
  }

  handleMouseDown() {
    if (!window.state.shop.placed) {
      window.state.shop.place();
    }
    if(window.state.market != undefined && !window.state.market.placed) {
      window.state.market.place();
    }
  }

  update() {
    this.goldGUI.innerText = "Gold: " + window.state.goldCollected;
    this.bitcoin.innerText = "Bitcoin: " + window.state.bitcoin;
    this.b2g.innerText = "Gold per bitcoin: " + window.state.bitcoinToGoldFactor;
    if (window.state.shopGUIOpen) {
      this.shopGui.style = "top: 0;";
    } else {
      this.shopGui.style = "top: -120vh;";
    }

    if (window.state.marketGUIOpen) {
      this.marketGUI.style = "top: 0;";
    } else {
      this.marketGUI.style = "top: -120vh;";
    }
    if (!window.state.shop.placed) {
      window.state.shop.update(
        this.input.mousePointer.worldX,
        this.input.mousePointer.worldY
      );
    }

    if(window.state.market != undefined && !window.state.market.placed) {
      window.state.market.update(
        this.input.mousePointer.worldX,
        this.input.mousePointer.worldY
      );
    }
    window.state.bots.forEach((x) => x.update());
    window.state.Enemy.forEach((x) => x.update());
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

    if(window.state.lifeTimeGold%400 == 0 && this.active ==false)
    {
      this.active = true;
      for(var i = 0; i < window.state.lifeTimeGold/400; i++)
      {
        const newEnemy = new Enemy(window.scene, 100, 100);
        window.state.Enemy.push(newEnemy);
        window.scene.add.existing(newEnemy);
      }
    }
    else
    {
      if ( window.state.lifeTimeGold%200 != 0){
        this.active = false;
      }
    }

  }
}