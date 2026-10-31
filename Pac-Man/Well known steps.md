
###### 1. Variable and constant initialisations 
###### 2. the game loop
- Should handle the keyboard events _(keyboard input, closing the window, etc.)_
- Updating the game _(moving Pac-Man, ghosts, checking collisions.)_
- rendring graphics:drawing the maze, Pac-Man, ghosts, and score.
- Controlling FPS keeping the game running at a consistent speed.






---
### Loop game 

![[Pasted image 20261030105612.png|458]]

You have the base code of the [main.py](https://github.com/ac-kavali/Pac-man-game-with-python/blob/main/code_base), You should replace every title with appropriate peice of code

## Logic behind Graphics 
_The main loop continuously updates and draws the game. Each completed image displayed on the screen is called a frame._
![[Pasted image 20261030111535.png]]
Each frame draws Pac-Man in a slightly different position, creating the illusion of movement.


--- 
What I need now 

```
config = parser.parse_config(input_json, default_param)
game = Game(config)
```


--- 
## Calling the maze generator
```
# Pseudocode — these are not verified package methods.
settings = config["level"][level_index]

maze = generate_with_assigned_package(
    width=settings["width"],
    height=settings["height"],
    seed=config["seed"] if level_index == 0 else random_seed,
    perfect=False,
)

level = Level(
    maze=maze,
    time_limit=config["level_max_time"],
)
```

`Level` would be your own class. It receives the generated maze; it does not replace the maze generator.