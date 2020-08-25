import Map from '../objects/Map'
import Monster from '../objects/Monster'
import Tower from '../objects/Tower';
import Debug from '../objects/Debug'
import { maps } from '../../collections/Maps';
import { monsters } from '../../collections/Monsters'
import MonstersList from '../objects/MonstersList';
import IMonster from '../Interfaces/IMonster';
import WaveCreator from '../objects/WaveCreator';
import {towers} from '../../collections/Towers'
import {bullets} from '../../collections/Bullets'
import IBullet from '../Interfaces/IBullet'
import TowerButton from '../objects/TowerButton';
import UserInterface from '../objects/UserInterface';
import TowerMarker from '../objects/TowerMarker';
import { NamedModulesPlugin } from 'webpack';
import CollectionsList from '../objects/CollectionsList';
import TowerContextMenu from '../objects/TowerContextMenu';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  controls: Phaser.Cameras.Controls.FixedKeyControl
  monsters: Phaser.GameObjects.Group
  bullets: Phaser.GameObjects.Group
  towers: Array<Tower>
  map: Map
  debug: Debug
  waveCreator: WaveCreator
  towerMarker: TowerMarker | false
  correctPlace: boolean
  gold: number
  health: number
  goldText: Phaser.GameObjects.Text
  healthText: Phaser.GameObjects.Text
  UI: CollectionsList
  towerContextMenu: TowerContextMenu
 
  constructor() {
    super({ key: 'MainScene' })
    this.debug = new Debug(this)
    
  }

  init(data) {
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
    for (let tower of Object.keys(towers)) {
      this.load.image(towers[tower].name, `./assets/towers/${towers[tower].source}`)
    }
    for (let [key, bullet] of Object.entries(bullets)){
      this.load.image(bullet.name, `./assets/bullets/${bullet.source}`)
    }
  }

  create() {
    this.map.create()
    this.debug.create()
    this.debug.clear()
    this.debug.add(`Phaser v${Phaser.VERSION}`)
    this.debug.add(`fps: ${Math.floor(this.game.loop.actualFps)}`)
    this.debug.add("Map debug", "m", () => this.map.debugOn(), () => this.map.debugOff())
    this.debug.add(`x: y: `)
    this.bullets = this.add.group({runChildUpdate: true});
    this.towers = []
    this.gold = 500;
    this.health = 100;
    this.UI = new UserInterface()
    this.UI.setGold(this.gold);
    this.UI.setHealth(this.health);
    this.towerContextMenu = new TowerContextMenu();


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
    this.waveCreator = new WaveCreator(this, this.map, this.cameras.cameras[0].displayWidth - 200, 100)
    this.waveCreator.on('monsterFinish', (monster) => {
      this.health = this.health - 10
      this.UI.setHealth(this.health)
      if(this.health <= 0){
        this.game.events.emit('finish')
      }
    })
    this.waveCreator.on('monsterDeath', (monster) => {
      this.gold = this.gold + 10
      this.UI.setGold(this.gold);
    })
    

    this.input.on('pointermove', () => {
      const activeButton = this.UI.getActiveButton();
      if(activeButton && activeButton instanceof TowerButton){
        if(!this.towerMarker){
            this.towerMarker =  new TowerMarker(this, this.map, activeButton.towerData);
            this.towerMarker.on('place', (tiles) => {

              const correct = tiles.every(tile => {
                if (tile) {
                  return tile.properties.towerPlace === true;
                }
                return false;
              })

              if (correct) {
                const newTower = new Tower(this, (tiles[0].pixelX + tiles[1].pixelX + tiles[1].width) / 2, (tiles[0].pixelY + tiles[2].pixelY) / 2, activeButton.towerData, tiles)
                .on('towerDestroy', () => {
                  this.gold = this.gold + 10;
                  this.UI.setGold(this.gold);
                })
                .on('towerUpdate', () => {
                  this.gold = this.gold - 10;
                  this.UI.setGold(this.gold);
                })
                .on('towerClicked', (tower) => {
                  this.towerContextMenu.changeTower(tower);
                  this.towerContextMenu.setVisible();
                  this.towerContextMenu.updateText('hello');
                  this.towerContextMenu.setTowerName();
                  this.towerContextMenu.setImage();
                })
                this.towers.push(newTower);

                activeButton.deactivate();
                this.gold = this.gold - 10;
                this.UI.setGold(this.gold);
                this.towerMarker = false;
                
                tiles.forEach(tile => {
                  if (tile) {
                    return tile.properties.towerPlace = false;
                  }
                });
              }
            });
        }}
    });

    this.input.keyboard.on('keydown-' + 'ESC', () =>{ 
      const currentButton = this.UI.getActiveButton();
      if(currentButton instanceof TowerButton && this.towerMarker){
        this.towerMarker.destroy();
        this.towerMarker.towerImage.destroy();
        this.towerMarker = false;
        currentButton.deactivate();
      }
    }) 
     
 }

  update(time, delta) {
    this.debug.set(1, `fps: ${Math.floor(this.game.loop.actualFps)}`)
    this.controls.update(50); //Update camera
    this.map.update()
    this.debug.update()
    this.debug.setPosition(this.cameras.cameras[0].scrollX, this.cameras.cameras[0].scrollY)
    //this.waveCreator.update()
    if (this.towers.length > 0 && this.waveCreator.active_monsters.getLength() > 0) {
      this.towers.forEach(tower => {tower.update(time, delta, this.waveCreator.active_monsters, this.bullets) })
    }
}
}
