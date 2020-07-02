import ITower from '../Interfaces/ITower';
import Monster from './Monster';

export default class Tower extends Phaser.GameObjects.Image {
    scene: Phaser.Scene
    towerData: ITower
    x: number
    y: number
    range_cricle: Phaser.GameObjects.Arc

    constructor(scene: Phaser.Scene, x:integer, y:integer, towerData: ITower) {
        super(scene, x, y, towerData.name)
        this.towerData = towerData
        this.x = x
        this.y = y
        scene.add.existing(this)
        this.activateInteractions()
    }

    draw_range(scene:Phaser.Scene){
       this.range_cricle =  scene.add.circle(this.x, this.y, this.towerData.range, 0, 0.2)
    }
    
    enemies_nearby(enemies: Array<any>){
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
            if(!this.range_cricle){
                this.draw_range(this.scene)
            }else{
                this.range_cricle.setVisible(true)
            }

        })
        this.on('pointerout', () =>{
            this.range_cricle.setVisible(false)
        })
    }
}