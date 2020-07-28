import IMonster from "../Interfaces/IMonster"
import ITower from "../Interfaces/ITower"
import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

export default class CollectionsList extends GridSizer{
    [x: string]: any
    scene: Phaser.Scene

    constructor(scene, x: number, y: number, columns: number = 3, collectionType: IMonster| ITower) {
        super(scene, x, y, {
            column: columns,
            row: Math.ceil(Array.from(Object.entries(collectionType)).length / columns),
            space: {
                     left: 5, right: 5, top: 5, bottom:5,
                     column: 50,
                     row: 10     
                 },
        }),
        this.scene = scene
        scene.add.existing(this)
    }
}