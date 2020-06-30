import IMap from '../Interfaces/IMap';
import IMonster from '../Interfaces/IMonster';
import Monster from './Monster';
import Map from './Map';
import MonstersList from './MonstersList';
import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';

export default class WaveCreator extends GridSizer {
    [x: string]: any;
    scene: Phaser.Scene
    map: Map
    monsters: Array<IMonster>

    constructor(scene: Phaser.Scene, map: Map, x: number, y: number) {
        super(scene, x, y, {
            column: 1,
            row: 2,
            space: {
                left: 5, right: 5, top: 5, bottom: 5,
                column: 10,
                row: 10
            },
        }),
            this.scene = scene
        this.map = map
        this.monsters = []
        this.create()
    }

    create() {
        const background = new RoundRectangle(this.scene, 0, 0, 100, 100, 5, 0x4e342e);
        this.scene.add.existing(background)
        this.addBackground(background)

        const monstersList = new MonstersList(this.scene, 0, 0).on("monsterClick", (monster) => {
            this.monsters.push(monster);
        });
        this.add(monstersList)
        const startText = this.scene.add.text(0, 0, "start").setInteractive().on('pointerdown', () => {
            this.start()
        })
        this.add(startText)
        this.layout();
    }

    update() {

    }

    push(monster: IMonster) {
        this.monsters.push(monster)
    }

    start() {
        this.monsters.forEach(monster => {
            new Monster(this.scene, this.map.getRandomPath(), monster)
        })
    }
}