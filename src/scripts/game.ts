import 'phaser'
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_WIDTH = window.innerWidth
const DEFAULT_HEIGHT = window.innerHeight

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
