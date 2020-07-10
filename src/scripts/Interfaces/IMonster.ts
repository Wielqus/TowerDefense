export default interface IMonster {
    name: string,
    health: integer,
    source: string,
    speed: integer,
    damage: integer,
    width: integer,
    height: integer,
    hp: integer,
    animations: Array<{"key": string,"startFrame": integer,"endFrame": integer}>
        
}