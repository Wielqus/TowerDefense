import { monsters } from './Monsters';
export let maps = [
    {
        "name":     "Test map 2",
        "jsonFile": "./assets/maps/Map1.json",
        "tileSets":  [
            {
                "name":     "terrain_atlas",
                "source":   "./assets/image/terrain_atlas.png"
            }
        ],
        "layers": [
            {
                "name": "Bot",
            },
            {
                "name": "Top",
            },
            {
                "name": "Objects",
            }
        ],
        "waves": [
            [
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
            ],
            [
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
                monsters.mage,
                monsters.mage,
                monsters.snake
            ]
        ]
    },
    {
        "name":     "Kreta",
        "jsonFile": "./assets/maps/Kreta3.json",
        "tileSets":  [
            {
                "name":     "terrain_atlas",
                "source":   "./assets/image/terrain_atlas.png"
            }
        ],
        "layers": [
            {
                "name": "Bot",
            },
            {
                "name": "Top",
            },
            {
                "name": "Objects",
            }
        ],
        "waves": [
            [
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
            ],
            [
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
                monsters.skeleton,
                monsters.mage,
                monsters.mage,
                monsters.snake
            ]
        ]
    }


]