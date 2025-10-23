#!/bin/bash

# Log file (hidden in home directory)
LOGFILE="$HOME/.pull_log"

# Start of new log section (two newlines before)
echo -e "\n\n🔁 Starting auto git pull at $(date)" >> "$LOGFILE"

# Repository 1
if [ -d "/home/achahi/Desktop/libft" ]; then
    echo "➡️ Pulling /home/achahi/Desktop/libft" >> "$LOGFILE"
    cd /home/achahi/Desktop/libft
    git pull >> "$LOGFILE" 2>&1
else
    echo "❌ Missing /home/achahi/Desktop/libft" >> "$LOGFILE"
fi

# Repository 2
if [ -d "/home/achahi/Documents/Obsidian vault" ]; then
    echo "➡️ Pulling /home/achahi/Documents/Obsidian vault" >> "$LOGFILE"
    cd /home/achahi/Documents/"Obsidian vault"
    git pull >> "$LOGFILE" 2>&1
else
    echo "❌ Missing /home/achahi/Documents/Obsidian Vault" >> "$LOGFILE"
fi

# End of log section (two newlines after)
echo -e "✅ Done at $(date)\n\n" >> "$LOGFILE"