import ITower from '../Interfaces/ITower';

export default class Tower extends Phaser.GameObjects.Image {
    scene: Phaser.Scene
    towerData: ITower
    
    constructor(scene: Phaser.Scene, x:integer, y:integer, towerData: ITower) {
        super(scene, x, y, towerData.name)
        scene.add.existing(this)
    }

    draw_range(scene:Phaser.Scene, x:integer, y:integer, towerData:ITower){
        
    }
}