
import Map from '../objects/Map'
import EventDispatcher from '../EventDispatcher'
import WaveManager from '../objects/WaveManger'
import {monsters} from '../../collections/Monsters'
import Monster from '../objects/Monster'
import IMonster from '../Interfaces/IMonster'


export default class MainScene extends Phaser.Scene {
  map: Map
  emitter: EventDispatcher
  waveManager: WaveManager
  health: integer
 
  constructor() {
    super({ key: 'MainScene' })
    this.emitter = EventDispatcher.getInstance();
    this.health = 2000
    this.emitter.emit('changeHealth', this.health, this.health)
    
  }

  init(data) {
    this.map = new Map(this, data.map)
    this.waveManager = new WaveManager(this, this.map.mapData.waves, this.map)
    this.emitter.on('monsterFinished', (monster: IMonster) => {
      this.emitter.emit('changeHealth', this.health - monster.damage, this.health)
      this.health = this.health - monster.damage
    })
    
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
