export default class Button extends Phaser.GameObjects.Text{

    constructor(scene: Phaser.Scene, x:number, y:number, text:string, style:{}){
        super(scene, x, y, text, style)
        this.scene = scene;
        this.scene.add.existing(this)
        this.setOrigin(0.5);
        this.setInteractive({ useHandCursor: true});
       
        this.on('pointerover', () => {
            this.enterButtonHoverState();
        })
        this.on('pointerout', () => {
            this.enterButtonRestState();
        })

        this.on('pointerdown', () =>{
            this.enterButtonActiveState();
        })

        this.on('pointerup', () =>{
            this.enterButtonRestState();
            this.emit('clicked');
        })
    }

    enterButtonHoverState(){
        this.setStyle({ fill: '#BBE6E4'});
    }

    enterButtonRestState(){
        this.setStyle({ fill: '#FFFFFF'});
    }

    enterButtonActiveState(){
        this.setStyle({ fill: '#42BFDD'});
    }
}
