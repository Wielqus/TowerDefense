export default class Monster extends Phaser.GameObjects.Sprite {
    scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, "dude")
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.events.on("update", (event) => {this.update()})
        
        
        this.create()
    }


    create() {
        
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