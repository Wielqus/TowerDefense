import 'phaser'
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import SceneWatcherPlugin from 'phaser-plugin-scene-watcher';
import MainScene from './scenes/MainScene'
import PreloadScene from './scenes/preloadScene'
import MenuScene from './scenes/menuScene';
import { maps } from '../collections/Maps';
import EventDispatcher from './EventDispatcher'

const DEFAULT_WIDTH: number = window.innerWidth
const DEFAULT_HEIGHT: number = window.innerHeight

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
  const startGameContainer: HTMLElement | null = document.querySelector('#start-game-container')
  const game: Phaser.Game = new Phaser.Game(config)
  const mapButtons: Array<HTMLElement>  = Array.from(document.querySelectorAll('.mapButton'))
  const pauseButton: HTMLElement | null = document.querySelector('#pauseButton')
  const resumeButton: HTMLElement | null = document.querySelector('#resumeButton')
  const restartButton: HTMLElement | null = document.querySelector('#restartButton')
  const exitButton: HTMLElement | null = document.querySelector('#exitButton')
  const pauseModal: HTMLElement | null = document.querySelector('#pauseModal')
  const mapSelect: HTMLSelectElement | null = document.querySelector('#map-select')
  const gameContainers: Array<HTMLSelectElement> | null = Array.from(document.querySelectorAll('.game-container'))
  const secondsToStartText: HTMLElement | null = document.querySelector('#seconds-to-start-text')
  const roundText: HTMLElement | null = document.querySelector('#round-text')
  const startNowButton: HTMLButtonElement | null = document.querySelector('#start-now-button')
  const emitter = EventDispatcher.getInstance()

  /*
  if(startGame){
    startGame.style.display = "none";
  }
  game.scene.start('MainScene', {map: maps[0]})
  */

  startNowButton?.addEventListener('click', () => {
    emitter.emit('stop_counting')
    startNowButton.disabled = true
  })

  emitter.on('change_time', (time, round) => {
    if(secondsToStartText && roundText){
      secondsToStartText.textContent = time
      roundText.textContent = round
    }
    console.log(time)
    if(time === 0 && startNowButton){
      startNowButton.disabled = true
    }
  })


  startGame?.addEventListener('click', () => {
    if(startGameContainer){
      startGameContainer.style.display = "none";
    }
    if(mapSelect){
      game.scene.start('MainScene', {map: maps[mapSelect.value]})
      gameContainers.forEach(container => {
        container.style.display = "flex"
      })
    }
    
  })

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
