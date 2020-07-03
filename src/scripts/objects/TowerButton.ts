import ITower from "../Interfaces/ITower"
import TowerBuilder from "./TowerBuilder"

export default class TowerButton extends Phaser.GameObjects.Image{
    scene: Phaser.Scene
    towerData: ITower
    clicked: boolean
    parent: TowerBuilder
    
    
    constructor(scene: Phaser.Scene, x: number, y:number, tower: ITower, parent: TowerBuilder){
        super(scene, x, y, tower.name)
        this.clicked = false
        this.towerData = tower
        this.parent = parent
        this.tint = 0xBEBEBE
        this.setInteractive().on('pointerdown', () =>{
            this.isActive() ? this.deactivate(): this.activate()
            console.log(this.parent.currentTowerBtn)
        })
        return this
    }

    isActive():boolean{
        return this.clicked
    }
    activate(){
        this.clicked = true
        this.clearTint()
        this.parent.addCurrent(this)
    }
    deactivate(){
        this.tint = 0xBEBEBE
        this.parent.removeCurrent(this)
        this.clicked = false

    }
}
