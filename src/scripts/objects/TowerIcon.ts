import ITower from "../Interfaces/ITower"

export default class TowerIcon extends Phaser.GameObjects.Image{
    scene: Phaser.Scene
    TowerData: ITower
    clicked: boolean
    
    constructor(scene: Phaser.Scene, x: number, y:number, tower: ITower){
        super(scene, x, y, tower.name)
        this.active = false
    }

    isActive(){}
    activate(){}
    deactivate(){}
}
