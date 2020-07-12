import TowerLists from "./TowerLists"
import TowerButton from "./TowerButton"
import { Tilemaps } from "phaser"
import Tower from "./Tower"

export default class TowerBuilder extends Phaser.GameObjects.GameObject{
    scene: Phaser.Scene
    towerLists:TowerLists
    map

    constructor(scene:Phaser.Scene, map, towerLists: TowerLists){
        super(scene, 'towerBuilder')
        this.towerLists = towerLists
        this.map = map
        this.scene = scene
        this.create()
    }
    create(){
        this.scene.input.on('pointerDown', () => {
            if(this.checkActiveButtons()){
                const tile = this.map.getTile(this.scene.input.x + this.scene.cameras.cameras[0].scrollX, this.scene.input.y + this.scene.cameras.cameras[0].scrollY)
                if(this.checkForCollisionsWithUI(tile)){
                    this.placeTower(tile)
                }

            }
        })
    }
    checkActiveButtons(){
        return this.towerLists.currentTowerBtn && this.towerLists.currentTowerBtn instanceof TowerButton
    }

    checkForCollisionsWithUI(tile: Tilemaps.Tile){
        const [UI_X, UI_Y] = this.towerLists.get_area()
        return tile && Phaser.Math.Distance.Between(tile.pixelX, tile.pixelY, UI_X, UI_Y) > this.towerLists.height
    }
    placeTower(tile){
        let towerData = this.towerLists.currentTowerBtn.towerData
        this.scene.towers.push(new Tower(this.scene, tile.pixelX, tile.pixelY, towerData))
        this.towerLists.currentTowerBtn.deactivate()
    }
}

