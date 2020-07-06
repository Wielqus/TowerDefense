import Map from '../objects/Map'
import Monster from '../objects/Monster'
import Tower from '../objects/Tower'
import Debug from '../objects/Debug'
import { maps } from '../../collections/Maps';
import {monsters} from '../../collections/Monsters'
import MonstersList from '../objects/MonstersList';
import IMonster from '../Interfaces/IMonster';
import WaveCreator from '../objects/WaveCreator';
import {towers} from '../../collections/Towers'
import TowerBuilder from '../objects/TowerLists'
import TowerButton from '../objects/TowerButton';
import TowerLists from '../objects/TowerLists';


export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  controls: Phaser.Cameras.Controls.FixedKeyControl
  monsters: Phaser.GameObjects.Group
  towers: Array<Tower>
  map: Map
  debug: Debug
  waveCreator: WaveCreator
  // towerBuilder: TowerBuilder
  towersList: TowerLists

  constructor() {
    super({ key: 'MainScene' })
    this.debug = new Debug(this)
  }

  init(data){
    this.map = new Map(this, data.map)
  }

  preload() {
    this.map.preload()
    for (let [key, monster] of Object.entries(monsters)) {
      this.load.spritesheet(monster.name, `./assets/monsters/${monster.source}`, {
        frameWidth: monster.width,
        frameHeight: monster.height
      })
    }
    for (let tower of Object.keys(towers)){
      this.load.image(towers[tower].name, `./assets/towers/${towers[tower].source}`)
      
    }
  }

  create() {
    this.map.create()
    this.debug.create()
    this.debug.add(`Phaser v${Phaser.VERSION}`)
    this.debug.add(`fps: ${Math.floor(this.game.loop.actualFps)}`)
    this.debug.add("Map debug", "m", () => this.map.debugOn(), () => this.map.debugOff())
    this.debug.add(`x: y: `)
    this.monsters = this.add.group();
    this.towers = []

    // Camera movement settings
    const controlConfig = {
      camera: this.cameras.main,
      left: this.input.keyboard.addKey('A'),
      right: this.input.keyboard.addKey('D'),
      up: this.input.keyboard.addKey('W'),
      down: this.input.keyboard.addKey('S'),
      speed: 0.5,
    };

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    this.waveCreator = new WaveCreator(this, this.map, this.cameras.cameras[0].displayWidth, this.cameras.cameras[0].displayHeight)
    this.towersList = new TowerLists(this, this.scale.width * 0 + 33, this.scale.height * 0.8, 1, towers)

    this.input.on('pointerdown', () => {
      this.debug.set(3, `x: ${this.input.x} y: ${this.input.y}`)
      if(this.towersList.currentTowerBtn && this.towersList.currentTowerBtn instanceof TowerButton){
        let tile = this.map.getTile(this.input.x, this.input.y)
        if(tile){
          let towerData = this.towersList.currentTowerBtn.towerData
          this.towers.push(new Tower(this, tile.pixelX, tile.pixelY, towerData))
          this.towersList.currentTowerBtn.deactivate()
        }
      }
    })  
 }

  update(time, delta) {
    this.debug.set(1, `fps: ${Math.floor(this.game.loop.actualFps)}`)
    this.controls.update(50); //Update camera
    this.map.update()
    this.debug.update()
    this.debug.setPosition(this.cameras.cameras[0].scrollX, this.cameras.cameras[0].scrollY)
    this.waveCreator.update()
    
    if (this.towers.length > 0 ){
      this.towers.forEach(tower => {
      tower.enemiesNearby(this.waveCreator.active_monsters)
    })
    }
    
  }
}
