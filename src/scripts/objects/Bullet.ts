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
    constructor(scene: Phaser.Scene, x:integer, y:integer, towerData: ITower) {
        super(scene, x, y, towerData.bullet.name)
        this.towerData = towerData
        this.bulletData = towerData.bullet
        this.x = x
        this.y = y
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
    }

    fire(monster: Monster){
        this.scene.physics.moveToObject(this, monster, this.bulletData.speed)
    }
}