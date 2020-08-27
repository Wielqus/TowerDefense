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
            this.updateText();
        });

        this.updateTowerBtn?.addEventListener('mouseenter', () => {
            const damage = document.getElementById('damage');
            const additionalDamage = document.createElement('span');
            additionalDamage.style.color = 'green';
            additionalDamage.textContent = ' (+5)';
            damage?.appendChild(additionalDamage);

        })

        this.updateTowerBtn?.addEventListener('mouseleave', () => {
            this.updateText();
        })

        this.destroyTowerBtn?.addEventListener('click', () => {
            this.destroyTower();
        });

        this.hideContextMenuBtn?.addEventListener('click', () => {
            this.hideContextMenu();
        })
    }

    updateText(){
        if(this.textContainer instanceof HTMLElement){
            this.textContainer.innerHTML = '';
            
            Object.entries(
                {damage: this.tower.towerData.damage, 
                range: this.tower.towerData.range})
                .forEach((key) => {
                    
                    let p = document.createElement('p');
                    p.setAttribute('id', key[0]);
                    p.textContent = `${key[0]}: ${key[1]}`;
                    this.textContainer?.appendChild(p);
            });
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

    updateTower(){
        this.tower.towerData.damage += 5;
        this.updateText();
        this.tower.emit('towerUpdate');
    }

    destroyTower(){
        this.hideContextMenu();
        this.tower.emit('towerDestroy');
        this.tower.tearDown();
    }

    hideContextMenu(){
        this.containerHTML?.classList.add('hidden');
        this.tower.hideRangeCircle();
    }

    changeTower(nextTower:Tower){
        if(this.tower){
            this.tower.hideRangeCircle();
        }
        this.tower = nextTower;
        this.updateText();
        this.setTowerName();
        this.setImage();
        this.isVisible() ? null : this.setVisible();
    }

    isVisible(){
        return !this.containerHTML?.classList.contains('hidden')
    }

    setVisible(){
        this.containerHTML?.classList.remove('hidden');
    }
}
