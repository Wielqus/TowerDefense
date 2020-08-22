import Tower from "./Tower";
import Button from "./Button";

export default class TowerContextMenu extends Phaser.GameObjects.Container{
    x: integer
    y: integer
    tower: Tower
    updateTowerBtn: HTMLElement | null
    destroyTowerBtn: HTMLElement | null
    hideContextMenuBtn: HTMLElement | null
    text: Phaser.GameObjects.Text
    containerHTML: HTMLElement 
    textContainer: HTMLElement | null
    
    constructor(scene, x, y, tower){
        super(scene, x, y);
        this.x = x;
        this.y = y;
        this.tower = tower;
        this.updateTowerBtn = document.getElementById('contextMenuUpdateButton');
        this.destroyTowerBtn = document.getElementById('contextMenuDestroyButton');
        this.hideContextMenuBtn = document.getElementById('contextMenuHideButton');
        this.textContainer = document.getElementById('damage');
        this.updateText(this.tower.towerData.damage);
        
        this.updateTowerBtn?.addEventListener('click', () => {
            this.updateTower();
            this.updateText(this.tower.towerData.damage);
        });

        this.updateTowerBtn?.addEventListener('mouseenter', () => {
            this.updateText(this.tower.towerData.damage, '5');
        })

        this.updateTowerBtn?.addEventListener('mouseleave', () => {
            this.updateText(this.tower.towerData.damage);
        })

        this.destroyTowerBtn?.addEventListener('click', () => {
            this.destroyTower();
        });

        this.hideContextMenuBtn?.addEventListener('click', () => {
            this.hideContextMenu();
        })
    }

    updateText(stats: string | number, optional?){
        if(this.textContainer instanceof HTMLElement){
            this.textContainer.innerHTML = `damage: ${stats}`
        }
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
        this.updateText('');
        this.destroy();
        this.tower.hideContextMenu();
    }
}