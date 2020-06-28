import IMonster from '../Interfaces/IMonster';


export default class MonsterButton extends Phaser.GameObjects.Image {
    scene: Phaser.Scene

    constructor(scene: Phaser.Scene, x: number, y:number, monster: IMonster, callback?){
        super(scene, x, y, monster.name)
        scene.add.existing(this)
        .setInteractive()
        .on('pointerdown', () => {
            callback()
        });
        return this
    }

}