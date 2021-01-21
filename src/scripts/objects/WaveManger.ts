import { Scene } from "phaser";
import EventDispatcher from '../EventDispatcher'

export default class WafeManger{
    time: integer
    round: integer
    scene: Scene
    timer: any
    emitter: EventDispatcher

    constructor(scene: Scene){
        this.round = 1;
        this.time = 15;
        this.scene = scene
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
    }

    setTime(){
        this.time = this.time - 1
        this.emitter.emit("change_time", this.time, this.round)
    }

    


}