# Rock Paper Scissors - Element Reference

## HTML Elements

### Container & Layout
| Element | ID/Class | Description |
|---------|----------|-------------|
| Body | `body` | Main container wrapping all game elements |
| Container | `.container` | Wrapper with max-width 900px, centers all content |

### Header & Title
| Element | ID/Class | Description |
|---------|----------|-------------|
| Title | `.title` | "Rock Paper Scissors" heading, 3rem size, teal color (#15ccae) |

### Rounds Selector
| Element | ID/Class | Description |
|---------|----------|-------------|
| Rounds Container | `.rounds-input` | Flex container holding rounds controls |
| Label | `.rounds-input label` | Text "Rounds" label |
| Decrease Button | `#decrease` | Button with "−" to decrement rounds (min: 1) |
| Rounds Input | `#round-number` | Readonly input showing current rounds value (default: 3) |
| Increase Button | `#increase` | Button with "+" to increment rounds (max: 8) |

### Game Area (Players)
| Element | ID/Class | Description |
|---------|----------|-------------|
| Game Area | `.game-area` | Flex container holding both player sections |
| Player 1 Container | `.player-1` | Column flex for Andrew's side |
| Player 2 Container | `.player-2` | Column flex for User's side |
| Player Name | `.player-name` | "Andrew" and "You" labels, uppercase |

### Choice Display Boxes
| Element | ID/Class | Description |
|---------|----------|-------------|
| Bot Box | `.bot-box` | 150x150px box displaying Andrew's choice, pink border (#e94560) |
| Bot Image | `#bot-choice` | Image element showing Andrew's selected move (rock/paper/scissors) |
| User Box | `.user-box` | 150x150px box displaying User's choice, blue border (#0f2d8f) |
| User Image | `#user-choice` | Image element showing User's selected move (rock/paper/scissors) |

### VS Divider
| Element | ID/Class | Description |
|---------|----------|-------------|
| VS Text | `.vs` | "VS" text between players, glowing red (#e94560) |

### Score Display
| Element | ID/Class | Description |
|---------|----------|-------------|
| Score Value | `.score-value` | Shows numeric score, large pink text (2.5rem) |
| Bot Score | `#bot-score` | Andrew's current score (starts at 0) |
| User Score | `#user-score` | User's current score (starts at 0) |

### Choice Buttons
| Element           | ID/Class                              | Description                             |
| ----------------- | ------------------------------------- | --------------------------------------- |
| Choices Container | `.choices`                            | Flex container holding 3 choice buttons |
| Rock Button       | `.choice-btn[data-choice="rock"]`     | Circular button with rock image         |
| Paper Button      | `.choice-btn[data-choice="paper"]`    | Circular button with paper image        |
| Scissors Button   | `.choice-btn[data-choice="scissors"]` | Circular button with scissors image     |
| Choice Images     | `.choice-btn img`                     | 70x70px images inside buttons           |
**To Retreive each choice and add it an event listner** 
```js
const rockButton = document.querySelector('.choice-btn[data-choice="rock"]');
```

### Result Display
| Element | ID/Class | Description |
|---------|----------|-------------|
| Result Text | `#result-text` | Shows game outcome ("Choose your move!", "You win!", etc.) |
| Result Box | `.result` | Styled box with rounded corners, semi-transparent background |

---

## CSS Classes & Properties

### Global Reset
| Selector | Properties | Description |
|----------|------------|-------------|
| `*` | margin: 0, padding: 0, box-sizing: border-box | Reset all default margins/padding |

### Body & Background
| Selector | Properties | Description |
|----------|------------|-------------|
| `body` | background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #ff6600 100%) | Dark black to orange gradient |

### Container
| Selector | Properties | Description |
|----------|------------|-------------|
| `.container` | max-width: 900px, text-align: center | Centers and limits width |

### Title
| Selector | Properties | Description |
|----------|------------|-------------|
| `.title` | color: #15ccae (teal), font-size: 3rem | Game heading with text shadow |

### Rounds Input
| Selector | Properties | Description |
|----------|------------|-------------|
| `.rounds-input` | display: flex, gap: 15px | Horizontal layout for rounds controls |
| `.rounds-input label` | color: white, font-size: 1.2rem, font-weight: 600 | Label styling |
| `.round-btn` | 40x40px, border-radius: 10px, cursor: pointer | Button styling |
| `.round-btn:hover` | background: #e94560 | Pink on hover |
| `#round-number` | width: 60px, border: 2px solid #e94560, readonly | Input styling, no edit |

### Player Sections
| Selector | Properties | Description |
|----------|------------|-------------|
| `.player-1`, `.player-2` | flex-direction: column, gap: 15px | Vertical layout for each player |
| `.player-name` | color: white, font-size: 1.5rem, text-transform: uppercase | Name styling |

### Choice Boxes
| Selector | Properties | Description |
|----------|------------|-------------|
| `.bot-box` | 150x150px, border: 3px solid #e94560 (pink), border-radius: 20px | Bot choice container |
| `.user-box` | 150x150px, border: 3px solid #0f2d8f (blue), border-radius: 20px | User choice container |
| `.bot-box img`, `.user-box img` | width: 120px, height: 120px, object-fit: contain | Image sizing |
| `.bot-box:hover img`, `.user-box:hover img` | transform: scale(1.1) | Zoom on hover |

### VS Divider
| Selector | Properties | Description |
|----------|------------|-------------|
| `.vs` | color: #e94560, font-size: 2rem, font-weight: 900, text-shadow glow | "VS" styling |

### Score
| Selector | Properties | Description |
|----------|------------|-------------|
| `.score-value` | color: #e94560, font-size: 2.5rem, font-weight: 800 | Large pink score numbers |

### Choice Buttons
| Selector | Properties | Description |
|----------|------------|-------------|
| `.choices` | display: flex, gap: 30px, flex-wrap: wrap | Button container |
| `.choice-btn` | 100x100px, border-radius: 50%, circular buttons | Button base styling |
| `.choice-btn:hover` | transform: translateY(-10px), box-shadow | Lift effect on hover |
| `.choice-btn:hover img` | transform: scale(1.15) rotate(10deg) | Rotate and scale image |

### Result
| Selector | Properties | Description |
|----------|------------|-------------|
| `.result` | color: white, font-size: 1.5rem, padding: 20px, background: rgba(255,255,255,0.1), border-radius: 15px | Result message box |

---

## JavaScript Handlers

| Element ID | Event | Purpose |
|------------|-------|---------|
| `#decrease` | click | Decrease rounds value (min: 1) |
| `#increase` | click | Increase rounds value (max: 8) |
| `.choice-btn` | click | Handle rock/paper/scissors selection |
| `#bot-score` | text update | Display Andrew's score |
| `#user-score` | text update | Display User's score |
| `#bot-choice` | src update | Show Andrew's selected move |
| `#user-choice` | src update | Show User's selected move |
| `#result-text` | text update | Show round result message |

---

## File Paths

```
rcp_game/
├── html/
│   └── game.html          (main game page)
├── css/
│   └── game.css           (styling)
├── scripts/
│   └── game.js           (your logic)
└── media/
    ├── rock.png
    ├── paper.png
    ├── scissors.png
    └── game.png          (background)
```