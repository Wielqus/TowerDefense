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
  const healthDiffrenceText: HTMLElement | null = document.querySelector("#health-diffrence-text")
  const healthText: HTMLElement | null = document.querySelector('#health-text')
  const roundInfoContainer: HTMLElement | null = document.querySelector('#round-info-container')
  const winModal: HTMLElement | null = document.querySelector("#win-modal")
  const loseModal: HTMLElement | null = document.querySelector("#lose-modal")
  const playAgainButtons: Array<HTMLButtonElement> = Array.from(document.querySelectorAll('.play-again-button'))
  const menuButtons: Array<HTMLButtonElement> = Array.from(document.querySelectorAll(".menu-button"))
  const emitter = EventDispatcher.getInstance()
  let textTimer: any

    
  /*
  if(startGame){
    startGame.style.display = "none";
  }
  game.scene.start('MainScene', {map: maps[0]})
  */

  playAgainButtons.forEach(button => {
    button.addEventListener('click', () => {
      if(mapSelect){
        if(!loseModal?.classList.contains('hidden')){
          loseModal?.classList.add('hidden')
        }
        if(!winModal?.classList.contains('hidden')){
          winModal?.classList.add('hidden')
        }
        game.scene.start('MainScene', {map: maps[mapSelect.value]});
      }
    })
  })

  menuButtons.forEach(button => {
    button.addEventListener('click', () => {
      if(!loseModal?.classList.contains('hidden')){
        loseModal?.classList.add('hidden')
      }
      if(!winModal?.classList.contains('hidden')){
        winModal?.classList.add('hidden')
      }
      gameContainers.forEach(container => {
        container.style.display = "none"
        if(startGameContainer){
          startGameContainer.style.display = "fl ex"
        }
      })
    })
  })
  
  startNowButton?.addEventListener('click', () => {
    emitter.emit('stop_counting')
  })

  emitter.on("win", () => {
    if(winModal?.classList.contains('hidden')){
      winModal?.classList.remove('hidden')
    }
    game.scene.stop("MainScene")
  })

  emitter.on("lose", () => {
    if(loseModal?.classList.contains('hidden')){
      loseModal?.classList.remove('hidden')
    }
    game.scene.stop("MainScene")
  })

  emitter.on('changeHealth', (actualHealth: integer, previousHealth: integer) => {
    if(healthDiffrenceText){
      const diffrence = (actualHealth - previousHealth)
      if(diffrence){
        healthDiffrenceText.classList.remove('hide-transition')
        healthDiffrenceText.classList.add('show-transition');
        healthDiffrenceText.textContent = diffrence.toString()
        window.clearTimeout(textTimer)
        textTimer = window.setTimeout(() => {
          healthDiffrenceText.classList.remove('show-transition')
          healthDiffrenceText.classList.add('hide-transition');
        }, 1000);
      }
      if(healthText){
        healthText.textContent = actualHealth.toString()
      }
      
      
    }
    
  })

  emitter.on('startNewWave', () => {
    if(roundInfoContainer){
      roundInfoContainer.classList.remove('hide-transition')
      roundInfoContainer.classList.add('show-transition')
    }
  })

  emitter.on('change_time', (time, round) => {
    if(secondsToStartText && roundText){
      secondsToStartText.textContent = time
      roundText.textContent = round
    }
    if(time === 0 && roundInfoContainer){
      roundInfoContainer.classList.remove('show-transition')
      roundInfoContainer.classList.add('hide-transition')
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
