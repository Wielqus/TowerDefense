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

    const map = this.add.tilemap("map");

    const terrain = map.addTilesetImage("terrain_atlas", "terrain");

    //layers
    const botLayer = map.createStaticLayer("bot", [terrain], 0, 0).setDepth(-1);
    const topLayer = map.createStaticLayer("top", [terrain], 0, 0);

    var cursors = this.input.keyboard.addKeys({
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right'
  });

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
    var cursors = this.input.keyboard.createCursorKeys();
    if (this.input.keyboard.addKey('D').isDown)
    {
        this.cameras.main.x -= 10;
    }

    if (this.input.keyboard.addKey('A').isDown)
    {
        this.cameras.main.x += 10;
    }

    if (this.input.keyboard.addKey('S').isDown)
    {
        this.cameras.main.y -= 10;
    }

    if (this.input.keyboard.addKey('W').isDown)
    {
        this.cameras.main.y += 10;
    }

  }
}
