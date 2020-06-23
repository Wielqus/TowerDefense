import ITower from '../Interfaces/ITower';

export default class Tower extends Phaser.GameObjects.Image {
    scene: Phaser.Scene
    towerData: ITower
    position: object
    
    constructor(scene: Phaser.Scene, x:integer, y:integer, towerData: ITower) {
        super(scene, x, y, towerData.name)
        this.towerData = towerData
        this.position = {'x': x, 'y': y}
        scene.add.existing(this)
    }
    // active(){

    // }
    draw_range(scene:Phaser.Scene){
        
    }

}