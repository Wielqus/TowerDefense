import TowerLists from "./TowerLists"
import TowerButton from "./TowerButton"
import { Tilemaps } from "phaser"
import Tower from "./Tower"
import TowerMarker from "./TowerMarker"

export default class TowerBuilder extends Phaser.GameObjects.GameObject{
    scene: Phaser.Scene
    towerLists:TowerLists
    map
    correctPlace: boolean
    currentMarker: TowerMarker

    constructor(scene:Phaser.Scene, map, towers: {}){
        super(scene, 'towerBuilder')
        this.map = map
        this.scene = scene
        this.towerLists = new TowerLists(this.scene, this.scene.scale.width * 0.9, this.scene.scale.height * 0.6, 1, towers)
        this.correctPlace = false
    }

    getCurrentBtn(){
      return this.towerLists.currentTowerBtn
    }

    checkActiveButtons():boolean{
      if(this.towerLists.currentTowerBtn){
        return this.towerLists.currentTowerBtn && this.towerLists.currentTowerBtn instanceof TowerButton
      }
      return false;
    }
        
    placeTower(tiles: Array<Tilemaps.Tile>, towers: Array<Tower>){
      if(this.towerLists.currentTowerBtn){
        towers.push(new Tower(this.scene, (tiles[0].pixelX + tiles[1].pixelX + tiles[1].width) / 2, (tiles[0].pixelY + tiles[2].pixelY) / 2, this.towerLists.currentTowerBtn.towerData))
        if(this.towerLists.currentTowerBtn instanceof TowerButton){
          this.towerLists.currentTowerBtn.deactivate()
        }
      }
      
    }

}

