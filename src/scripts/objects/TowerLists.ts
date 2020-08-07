import TowerButton from "./TowerButton"
import {towers} from "../../collections/Towers"
import CollectionsList from "./CollectionsList";

export default class TowerLists extends CollectionsList {
    [x: string]: any;
    scene: Phaser.Scene
    currentTowerBtn: TowerButton | null
    towerBtns: Array<TowerButton>

    constructor(scene, x:number, y:number, columns: number = 2, collectionType){
        super(scene, x, y, columns, collectionType)
        this.towerBtns = []
        this.create()
    }

    getCurrentButton(){
        return this.currentTowerBtn;
    }

    addCurrentButton(icon:TowerButton){
        if(this.currentTowerBtn instanceof TowerButton){
            this.currentTowerBtn.deactivate()
        }
        this.currentTowerBtn = icon
    }

    removeCurrentButton(){
        if(this.currentTowerBtn){
            this.currentTowerBtn = null
        }
    }

    create(){
        Array.from(Object.entries(towers)).forEach((tower) => {
            let newTower = new TowerButton(this.scene, 0, 0, tower[1], this)
            this.towerBtns.push(newTower)
            const container = this.scene.add.container(0, 0)
            container.setSize(64, 64)
            const text = this.scene.add.text(-container.width /2, container.height/2, `${tower[1].name}`)
            container.add(text)
            container.addAt(newTower)
            this.add(container)
        });

        this.layout();
    }

    get_area(){
        return [this._x, this._y]
    }


}