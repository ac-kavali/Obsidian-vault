Terminal multiplexers let you open and manage multiple terminal sessions inside one TTY, and move between them quickly using your keyboard. They are essential for remote work over SSH, persistent long-running processes, and CTF challenges where you need multiple shells simultaneously.

## Table Of Contents
- [[#1. Installation|1. Installation]]
- [[#2. tmux — Complete Reference|2. tmux — Complete Reference]]
  - [[#2. tmux — Complete Reference#Starting & Basic Concepts <a name="tmux-basics"></a>|Starting & Basic Concepts <a name="tmux-basics"></a>]]
  - [[#2. tmux — Complete Reference#Prefix Key|Prefix Key]]
  - [[#2. tmux — Complete Reference#Sessions|Sessions]]
  - [[#2. tmux — Complete Reference#Windows|Windows]]
  - [[#2. tmux — Complete Reference#Panes|Panes]]
  - [[#2. tmux — Complete Reference#Copy Mode|Copy Mode]]
  - [[#2. tmux — Complete Reference#Configuration (~/.tmux.conf)|Configuration (~/.tmux.conf)]]
- [[#3. screen — Complete Reference|3. screen — Complete Reference]]
  - [[#3. screen — Complete Reference#Starting & Basic Concepts|Starting & Basic Concepts]]
  - [[#3. screen — Complete Reference#Windows in screen|Windows in screen]]
  - [[#3. screen — Complete Reference#Regions (Split Panes)|Regions (Split Panes)]]
  - [[#3. screen — Complete Reference#Copy Mode in screen|Copy Mode in screen]]
  - [[#3. screen — Complete Reference#Configuration (~/.screenrc)|Configuration (~/.screenrc)]]
  - [[#3. screen — Complete Reference#CTF Workflow with screen|CTF Workflow with screen]]
- [[#4. tmux vs screen — Comparison|4. tmux vs screen — Comparison]]

---
## 1. Installation

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
## 2. tmux — Complete Reference 

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
### Prefix Key 

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
### Sessions

Sessions are the top-level containers. They persist even when you detach.

| Shortcut / Command                                   | Description                                   |
| ---------------------------------------------------- | --------------------------------------------- |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> d | **Detach** from current session               |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> $ | Rename current session                        |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> s | **Switch sessions** interactively (tree view) |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> ( | Switch to previous session                    |
| <span style="color:rgb(255, 192, 0)">Ctrl+b</span> ) | Switch to next session                        |
| tmux new -s name                                     | Create a new named session                    |
| `tmux attach -t name`                                | Re-attach to a session                        |
| `tmux rename-session -t old new`                     | Rename from outside                           |

---
### Windows

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
### Panes

Panes split a window into multiple terminal regions.

#### Splitting

| Shortcut   | Description                              |
| ---------- | ---------------------------------------- |
| `Ctrl+b %` | Split pane **vertically** (left/right)   |
| `Ctrl+b "` | Split pane **horizontally** (top/bottom) |

#### Navigation

| Shortcut      | Description                                      |
| ------------- | ------------------------------------------------ |
| `Ctrl+b ←↑→↓` | Move between panes (arrow keys)                  |
| `Ctrl+b o`    | Cycle to next pane                               |
| `Ctrl+b ;`    | Toggle between last two panes                    |
| `Ctrl+b q`    | Show pane numbers, then press the number to jump |

#### Resizing

| Shortcut           | Description                    |
| ------------------ | ------------------------------ |
| `Ctrl+b Ctrl+←↑→↓` | Resize pane in arrow direction |
| `Ctrl+b Alt+←↑→↓`  | Resize pane in bigger steps    |
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
### Copy Mode

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
### Configuration (~/.tmux.conf)

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
## 3. screen — Complete Reference 

### Starting & Basic Concepts 

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
### Windows in screen 

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
### Regions (Split Panes) 

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
### Copy Mode in screen

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
### Configuration (~/.screenrc)

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
### CTF Workflow with screen

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
## 4. tmux vs screen — Comparison

| Feature                      | tmux                        | screen                |
| ---------------------------- | --------------------------- | --------------------- |
| **Default prefix**           | `Ctrl+b`                    | `Ctrl+a`              |
| **Session persistence**      | ✅ Yes                       | ✅ Yes                 |
| **Named sessions**           | ✅ Yes                       | ✅ Yes                 |
| **Multiple panes**           | ✅ Native, powerful          | ⚠️ Limited (v4.x+)    |
| **Vertical splits**          | ✅ Built-in                  | ⚠️ Needs compile flag |
| **Scripting / automation**   | ✅ Excellent                 | ⚠️ Basic              |
| **256 color support**        | ✅ Easy                      | ✅ With config         |
| **Mouse support**            | ✅ Full                      | ⚠️ Limited            |
| **Status bar**               | ✅ Highly customizable       | ✅ `hardstatus`        |
| **Copy mode**                | ✅ vi or emacs               | ✅ vi or emacs         |
| **Multi-attach**             | ✅ Native                    | ✅ `screen -x`         |
| **Config file**              | `~/.tmux.conf`              | `~/.screenrc`         |
| **Logging**                  | Via pipe-pane               | `Ctrl+a H` built-in   |
| **Pre-installed on servers** | Sometimes                   | Very common           |
| **Plugin ecosystem**         | ✅ TPM (tmux plugin manager) | ❌ None                |


