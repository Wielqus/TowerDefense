import IMonster from '../Interfaces/IMonster'

export default class Monster extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene
    path: Array<Phaser.Tilemaps.Tile>
    actualPathElement: integer
    timeFromLastMove: number
    monsterData: IMonster

    constructor(scene: Phaser.Scene, path: Array<Phaser.Tilemaps.Tile>, monsterData: IMonster) {
        super(scene, path[0].pixelX, path[0].pixelY, monsterData.name)
        this.scene = scene
        this.path = Array.from(path)
        this.monsterData = monsterData
        this.actualPathElement = 0
        this.timeFromLastMove = 0
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.events.on("update", (event) => { this.update() })
        this.create()
    }


    create() {
        this.move()
    }

    move() {
        let nextPoint = this.path.shift()
        if (nextPoint) {
            this.scene.physics.moveTo(this, nextPoint.pixelX, nextPoint.pixelY, this.monsterData.speed);
        }else{
            this.destroy()
        }
    }

    update(time?, delta?) {
        if (this.path[0]) {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, this.path[0].pixelX, this.path[0].pixelY);
            if (distance < 50) {
                this.move()
            }
        }else{
            this.move()
        }
    }
}