import IMap from '../Interfaces/IMap';
import IPath from '../Interfaces/IPath';

export default class Monster extends Phaser.GameObjects.Sprite {
    scene: Phaser.Scene
    path: IPath

    constructor(scene: Phaser.Scene, path: IPath) {
        console.log(path[0])
        super(scene, path[0].x, path[0].y, "dude")
        this.scene = scene
        this.path = path
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.events.on("update", (event) => {this.update()})
        this.create()
    }


    create() {
        console.log(this.path)
    }

    update() {
        if(this.scene.input.keyboard.addKey("left").isDown){
            this.setX(this.x - 5);
        }
        if(this.scene.input.keyboard.addKey("right").isDown){
            this.setX(this.x + 5);
        }
        if(this.scene.input.keyboard.addKey("down").isDown){
            this.setY(this.y + 5);
        }
        if(this.scene.input.keyboard.addKey("up").isDown){
            this.setY(this.y - 5);
        }
    }

    public static getSprites(): Array<{name: string, source: string}>{
        return [
            {"name": "dude", "source":"./assets/monsters/dude.png"}
        ]
    }
}