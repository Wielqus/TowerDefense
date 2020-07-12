import { Vector } from "matter"
import { Tilemaps } from 'phaser';
import ITower from '../Interfaces/ITower';

export default class TowerMarker extends Phaser.GameObjects.GameObject {
    scene: Phaser.Scene
    marker: Phaser.GameObjects.Graphics
    map
    actualTiles: Array<Tilemaps.Tile>
    tower: ITower
    towerImage: Phaser.GameObjects.Image


    constructor(scene: Phaser.Scene, map, tower: ITower) {
        super(scene, "MapMarker")
        this.scene = scene
        this.marker = this.scene.add.graphics()
        this.map = map
        this.tower = tower
        this.towerImage = this.scene.add.image(0, 0, tower.name)
        this.create()
        scene.events.on('update', (time, delta) => {
            this.update(time, delta)
        });
    }

    destructor() {

    }

    preload() {

    }

    create() {

    }

    onClick() {
        this.emit("place", this.actualTiles)
        this.marker.clear()
        this.towerImage.destroy()
        this.setActive(false).destroy()
    }

    findTileNeighbors(mainTile: Phaser.Tilemaps.Tile) {
        const rightTile: Phaser.Tilemaps.Tile = this.map.map.findTile((tile: Phaser.Tilemaps.Tile) => {
            return tile.x === mainTile.x + 1 && tile.y === mainTile.y
        })
        const downTile: Phaser.Tilemaps.Tile = this.map.map.findTile((tile: Phaser.Tilemaps.Tile) => {
            return tile.x === mainTile.x && tile.y === mainTile.y + 1
        })
        const rightDownTile: Phaser.Tilemaps.Tile = this.map.map.findTile((tile: Phaser.Tilemaps.Tile) => {
            return tile.x === mainTile.x + 1 && tile.y === mainTile.y + 1
        })

        return [mainTile, rightTile, downTile, rightDownTile]
    }

    update(time, delta) {
        if (this) {
            this.marker.clear();
            if (this.scene) {
                const worldPoint = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
                const pointerTile: Tilemaps.Tile = this.map.map.worldToTileXY(worldPoint["x"], worldPoint["y"]);
                const snappedWorldPoint = this.map.map.tileToWorldXY(pointerTile.x, pointerTile.y);
                this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
                this.towerImage.setVisible(false)
                const tile = this.map.map.getTileAt(pointerTile.x, pointerTile.y)
                if (tile) {
                    const tiles = this.findTileNeighbors(tile)
                    this.actualTiles = tiles
                    const found = tiles.every(tile => {
                        if (tile) {
                            return tile.properties.towerPlace === true
                        }
                        return false
                    })
                    if (found) {
                        this.marker.fillStyle(0x008000, 0.5)
                        this.towerImage.setVisible(true)
                        this.towerImage.setPosition((this.actualTiles[0].pixelX + this.actualTiles[1].pixelX + this.actualTiles[1].width) / 2, (this.actualTiles[0].pixelY + this.actualTiles[2].pixelY) / 2)
                    } else {
                        this.marker.fillStyle(0xFF0000, 0.5)
                    }
                } else {
                    this.marker.fillStyle(0xFF0000, 0.5)
                    
                }
                this.marker.fillRect(0, 0, 2 * this.map.map.tileWidth, 2 * this.map.map.tileHeight);
                
                if (this.scene.input.activePointer.isDown) {
                    this.onClick()
                }
            }
        }
    }

}