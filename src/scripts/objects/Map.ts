import IMap from '../Interfaces/IMap';
import { Tilemaps } from 'phaser';
import EventDispatcher from '../EventDispatcher'
import MapDebug from './MapDebug'
var easystarjs = require('easystarjs');

export default class Map {
  scene: Phaser.Scene
  mapData: IMap
  map: Tilemaps.Tilemap
  pathFinder
  paths: Array<Array<Phaser.Tilemaps.Tile>>
  graphics
  placedTurrets: any //?
  turretsTiles: Array<Tilemaps.Tile>
  startTiles: Array<Tilemaps.Tile>
  finishTiles: Array<Tilemaps.Tile>
  pathTiles: Array<Tilemaps.Tile>
  emitter: EventDispatcher
  mapDebug: MapDebug


  constructor(scene: Phaser.Scene, mapData: IMap) {
    this.scene = scene
    this.mapData = mapData
    this.pathFinder = new easystarjs.js();
    this.pathFinder.enableSync();
    this.paths = []
    this.emitter=EventDispatcher.getInstance();
    this.emitter.on('main_scene_preload', this.preload.bind(this));
    this.emitter.on('main_scene_create', this.create.bind(this));
    this.emitter.on('main_scene_update', this.update.bind(this));
  }


  preload() {
    this.scene.load.tilemapTiledJSON(this.mapData.name, this.mapData.jsonFile);
    this.mapData.tileSets.forEach(tileSet => {
      this.scene.load.image(tileSet.name, tileSet.source)
    })
  }

  create() {
    this.map = this.scene.make.tilemap({ key: this.mapData.name });
    const tileSets = this.mapData.tileSets.map(tileSet => {
      return this.map.addTilesetImage(tileSet.name, tileSet.name)
    })

    this.mapData.layers.forEach(layer => {
      let newLayer = this.map.createStaticLayer(layer.name, tileSets)
    })

    this.map.setLayer("Top")

    this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.graphics = this.scene.add.graphics();
    this.loadTiles()
    this.findPath(tileSets)
    this.map.setLayer("Top")
    
    if(this.scene.game.config.physics.arcade?.debug){
      this.mapDebug = new MapDebug(this.scene, this.map, this.paths)
      this.mapDebug.debugOn()
    }
    
  }

  loadTiles() {
    this.turretsTiles = []
    this.finishTiles = []
    this.startTiles = []
    this.pathTiles = []
    this.map.setLayer("Top")
    this.map.forEachTile(tile => {
      if (tile.properties.start) {
        this.startTiles.push(tile)
      }
      else if (tile.properties.path) {
        this.pathTiles.push(tile)
      }
      else if (tile.properties.meta) {
        this.finishTiles.push(tile)
      }
      else if (tile.properties.towerPlace) {
        this.turretsTiles.push(tile)
      }

    })
  }

  findPath(tileSets) {

    const acceptableTiles: Array<integer> = []
    const startTiles: Array<{ x: number, y: number }> = []
    const finishTiles: Array<{ x: number, y: number }> = []
    const grid: Array<Array<integer>> = [];

    for (let y: number = 0; y < this.map.height; y++) {
      let col: Array<integer> = [];
      for (let x: number = 0; x < this.map.width; x++) {
        // In each cell we store the ID of the tile, which corresponds
        // to its index in the tileset of the map ("ID" field in Tiled)
        col.push(this.map.getTileAt(x, y, true).index);
      }
      grid.push(col);
    }

    this.pathFinder.setGrid(grid)
    this.map.forEachTile(tile => {
      if (tile.properties.path || tile.properties.start || tile.properties.meta) {
        acceptableTiles.push(tile.index)
      }
      if (tile.properties.start) {
        startTiles.push({
          x: tile.x,
          y: tile.y
        })
      }
      if (tile.properties.meta) {
        finishTiles.push({
          x: tile.x,
          y: tile.y
        })
      }
    })


    const uniqueArray = acceptableTiles.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })

    this.pathFinder.setAcceptableTiles(acceptableTiles)

    startTiles.forEach((start, index) => {
      let paths: Array<Array<{ x: number, y: number }>> = []
      let bestPath: Array<{ x: number, y: number }> = []
      finishTiles.forEach((meta, key) => {
        this.pathFinder.findPath(start.x, start.y, meta.x, meta.y, (path) => {
          if (path) {
            this.paths.push(path.map(element => {
              return this.map.getTileAt(element.x, element.y)
            }))

          }
        })
        this.pathFinder.calculate()
      })

      this.map.setLayer("Bot")


    })
  }

  getRandomPath() {
    return this.paths[Math.floor(Math.random() * this.paths.length)]
  }

  getTile(x: integer, y: integer) {
    try {
      let tile = this.map.getTileAtWorldXY(x, y)
      if (tile.properties.towerPlace) { //in placable_tiles w domyśle
        return tile
      }
    } catch (Typeerror) {
      return false
    }

  }

  update() {

  }
}
