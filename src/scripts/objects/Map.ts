import IMap from '../Interfaces/IMap';
import { Tilemaps } from 'phaser';
var easystarjs = require('easystarjs');

export default class Map{
  scene: Phaser.Scene
  mapData: IMap
  map: Tilemaps.Tilemap
  pathFinder
  

  constructor(scene :Phaser.Scene, mapData: IMap){
    this.scene = scene
    this.mapData   = mapData
    this.pathFinder = new easystarjs.js();
  }


   preload(){
    this.scene.load.tilemapTiledJSON("map", this.mapData.jsonFile);
    this.mapData.tileSets.forEach(tileSet => {
      this.scene.load.image(tileSet.name, tileSet.source)
    })
   }

   create(){
    this.map = this.scene.make.tilemap({key: 'map'});
    const tileSets = this.mapData.tileSets.map(tileSet => {
      return this.map.addTilesetImage(tileSet.name, tileSet.name)
    })

    this.mapData.layers.forEach(layer => {
      this.map.createStaticLayer(layer.name, tileSets, 0, 0)
    })

    this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.findPath(tileSets)
   }

   findPath(tileSets){
     
      
    let acceptableTiles: Array<integer> = []
    let startTiles: Array<integer> = []
    let finishTiles: Array<integer> = []
    var grid: Array<Array<integer>> = [];
    var tileset = tileSets[0];
    var properties = tileset.tileProperties;
    for(var y:number = 0; y < this.map.height; y++){
        var col: Array<integer> = [];
        for(var x:number = 0; x < this.map.width; x++){
            // In each cell we store the ID of the tile, which corresponds
            // to its index in the tileset of the map ("ID" field in Tiled)
            col.push(this.map.getTileAt(x,y).index);
        }
        grid.push(col);
    }


    this.map.forEachTile(tile => {
      if(tile.properties.path || tile.properties.start || tile.properties.meta){
        acceptableTiles.push(tile.index)
      }
      if(tile.properties.start){
        startTiles.push(tile.x)
        startTiles.push(tile.y)
      }
      if(tile.properties.meta){
        finishTiles.push(tile.x)
        finishTiles.push(tile.y)
      }
    })
  
    console.log(acceptableTiles)
  console.log(startTiles)
  console.log(grid)
  console.log(finishTiles)
    this.pathFinder.setGrid(grid)
    console.log(grid)
     
    
     this.pathFinder.setAcceptableTiles(acceptableTiles)
     console.log(this.pathFinder)
     this.pathFinder.findPath(startTiles[0], startTiles[1], finishTiles[0], finishTiles[1], (path) => {
      if (path === null) {
        console.log("Path was not found.");
      } else {
        console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
        console.log("path", path)
    
    var points: Array<integer> = [];



    

        path.forEach(element => {
          points.push(this.map.getTileAt(element.x, element.y).pixelX)
          points.push(this.map.getTileAt(element.x, element.y).pixelY)
        })
        console.log(points)
        var curve = new Phaser.Curves.Spline(points);

        path = { t: 0, vec: new Phaser.Math.Vector2() };

    curve = new Phaser.Curves.Spline(points);

    var curvePoints = curve.points;

    const graphics = this.scene.add.graphics();

    graphics.clear();

    graphics.lineStyle(2, 0xffffff, 1);

    curve.draw(graphics, 64);

    curve.getPoint(path.t, path.vec);

    graphics.fillStyle(0xffff00, 1);
    graphics.fillCircle(path.vec.x, path.vec.y, 8);

      }
    });
    this.pathFinder.calculate()
    
   }


  update() {
    }
  }
  