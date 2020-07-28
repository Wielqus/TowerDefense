import IBullet from '../Interfaces/IBullet'
import ITower from '../Interfaces/ITower'
import Monster from './Monster'

export default class Bullet extends Phaser.Physics.Arcade.Image{
    scene: Phaser.Scene
    towerData: ITower
    bulletData: IBullet
    x: number
    y: number
    lifespan: number
    monster: Monster
    
    constructor(scene: Phaser.Scene, x:integer, y:integer, towerData: ITower, monster: Monster) {
        super(scene, x, y, towerData.bullet.name)
        this.scene = scene
        this.towerData = towerData
        this.bulletData = towerData.bullet
        this.x = x
        this.y = y
        this.lifespan = 600
        this.monster = monster
        this.addOverlapWithTarget()
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
    }
    
    addOverlapWithTarget(){
        this.scene.physics.add.overlap(this, this.monster, this.applyDamageToTarget)
    }

    applyDamageToTarget(bullet, monster){
       monster.receiveDamage(bullet.towerData.damage)
       bullet.destroy()
    }

    update(time, delta){
        this.lifespan -= delta
        this.scene.physics.moveToObject(this, this.monster, this.bulletData.speed)
        if (this.lifespan <= 0)
        {
            this.destroy()
        }
    }
}