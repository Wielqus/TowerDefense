import 'phaser'
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import MainScene from './scenes/MainScene'
import PreloadScene from './scenes/preloadScene'
import MenuScene from './scenes/menuScene';
import { maps } from '../collections/Maps';

const DEFAULT_WIDTH = window.innerWidth
const DEFAULT_HEIGHT = window.innerHeight

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene, MenuScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  }
}

window.addEventListener('load', () => {
  const startGame: HTMLElement | null = document.querySelector('#start-game')
  const game: Phaser.Game = new Phaser.Game(config)
  const mapButtons: Array<HTMLElement>  = Array.from(document.querySelectorAll('.mapButton'))
  const pauseButton: HTMLElement | null = document.querySelector('#pauseButton')
  const resumeButton: HTMLElement | null = document.querySelector('#resumeButton')
  const restartButton: HTMLElement | null = document.querySelector('#restartButton')
  const exitButton: HTMLElement | null = document.querySelector('#exitButton')
  const pauseModal: HTMLElement | null = document.querySelector('#pauseModal')

  game.events.on('finish', () => {
    if(startGame){
      startGame.style.display = "flex";
    }
    if(pauseButton){
      pauseButton.style.display = "none"
    }
    if(pauseModal){
      pauseModal.classList.remove('is-active')
    }
    game.scene.remove('MainScene')
  })

  pauseButton?.addEventListener('click', () => {
    if(pauseModal){
      pauseModal.classList.add('is-active')
      game.scene.pause("MainScene")
    }
  })

  resumeButton?.addEventListener('click', () => {
    if(pauseModal){
      pauseModal.classList.remove('is-active')
      game.scene.resume("MainScene")
    }
  })

  restartButton?.addEventListener('click', () => {
    if(pauseModal){
      pauseModal.classList.remove('is-active')
      game.scene.start('MainScene', {map: maps[0]})
    }
  })

  exitButton?.addEventListener('click', () => {
    if(startGame){
      startGame.style.display = "flex";
    }
    if(pauseButton){
      pauseButton.style.display = "none"
    }
    if(pauseModal){
      pauseModal.classList.remove('is-active')
    }
    game.scene.stop('MainScene')
  })

  mapButtons.forEach(button => {
    button.addEventListener('click', () => {
      if(startGame){
        startGame.style.display = "none";
      }
      if(pauseButton){
        pauseButton.style.display = "block"
      }
      if(button.dataset.index){
        game.scene.remove("MainScene");
        game.scene.add("MainScene", MainScene);
        game.scene.start('MainScene', {map: maps[button.dataset.index]})
      }
    })
  })


})
