
import Map from '../objects/Map'
import EventDispatcher from '../EventDispatcher'
import WaveManager from '../objects/WaveManger'
import {monsters} from '../../collections/Monsters'


export default class MainScene extends Phaser.Scene {
  map: Map
  emitter: EventDispatcher
  waveManager: WaveManager
 
  constructor() {
    super({ key: 'MainScene' })
    this.emitter = EventDispatcher.getInstance();
    
    
  }

  init(data) {
    this.map = new Map(this, data.map)
    this.waveManager = new WaveManager(this, this.map.mapData.waves, this.map)
    
  }

  preload() {
    this.emitter.emit("main_scene_preload", this)
    for (let [key, monster] of Object.entries(monsters)) {
      this.load.spritesheet(monster.name, `./assets/monsters/${monster.source}`, {
        frameWidth: monster.width,
        frameHeight: monster.height
      })
    }
  }

  create() {
    this.emitter.emit("main_scene_create", this)
 
  }

  update(time, delta) {
    this.emitter.emit("main_scene_update", this)
  }
}
