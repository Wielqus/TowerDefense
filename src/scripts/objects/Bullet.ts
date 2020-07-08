import IBullet from '../Interfaces/IBullet'

export default class Bullet extends Phaser.GameObjects.Image{
    scene: Phaser.Scene
    bulletData: IBullet
    x: number
    y: number
    constructor(scene: Phaser.Scene, x:integer, y:integer, bulletData: IBullet) {
        super(scene, x, y, bulletData.name)
        this.bulletData = bulletData
}
}