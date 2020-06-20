import IMap from '../Interfaces/IMap';
import { Tilemaps } from 'phaser';
var easystarjs = require('easystarjs');

export default class Map {
  scene: Phaser.Scene
  mapData: IMap
  map: Tilemaps.Tilemap
  pathFinder
  paths: Array<Array<{x: number, y: number}>>


  constructor(scene: Phaser.Scene, mapData: IMap) {
    this.scene = scene
    this.mapData = mapData
    this.pathFinder = new easystarjs.js();
    this.pathFinder.enableSync();
    this.paths = []
  }


  preload() {
    this.scene.load.tilemapTiledJSON("map", this.mapData.jsonFile);
    this.mapData.tileSets.forEach(tileSet => {
      this.scene.load.image(tileSet.name, tileSet.source)
    })
  }

  create() {
    this.map = this.scene.make.tilemap({ key: 'map' });
    const tileSets = this.mapData.tileSets.map(tileSet => {
      return this.map.addTilesetImage(tileSet.name, tileSet.name)
    })

    this.mapData.layers.forEach(layer => {
      this.map.createStaticLayer(layer.name, tileSets, 0, 0)
    })

    this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.findPath(tileSets)
  }

  findPath(tileSets) {

    const acceptableTiles: Array<integer> = []
    const startTiles: Array<{x: number, y: number}> = []
    const finishTiles: Array<{x: number, y: number}> = []
    const grid: Array<Array<integer>> = [];

    for (let y: number = 0; y < this.map.height; y++) {
      let col: Array<integer> = [];
      for (let x: number = 0; x < this.map.width; x++) {
        // In each cell we store the ID of the tile, which corresponds
        // to its index in the tileset of the map ("ID" field in Tiled)
        col.push(this.map.getTileAt(x, y).index);
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

    this.pathFinder.setAcceptableTiles(acceptableTiles)

    startTiles.forEach((start, index) => {
      let paths: Array<Array<{x: number, y: number}>> = []
      let bestPath: Array<{x: number, y: number}> = []
      finishTiles.forEach((meta, key) => {
        this.pathFinder.findPath(start.x, start.y, meta.x, meta.y, (path) => {
          if(path){
            if(bestPath.length === 0 || bestPath.length > path.length){
              bestPath = path
            }
          }
        })
        this.pathFinder.calculate()
      })
      this.paths.push(bestPath)
      
    })
    this.drawPaths()
  }

  drawPaths(){
      this.paths.forEach(path =>{
        let points: Array<integer> = [];
        path.forEach(element => {
          let tile = this.map.getTileAt(element.x, element.y)
          points.push(tile.pixelX + tile.width / 2 )
          points.push(tile.pixelY + tile.height / 2)
        })

        var curve = new Phaser.Curves.Spline(points);
        let drawPath = { t: 0, vec: new Phaser.Math.Vector2() };

        curve = new Phaser.Curves.Spline(points);

        const graphics = this.scene.add.graphics();

        graphics.clear();

        graphics.lineStyle(2, 0xffffff, 1);

        curve.draw(graphics, 64);

        curve.getPoint(drawPath.t, drawPath.vec);

        graphics.fillStyle(0x00FF00, 1);
        graphics.fillCircle(drawPath.vec.x, drawPath.vec.y, 8);
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(points[points.length - 2], points[points.length - 1], 8)
      })
  }

  update() {

  }
}