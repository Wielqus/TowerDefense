import IBullet from './IBullet'

export default interface ITower{
    name: string,
    range: integer,
    damage: integer,
    source: string,
    width: integer,
    height: integer,
    bullet: IBullet,
    cost: number,
}