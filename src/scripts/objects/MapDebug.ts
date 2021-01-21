import IMap from '../Interfaces/IMap';
import { Scene, Tilemaps } from 'phaser';
import EventDispatcher from '../EventDispatcher'
import Map from '../objects/Map'
var easystarjs = require('easystarjs');

export default class MapDebug {
    scene: Scene
  graphics
  emitter: EventDispatcher
  map: Tilemaps.Tilemap
  paths: Array<Array<Phaser.Tilemaps.Tile>>

  constructor(scene: Scene, map: Tilemaps.Tilemap, paths: Array<Array<Phaser.Tilemaps.Tile>>) {
    this.map = map;
    this.scene = scene;
    this.paths = paths
    this.create()
  }


  preload() {

  }

  create() {
    this.graphics = this.scene.add.graphics();
    this.map.setLayer("Top")
  }


  debugOn() {
    this.drawPaths()
    this.overlayFields()
  }

  debugOff() {
    this.graphics.clear();
  }

  overlayFields() {
    this.map.setLayer("Top")
    this.map.forEachTile(tile => {
      let rect = new Phaser.Geom.Rectangle(tile.pixelX, tile.pixelY, tile.width, tile.height)
      this.graphics.lineStyle(1, 0x00000, 0.5)
      this.graphics.strokeRectShape(rect);
      if (tile.properties.start) {
        this.graphics.fillStyle(0x00FF00, 0.3)
        this.graphics.fillRectShape(rect);
      }
      else if (tile.properties.path) {
        this.graphics.fillStyle(0xFFFF00, 0.3)
        this.graphics.fillRectShape(rect);
      }
      else if (tile.properties.meta) {
        this.graphics.fillStyle(0xFF0000, 0.3)
        this.graphics.fillRectShape(rect);
      }
      else if (tile.properties.towerPlace) {
        this.graphics.fillStyle(0xEE82EE, 0.3)
        this.graphics.fillRectShape(rect);
      }
    })
  }

  drawPaths() {
    this.graphics.clear();
    this.paths.forEach(path => {
      let points: Array<integer> = [];

      path.forEach((tile, index) => {
        if (index !== 0) {
          let x = tile.pixelX + tile.width / 2
          let y = tile.pixelY + tile.height / 2
          let lastX = path[index - 1].pixelX + path[index - 1].width / 2
          let lastY = path[index - 1].pixelY + path[index - 1].height / 2
          var line = new Phaser.Curves.Line([lastX, lastY, x, y]);
          this.graphics.lineStyle(2, 0xffffff, 1);
          line.draw(this.graphics);
        }
      })



    })
  }

}
