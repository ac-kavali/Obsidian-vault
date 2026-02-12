## Introduction

> This is a quick-start guide to creating your first bash script. A bash script is simply a text file containing a series of commands that the shell can execute. Instead of typing commands one by one, you write them in a file and run them all at once. This guide will walk you through creating, writing, and executing your very first script in just a few minutes!

## Table of Contents



---

## Why use scripting

```bash
# Instead of typing these commands every time:
cd /var/log
ls -lh
tail -n 20 syslog

# Put them in a script and run once:
./check_logs.sh
```

**Before scripts:**

```bash
# Manual steps (error-prone, tedious)
$ mkdir backup
$ cd backup
$ cp /important/file1.txt .
$ cp /important/file2.txt .
$ tar -czf backup.tar.gz *.txt
$ rm *.txt
```

**With a script:**

```bash
# One command (fast, reliable)
$ ./backup.sh
```

---

# Creating Your First Script

Let's create the simplest possible bash script!

## Step 1: Create the File

Open a text editor and create a new file:

```bash
# Using nano (beginner-friendly)
nano hello.sh

# Or using vim
vim hello.sh

# Or using any text editor
gedit hello.sh
```

## Step 2: Write the Shebang

The **shebang** (`#!`) is the first line that tells the system which interpreter to use:

```bash
#!/bin/bash
```

**Why is the shebang important?**

- Tells the system to use bash to interpret this file
- Must be the very first line (no blank lines before it)
- Must start with `#!` followed by the path to bash

```bash
# CORRECT
#!/bin/bash
echo "Hello"

# WRONG - blank line before shebang
 
#!/bin/bash
echo "Hello"

# WRONG - space before shebang
 #!/bin/bash
echo "Hello"
```

##  Step 3: Add Your Commands

Add commands below the shebang:

```bash
#!/bin/bash
echo "Hello, World!"
echo "This is my first script!"
```

### Step 4: Save the File

- In **nano**: Press `Ctrl+O` to save, `Ctrl+X` to exit
- In **vim**: Press `Esc`, type `:wq`, press `Enter`
- In **gedit**: Click Save

**Your complete first script:**

```bash
#!/bin/bash
echo "Hello, World!"
echo "This is my first script!"
```

---

# Making Scripts Executable

By default, new files are not executable. You need to give the file execute permission.

## Check Current Permissions

```bash
ls -l hello.sh
# Output: -rw-r--r-- 1 user user 57 Feb 11 10:30 hello.sh
#         ^
#         No 'x' means not executable
```

## Add Execute Permission

```bash
# Make it executable for yourself
chmod +x hello.sh

# Verify it worked
ls -l hello.sh
# Output: -rwxr-xr-x 1 user user 57 Feb 11 10:30 hello.sh
#         ^
#         'x' means executable!
```

## Understanding chmod

```bash
# Different ways to add execute permission
chmod +x script.sh          # Add execute for all users
chmod u+x script.sh         # Add execute for owner only
chmod 755 script.sh         # rwxr-xr-x (owner can write, all can execute)
chmod 700 script.sh         # rwx------ (only owner can do anything)
```

**Permission breakdown:**

- `r` = read (4)
- `w` = write (2)
- `x` = execute (1)
- `755` = 7(owner:rwx) 5(group:r-x) 5(others:r-x)

---

# Running Your Script

There are several ways to execute your script.

### Method 1: Direct Execution (Recommended)

```bash
# Run from current directory
./hello.sh

# Run with full path
/home/user/scripts/hello.sh
```

**Why the `./` ?**

- `.` means "current directory"
- `/` is the path separator
- `./hello.sh` means "run hello.sh from the current directory"
- Without `./`, the shell looks in `$PATH` directories only

```bash
# This WON'T work (unless script is in $PATH)
hello.sh
# Output: hello.sh: command not found

# This WILL work
./hello.sh
# Output: Hello, World!
```

## Method 2: Using bash Command

```bash
# No execute permission needed
bash hello.sh

# Works even without shebang
bash script_without_shebang.sh
```

## Method 3: Using source or .

```bash
# Runs in current shell (not subshell)
source hello.sh

# Shorthand for source
. hello.sh
```

**Difference between methods:**

```bash
# ./hello.sh runs in subshell (new process)
# source hello.sh runs in current shell (same process)

# Example showing the difference:
# test.sh contains: cd /tmp

./test.sh
pwd  # Still in original directory

source test.sh
pwd  # Now in /tmp (current shell was affected)
```

## Making Scripts Available Everywhere

To run scripts without `./`, add them to a directory in your `$PATH`:

```bash
# Create personal bin directory
mkdir -p ~/bin

# Move script there
mv hello.sh ~/bin/

# Add to PATH (add to ~/.bashrc for permanent)
export PATH="$HOME/bin:$PATH"

# Now you can run from anywhere
hello.sh  # Works from any directory!
```

---

# Basic Script Elements

Learn the essential components of bash scripts.

## Comments

Comments explain your code and are ignored by bash:

```bash
#!/bin/bash

# This is a comment - it doesn't execute
echo "This will print"  # Inline comment

# Comments are useful for:
# - Explaining what the script does
# - Documenting complex logic
# - Temporarily disabling code
```

## Echo Command

The `echo` command prints text to the screen:

```bash
#!/bin/bash

# Simple text
echo "Hello, World!"

# With variables
name="Alice"
echo "Hello, $name!"

# Multiple arguments
echo "One" "Two" "Three"

# Without newline (use -n)
echo -n "No newline"
echo " - continued on same line"

# With special characters (use -e)
echo -e "Line 1\nLine 2\tTabbed"
```

## Variables

Store and reuse values:

```bash
#!/bin/bash

# Create variables
name="John"
age=30
city="New York"

# Use variables
echo "Name: $name"
echo "Age: $age"
echo "City: $city"

# Better: use braces
echo "Hello, ${name}!"
```

## User Input

Read input from the user:

```bash
#!/bin/bash

# Ask for input
echo "What is your name?"
read name

# Use the input
echo "Hello, $name!"

# Inline prompt
read -p "Enter your age: " age
echo "You are $age years old"
```

## Basic Math

Perform simple calculations:

```bash
#!/bin/bash

# Using $(( ))
num1=10
num2=5
sum=$((num1 + num2))
echo "Sum: $sum"

# Operations
echo "Addition: $((10 + 5))"
echo "Subtraction: $((10 - 5))"
echo "Multiplication: $((10 * 5))"
echo "Division: $((10 / 5))"
echo "Modulo: $((10 % 3))"
```

## Conditions

Make decisions in your script:

```bash
#!/bin/bash

age=18

if [ $age -ge 18 ]; then
    echo "You are an adult"
else
    echo "You are a minor"
fi

# With elif
score=85

if [ $score -ge 90 ]; then
    echo "Grade: A"
elif [ $score -ge 80 ]; then
    echo "Grade: B"
elif [ $score -ge 70 ]; then
    echo "Grade: C"
else
    echo "Grade: F"
fi
```

---

# Your First Real Script

Let's create a practical script that does something useful!

### Example 1: System Information Script

```bash
#!/bin/bash
# system_info.sh - Display system information

echo "================================"
echo "    SYSTEM INFORMATION"
echo "================================"
echo

echo "Hostname: $(hostname)"
echo "Current User: $(whoami)"
echo "Current Date: $(date)"
echo "Uptime: $(uptime -p)"
echo

echo "Disk Usage:"
df -h / | tail -1

echo
echo "Memory Usage:"
free -h | grep Mem

echo
echo "================================"
```

**Save, make executable, and run:**

```bash
chmod +x system_info.sh
./system_info.sh
```

## Example 2: Simple Backup Script

```bash
#!/bin/bash
# backup.sh - Backup important files

# Variables
source_dir="$HOME/Documents"
backup_dir="$HOME/Backups"
date=$(date +%Y%m%d_%H%M%S)
backup_file="backup_${date}.tar.gz"

# Create backup directory if it doesn't exist
mkdir -p "$backup_dir"

# Create backup
echo "Starting backup..."
tar -czf "${backup_dir}/${backup_file}" "$source_dir"

# Check if successful
if [ $? -eq 0 ]; then
    echo "Backup successful!"
    echo "Backup saved to: ${backup_dir}/${backup_file}"
else
    echo "Backup failed!"
fi
```

## Example 3: Interactive Greeting Script

```bash
#!/bin/bash
# greet.sh - Interactive greeting script

# Get user's name
read -p "What is your name? " name

# Get current hour
hour=$(date +%H)

# Determine greeting based on time
if [ $hour -lt 12 ]; then
    greeting="Good morning"
elif [ $hour -lt 18 ]; then
    greeting="Good afternoon"
else
    greeting="Good evening"
fi

# Display personalized greeting
echo
echo "================================"
echo "$greeting, $name!"
echo "Welcome to the system."
echo "Today is $(date +%A), $(date +%B' '%d', '%Y)"
echo "================================"
```

## Example 4: File Counter Script

```bash
#!/bin/bash
# count_files.sh - Count different types of files

# Get directory (use current if not specified)
dir=${1:-.}

# Count different file types
txt_files=$(find "$dir" -type f -name "*.txt" 2>/dev/null | wc -l)
sh_files=$(find "$dir" -type f -name "*.sh" 2>/dev/null | wc -l)
total_files=$(find "$dir" -type f 2>/dev/null | wc -l)
total_dirs=$(find "$dir" -type d 2>/dev/null | wc -l)

# Display results
echo "File Statistics for: $dir"
echo "=========================="
echo "Text files (.txt): $txt_files"
echo "Shell scripts (.sh): $sh_files"
echo "Total files: $total_files"
echo "Total directories: $total_dirs"
```

## Example 5: Simple Menu Script

```bash
#!/bin/bash
# menu.sh - Simple menu system

while true; do
    echo
    echo "===== MAIN MENU ====="
    echo "1. Show date and time"
    echo "2. Show current directory"
    echo "3. List files"
    echo "4. Exit"
    echo "====================="
    
    read -p "Choose an option [1-4]: " choice
    
    case $choice in
        1)
            echo "Current date and time: $(date)"
            ;;
        2)
            echo "Current directory: $(pwd)"
            ;;
        3)
            echo "Files in current directory:"
            ls -lh
            ;;
        4)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid option. Please choose 1-4."
            ;;
    esac
    
    read -p "Press Enter to continue..."
done
```

---

# Quick Reference

## Complete First Script Template

```bash
#!/bin/bash
# script_name.sh - Brief description of what this script does
# Author: Your Name
# Date: 2026-02-11

# Variables
variable_name="value"

# Main script logic
echo "Script is running..."

# Your code here

echo "Script completed!"
```

## Common First Steps Checklist

1. ✓ Create file: `nano script.sh`
2. ✓ Add shebang: `#!/bin/bash`
3. ✓ Write commands
4. ✓ Save file
5. ✓ Make executable: `chmod +x script.sh`
6. ✓ Run script: `./script.sh`

## Quick Commands

```bash
# Create and edit
nano myscript.sh

# Make executable
chmod +x myscript.sh

# Run script
./myscript.sh

# Check for errors
bash -n myscript.sh

# Debug (show each command)
bash -x myscript.sh
```

---

# Summary

You've learned how to create your first bash script:

- **Shebang**: `#!/bin/bash` must be the first line
- **Create**: Write commands in a text file
- **Permissions**: Use `chmod +x script.sh` to make executable
- **Execute**: Run with `./script.sh`
- **Comments**: Use `#` to explain your code
- **Variables**: Store values for reuse
- **Echo**: Print output to screen

**Next Steps:**

- Practice with the example scripts above
- Experiment with different commands
- Start automating your daily tasks
- Learn about loops, functions, and error handling

Happy scripting! 🚀

[[Bash]]