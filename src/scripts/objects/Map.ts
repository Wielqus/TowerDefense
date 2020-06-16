import IMap from '../Interfaces/IMap';

export default class Map{
  scene: Phaser.Scene
  mapData: IMap

  constructor(scene :Phaser.Scene, mapData: IMap){
    this.scene = scene
    this.mapData   = mapData
  }


   preload(){
    this.scene.load.tilemapTiledJSON("map", this.mapData.jsonFile);
    this.mapData.tileSets.forEach(tileSet => {
      this.scene.load.image(tileSet.name, tileSet.source)
    })
   }

   create(){
    const map = this.scene.make.tilemap({key: 'map'});
    const tileSets = this.mapData.tileSets.map(tileSet => {
      return map.addTilesetImage(tileSet.name, tileSet.name)
    })

    this.mapData.layers.forEach(layer => {
      map.createStaticLayer(layer.name, tileSets, 0, 0)
    })

    this.scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
   }

  update() {
      
    }
  }
  