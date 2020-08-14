import ITower from "../Interfaces/ITower"
import CollectionsList from "./CollectionsList"

export default class TowerButton extends Phaser.GameObjects.Image{
    scene: Phaser.Scene
    towerData: ITower
    active: boolean
    observer: CollectionsList
    
    
    constructor(scene: Phaser.Scene, x: number, y:number, tower: ITower, observer: CollectionsList){
        super(scene, x, y, tower.name)
        this.active = false;
        this.towerData = tower;
        this.tint = 0xBEBEBE;
        this.setInteractive().on('pointerdown', () =>{
            this.isActive() ? this.deactivate(): this.activate()
        });
        this.observer = observer;
        return this;
    }

    isActive():boolean{
        return this.active;
    }
    activate = () =>{
        this.active = true;
        this.clearTint();
        this.observer.addActiveButton(this);
    }
    deactivate(){
        this.tint = 0xBEBEBE;
        this.active = false;
    }
}
