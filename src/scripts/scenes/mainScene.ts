import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text

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
    this.cameras.main.startFollow(this.input.activePointer)

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
    this.fpsText.update()
  }
}
