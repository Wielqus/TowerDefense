import {bullets} from './Bullets'

export const towers = {
    base_tower:{
        name: "base_tower",
        range: 120,
        damage: 50,
        source: "tower_round.png",
        price: 25,
        width: 64,
        height: 64,
        bullet: bullets.blue_bullet,
        cost: 50,
    },
    square_tower:{
        name: "square_tower",
        range: 100,
        damage: 80,
        source: "tower_square.png",
        price: 30,
        width: 64,
        height: 64,
        bullet: bullets.green_bullet,
        cost: 80,
    },
}