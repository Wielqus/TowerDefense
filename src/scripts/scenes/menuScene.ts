import Map from '../objects/Map'
import Monster from '../objects/Monster'
import Debug from '../objects/Debug'
import { maps } from '../../collections/Maps';
import { monsters } from '../../collections/Monsters'
import MonstersList from '../objects/MonstersList';
import IMonster from '../Interfaces/IMonster';
import WaveCreator from '../objects/WaveCreator';
import IMap from '../Interfaces/IMap';
import MapList from '../objects/MapsList';
import MapsList from '../objects/MapsList';
import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';

export default class MenuScene extends Phaser.Scene {



  constructor() {
    super({ key: 'MenuScene' })
  }

  preload() {

  }

  create() {
    //new MapsList(this,this.cameras.cameras[0].displayWidth / 2, 100)
    const container: GridSizer = new GridSizer(this, 100, 100, 600, 500, {
      column: 1,
      row: 1,
      anchor: {
        centerX: '50%+0',

        centerY: '50%+0',
      }
    })

    this.add.existing(container)

    const background = new RoundRectangle(this, 0, 0, 100, 100, 5, 0x4e342e);
    this.add.existing(background)
    container.addBackground(background)
    container.add(new MapsList(this, 0, 0), 0, 0)
    container.layout()
  }


  update(time, delta) {

  }
}
