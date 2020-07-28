import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
import TowerLists from './TowerLists';
import { towers } from '../../collections/Towers';
import MonsterButton from './MonsterButton';
import MonstersList from './MonstersList';
import { monsters } from '../../collections/Monsters';

export default class CollectionsList extends GridSizer{
    [x: string]: any
    scene: Phaser.Scene

    constructor(scene, x: number, y: number) {
        super(scene, x, y, {
            column: 3,
            row: 1,
            width: scene.cameras.cameras[0].displayWidth,
            space: {
                     left: 5, right: 5, top: 5, bottom:5,
                     column: 10,
                     row: 10     
                 },
                 columnProportions: 1,
                 rowProportions: 0,
        }),
        this.scene = scene
        scene.add.existing(this)
        this.create()
    }

    create(){
        this.height = 100
        this.setDepth(1)
        const background = new RoundRectangle(this.scene, this.x, this.y, this.width, this.height, 5, 0x000000);
        background.setAlpha(0.3)
        this.scene.add.existing(background)
        this.addBackground(background)
        this.add(new TowerLists(this.scene, 0, 0, 2, towers), {
            column: 1,
            row: 0,
            align: 'center',
        })
        this.layout()

        
    }
}