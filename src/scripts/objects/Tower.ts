import ITower from '../Interfaces/ITower';
import Monster from './Monster';

export default class Tower extends Phaser.GameObjects.Image {
    scene: Phaser.Scene
    towerData: ITower
    x: number
    y: number
    rangeCricle: Phaser.GameObjects.Arc

    constructor(scene: Phaser.Scene, x:integer, y:integer, towerData: ITower) {
        super(scene, x, y, towerData.name)
        this.towerData = towerData
        this.x = x
        this.y = y
        scene.add.existing(this)
        this.activateInteractions()
    }

    drawRange(scene:Phaser.Scene){
       this.rangeCricle =  scene.add.circle(this.x, this.y, this.towerData.range, 0, 0.2)
    }
    
    enemiesNearby(enemies: Array<any>){
        enemies.forEach(enemy => {
            if(enemy.active && Phaser.Math.Distance.Between(enemy.x, enemy.y, this.x, this.y) <= this.towerData.range){
                this.shot(enemy)
            }
        })
    }
    
    shot(enemy:Monster){
        let angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
        console.log('shot', `angle: ${angle}`)
    }
    
    activateInteractions(){
        this.setInteractive()
        this.on('pointerover', () => {
            if(!this.rangeCricle){
                this.drawRange(this.scene)
            }else{
                this.rangeCricle.setVisible(true)
            }

        })
        this.on('pointerout', () =>{
            this.rangeCricle.setVisible(false)
        })
    }
}
