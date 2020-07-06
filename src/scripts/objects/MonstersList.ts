import { monsters } from '../../collections/Monsters';
import MonsterButton from './MonsterButton';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
import CollectionsList from './CollectionsList';

export default class MonstersList extends CollectionsList {
    [x: string]: any;
    scene: Phaser.Scene

    constructor(scene, x: number, y: number, columns: number = 3, collectionType) {
       super(scene, x, y, columns, collectionType)
       this.create()
    }

    create() {
        const background = new RoundRectangle(this.scene, 0, 0, 100, 100, 5, 0x4e342e);
        this.scene.add.existing(background)
        this.addBackground(background)

        Array.from(Object.entries(monsters)).forEach((monster) => {
            const container = this.scene.add.container(0, 0)
            container.setSize(32, 32)
            const number = this.scene.add.text(-15, 5, "0")
            container.add(number)
            container.addAt(new MonsterButton(this.scene, 0, 0, monster[1], () => {
                this.emit("monsterClick", monster[1])
                const numberText = Number(number.text) + 1
                number.setText(numberText.toString())

            }), 0)
            this.add(container)
        });

        this.layout();
    }

    resetNumber(){ 
        for(let i = 0; i < this.columnCount; i++){
            for(let j = 0; j < this.rowCount; j++){
                const button = this.getChildAt(i, j)
                button.last.setText("0")
            }
        }
    }
}