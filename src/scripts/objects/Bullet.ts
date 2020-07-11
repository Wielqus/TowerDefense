import IBullet from '../Interfaces/IBullet'
import ITower from '../Interfaces/ITower'
import IMonster from '../Interfaces/IMonster'
import Monster from './Monster'

export default class Bullet extends Phaser.Physics.Arcade.Image{
    scene: Phaser.Scene
    towerData: ITower
    bulletData: IBullet
    x: number
    y: number
    dx: number
    dy: number
    lifespan: number
    
    constructor(scene: Phaser.Scene, x:integer, y:integer, towerData: ITower) {
        super(scene, x, y, towerData.bullet.name)
        this.towerData = towerData
        this.bulletData = towerData.bullet
        this.x = x
        this.y = y
        this.lifespan = 1000
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
    }

    fire(monster: Monster, angle){
        // this.scene.physics.moveToObject(this, monster, 200, 1000)
        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);
    }

    update(time, delta){
        this.lifespan -= delta
        this.x += this.dx * (this.bulletData.speed);
        this.y += this.dy * (this.bulletData.speed);
        if (this.lifespan <= 0)
        {
            this.destroy()
        }
    }
}