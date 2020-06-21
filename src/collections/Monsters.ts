export const monsters = {
    skeleton: {
        name: "Skeleton",
        health: 200,
        source: "skeleton.png",
        speed: 100,
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
        ]
    }
}