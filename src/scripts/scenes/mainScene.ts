import FpsText from '../objects/fpsText'
import Map from '../objects/Map'
import Monster from '../objects/Monster'
import { maps } from '../../collections/Maps';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  controls: Phaser.Cameras.Controls.FixedKeyControl
  map:  Map

  constructor() {
    super({ key: 'MainScene' })
    this.map = new Map(this, maps[0])
  }

  preload(){
    this.map.preload()
    Monster.getSprites().forEach(sprite => {
      this.load.spritesheet(sprite.name, sprite.source, {
        frameWidth: 32,
        frameHeight: 48
      })
    })
  }

  create() {
    this.map.create()
    // Camera movement settings
    const controlConfig = {
        camera: this.cameras.main,
        left: this.input.keyboard.addKey('A'),
        right: this.input.keyboard.addKey('D'),
        up: this.input.keyboard.addKey('W'),
        down: this.input.keyboard.addKey('S'),
        speed: 0.5
    };
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);


    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24
      })
      .setOrigin(1, 0)

      this.fpsText = new FpsText(this)  
      new Monster(this)
  }

  update() {
    this.fpsText.update(this.time) // Update Fps text
    this.controls.update(50); //Update camera
  
  }
}
