import FpsText from '../objects/fpsText'
import Map from '../objects/Map'
import Monster from '../objects/Monster'
import Debug from '../objects/Debug'
import { maps } from '../../collections/Maps';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  controls: Phaser.Cameras.Controls.FixedKeyControl
  map: Map
  debug: Debug

  constructor() {
    super({ key: 'MainScene' })
    this.map = new Map(this, maps[0])
    this.debug = new Debug(this)
  }

  preload() {
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
    this.debug.create()
    this.debug.add(`Phaser v${Phaser.VERSION}`)
    this.debug.add(`fps: ${Math.floor(this.game.loop.actualFps)}`)
    this.debug.add("Map debug", "m", () => this.map.debugOn(), () => this.map.debugOff())
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

    new Monster(this, this.map.getRandomPath())
  }

  update(time, delta) {
    this.debug.set(1, `fps: ${Math.floor(this.game.loop.actualFps)}`)
    this.controls.update(50); //Update camera
    this.map.update()
    this.debug.update()
  }
}
