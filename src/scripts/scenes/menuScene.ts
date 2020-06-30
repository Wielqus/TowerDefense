import Map from '../objects/Map'
import Monster from '../objects/Monster'
import Debug from '../objects/Debug'
import { maps } from '../../collections/Maps';
import {monsters} from '../../collections/Monsters'
import MonstersList from '../objects/MonstersList';
import IMonster from '../Interfaces/IMonster';
import WaveCreator from '../objects/WaveCreator';
import IMap from '../Interfaces/IMap';
import MapList from '../objects/MapsList';
import MapsList from '../objects/MapsList';

export default class MenuScene extends Phaser.Scene {
    


  constructor() {
    super({ key: 'MenuScene' })
  }

  preload() {

  }

  create() {
    new MapsList(this,this.cameras.cameras[0].displayWidth / 2, 100)
  }
  

  update(time, delta) {
    
  }
}
