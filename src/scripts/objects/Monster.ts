import IMonster from '../Interfaces/IMonster';
import { monsters } from '../../collections/Monsters';


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
        this.monsterData = {...monsterData}
        this.actualPathElement = 0
        this.timeFromLastMove = 0
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.events.on("update", (event) => { this.update() })
        this.create()
    }


    create() {
        this.move()
        this.createAnimations()
    }

    createAnimations(){
        this.monsterData.animations.forEach(animation => {
            this.scene.anims.create({
                key: `${this.monsterData.name}-${animation.key}`,
                frames: this.scene.anims.generateFrameNumbers(this.monsterData.name, { start: animation.startFrame, end: animation.endFrame }),
                duration: this.monsterData.speed * 5,
                repeat: 5
            })
        })
    }

    move() {
        let nextPoint = this.path.shift()
        if (nextPoint) {
            this.scene.physics.moveTo(this, nextPoint.pixelX, nextPoint.pixelY, this.monsterData.speed);
            const xDiffrence = this.x - nextPoint.pixelX
            const yDiffrence = this.y - nextPoint.pixelY
            if(Math.abs(xDiffrence) > Math.abs(yDiffrence)){
                if(xDiffrence > 0){
                    this.anims.play(`${this.monsterData.name}-left`)
                }else{
                    this.anims.play(`${this.monsterData.name}-right`)
                }
            }else{
                if(yDiffrence < 0){
                    this.anims.play(`${this.monsterData.name}-down`)
                }else{
                    this.anims.play(`${this.monsterData.name}-up`)
                }
            }
        }else{
            this.destroy()
        }
    }

    receiveDamage(damage: integer){
        this.monsterData.health -= damage
        if (this.monsterData.health < 0){
            this.setActive(false)
            this.setVisible(false)
            this.destroy()
        }
    }

    update() {
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