import ITower from '../Interfaces/ITower';
import Monster from './Monster';
import Bullet from './Bullet';
import { bullets } from '../../collections/Bullets';

export default class Tower extends Phaser.Physics.Arcade.Image {
    scene: Phaser.Scene
    towerData: ITower
    x: number
    y: number
    rangeCricle: Phaser.GameObjects.Arc
    nextTic: number

    constructor(scene: Phaser.Scene, x:integer, y:integer, towerData: ITower) {
        super(scene, x, y, towerData.name)
        this.towerData = towerData
        this.x = x
        this.y = y
        this.nextTic = 0
        scene.add.existing(this)
        this.activateInteractions()
    }

    drawRange(scene:Phaser.Scene){
       this.rangeCricle =  scene.add.circle(this.x, this.y, this.towerData.range, 0, 0.2)
    }
    
    enemiesNearby(enemies: Array<any>, bullets:Phaser.GameObjects.Group){
        enemies.forEach(enemy => {
            if(enemy.active && Phaser.Math.Distance.Between(enemy.x, enemy.y, this.x, this.y) <= this.towerData.range){
                this.shot(enemy, bullets)
            }
        })
    }
    
    shot(enemy:Monster, bullets: Phaser.GameObjects.Group){
        let angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
        let bullet = new Bullet(this.scene, this.x, this.y, this.towerData)
        bullets.add(bullet)
        bullet.fire(enemy)
    }
    
    activateInteractions(){
        this.setInteractive()
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
    }

    update(time, delta, enemies: Phaser.GameObjects.Group, bullets:  Phaser.GameObjects.Group){
        if(time > this.nextTic) {
            this.enemiesNearby(enemies.getChildren(), bullets)
            this.nextTic = time + 500;
        }
    }
}
