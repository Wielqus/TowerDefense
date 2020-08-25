import IBullet from './IBullet'

export default interface ITower{
    name: string,
    range: integer,
    damage: integer,
    source: string,
    price: integer,
    width: integer,
    height: integer,
    bullet: IBullet,
}