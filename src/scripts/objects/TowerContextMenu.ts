import Tower from "./Tower";
import Button from "./Button";

export default class TowerContextMenu extends Phaser.GameObjects.Container{
    x: integer
    y: integer
    tower: Tower
    updateTowerBtn: Button
    destroyTowerBtn: Button
    hideContextMenuBtn: Button
    text: Phaser.GameObjects.Text
    
    constructor(scene, x, y, tower){
        super(scene, x, y);
        this.x = x;
        this.y = y;
        this.tower = tower;
        this.text = scene.add.text(x, y + 80, 100, 40).setOrigin(0.5);
        this.updateTowerBtn = new Button(scene, x - 50, y - 40, 'update', {});
        this.destroyTowerBtn = new Button(scene, x + 50, y - 40, 'destroy', {});
        this.hideContextMenuBtn = new Button(scene, x + 40, y  - 80, 'X', {});

        this.updateText(this.tower.towerData.damage);

        this.updateTowerBtn.on('clicked', () => {
            this.updateTower();
            this.updateText(this.tower.towerData.damage);
        });

        this.updateTowerBtn.on('hover', () => {
            console.log('hoverState');
        })

        this.destroyTowerBtn.on('clicked', () => {
            this.destroyTower();
        });

        this.hideContextMenuBtn.on('clicked', () => {
            this.hideContextMenu();
        })
    }

    updateText(stats: string | number, optional?){
        this.text.setText(`damage: ${stats}`);
    }

    destroyTower(){
        this.hideContextMenu();
        this.tower.emit('towerDestroy');
        this.tower.tearDown();
    }

    updateTower(){
        this.tower.towerData.damage += 5;
        this.updateText(this.tower.towerData.damage);
        this.tower.emit('towerUpdate');
    }

    hideContextMenu(){
        this.updateTowerBtn.destroy();
        this.destroyTowerBtn.destroy();
        this.hideContextMenuBtn.destroy();
        this.text.destroy();
        this.destroy();
        this.tower.hideContextMenu();
    }
}