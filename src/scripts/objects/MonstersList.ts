import { monsters } from '../../collections/Monsters';
import MonsterButton from './MonsterButton';
import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

export default class MonstersList extends GridSizer {
    [x: string]: any;
    scene: Phaser.Scene

    constructor(scene, x: number, y: number, columns: number = 3) {
        super(scene, x, y, {
            column: columns,
            row: Math.ceil(Array.from(Object.entries(monsters)).length / columns),
        }),
        this.scene = scene
        scene.add.existing(this)
        this.create()
    }

    create() {
        Array.from(Object.entries(monsters)).forEach((monster) => {
            this.add(new MonsterButton(this.scene, 0, 0, monster[1], () => {this.emit("monsterClick", monster[1])}))
        });
        this.layout();
    }
}