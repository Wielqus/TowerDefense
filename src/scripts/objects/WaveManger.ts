import { Scene } from "phaser";
import EventDispatcher from '../EventDispatcher'
import IMonster from '../Interfaces/IMonster'
import Monster from './Monster'
import Map from './Map'

export default class WafeManger{
    time: integer
    round: integer
    scene: Scene
    timer: any
    emitter: EventDispatcher
    waves: Array<Array<IMonster>>
    map: Map

    constructor(scene: Scene, waves: Array<Array<IMonster>>, map: Map){
        this.round = 1;
        this.time = 15;
        this.scene = scene
        this.waves = waves
        this.map = map
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on('stop_counting', this.stopCounting, this)
        this.startCounting()
    }

    startCounting(){
        this.timer = this.scene.time.addEvent({
            delay: 1000,                // ms
            callback: this.setTime,
            callbackScope: this,
            repeat: 14
        });
    }

    stopCounting(){
        this.time = 0
        this.timer.remove();
        this.emitter.emit("change_time", this.time, this.round)
        this.startWave()
    }

    setTime(){
        this.time = this.time - 1
        if(this.time === 0){
            this.stopCounting()
            return
        }
        this.emitter.emit("change_time", this.time, this.round)
    }

    startWave(){
        const wave = this.waves.pop()
        if (wave) {
            wave.forEach((monster) => {
                
                setTimeout(() => {
                    const monsterInstance = new Monster(this.scene, this.map.getRandomPath(), monster).on("finish", () => {
                        this.emitter.emit('monsterFinished', monster)
                      })
                }, Math.random() * 5000)
            })
        }
    }

}