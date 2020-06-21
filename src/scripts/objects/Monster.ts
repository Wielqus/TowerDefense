import IMap from '../Interfaces/IMap';

export default class Monster extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene
    path: Array<Phaser.Tilemaps.Tile>
    actualPathElement: integer
    timeFromLastMove: number

    constructor(scene: Phaser.Scene, path: Array<Phaser.Tilemaps.Tile>) {
        super(scene, path[0].pixelX, path[0].pixelY, "dude")
        this.scene = scene
        this.path = Array.from(path)
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
            this.scene.physics.moveTo(this, nextPoint.pixelX, nextPoint.pixelY, 300);
        } else {
            this.destroy()
            this.setActive(false)
            this.setInteractive(false)
        }
    }

    update(time?, delta?) {
        if (this.path[0]) {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, this.path[0].pixelX, this.path[0].pixelY);
            if (distance < 50) {
                this.move()
            }

        }
    }

    public static getSprites(): Array<{ name: string, source: string }> {
        return [
            { "name": "dude", "source": "./assets/monsters/dude.png" }
        ]
    }
}