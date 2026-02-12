# Environment Variables vs Bash Variables

### Introduction

> This is a comprehensive guide to understanding the difference between environment variables and bash variables in Linux and Unix-like systems. While they may seem similar, these two types of variables have distinct characteristics, scopes, and use cases. Understanding the difference is crucial for writing effective shell scripts, configuring applications, and managing your system properly.

## Table of Contents


---

# What are Variables in Bash

Variables in bash are named storage locations that hold data. They allow you to store values and reference them later in your scripts or commands.

## Basic Concept

A variable consists of:

- **Name**: An identifier (case-sensitive)
- **Value**: The data stored in the variable
- **Scope**: Where the variable can be accessed

```bash
# Simple variable assignment
name="John"
age=30

# Using variables
echo "My name is $name and I am $age years old"
```

### Variable Naming Rules

- Must start with a letter or underscore
- Can contain letters, numbers, and underscores
- **Case-sensitive**: `VAR` and `var` are different
- **No spaces** around the `=` sign
- By convention, environment variables use **UPPERCASE**
- By convention, local variables use **lowercase**

```bash
# Valid variable names
name="Alice"
_temp="value"
user_count=10
PATH2="/custom/path"

# Invalid variable names
2ndvar="no"      # Cannot start with number
my-var="no"      # Hyphens not allowed
my var="no"      # Spaces not allowed
```

## Two Types of Variables

Bash has two main types of variables:

1. **Shell Variables** (Local Variables): Only available in the current shell
2. **Environment Variables**: Available to the current shell AND child processes

```bash
# This distinction matters for script execution and process hierarchy
LOCAL_VAR="stays in this shell"
export ENVIRONMENT_VAR="passed to child processes"
```

---

# Bash Variables (Local/Shell Variables)

**Shell variables** (also called local variables) exist only in the current shell session and are not passed to child processes.

## Creating Shell Variables

```bash
# Simple assignment (no spaces around =)
username="alice"
count=42
message="Hello, World!"

# Accessing the value
echo $username
echo "Count is: $count"
echo ${message}  # Braces are optional but recommended
```

## Characteristics of Shell Variables

**1. Local to the current shell**

```bash
# Set in current shell
MY_VAR="local value"
echo $MY_VAR  # Output: local value

# Start a new bash shell (child process)
bash
echo $MY_VAR  # Output: (empty - variable doesn't exist here)
exit

# Back in parent shell
echo $MY_VAR  # Output: local value (still exists)
```

**2. Not inherited by child processes**

```bash
# In script: parent.sh
#!/bin/bash
LOCAL_VAR="I am local"
./child.sh  # This script won't see LOCAL_VAR
```

**3. Exist only for the current session**

```bash
# Set in terminal
temp_var="temporary"
# Close terminal and reopen
echo $temp_var  # (empty - variable is gone)
```

## When to Use Shell Variables

Use shell variables when:

- The variable is only needed in the current script
- You don't want child processes to see the variable
- You're working with temporary data
- You want to keep variables private to a function

```bash
#!/bin/bash
# Script using local variables

# These are only needed in this script
script_name="backup.sh"
log_file="/tmp/backup.log"
temp_dir="/tmp/backup_temp"

echo "Running $script_name"
mkdir -p "$temp_dir"
```

## Viewing Shell Variables

```bash
# See all variables (shell + environment)
set

# Filter for specific variables
set | grep MY

# Check if a variable is set
if [ -n "$MY_VAR" ]; then
    echo "MY_VAR is set"
fi
```

---

# Environment Variables

**Environment variables** are variables that are available to the current shell AND all child processes spawned from it. They form the "environment" in which processes run.

## Creating Environment Variables

Use the `export` command to create or promote a variable to an environment variable:

```bash
# Method 1: Create and export in one step
export MY_ENV_VAR="environment value"

# Method 2: Create first, then export
MY_ENV_VAR="environment value"
export MY_ENV_VAR

# Method 3: Export without value (promotes existing variable)
LOCAL_VAR="value"
export LOCAL_VAR
```

## Characteristics of Environment Variables

**1. Inherited by child processes**

```bash
# Set environment variable
export PARENT_VAR="I am shared"

# Start child shell
bash -c 'echo $PARENT_VAR'
# Output: I am shared
```

**2. Available to all subprocesses**

```bash
# In parent script
#!/bin/bash
export DATABASE_URL="postgresql://localhost/mydb"
./child_script.sh  # This script CAN see DATABASE_URL
python app.py      # This program CAN see DATABASE_URL
```

**3. Can be permanent or temporary**

```bash
# Temporary (current session only)
export TEMP_VAR="temporary"

# Permanent (add to ~/.bashrc or ~/.bash_profile)
echo 'export PERMANENT_VAR="always here"' >> ~/.bashrc
```

## Common Environment Variables

The system and applications use many predefined environment variables:

```bash
# User and session info
echo $USER          # Current username
echo $HOME          # User's home directory
echo $SHELL         # Current shell path
echo $HOSTNAME      # Computer's hostname

# Path and execution
echo $PATH          # Directories to search for commands
echo $PWD           # Current working directory
echo $OLDPWD        # Previous working directory

# Terminal and display
echo $TERM          # Terminal type
echo $DISPLAY       # X11 display (for GUI apps)
echo $LANG          # System language and encoding

# Process information
echo $PID           # Current shell's process ID
echo $PPID          # Parent process ID
echo $$             # Current process ID (alternative)
```

## When to Use Environment Variables

Use environment variables when:

- Configuration needs to be shared across multiple processes
- Child processes need access to the value
- You're setting up application configuration
- You want persistent settings across sessions

```bash
#!/bin/bash
# Application configuration using environment variables

export APP_ENV="production"
export DATABASE_URL="postgresql://localhost/mydb"
export API_KEY="secret-key-123"
export LOG_LEVEL="info"

# All child processes will have access to these
python app.py
```

## Viewing Environment Variables

```bash
# See all environment variables
env
# or
printenv

# See specific environment variable
env | grep PATH
printenv PATH
echo $PATH

# See all variables (shell + environment)
set
```

---

# Key Differences

Understanding the differences helps you choose the right type of variable for your needs.

### Scope and Inheritance

|Aspect|Shell Variable|Environment Variable|
|---|---|---|
|**Scope**|Current shell only|Current shell + children|
|**Inheritance**|Not inherited|Inherited by children|
|**Created with**|`VAR=value`|`export VAR=value`|
|**Viewed with**|`set`|`env` or `printenv`|

```bash
# Demonstration of scope difference
SHELL_VAR="local"
export ENV_VAR="global"

# Start a child bash process
bash -c 'echo "Shell var: $SHELL_VAR"'  # Output: Shell var: (empty)
bash -c 'echo "Env var: $ENV_VAR"'      # Output: Env var: global
```

## Lifetime and Persistence

```bash
# Shell variable: Dies when shell closes
MY_VAR="temporary"

# Environment variable: Also dies when shell closes (unless permanent)
export MY_ENV_VAR="temporary"

# Permanent environment variable: Add to startup file
echo 'export PERMANENT="always here"' >> ~/.bashrc
# Now PERMANENT exists in every new shell
```

## Memory and Performance

**Shell variables:**

- Slightly faster (no export overhead)
- Use less memory (not duplicated to children)
- Better for internal script variables

**Environment variables:**

- Slightly slower (copied to each child)
- Use more memory (duplicated to children)
- Better for configuration that needs sharing

```bash
# For internal calculations, use shell variables
counter=0
temp_result=42

# For configuration passed to programs, use environment
export CONFIG_FILE="/etc/app/config.ini"
export DEBUG_MODE="true"
```

## Modification Propagation

**Critical concept**: Changes to variables do **NOT** propagate to parent processes!

```bash
# Parent shell
export PARENT_VAR="original"
echo $PARENT_VAR  # Output: original

# Start child shell
bash
export PARENT_VAR="modified"
echo $PARENT_VAR  # Output: modified
exit

# Back in parent
echo $PARENT_VAR  # Output: original (unchanged!)
```

This is why sourcing scripts is different from executing them:

```bash
# Execute script (runs in child shell - changes lost)
./script.sh

# Source script (runs in current shell - changes persist)
source script.sh
# or
. script.sh
```

---

# Working with Variables

Learn how to effectively create, modify, use, and remove both types of variables.

## Setting Variables

```bash
# Shell variable
name="Alice"
count=10

# Environment variable (three methods)
export ENV_VAR="value"              # Method 1
ENV_VAR="value"; export ENV_VAR     # Method 2
ENV_VAR="value" && export ENV_VAR   # Method 3

# Multiple environment variables
export VAR1="value1" VAR2="value2" VAR3="value3"
```

## Reading Variables

```bash
# Basic reading
echo $MY_VAR
echo ${MY_VAR}  # Recommended with braces

# With default values
echo ${UNDEFINED_VAR:-"default"}    # Use default if unset
echo ${UNDEFINED_VAR:="default"}    # Set and use default if unset

# Check if set
echo ${DEFINED_VAR:?"Error: variable not set"}
```

## Modifying Variables

```bash
# Update existing variable
MY_VAR="original"
MY_VAR="updated"

# Append to variable
PATH="${PATH}:/new/path"
MESSAGE="${MESSAGE} additional text"

# Modify and export
LOCAL_VAR="value"
export LOCAL_VAR  # Promote to environment variable
```

## Removing Variables

```bash
# Remove shell variable
unset MY_VAR

# Remove environment variable
unset MY_ENV_VAR

# Note: unset removes from current shell only
export PARENT_VAR="value"
bash -c 'unset PARENT_VAR; echo $PARENT_VAR'  # Empty in child
echo $PARENT_VAR  # Still exists in parent
```

## Listing Variables

```bash
# List all shell + environment variables
set

# List only environment variables
env
printenv

# List variables with specific prefix
env | grep '^MY_'
set | grep '^my_'

# Count variables
echo "Environment variables: $(env | wc -l)"
echo "All variables: $(set | wc -l)"
```

## Variable Expansion Techniques

```bash
# Basic expansion
echo $VAR
echo ${VAR}

# Length of variable
echo ${#VAR}

# Substring extraction
TEXT="Hello World"
echo ${TEXT:0:5}    # Output: Hello
echo ${TEXT:6}      # Output: World

# Pattern removal
FILE="report.txt"
echo ${FILE%.txt}   # Output: report (remove suffix)
echo ${FILE#*.}     # Output: txt (remove prefix)

# Search and replace
PATH="/usr/bin:/bin"
echo ${PATH/bin/sbin}     # Replace first occurrence
echo ${PATH//bin/sbin}    # Replace all occurrences
```

---

# Practical Use Cases

Real-world scenarios showing when to use each type of variable.

## Use Case 1: Script Configuration

```bash
#!/bin/bash
# backup.sh - Using both types appropriately

# Shell variables (internal to script)
script_name=$(basename "$0")
timestamp=$(date +%Y%m%d_%H%M%S)
temp_dir="/tmp/backup_$$"
log_file="/var/log/backup.log"

# Environment variables (for child processes)
export BACKUP_DIR="${BACKUP_DIR:-/backup}"
export RETENTION_DAYS="${RETENTION_DAYS:-7}"
export COMPRESSION="${COMPRESSION:-gzip}"

# Use environment variables in child processes
tar -czf "${BACKUP_DIR}/backup_${timestamp}.tar.gz" /data

# Use shell variables internally
echo "[$timestamp] Backup completed" >> "$log_file"
rm -rf "$temp_dir"
```

## Use Case 2: Application Configuration

```bash
#!/bin/bash
# app-runner.sh - Running an application with configuration

# Set environment variables for the application
export DATABASE_HOST="localhost"
export DATABASE_PORT="5432"
export DATABASE_NAME="myapp"
export DATABASE_USER="appuser"
export DATABASE_PASSWORD="secret123"

export API_BASE_URL="https://api.example.com"
export LOG_LEVEL="info"
export MAX_CONNECTIONS="100"

# Internal script variables
app_path="/opt/myapp/app.py"
pid_file="/var/run/myapp.pid"

# Start application (inherits all exported variables)
python "$app_path" &
echo $! > "$pid_file"
```

## Use Case 3: Build Systems

```bash
#!/bin/bash
# build.sh - Compilation with environment control

# Environment variables for compiler
export CC="gcc"
export CFLAGS="-O2 -Wall -Wextra"
export LDFLAGS="-L/usr/local/lib"
export PREFIX="/usr/local"

# Get number of CPU cores for parallel builds
cpu_cores=$(nproc)
export MAKEFLAGS="-j${cpu_cores}"

# Shell variables for build tracking
build_dir="./build"
source_dir="./src"
build_log="build_$(date +%Y%m%d).log"

# Configure and build (child processes use environment variables)
./configure --prefix="$PREFIX" 2>&1 | tee "$build_log"
make 2>&1 | tee -a "$build_log"
```

## Use Case 4: Multi-Environment Deployment

```bash
#!/bin/bash
# deploy.sh - Deploy to different environments

environment=${1:-development}

# Set environment-specific variables
case $environment in
    production)
        export APP_ENV="production"
        export DATABASE_URL="postgresql://prod-db:5432/app"
        export REDIS_URL="redis://prod-redis:6379"
        export LOG_LEVEL="warning"
        export ENABLE_DEBUG="false"
        ;;
    staging)
        export APP_ENV="staging"
        export DATABASE_URL="postgresql://staging-db:5432/app"
        export REDIS_URL="redis://staging-redis:6379"
        export LOG_LEVEL="info"
        export ENABLE_DEBUG="true"
        ;;
    development)
        export APP_ENV="development"
        export DATABASE_URL="postgresql://localhost:5432/app_dev"
        export REDIS_URL="redis://localhost:6379"
        export LOG_LEVEL="debug"
        export ENABLE_DEBUG="true"
        ;;
esac

# Internal script variables
deploy_user="deployer"
deploy_dir="/opt/app"

echo "Deploying to: $environment"
echo "Database: $DATABASE_URL"

# Run deployment
./run_deployment.sh
```

## Use Case 5: PATH Management

```bash
#!/bin/bash
# setup-dev-environment.sh

# Save original PATH
ORIGINAL_PATH="$PATH"

# Add custom directories to PATH (environment variable)
export PATH="/usr/local/go/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="$HOME/bin:$PATH"

# Set other development environment variables
export GOPATH="$HOME/go"
export NODE_ENV="development"
export EDITOR="vim"

# Shell variables for script logic
config_dir="$HOME/.config/dev"
installed_tools=()

# Check what's available
if command -v go &>/dev/null; then
    installed_tools+=("go")
    echo "Go version: $(go version)"
fi

if command -v node &>/dev/null; then
    installed_tools+=("node")
    echo "Node version: $(node --version)"
fi

echo "Installed tools: ${installed_tools[*]}"
```

## Use Case 6: Docker Container Configuration

```bash
#!/bin/bash
# docker-run.sh - Running containers with environment

# Export environment variables for container
export MYSQL_ROOT_PASSWORD="rootpass123"
export MYSQL_DATABASE="appdb"
export MYSQL_USER="appuser"
export MYSQL_PASSWORD="apppass123"

# Shell variables for container management
container_name="myapp_db"
image_name="mysql:8.0"
volume_name="myapp_data"

# Run container (inherits environment variables)
docker run -d \
    --name "$container_name" \
    -v "$volume_name:/var/lib/mysql" \
    -e MYSQL_ROOT_PASSWORD \
    -e MYSQL_DATABASE \
    -e MYSQL_USER \
    -e MYSQL_PASSWORD \
    "$image_name"

echo "Container $container_name started"
```

---

# Best Practices

Follow these guidelines to use variables effectively and avoid common pitfalls.

## Naming Conventions

```bash
# Environment variables: UPPERCASE
export DATABASE_URL="postgresql://localhost/db"
export API_KEY="secret-key"
export LOG_LEVEL="info"

# Shell variables: lowercase
script_name="backup.sh"
temp_file="/tmp/temp_file"
counter=0

# Constants: UPPERCASE (even if not exported)
readonly MAX_RETRIES=3
readonly TIMEOUT=60

# Private/internal: prefix with underscore
_internal_var="internal use only"
_temp_result=$(calculate_something)
```

## Always Quote Variables

```bash
# BAD: Unquoted variables can cause issues
file_name=$USER_INPUT
rm $file_name  # Dangerous if contains spaces or special chars

# GOOD: Quoted variables are safe
file_name="$USER_INPUT"
rm "$file_name"  # Safe with spaces

# Use curly braces for clarity
echo "${username}_log.txt"
echo "$username_log.txt"  # Might be ambiguous
```

## Check Before Using

```bash
# Check if variable is set
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL not set"
    exit 1
fi

# Use default values
port=${PORT:-8080}
timeout=${TIMEOUT:-30}

# Require variable to be set
: "${REQUIRED_VAR:?Error: REQUIRED_VAR must be set}"
```

## Use Local in Functions

```bash
# Without local: variable leaks to global scope
function bad_example() {
    temp="leaked"  # This becomes global!
}

bad_example
echo $temp  # Output: leaked (oops!)

# With local: variable stays in function
function good_example() {
    local temp="contained"  # Only exists in function
    echo "$temp"
}

good_example  # Output: contained
echo $temp    # Output: (empty - good!)
```

## Export Only What's Needed

```bash
# BAD: Exporting everything
export temp_var="temporary"
export counter=0
export result=""

# GOOD: Export only what child processes need
temp_var="temporary"    # Keep local
counter=0               # Keep local
result=""              # Keep local

export API_KEY="xyz"    # This needs to be inherited
export DATABASE_URL=""  # This needs to be inherited
```

## Use Configuration Files

```bash
# config.env - Configuration file
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=myapp
API_KEY=secret123
LOG_LEVEL=info

# script.sh - Load configuration
#!/bin/bash

# Load and export configuration
if [ -f config.env ]; then
    # Method 1: Source and export
    source config.env
    export DATABASE_HOST DATABASE_PORT DATABASE_NAME API_KEY LOG_LEVEL
    
    # Method 2: Export while loading
    set -a  # Auto-export all variables
    source config.env
    set +a  # Turn off auto-export
fi
```

## Unsetting Variables Properly

```bash
# When you're done with sensitive data
export PASSWORD="secret"
# ... use it ...
unset PASSWORD

# Unset multiple variables
unset VAR1 VAR2 VAR3

# Verify it's gone
if [ -z "$PASSWORD" ]; then
    echo "Password cleared"
fi
```

## Debugging Variables

```bash
# Show all variables and their export status
declare -p

# Show only exported variables
declare -px

# Debug specific variable
declare -p MY_VAR

# Enable debugging
set -x  # Print commands before executing
export DEBUG_VAR="test"
set +x  # Disable debugging
```

## Document Your Variables

```bash
#!/bin/bash
# script.sh - Well-documented variable usage

# Environment Variables (must be set before running):
#   DATABASE_URL - PostgreSQL connection string
#   API_KEY - Authentication key for external API
#   LOG_LEVEL - Logging verbosity (debug|info|warning|error)

# Check required environment variables
: "${DATABASE_URL:?Error: DATABASE_URL must be set}"
: "${API_KEY:?Error: API_KEY must be set}"

# Optional environment variables with defaults
export LOG_LEVEL="${LOG_LEVEL:-info}"
export TIMEOUT="${TIMEOUT:-30}"

# Internal shell variables
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
log_file="${script_dir}/app.log"
pid_file="/var/run/app.pid"
```

---

# Summary

Understanding the distinction between shell variables and environment variables is crucial:

**Shell Variables:**

- Local to current shell
- Not inherited by child processes
- Created with `VAR=value`
- Use for internal script logic
- Viewed with `set`

**Environment Variables:**

- Available to current shell AND children
- Inherited by child processes
- Created with `export VAR=value`
- Use for configuration and sharing
- Viewed with `env` or `printenv`

**Key Principles:**

- Use UPPERCASE for environment variables
- Use lowercase for shell variables
- Quote your variables
- Export only what needs to be inherited
- Document your variable requirements
- Use `local` in functions
- Check variables before using them

Master these concepts to write more robust, maintainable shell scripts and properly configure your applications!
[[Bash]]