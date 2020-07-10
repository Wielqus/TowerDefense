export const monsters = {
    skeleton: {
        name: "Skeleton",
        health: 200,
        source: "skeleton.png",
        speed: 100,
        damage: 30,
        width: 32,
        height: 32,
        hp: 10,
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
        ]
    },
    mage: {
        name: "Mage",
        health: 100,
        source: "mage.png",
        speed: 150,
        damage: 50,
        width: 32,
        height: 32,
        hp: 15,
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
        ]
    },
    snake: {
        name: "Snake",
        health: 100,
        source: "snake.png",
        speed: 170,
        damage: 50,
        width: 32,
        height: 32,
        hp: 20,
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
        ]
    }
}