import { Vector } from "matter"
import { Tilemaps } from 'phaser';

export default class MapMarker extends Phaser.GameObjects.GameObject{
    scene: Phaser.Scene
    marker: Phaser.GameObjects.Graphics
    map
    availableTiles: Array<Tilemaps.Tile>


    constructor(scene: Phaser.Scene, map, availableTiles: Array<Tilemaps.Tile> = []){
        super(scene, "MapMarker")
        this.scene = scene
        this.marker = this.scene.add.graphics()
        this.map = map
        this.availableTiles = availableTiles
        this.create()
        scene.events.on('update', (time, delta) => {
            this.update()
        });
        
    }

    destructor(){

    }
    
    preload(){

    }

    create(){

    }

    update(){
        if(this.scene){ 
            const worldPoint = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
            console.log(this.scene.input.activePointer.moveTime)
            this.scene.input.activePointer.x = worldPoint["x"]
            this.scene.input.activePointer.y = worldPoint["y"]
            const pointerTile: Tilemaps.Tile = this.map.map.worldToTileXY(worldPoint["x"], worldPoint["y"]);
            const snappedWorldPoint = this.map.map.tileToWorldXY(pointerTile.x, pointerTile.y);
            this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
            const tile = this.map.map.getTileAt(pointerTile.x, pointerTile.y)
            
            this.marker.clear();
            if(tile){
                const tiles = [tile, this.map.map.getTileAtWorldXY(pointerTile.x + this.map.map.tileWidth, pointerTile.y), 
                    this.map.map.getTileAtWorldXY(pointerTile.x, pointerTile.y + this.map.map.tileHeight), this.map.map.getTileAtWorldXY(pointerTile.x + this.map.map.tileWidth, pointerTile.y + this.map.map.tileHeight)]
               // console.log(tiles)
                    const found = tiles.map(tile => {
                    if(tile){
                        return tile.properties.towerPlace
                    }
                    return false
                })
                //console.log(found)
                if(found){
                    this.marker.fillStyle(0x008000, 0.5)
                }else{
                    this.marker.fillStyle(0xFF0000, 0.5)
                }
            }else{
                this.marker.fillStyle(0xFF0000, 0.5)
            }
            this.marker.fillRect(0, 0, 2 * this.map.map.tileWidth, 2 * this.map.map.tileHeight);
        }
    }

}