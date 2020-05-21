import 'phaser';

export default class Demo extends Phaser.Scene
{

    preload ()
    {
        
    }

    create ()
    {
        
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: false,
    },
    scene: null,
    backgroundColor: 0x333333
};

const game = new Phaser.Game(config);
