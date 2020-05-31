import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'MainScene' })
  }

  preload(){
    this.load.image("terrain", "./assets/image/terrain_atlas.png");
    this.load.tilemapTiledJSON("map", "./assets/maps/mappy.json");

  }

  create() {
    this.fpsText = new FpsText(this)

    let mappy = this.add.tilemap("map");

    let terrain = mappy.addTilesetImage("terrain_atlas", "terrain");

    //layers
    let botLayer = mappy.createStaticLayer("bot", [terrain], 0, 0).setDepth(-1);
    let topLayer = mappy.createStaticLayer("top", [terrain], 0, 0);


    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24
      })
      .setOrigin(1, 0)
  }

  update() {
    this.fpsText.update()
  }
}
