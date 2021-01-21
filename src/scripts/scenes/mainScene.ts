
import Map from '../objects/Map'
import EventDispatcher from '../EventDispatcher'


export default class MainScene extends Phaser.Scene {
  map: Map
  emitter: EventDispatcher
 
  constructor() {
    super({ key: 'MainScene' })
    this.emitter = EventDispatcher.getInstance();
  }

  init(data) {
    this.map = new Map(this, data.map)
    
  }

  preload() {
    this.emitter.emit("main_scene_preload", this)
  }

  create() {
    this.emitter.emit("main_scene_create", this)
 
  }

  update(time, delta) {
    this.emitter.emit("main_scene_update", this)
  }
}
