import Tower from "./Tower"

export default class TowerContextMenu{
    x: integer
    y: integer
    tower: Tower
    updateTowerBtn: any
    destroyTowerBtn: any
    
    constructor(x, y, tower){
        this.x = x;
        this.y = y;
        this.tower = tower;
        this.updateTowerBtn;
        this.destroyTowerBtn;
    }

    create(){
        const text = `damage: ${this.tower.towerData.damage}, range: ${this.tower.towerData.range}`;

    }

    destroyTower(){}

    updateTower(){}

    hideContextMenu(){}
}