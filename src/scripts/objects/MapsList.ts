import MonsterButton from './MonsterButton';
import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
import { maps } from '../../collections/Maps';
import { GridButtons } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import { Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

export default class MapsList extends GridSizer {
    [x: string]: any;
    scene: Phaser.Scene

    constructor(scene, x: number, y: number, columns: number = 3) {
        super(scene, x, y, {
            column: 1,
            row: Array.from(Object.entries(maps)).length,
            space: {
                     left: 5, right: 5, top: 5, bottom:5,
                     column: 10,
                     row: 10     
                 },
        }),
        this.scene = scene
        scene.add.existing(this)
        this.create()
    }

    create() {
        const background = new RoundRectangle(this.scene, 0, 0, 100, 100, 5, 0x000000);
        this.scene.add.existing(background)
        this.addBackground(background)
        Array.from(Object.entries(maps)).forEach(map => {
            let container = this.scene.add.container(0, 0)
            container.setSize(400, 20)
            let text = this.scene.add.text(0, 0, map[1].name)
            container.add(text)
            container.setInteractive().on('pointerdown', () => {
                this.scene.scene.start('MainScene', {map: map[1]})
            })
            this.add(container)
        })


    
        this.layout();
    }

}