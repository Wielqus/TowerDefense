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
    monster: Monster
    
    constructor(scene: Phaser.Scene, x:integer, y:integer, towerData: ITower, monster: Monster) {
        super(scene, x, y, towerData.bullet.name)
        this.scene = scene
        this.towerData = towerData
        this.bulletData = towerData.bullet
        this.x = x
        this.y = y
        this.lifespan = 1000
        this.monster = monster
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
    }

    // fire(monster: Monster, angle){
    //     // this.scene.physics.moveToObject(this, monster, 200, 1000)
    //     // this.dx = Math.cos(angle);
    //     // this.dy = Math.sin(angle);
    //     this.monster = monster
    // }

    update(time, delta, monster){
        this.lifespan -= delta
        this.scene.physics.moveToObject(this, this.monster, this.bulletData.speed)
        if (this.lifespan <= 0)
        {
            this.destroy()
        }
    }
}