# Terminal Multiplexers — Full Pro Manual

> **tmux** & **screen** — Daily use + CTF-ready reference

Terminal multiplexers let you open and manage multiple terminal sessions inside one TTY, and move between them quickly using your keyboard. They are essential for remote work over SSH, persistent long-running processes, and CTF challenges where you need multiple shells simultaneously.

---

## Table of Contents

1. [Installation](#installation)
2. [tmux — Complete Reference](#tmux)
    - [Starting & Basic Concepts](#tmux-basics)
    - [Prefix Key](#prefix-key)
    - [Sessions](#tmux-sessions)
    - [Windows](#tmux-windows)
    - [Panes](#tmux-panes)
    - [Copy Mode](#tmux-copy-mode)
    - [Configuration (~/.tmux.conf)](#tmux-config)
    - [Scripting & Automation](#tmux-scripting)
    - [CTF Workflow with tmux](#tmux-ctf)
3. [screen — Complete Reference](#screen)
    - [Starting & Basic Concepts](#screen-basics)
    - [Windows in screen](#screen-windows)
    - [Regions (Split Panes)](#screen-regions)
    - [Copy Mode in screen](#screen-copy-mode)
    - [Configuration (~/.screenrc)](#screen-config)
    - [CTF Workflow with screen](#screen-ctf)
4. [tmux vs screen — Comparison](#comparison)
5. [Pro Tips & Power Moves](#pro-tips)
6. [Quick Reference Cheatsheets](#cheatsheets)

---

## 1. Installation <a name="installation"></a>

Ensure that they are installed, or install them using your package manager:

**tmux:**

```sh
tmux
```

**screen:**

```sh
screen
```

---

## 2. tmux — Complete Reference <a name="tmux"></a>

### Starting & Basic Concepts <a name="tmux-basics"></a>

tmux uses a **server → session → window → pane** hierarchy:

```
tmux server
  └── session "pentest"
        ├── window 0: recon
        │     ├── pane 0 (left)
        │     └── pane 1 (right)
        └── window 1: exploit
              └── pane 0
```

| Command                          | Description                 |
| -------------------------------- | --------------------------- |
| `tmux`                           | Start a new unnamed session |
| `tmux new -s mysession`          | Start a new named session   |
| `tmux ls`                        | List all sessions           |
| `tmux attach`                    | Attach to last session      |
| `tmux attach -t mysession`       | Attach to a named session   |
| `tmux kill-session -t mysession` | Kill a named session        |
| `tmux kill-server`               | Kill everything             |

---
### Prefix Key <a name="prefix-key"></a>

All tmux keyboard shortcuts start with the **prefix key**, which by default is:

```
Ctrl + b
```

After pressing `Ctrl+b`, release it, then press the command key.

> **Pro tip:** Many users remap the prefix to `Ctrl+a` (like screen) in `~/.tmux.conf`:
> 
> ```
> unbind C-b
> set-option -g prefix C-a
> bind-key C-a send-prefix
> ```

---
### Sessions <a name="tmux-sessions"></a>

Sessions are the top-level containers. They persist even when you detach.

| Shortcut / Command                                   | Description                                   |
| ---------------------------------------------------- | --------------------------------------------- |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> d | **Detach** from current session               |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> $ | Rename current session                        |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> s | **Switch sessions** interactively (tree view) |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> ( | Switch to previous session                    |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> ) | Switch to next session                        |
| `tmux new -s name`                                   | Create a new named session                    |
| `tmux attach -t name`                                | Re-attach to a session                        |
| `tmux rename-session -t old new`                     | Rename from outside                           |

---
### Windows <a name="tmux-windows"></a>

Windows are like tabs inside a session.

| Shortcut                                               | Description                                 |
| ------------------------------------------------------ | ------------------------------------------- |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> c   | **Create** a new window                     |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> ,   | **Rename** current window                   |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> n   | Go to **next** window                       |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> p   | Go to **previous** window                   |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> 0-9 | Jump to window by number                    |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> w   | **List windows** interactively              |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> &   | **Kill** current window (with confirmation) |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> .   | Move window to a new index                  |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> f   | **Find** window by name                     |

---

### Panes <a name="tmux-panes"></a>

Panes split a window into multiple terminal regions.

#### Splitting

|Shortcut|Description|
|---|---|
|`Ctrl+b %`|Split pane **vertically** (left/right)|
|`Ctrl+b "`|Split pane **horizontally** (top/bottom)|

#### Navigation

|Shortcut|Description|
|---|---|
|`Ctrl+b ←↑→↓`|Move between panes (arrow keys)|
|`Ctrl+b o`|Cycle to next pane|
|`Ctrl+b ;`|Toggle between last two panes|
|`Ctrl+b q`|Show pane numbers, then press the number to jump|

#### Resizing

|Shortcut|Description|
|---|---|
|`Ctrl+b Ctrl+←↑→↓`|Resize pane in arrow direction|
|`Ctrl+b Alt+←↑→↓`|Resize pane in bigger steps|

#### Managing Panes

|Shortcut|Description|
|---|---|
|`Ctrl+b x`|**Kill** current pane|
|`Ctrl+b z`|**Zoom** (maximize/minimize) current pane|
|`Ctrl+b !`|**Break** pane into its own window|
|`Ctrl+b {`|Move pane **left**|
|`Ctrl+b }`|Move pane **right**|
|`Ctrl+b Space`|Cycle through pane layouts|

#### Preset Layouts

Press `Ctrl+b Space` repeatedly to cycle through:

- `even-horizontal` — all panes side by side
- `even-vertical` — all panes stacked
- `main-horizontal` — one big pane on top, smaller below
- `main-vertical` — one big pane on left, smaller on right
- `tiled` — balanced grid

---

### Copy Mode <a name="tmux-copy-mode"></a>

Copy mode lets you scroll, search, and copy terminal output.

|Shortcut|Description|
|---|---|
|`Ctrl+b [`|**Enter** copy mode|
|`q` or `Escape`|Exit copy mode|
|`↑ / ↓` or `k / j`|Scroll line by line|
|`Ctrl+u / Ctrl+d`|Scroll half page|
|`Ctrl+b / Ctrl+f`|Scroll full page|
|`g / G`|Jump to top / bottom|
|`/`|Search forward|
|`?`|Search backward|
|`n / N`|Next / previous search result|
|`Space`|Start selection|
|`Enter`|Copy selection|
|`Ctrl+b ]`|**Paste** copied text|

Enable vi-style copy mode in `~/.tmux.conf`:

```
setw -g mode-keys vi
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel
```

---

### Configuration (~/.tmux.conf) <a name="tmux-config"></a>

```bash
# === PREFIX ===
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix

# === GENERAL ===
set -g default-terminal "screen-256color"
set -g history-limit 50000
set -g mouse on                        # Enable mouse support
set -g base-index 1                    # Start windows at 1
setw -g pane-base-index 1

# === RELOAD CONFIG ===
bind r source-file ~/.tmux.conf \; display "Config reloaded!"

# === SPLITS (intuitive keys) ===
bind | split-window -h                 # | for vertical split
bind - split-window -v                 # - for horizontal split
unbind '"'
unbind %

# === PANE NAVIGATION (vim style) ===
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# === RESIZE PANES ===
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5

# === VI COPY MODE ===
setw -g mode-keys vi
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel

# === STATUS BAR ===
set -g status-style bg=black,fg=white
set -g status-left "#[fg=green]#S "
set -g status-right "#[fg=yellow]%H:%M #[fg=cyan]%d-%m-%Y"
set -g status-right-length 50
set -g window-status-current-style bg=green,fg=black,bold

# === WINDOW RENAMING ===
set-option -g allow-rename off

# === ACTIVITY ALERTS ===
setw -g monitor-activity on
set -g visual-activity on
```

Apply changes without restarting:

```sh
tmux source-file ~/.tmux.conf
# or inside tmux:
Ctrl+b r   # if you added the reload binding above
```

---

### Scripting & Automation <a name="tmux-scripting"></a>

You can script entire tmux layouts for instant workspace setup:

```bash
#!/bin/bash
# ctf-workspace.sh — Launch a full CTF tmux layout

SESSION="ctf"

tmux new-session -d -s $SESSION -n "recon"

# Window 1: Recon — split into 3 panes
tmux split-window -h -t $SESSION:0
tmux split-window -v -t $SESSION:0.1

# Window 2: Exploit
tmux new-window -t $SESSION -n "exploit"

# Window 3: Reverse shell listener
tmux new-window -t $SESSION -n "listener"
tmux send-keys -t $SESSION:2 "nc -lvnp 4444" Enter

# Window 4: Notes
tmux new-window -t $SESSION -n "notes"
tmux send-keys -t $SESSION:3 "vim notes.md" Enter

# Attach to session
tmux select-window -t $SESSION:0
tmux attach-session -t $SESSION
```

Useful scripting commands:

```sh
tmux send-keys -t session:window.pane "command" Enter
tmux new-window -t session -n "name"
tmux split-window -h -t session:window
tmux select-layout -t session:window tiled
```

---

### CTF Workflow with tmux <a name="tmux-ctf"></a>

**Recommended layout for a typical CTF challenge:**

```
Window 0 — recon
  ┌──────────────────┬──────────────────┐
  │  nmap / scan     │   web / burp     │
  ├──────────────────┴──────────────────┤
  │         gobuster / ffuf             │
  └─────────────────────────────────────┘

Window 1 — exploit
  ┌──────────────────┬──────────────────┐
  │   python exploit │  target shell    │
  └──────────────────┴──────────────────┘

Window 2 — listener
  nc -lvnp 4444

Window 3 — notes / loot
  vim flags.md
```

**Key CTF tmux habits:**

- Always name your session after the machine: `tmux new -s hackthebox-seal`
- Keep a listener pane always visible
- Use `Ctrl+b z` to zoom into a pane when reading long output
- Log everything: `tmux pipe-pane -o 'cat >> ~/ctf/$(date +%Y%m%d).log'`
- To log all output in a window: `Ctrl+b :pipe-pane -o 'cat >> logfile.txt'`

---

## 3. screen — Complete Reference <a name="screen"></a>

### Starting & Basic Concepts <a name="screen-basics"></a>

screen's hierarchy is simpler: **session → windows** (no native panes before GNU Screen 4.x).

|Command|Description|
|---|---|
|`screen`|Start a new unnamed session|
|`screen -S mysession`|Start a new named session|
|`screen -ls`|List all sessions|
|`screen -r`|Re-attach to last detached session|
|`screen -r mysession`|Re-attach to named session|
|`screen -x mysession`|Attach to a running session (multi-display)|
|`screen -d -r mysession`|Detach elsewhere and re-attach here|
|`screen -D -R`|Detach remote if needed and re-attach|

All screen commands begin with the **escape prefix**:

```
Ctrl + a
```

---

### Windows in screen <a name="screen-windows"></a>

|Shortcut|Description|
|---|---|
|`Ctrl+a c`|**Create** a new window|
|`Ctrl+a A`|**Rename** current window|
|`Ctrl+a n`|Go to **next** window|
|`Ctrl+a p`|Go to **previous** window|
|`Ctrl+a 0-9`|Jump to window by number|
|`Ctrl+a "`|**List** all windows interactively|
|`Ctrl+a '`|Prompt for window number/name to switch|
|`Ctrl+a Ctrl+a`|Toggle between last two windows|
|`Ctrl+a k`|**Kill** current window (with confirmation)|
|`Ctrl+a d`|**Detach** from session|
|`Ctrl+a D D`|Detach and logout|
|`Ctrl+a ?`|Show **help** / keybindings|
|`Ctrl+a :quit`|Kill the session entirely|

---

### Regions (Split Panes) <a name="screen-regions"></a>

Screen supports split regions from version 4.x onward.

|Shortcut|Description|
|---|---|
|`Ctrl+a S`|Split **horizontally** (top/bottom)|
|`Ctrl+a \|`|Split **vertically** (left/right) — may need config|
|`Ctrl+a Tab`|Move focus to next region|
|`Ctrl+a X`|**Remove** current region|
|`Ctrl+a Q`|Remove all regions except current|

After splitting, use `Ctrl+a c` to create a new window in the focused region, or `Ctrl+a n/p` to switch windows within it.

> **Note:** Vertical split (`Ctrl+a |`) requires a version of screen compiled with `--enable-vertical-split`, or add `split -v` as a key binding in `.screenrc`.

---

### Copy Mode in screen <a name="screen-copy-mode"></a>

|Shortcut|Description|
|---|---|
|`Ctrl+a [` or `Ctrl+a Esc`|Enter **copy/scrollback** mode|
|`Esc` or `Ctrl+a ]`|Exit copy mode|
|`↑ / ↓`|Scroll line by line|
|`Ctrl+u / Ctrl+d`|Scroll half page|
|`Ctrl+b / Ctrl+f`|Scroll full page|
|`g / G` (vi mode)|Go to beginning / end of scrollback|
|`/`|Search forward|
|`?`|Search backward|
|`n`|Next search result|
|`Space`|Start selection|
|`Enter`|End selection and **copy**|
|`Ctrl+a ]`|**Paste** copied text|

---

### Configuration (~/.screenrc) <a name="screen-config"></a>

```bash
# === GENERAL ===
startup_message off            # Suppress the intro message
defscrollback 10000            # Scrollback buffer lines
term screen-256color           # 256 color support
shell -$SHELL                  # Use login shell

# === DISPLAY ===
hardstatus alwayslastline
hardstatus string '%{= kG}[ %{G}%H %{g}][%= %{= kw}%?%-Lw%?%{r}(%{W}%n*%f%t%?(%u)%?%{r})%{w}%?%+Lw%?%?%= %{g}][%{B} %d/%m/%Y %{W}%c %{g}]'

# === KEY BINDINGS ===
escape ^Aa                     # Keep default Ctrl+a prefix

# Easy split navigation
bind j focus down
bind k focus up
bind h focus left
bind l focus right

# Vertical split (if supported)
bind | split -v

# === COPY MODE ===
defmode vi                     # vi-style copy mode

# === MOUSE ===
# Note: screen mouse support is limited vs tmux
```

Apply: Just restart screen or use `Ctrl+a :source ~/.screenrc`

---

### CTF Workflow with screen <a name="screen-ctf"></a>

```sh
# Start a CTF session
screen -S htb-machine

# Inside screen:
# Ctrl+a c — new window for recon
# Ctrl+a c — new window for shell/exploit
# Ctrl+a c — new window for listener
# Ctrl+a A — name each window

# Quick window overview
Ctrl+a "

# Detach to background (machine keeps running)
Ctrl+a d

# Come back later
screen -r htb-machine
```

**Logging output to file:**

```sh
Ctrl+a H       # Toggle logging current window to screenlog.0
# or start with logging enabled:
screen -L -S mysession
```

---

## 4. tmux vs screen — Comparison <a name="comparison"></a>

|Feature|tmux|screen|
|---|---|---|
|**Default prefix**|`Ctrl+b`|`Ctrl+a`|
|**Session persistence**|✅ Yes|✅ Yes|
|**Named sessions**|✅ Yes|✅ Yes|
|**Multiple panes**|✅ Native, powerful|⚠️ Limited (v4.x+)|
|**Vertical splits**|✅ Built-in|⚠️ Needs compile flag|
|**Scripting / automation**|✅ Excellent|⚠️ Basic|
|**256 color support**|✅ Easy|✅ With config|
|**Mouse support**|✅ Full|⚠️ Limited|
|**Status bar**|✅ Highly customizable|✅ `hardstatus`|
|**Copy mode**|✅ vi or emacs|✅ vi or emacs|
|**Multi-attach**|✅ Native|✅ `screen -x`|
|**Config file**|`~/.tmux.conf`|`~/.screenrc`|
|**Logging**|Via pipe-pane|`Ctrl+a H` built-in|
|**Pre-installed on servers**|Sometimes|Very common|
|**Plugin ecosystem**|✅ TPM (tmux plugin manager)|❌ None|

> **Verdict for CTF / Daily use:** Use **tmux** for local work and CTF machines. Use **screen** when on a remote server where only screen is available — it's almost universally pre-installed.

---

## 5. Pro Tips & Power Moves <a name="pro-tips"></a>

### tmux Power Moves

```sh
# Run a command in a new session without attaching
tmux new-session -d -s bg "python3 server.py"

# Run a command in a specific pane
tmux send-keys -t mysession:0.1 "nmap -sV 10.10.10.1" Enter

# Capture pane output to a file
tmux capture-pane -p -t mysession:0.0 > output.txt

# Synchronize input across all panes (type in all at once!)
Ctrl+b :setw synchronize-panes on
# Turn off:
Ctrl+b :setw synchronize-panes off

# Move a window from one session to another
Ctrl+b :move-window -t other-session

# List all key bindings
tmux list-keys

# Kill all other sessions except current
tmux kill-session -a

# Rename a window from CLI
tmux rename-window -t mysession:1 "exploit"

# Create a persistent logging pane
tmux pipe-pane -o 'cat >> ~/logs/session.log'
```

### screen Power Moves

```sh
# Attach to a session from another machine (shared screen)
screen -x username/sessionname

# Send a command to a named screen window
screen -S mysession -p 0 -X stuff "ls -la\n"

# Create a detached session with a command
screen -dmS myname bash -c "python3 exploit.py; bash"

# Screen with logging from the start
screen -L -S ctf-session

# Execute a screen command from outside
screen -S mysession -X quit
```

### Universal Pro Tips

```sh
# Keep processes alive after SSH disconnect
# SSH into server, start tmux/screen, run your process, detach
# When you reconnect: tmux attach OR screen -r

# Inside tmux: create a shared session for pair hacking
tmux new-session -s shared
# Second user attaches:
tmux attach-session -t shared
# Now both see the same terminal!

# Same in screen:
screen -S shared
# Second user:
screen -x shared

# Forward X11 and use tmux for persistent GUI sessions
ssh -X user@host
tmux new -s gui
# Run GUI tools, detach, reconnect later
```

---

## 6. Quick Reference Cheatsheets <a name="cheatsheets"></a>

### tmux Cheatsheet

```
PREFIX = Ctrl+b (default)

SESSIONS
  new -s name          Start named session
  attach -t name       Attach to session
  ls                   List sessions
  PREFIX d             Detach
  PREFIX $             Rename session
  PREFIX s             Switch sessions

WINDOWS
  PREFIX c             New window
  PREFIX ,             Rename window
  PREFIX n/p           Next/Prev window
  PREFIX 0-9           Jump to window
  PREFIX w             List windows
  PREFIX &             Kill window

PANES
  PREFIX %             Split vertical
  PREFIX "             Split horizontal
  PREFIX arrows        Navigate panes
  PREFIX o             Cycle panes
  PREFIX q             Show pane numbers
  PREFIX z             Zoom pane
  PREFIX x             Kill pane
  PREFIX !             Break to window
  PREFIX { / }         Move pane

COPY MODE
  PREFIX [             Enter copy mode
  Space                Start selection
  Enter                Copy
  PREFIX ]             Paste
  q / Esc              Exit copy mode
```

### screen Cheatsheet

```
PREFIX = Ctrl+a

SESSIONS
  screen -S name       Start named session
  screen -r name       Re-attach
  screen -ls           List sessions
  PREFIX d             Detach
  PREFIX D D           Detach + logout

WINDOWS
  PREFIX c             New window
  PREFIX A             Rename window
  PREFIX n/p           Next/Prev window
  PREFIX 0-9           Jump to window
  PREFIX "             List windows
  PREFIX k             Kill window
  PREFIX Ctrl+a        Toggle last window

REGIONS (SPLITS)
  PREFIX S             Split horizontal
  PREFIX |             Split vertical (if supported)
  PREFIX Tab           Focus next region
  PREFIX X             Remove region
  PREFIX Q             Remove all other regions

COPY MODE
  PREFIX [             Enter copy mode
  Space                Start selection
  Enter                Copy and exit
  PREFIX ]             Paste
  Esc                  Exit copy mode

MISC
  PREFIX H             Toggle logging
  PREFIX ?             Show help
  PREFIX :             Enter command mode
```

---

_Generated as a living reference — keep this in your `~/docs/` or a notes repo and update as you discover new workflows._