import { towers } from '../../collections/Towers';
import TowerButton from './TowerButton';

export default class CollectionsList{
    scene: Phaser.Scene
    activeButton: TowerButton| null
    buildingButton: HTMLElement| null
    gameParams: any


    constructor() {
        this.activeButton = null;
        this.addPointersToGameParams();
        this.addClickHandlerToBuildingButton();
        this.createButtons();
    }

    addPointersToGameParams(){
        this.gameParams = {
            gold: document.getElementById('goldUI'),
            wave: document.getElementById('waveUI'),
            health: document.getElementById('healthUI'),
        }
    }

    addClickHandlerToBuildingButton(){
        let towerList = document.querySelector('.towerList');

        this.buildingButton = document.getElementById('buildButton');
        this.buildingButton?.addEventListener('click', () => {
          this.buildingButton?.classList.toggle('active');
          towerList?.classList.toggle('active');
        })
    }

    createButtons(){
        Object.keys(towers).forEach(tower => {
            new TowerButton(towers[tower], this)
        })
    }

    addActiveButton(subject:TowerButton){
        this.activeButton = subject;
    }

    removeActiveButton(){
        this.activeButton = null
    }

    getActiveButton(){
        if(this.activeButton instanceof TowerButton && this.activeButton.isActive()){
            return this.activeButton;
        }
        return false;
    }

    setGold(price){
        this.gameParams.gold.textContent = String(price);
    }

    setHealth(hp){
        this.gameParams.health.textContent = String(hp);
    }

    setWave(wave){
        this.gameParams.wave.textContent = String(wave);
    }
}