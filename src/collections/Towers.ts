import {bullets} from './Bullets'

export const towers = {
    base_tower:{
        name: "base_tower",
        range: 100,
        damage: 10,
        source: "tower_round.png",
        width: 64,
        height: 64,
        bullet: bullets.blue_bullet,
    },
    square_tower:{
        name: "square_tower",
        range: 80,
        damage: 15,
        source: "tower_square.png",
        width: 64,
        height: 64,
        bullet: bullets.green_bullet,
    },
}