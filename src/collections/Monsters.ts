export const monsters = {
    skeleton: {
        name: "Skeleton",
        health: 100,
        source: "skeleton.png",
        speed: 80,
        damage: 30,
        width: 32,
        height: 32,
        animations: [
            {
                "key": "left",
                "startFrame": 4,
                "endFrame": 6
            },
            {
                "key": "right",
                "startFrame": 6,
                "endFrame": 8
            },
            {
                "key": "up",
                "startFrame": 8,
                "endFrame": 10
            },
            {
                "key": "down",
                "startFrame": 1,
                "endFrame": 3
            }
        ],
        cost: 20
    },
    mage: {
        name: "Mage",
        health: 150,
        source: "mage.png",
        speed: 100,
        damage: 50,
        width: 32,
        height: 32,
        animations: [
            {
                "key": "left",
                "startFrame": 4,
                "endFrame": 6
            },
            {
                "key": "right",
                "startFrame": 6,
                "endFrame": 8
            },
            {
                "key": "up",
                "startFrame": 8,
                "endFrame": 10
            },
            {
                "key": "down",
                "startFrame": 1,
                "endFrame": 3
            }
        ],
        cost: 50
    },
    snake: {
        name: "Snake",
        health: 200,
        source: "snake.png",
        speed: 100,
        damage: 50,
        width: 32,
        height: 32,
        animations: [
            {
                "key": "left",
                "startFrame": 4,
                "endFrame": 6
            },
            {
                "key": "right",
                "startFrame": 6,
                "endFrame": 8
            },
            {
                "key": "up",
                "startFrame": 8,
                "endFrame": 10
            },
            {
                "key": "down",
                "startFrame": 1,
                "endFrame": 3
            }
        ],
        cost: 100
    }
}