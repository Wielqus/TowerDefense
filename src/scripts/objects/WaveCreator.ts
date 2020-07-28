import IMap from '../Interfaces/IMap';
import IMonster from '../Interfaces/IMonster';
import Monster from './Monster';
import Map from './Map';
import MonstersList from './MonstersList';
import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
import { ResolvePlugin } from 'webpack';
import { monsters } from '../../collections/Monsters';

export default class WaveCreator extends GridSizer {
    [x: string]: any;
    scene: Phaser.Scene
    map: Map
    monsters: Array<IMonster>
    active_monsters: Phaser.GameObjects.Group

    constructor(scene: Phaser.Scene, map: Map, x: number, y: number) {
        super(scene, x, y, {
            column: 1,
            row: 3,
            space: {
                left: 5, right: 5, top: 5, bottom: 5,
                column: 10,
                row: 10
            },
        }),
            this.scene = scene
        this.map = map
        this.monsters = []
        this.active_monsters = this.scene.add.group({classType: Monster})
        this.create()
    }

    create() {
        const background = new RoundRectangle(this.scene, 0, 0, 100, 100, 5, 0x4e342e);
        this.scene.add.existing(background)
        this.addBackground(background)

        const monstersList = new MonstersList(this.scene, 0, 0, 3, monsters).on("monsterClick", (monster) => {
            this.monsters.push(monster);
            this.updateText()
        });
        this.add(monstersList)

        const startText = this.scene.add.text(0, 0, "start").setInteractive().on('pointerdown', () => {
            this.shuffle()
            this.start()
            monstersList.resetNumber()
        })
        this.add(startText)

        this.layout();
        
    }

    shuffle(){
        for (let i = this.monsters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.monsters[i], this.monsters[j]] = [this.monsters[j], this.monsters[i]];
        }
    }

    updateText(){
        
    }

    update() {
        const camera = this.scene.cameras.cameras[0]
        this.setPosition(camera.displayWidth + camera.scrollX - this.width, camera.displayHeight + camera.scrollY - this.height)
    }

    push(monster: IMonster) {
        this.monsters.push(monster)
    }

    start() {
        const monster = this.monsters.pop()
        if(monster){
            new Promise((resolve) => {
                setTimeout(() => {this.active_monsters.add(new Monster(this.scene, this.map.getRandomPath(), monster)); resolve() }, (Math.random() * 300) + 100)
            }).then(() => {
                this.start()
            })
        }
    }
}