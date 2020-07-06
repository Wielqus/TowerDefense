import TowerButton from "./TowerButton"
import {towers} from "../../collections/Towers"
import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';

export default class TowerBuilder extends GridSizer {
    [x: string]: any;
    scene: Phaser.Scene
    currentTowerBtn: TowerButton | object
    towerBtns: Array<TowerButton>

    constructor(scene, x: number, y: number, columns: number = 1) {
        super(scene, x, y, {
            column: columns,
            row: Math.ceil(Array.from(Object.entries(towers)).length / columns),
            space: {
                     left: 5, right: 5, top: 5, bottom:5,
                     column: 10,
                     row: 10     
                 },
        }),
        this.scene = scene
        this.towerBtns = []
        scene.add.existing(this)
        this.create()
    }

    addCurrent(icon:TowerButton){
        if(this.currentTowerBtn instanceof TowerButton){
            this.currentTowerBtn.deactivate()
        }
        this.currentTowerBtn = icon
    }
    removeCurrent(){
        this.currentTowerBtn = {}
        
    }

    create(){
        const background = new RoundRectangle(this.scene, 0, 0, 50, 50, 5, 0x4e342e);
        this.scene.add.existing(background)
        this.addBackground(background)
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

}