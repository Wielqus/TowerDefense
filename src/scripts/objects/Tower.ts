import ITower from '../Interfaces/ITower';
import Monster from './Monster';
import Bullet from './Bullet';
import TowerContextMenu from './TowerContextMenu';
import { Tilemaps } from 'phaser';


export default class Tower extends Phaser.Physics.Arcade.Image {
    scene: Phaser.Scene
    towerData: ITower
    x: number
    y: number
    rangeCricle: Phaser.GameObjects.Arc
    nextTic: number
    _currentTarget: Monster
    tiles: Array<Tilemaps.Tile>
    currentlyActiveMenu: boolean

    constructor(scene: Phaser.Scene, x:integer, y:integer, towerData: ITower, tiles: Array<Tilemaps.Tile>) {
        super(scene, x, y, towerData.name)
        this.scene = scene;
        this.towerData = {...towerData};
        this.x = x;
        this.y = y;
        this.tiles = tiles;
        this.nextTic = 0;
        this.currentlyActiveMenu = false;
        scene.add.existing(this);
        this.activateInteractions();
    }

    currentTarget(target: Monster){
        this._currentTarget = target
    }

    getCurrentTarget(){
        return this._currentTarget
    }
    
    drawRange(scene:Phaser.Scene){
       this.rangeCricle =  scene.add.circle(this.x, this.y, this.towerData.range, 0, 0.2)
    }
    
    activeEnemyInRange(enemy: Monster){
        return enemy.active && this.countDistance(enemy) <= this.towerData.range
    }

    countDistance(enemy){
        return Phaser.Math.Distance.Between(enemy.x, enemy.y, this.x, this.y)
    }

    enemiesNearby(enemies: Array<any>):Array<Monster>{
        return enemies.filter((enemy) => this.activeEnemyInRange(enemy))
    }
    
    getClosestTargetWithMostHealth(enemies: Array<Monster>){
        const mostHealth = Math.max(...enemies.map(enemy => enemy.monsterData.health))
        const mostHealthEnemies = enemies.filter((enemy) => {return enemy.monsterData.health == mostHealth})
        if (mostHealthEnemies.length > 1){
            return mostHealthEnemies.reduce(
                (prev, current) => (this.countDistance(prev) > this.countDistance(current)? current: prev))
        }
        return mostHealthEnemies[0]
    }
    
    shot(enemy:Monster, bullets: Phaser.GameObjects.Group){
        const bullet = new Bullet(this.scene, this.x, this.y, this.towerData, enemy)
        bullets.add(bullet)
    }
    
    activateInteractions(){
        this.setInteractive({useHandCursor: true})
        this.on('pointerover', () => {
            if(!this.rangeCricle){
                this.drawRange(this.scene)
            }else{
                this.rangeCricle.setVisible(true)
            }
        })
        this.on('pointerout', () =>{
            this.rangeCricle.setVisible(false)
        })

        this.on('pointerdown', () => {
            if(!this.currentlyActiveMenu){
                new TowerContextMenu(this.scene, this.x, this.y, this);
                this.currentlyActiveMenu = true;
            }
        })
    }

    update(time, delta, enemies: Phaser.GameObjects.Group, bullets:  Phaser.GameObjects.Group){
        if(time > this.nextTic) {
                const currentTarget = this.getCurrentTarget()
                if(!currentTarget || !this.activeEnemyInRange(currentTarget)){
                    const reachableEnemies = this.enemiesNearby(enemies.getChildren())
                    const candidate = this.getClosestTargetWithMostHealth(reachableEnemies)
                    this.currentTarget(candidate)
                }
                else{
                    this.shot(currentTarget, bullets)
                }
            this.nextTic = time + 500;
        }
    }

    hideContextMenu(){
        this.currentlyActiveMenu = false;
    }

    tearDown(){
        this.clearTiles();
        this.destroy();
    }

    clearTiles(){
        this.tiles.forEach(element => {
            element.properties.towerPlace = true;
        });
    }
}
