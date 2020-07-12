import TowerLists from "./TowerLists"
import TowerButton from "./TowerButton"
import { Tilemaps } from "phaser"
import Tower from "./Tower"
import { towers } from "../../collections/Towers"
import ITower from "../Interfaces/ITower"
import TowerMarker from "./TowerMarker"

export default class TowerBuilder extends Phaser.GameObjects.GameObject{
    scene: Phaser.Scene
    towerLists:TowerLists
    map
    towers: ITower
    correctPlace: boolean
    currentMarker: TowerMarker
    actualTiles: any

    constructor(scene:Phaser.Scene, map, towerLists: TowerLists, towers: {}){
        super(scene, 'towerBuilder')
        this.towerLists = towerLists
        this.map = map
        this.scene = scene
        this.correctPlace = false
    }
    getCurrentBtn(){
      return this.towerLists.currentTowerBtn
    }

    checkActiveButtons():boolean{
        return this.towerLists.currentTowerBtn && this.towerLists.currentTowerBtn instanceof TowerButton
    }
    placeTower(tiles, towers){
      towers.push(new Tower(this.scene, (tiles[0].pixelX + tiles[1].pixelX + tiles[1].width) / 2, (tiles[0].pixelY + tiles[2].pixelY) / 2, this.towerLists.currentTowerBtn.towerData))
      if(this.towerLists.currentTowerBtn instanceof TowerButton){
        this.towerLists.currentTowerBtn.deactivate()
      }
    }

}

