import TowerIcon from "./TowerIcon"
import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';


export default class TurretBuilder extends GridSizer{
    width: string
    height: string
    x: number
    y: number
    currentIcon: Array<TowerIcon>
    constructor(scene:Phaser.Scene, x:number, y:number){
        super(scene, x, y)
    }
   

    addCurrent(icon:TowerIcon){
        if (this.currentIcon.length > 0){
            let previous = this.currentIcon.pop()
            previous?.deactivate()
        }
        icon.activate()
        this.currentIcon.push(icon)
    }

}