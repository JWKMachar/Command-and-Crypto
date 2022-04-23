import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
    constructor() {
      super({ key: 'PlayScene' });
    }
  
    preload() {
      this.load.image('star', '/static/sci-fi-tiles.png');
      this.load.image('bot-right', '/static/robot-right.png');
      this.load.image('bot-left', '/static/robot-left.png');
    }
  
    create() {
      //var sprite = this.PlayScene.create.sprite(32,32, '/static/robot-right.png')
      var bot = new Sprite(PlayScene, 50, 50, 'bot-right')
    }

  }

