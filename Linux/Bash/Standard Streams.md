### Introduction
> This is a comprehensive guide to understanding Linux streams, file descriptors, and redirection. In Linux and Unix-like operating systems, everything is treated as a file, including the input and output streams. This guide will help you master how to control where your data comes from and where it goes.

## Table of Contents
- [[#The 3 Streams (File Descriptors)]]
- [[#Output Redirection]]
- [[#Input Redirection]]
- [[#Using read for Input]]
---

# The 3 Streams (File Descriptors)

In Linux, every process has three standard streams that are automatically opened when the process starts. These streams are represented by **file descriptors** (FD), which are integers that identify open files or streams.

**Standard Input (stdin)** - File Descriptor 0

- This is where a program reads its input from
- By default, it's connected to the keyboard
- Programs wait for data from stdin when they need user input

**Standard Output (stdout)** - File Descriptor 1

- This is where a program writes its normal output
- By default, it's connected to the terminal screen
- Success messages and regular output go here

**Standard Error (stderr)** - File Descriptor 2

- This is where a program writes its error messages
- By default, it's also connected to the terminal screen
- Error messages and warnings go here, separate from normal output

```bash
# Example: seeing all three streams in action
ls /validdir /invaliddir
# Output (stdout, FD 1): lists contents of /validdir
# Error (stderr, FD 2): "ls: cannot access '/invaliddir': No such file or directory"
# Input (stdin, FD 0): not used in this command
```

### Why Separate stdout and stderr?

Separating normal output from error messages allows you to:

- Redirect them independently
- Process successful output while still seeing errors
- Log errors separately from regular output
- Build more robust scripts and pipelines

```bash
# You can see the difference with redirection
ls /validdir /invaliddir > output.txt
# Regular output goes to output.txt
# Error messages still appear on screen (stderr)
```

---

# Output Redirection

Output redirection allows you to control where the output of commands goes, instead of displaying it on the screen.

### Redirecting stdout

Use the `>` operator to redirect standard output to a file. This **overwrites** the file if it exists.

```bash
# Redirect stdout to a file (overwrites)
echo "Hello World" > output.txt

# Append stdout to a file (adds to end)
echo "Another line" >> output.txt

# Redirect stdout explicitly using FD 1
ls -l 1> filelist.txt
```

## Redirecting stderr

Use `2>` to redirect standard error to a file.

```bash
# Redirect only errors to a file
ls /invaliddir 2> errors.txt

# Append errors to a file
ls /anotherInvalidDir 2>> errors.txt
```

## Redirecting Both stdout and stderr

There are several ways to redirect both streams:

**Method 1: Redirect to the same file**

```bash
# Modern syntax (recommended)
command &> output.txt

# Traditional syntax
command > output.txt 2>&1
```

**Method 2: Redirect to different files**

```bash
# Send stdout to one file, stderr to another
command > output.txt 2> errors.txt

# Practical example
gcc myprogram.c > compile_output.txt 2> compile_errors.txt
```

## Understanding 2>&1

The syntax `2>&1` means "redirect file descriptor 2 (stderr) to wherever file descriptor 1 (stdout) is currently going."

```bash
# This redirects both stdout and stderr to output.txt
ls /validdir /invaliddir > output.txt 2>&1

# Order matters! This doesn't work as expected:
ls /validdir /invaliddir 2>&1 > output.txt
# (stderr goes to screen, then stdout is redirected)
```

## Throwing Output Away to /dev/null

**`/dev/null`** is a special file that discards everything written to it. It's often called the "black hole" or "bit bucket."

```bash
# Discard stdout (only see errors)
command > /dev/null

# Discard stderr (only see normal output)
command 2> /dev/null

# Discard everything (silent execution)
command &> /dev/null
# or
command > /dev/null 2>&1
```

**Practical examples:**

```bash
# Find files without seeing permission errors
find / -name "myfile" 2> /dev/null

# Check if a command succeeds without seeing output
if grep -q "pattern" file.txt 2> /dev/null; then
    echo "Pattern found"
fi

# Run a noisy command silently
apt-get update > /dev/null 2>&1
```

---

# Input Redirection

Input redirection allows you to provide input to a command from a file instead of typing it manually.

## Basic stdin Redirection

Use the `<` operator to redirect a file's contents to stdin.

```bash
# Read input from a file
sort < unsorted.txt

# Equivalent to (but more explicit):
cat unsorted.txt | sort
```

## Here Documents (<<)

A **here document** allows you to provide multi-line input directly in your script or command.

```bash
# Syntax: command << DELIMITER
cat << EOF
This is line 1
This is line 2
This is line 3
EOF

# Practical example: creating a file
cat << 'SCRIPT_END' > myscript.sh
#!/bin/bash
echo "This is my script"
echo "With multiple lines"
SCRIPT_END
```

## Here Strings (<<<)

A **here string** passes a string directly as stdin.

```bash
# Syntax: command <<< "string"
bc <<< "5 + 3"
# Output: 8

# Read variables
read name <<< "John Doe"
echo "Name is: $name"

# With grep
grep "error" <<< "This is an error message"
```

## Combining Input and Output Redirection

```bash
# Read from input.txt, write to output.txt
sort < input.txt > output.txt

# Read from input.txt, append sorted output
sort < input.txt >> sorted_output.txt

# Complex example with both streams
command < input.txt > output.txt 2> errors.txt
```

---

# Using read for Input

The `read` command is a built-in shell command that reads a line from stdin and assigns it to variables.

## Basic read Usage

```bash
# Read into a single variable
echo "Enter your name:"
read name
echo "Hello, $name"

# Read multiple variables (splits by whitespace)
echo "Enter first and last name:"
read firstname lastname
echo "Hello, $firstname $lastname"
```

## read with Prompts

Use the `-p` option to display a prompt:

```bash
# Inline prompt
read -p "Enter your age: " age
echo "You are $age years old"

# Multiple prompts
read -p "Username: " username
read -p "Password: " password
```

## read Options

**Silent input (for passwords):**

```bash
# -s hides the input (silent mode)
read -sp "Enter password: " password
echo  # New line after hidden input
echo "Password saved"
```

**Timeout:**

```bash
# -t sets a timeout in seconds
if read -t 5 -p "Quick! Enter your name: " name; then
    echo "Hello, $name"
else
    echo "Too slow!"
fi
```

**Reading exactly N characters:**

```bash
# -n reads exactly N characters
read -n 1 -p "Press any key to continue..."
echo  # New line

# Read single character for yes/no
read -n 1 -p "Do you want to continue? (y/n): " answer
echo
if [[ $answer == "y" ]]; then
    echo "Continuing..."
fi
```

## read with Input Redirection

```bash
# Read from a file
read line < file.txt
echo "First line: $line"

# Read in a loop
while read line; do
    echo "Processing: $line"
done < input.txt

# Read CSV-like data with IFS
while IFS=',' read name age city; do
    echo "Name: $name, Age: $age, City: $city"
done < data.csv
```

## Advanced read Techniques

**Read into an array:**

```bash
# -a reads into an array
read -a words -p "Enter some words: "
echo "First word: ${words[0]}"
echo "All words: ${words[@]}"
```

**Default values:**

```bash
# Check if variable is empty and provide default
read -p "Enter your name [Default User]: " name
name=${name:-"Default User"}
echo "Hello, $name"
```

**Reading until a delimiter:**

```bash
# -d sets a custom delimiter (instead of newline)
read -d ":" username
echo "Username is: $username"
```

## Practical read Examples

**Interactive script:**

```bash
#!/bin/bash
read -p "Enter filename: " filename
read -p "Enter search pattern: " pattern

if grep -q "$pattern" "$filename" 2>/dev/null; then
    echo "Pattern found in $filename"
else
    echo "Pattern not found or file doesn't exist"
fi
```

**Menu system:**

```bash
#!/bin/bash
echo "1. Option 1"
echo "2. Option 2"
echo "3. Exit"
read -p "Choose an option: " choice

case $choice in
    1) echo "You chose option 1" ;;
    2) echo "You chose option 2" ;;
    3) echo "Goodbye!" ;;
    *) echo "Invalid option" ;;
esac
```

**Reading file line by line with error handling:**

```bash
#!/bin/bash
filename="data.txt"

if [[ ! -f "$filename" ]]; then
    echo "Error: File not found" >&2
    exit 1
fi

while IFS= read -r line; do
    echo "Processing: $line"
done < "$filename"
```

---

# Summary

Understanding streams and redirection is fundamental to Linux command-line mastery:

- **Three streams**: stdin (0), stdout (1), stderr (2)
- **Output redirection**: `>`, `>>`, `2>`, `2>>`, `&>`
- **Input redirection**: `<`, `<<`, `<<<`
- **/dev/null**: The black hole for unwanted output
- **read command**: Flexible input handling with many options

Master these concepts to write more powerful and flexible shell scripts!
