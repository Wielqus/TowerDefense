import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';
import { towers } from '../../collections/Towers';
import TowerButton from './TowerButton';

export default class CollectionsList extends GridSizer{
    [x: string]: any
    scene: Phaser.Scene
    activeButton: TowerButton| null

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
        this.towerButtons = []
        this.activeButton = null;
        this.scene = scene;
        scene.add.existing(this);
        this.create();
    }
    
    create(){
        this.height = 100;
        this.setDepth(1);
        const background = new RoundRectangle(this.scene, this.x, this.y, this.width, this.height, 5, 0x000000);
        background.setAlpha(0.3);
        this.scene.add.existing(background);
        this.addBackground(background);
        this._createTowersButtons();
        this.layout();
    }

    _createTowersButtons(){
        Array.from(Object.entries(towers)).forEach((tower) => {
            let button = new TowerButton(this.scene, 0, 0, tower[1], this);
            const container = this.scene.add.container(0, 0);
            container.setSize(32, 32);
            const text = this.scene.add.text(container.width /2, container.height/2, `${tower[1].name}`);
            container.add(text);
            container.addAt(button);
            this.add(container, {
                align: 'left'
            });
        });
    }

    addActiveButton(subject:TowerButton){
        if(this.activeButton instanceof TowerButton && (JSON.stringify(subject) !== JSON.stringify(this.activeButton))){
            this.activeButton.deactivate();
        }
        this.activeButton = subject;
    }

    getActiveButton(){
        if(this.activeButton instanceof TowerButton && this.activeButton.isActive()){
            return this.activeButton;
        }
        return false;
    }
}