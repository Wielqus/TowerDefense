import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  controls: Phaser.Cameras.Controls.FixedKeyControl

  constructor() {
    super({ key: 'MainScene' })
  }

  preload(){
    this.load.image("terrain", "./assets/image/terrain_atlas.png");
    this.load.tilemapTiledJSON("map", "./assets/maps/map.json");

  }

  create() {
    const map = this.make.tilemap({key: 'map'});
    const terrain = map.addTilesetImage("terrain_atlas", "terrain");

    //layers
    const botLayer = map.createStaticLayer("bot", [terrain], 0, 0)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
    // Camera movement settings
    const controlConfig = {
        camera: this.cameras.main,
        left: this.input.keyboard.addKey('A'),
        right: this.input.keyboard.addKey('D'),
        up: this.input.keyboard.addKey('W'),
        down: this.input.keyboard.addKey('S'),
        speed: 0.5
    };
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);


    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24
      })
      .setOrigin(1, 0)

      this.fpsText = new FpsText(this)  
  }

  update() {
    this.fpsText.update(this.time) // Update Fps text
    this.controls.update(50); //Update camera
  }
}
