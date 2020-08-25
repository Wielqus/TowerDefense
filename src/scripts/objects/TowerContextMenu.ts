import Tower from "./Tower";
import Button from "./Button";

const ASSET_URL = '../../assets/towers/';

export default class TowerContextMenu{
    x: integer
    y: integer
    tower: Tower
    updateTowerBtn: HTMLElement | null
    destroyTowerBtn: HTMLElement | null
    hideContextMenuBtn: HTMLElement | null
    text: Phaser.GameObjects.Text
    containerHTML: HTMLElement | null
    textContainer: HTMLElement | null
    imageContainer: HTMLElement | null
    
    constructor(){
        this.tower;
        this.containerHTML = document.querySelector('.towerContextMenu')
        this.updateTowerBtn = document.getElementById('towerUpdate');
        this.destroyTowerBtn = document.getElementById('towerDestroy');
        this.hideContextMenuBtn = document.getElementById('contextMenuHide');
        this.textContainer = document.querySelector('.towerContextMenu__stats');
        this.imageContainer = document.querySelector('.towerContextMenu__image')
        
        
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
            this.textContainer.innerHTML = '';
            [this.tower.towerData.damage, this.tower.towerData.range].forEach((param)=> {
                let p = document.createElement('p');
                p.textContent = `damage: ${param}`;
                this.textContainer?.appendChild(p);
            })
        }
    }

    setTowerName(){
        let towerNameContainer = document.querySelector('.towerContextMenu__towerName');

        if(towerNameContainer){
            towerNameContainer.textContent = this.tower.towerData.name;
        }
    }

    setImage(){
        this.imageContainer?.setAttribute('src', `${ASSET_URL}${this.tower.towerData.source}`);
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
        this.containerHTML?.classList.add('hidden');
        this.tower.hideRangeCircle();
    }

    changeTower(nextTower:Tower){
        this.tower = nextTower;
    }

    setVisible(){
        this.containerHTML?.classList.remove('hidden');
    }
}