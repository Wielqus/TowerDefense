import { Vector } from "matter"
import { Tilemaps } from 'phaser';

export default class MapMarker extends Phaser.GameObjects.GameObject {
    scene: Phaser.Scene
    marker: Phaser.GameObjects.Graphics
    map
    availableTiles: Array<Tilemaps.Tile>


    constructor(scene: Phaser.Scene, map, availableTiles: Array<Tilemaps.Tile> = []) {
        super(scene, "MapMarker")
        this.scene = scene
        this.marker = this.scene.add.graphics()
        this.map = map
        this.availableTiles = availableTiles
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
        if (this.scene) {
            this.marker.clear();
            const worldPoint = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
            const pointerTile: Tilemaps.Tile = this.map.map.worldToTileXY(worldPoint["x"], worldPoint["y"]);
            const snappedWorldPoint = this.map.map.tileToWorldXY(pointerTile.x, pointerTile.y);
            this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
            const tile = this.map.map.getTileAt(pointerTile.x, pointerTile.y)
            if (tile) {
                const tiles = this.findTileNeighbors(tile)
                const found = tiles.every(tile => {
                    if (tile) {
                        return tile.properties.towerPlace === true
                    }
                    return false
                })
                if (found) {
                    this.marker.fillStyle(0x008000, 0.5)

                } else {
                    this.marker.fillStyle(0xFF0000, 0.5)
                }
            } else {
                this.marker.fillStyle(0xFF0000, 0.5)
            }
            this.marker.fillRect(0, 0, 2 * this.map.map.tileWidth, 2 * this.map.map.tileHeight);
        }
    }

}