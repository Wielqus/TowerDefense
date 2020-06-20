export default class Debug{
    scene: Phaser.Scene
    text
    debugToolsList: Array<{"description": string, "key"?: string, "actionOn": () => any, "actionOff": () => any, "on": boolean}>
    constructor(scene: Phaser.Scene){
        this.scene = scene
        this.debugToolsList = []
    }

    create(){        
        this.text = this.scene.add.text(16, 16, this.getDebugMessages(), {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff'
        });
    }

    set(index: integer, description: string, key?: string, actionOn: () => any = () => {}, actionOff: () => any = () => {}){
        this.debugToolsList[index] = {
            "description": description,
            "key": key,
            "actionOn": actionOn,
            "actionOff": actionOff,
            "on": false
        }
    }

    add(description: string, key?: string, actionOn: () => any = () => {}, actionOff: () => any = () => {}){
        this.debugToolsList.push({
            "description": description,
            "key": key,
            "actionOn": actionOn,
            "actionOff": actionOff,
            "on": false
        })
    }

    getDebugMessages() : string{
        return this.debugToolsList.map(element => {
            return `${element.description} ${element.key ? "- "+element.key : ""}`
        }).join("\n")





    }

    update(){
        this.text.setText(this.getDebugMessages());
        this.debugToolsList.forEach(tool => {
            if(tool.key){
                let key = this.scene.input.keyboard.addKey(tool.key);
                if(Phaser.Input.Keyboard.JustDown(key)){
                    if(tool.on){
                        tool.actionOn()
                    }else{
                        tool.actionOff()
                    }
                    tool.on = !tool.on
                }
            }
        })
    }




}