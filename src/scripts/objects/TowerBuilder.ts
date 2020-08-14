import TowerLists from "./TowerLists"
import TowerButton from "./TowerButton"
import { Tilemaps } from "phaser"
import Tower from "./Tower"
import TowerMarker from "./TowerMarker"

export default class TowerBuilder extends Phaser.GameObjects.GameObject{
    scene: Phaser.Scene
    towerLists:TowerLists
    correctPlace: boolean
    currentMarker: TowerMarker

    constructor(scene:Phaser.Scene, towers: {}){
        super(scene, 'towerBuilder')
        this.scene = scene;
    }
        
    placeTower(tiles: Array<Tilemaps.Tile>, towers: Array<Tower>, currentButton){
      if(currentButton instanceof TowerButton){
        towers.push(new Tower(this.scene, (tiles[0].pixelX + tiles[1].pixelX + tiles[1].width) / 2, (tiles[0].pixelY + tiles[2].pixelY) / 2, currentButton.towerData))
      }
    }
}
