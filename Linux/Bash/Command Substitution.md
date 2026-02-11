### Introduction

> This is a comprehensive guide to command substitution in Linux and Unix-like systems. Command substitution allows you to capture the output of commands and use them as values in variables, arguments, or other commands. This powerful technique is the foundation of dynamic scripting, enabling you to write flexible, automated scripts that adapt to their environment and make decisions based on real-time data.

## Table of Contents
- [[#What is Command Substitution]]
  - [[#Why Use Command Substitution?]]
  - [[#How It Works]]
  - [[#Syntax and Methods]]
  - [[#Storing Command Output in Variables]]
- [[#Advanced Patterns and Best Practices]]
  - [[#Nested Command Substitution]]
  - [[#Process Substitution]]
  - [[#Error Handling in Command Substitution]]
  ...
---

# What is Command Substitution

**Command substitution** is a feature that allows you to run a command and replace it with its output. The shell executes the command in a subshell and substitutes the entire command expression with the standard output (stdout) of that command.

## Why Use Command Substitution?

- **Capture command output**: Store results for later use
- **Dynamic values**: Use real-time system information in your scripts
- **Automation**: Make decisions based on current conditions
- **Flexibility**: Create scripts that adapt to different environments
- **Chaining operations**: Use output from one command as input to another

```shell
# Without command substitution (manual)
echo "Today is Monday"

# With command substitution (dynamic)
echo "Today is $(date +%A)"
# Output: Today is Wednesday (or whatever day it actually is)
```

## How It Works

1. The shell encounters a command substitution expression
2. It creates a new subshell
3. The command inside runs in that subshell
4. The stdout is captured
5. The entire expression is replaced with the captured output
6. The parent shell continues with the substituted value

```shell
# Step by step visualization
current_user=$(whoami)
# 1. Shell sees $(whoami)
# 2. Runs 'whoami' in subshell
# 3. Captures output: "john"
# 4. Replaces $(whoami) with "john"
# 5. Result: current_user="john"
```

---

## Syntax and Methods

There are two syntaxes for command substitution in bash. Both work identically, but the modern syntax is preferred.

### Modern Syntax: $()

The `$()` syntax is the **preferred and recommended method**:

```shell
# Basic syntax
$(command)

# Examples
current_date=$(date)
file_count=$(ls | wc -l)
kernel_version=$(uname -r)
```

### Legacy Syntax: Backticks ``

The backtick syntax is older and less preferred:

```shell
# Basic syntax
`command`

# Examples
current_date=`date`
file_count=`ls | wc -l`
kernel_version=`uname -r`
```

**Disadvantages of backticks:**

- Harder to read in complex expressions
- Nesting requires escaping
- Visually ambiguous (looks like quotes)

```shell
# Nesting with backticks is ugly
outer=`echo "Inner: \`echo "nested"\`"`
# Notice the required backslash escaping
```

---

## Storing Command Output in Variables

Storing command output in variables is the most common use of command substitution.

### Basic Variable Assignment

```shell
# Store simple command output
username=$(whoami)
hostname=$(hostname)
current_dir=$(pwd)

echo "User: $username"
echo "Host: $hostname"
echo "Directory: $current_dir"
```

### Capturing Complex Command Output

```bash
# Store disk usage information
disk_usage=$(df -h / | tail -1 | awk '{print $5}')
echo "Root partition is $disk_usage full"

# Store the number of running processes
process_count=$(ps aux | wc -l)
echo "Currently running processes: $process_count"

# Store memory information
total_mem=$(free -h | grep Mem | awk '{print $2}')
used_mem=$(free -h | grep Mem | awk '{print $3}')
echo "Memory: $used_mem used of $total_mem"
```

### Handling Multi-line Output

```bash
# Store entire file contents
file_contents=$(cat /etc/hostname)
echo "Hostname from file: $file_contents"

# Store multiple lines (preserve with quotes)
log_entries=$(tail -5 /var/log/syslog)
echo "$log_entries"  # Quotes preserve line breaks

# Store as array for line-by-line processing
readarray -t lines < <(cat /etc/hosts)
for line in "${lines[@]}"; do
    echo "Line: $line"
done
```

### Conditional Assignment

```bash
# Assign only if command succeeds
if output=$(ls /valid/path 2>/dev/null); then
    echo "Directory contents: $output"
else
    echo "Directory not found"
fi

# Use default value if command fails
value=$(cat /nonexistent/file 2>/dev/null) || value="default"
echo "Value: $value"
```

---

## Using Command Substitution in Practice

Command substitution becomes powerful when used in real-world scenarios.

### In Conditional Statements

```bash
# Check if user is root
if [ "$(id -u)" -eq 0 ]; then
    echo "Running as root"
else
    echo "Not running as root"
fi

# Check disk space
disk_usage=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$disk_usage" -gt 80 ]; then
    echo "Warning: Disk usage is at $disk_usage%"
fi

# Check if service is running
if [ "$(systemctl is-active nginx)" = "active" ]; then
    echo "Nginx is running"
else
    echo "Nginx is not running"
fi
```

### As Command Arguments

```bash
# Use output as arguments to other commands
mkdir "backup_$(date +%Y%m%d)"
# Creates: backup_20260211

# Copy files with dynamic naming
cp important.txt "important_backup_$(date +%Y%m%d_%H%M%S).txt"

# Search for files modified today
find /var/log -type f -newermt "$(date +%Y-%m-%d)"

# Kill processes by name
kill $(pgrep firefox)
```

### In String Concatenation

```bash
# Build dynamic messages
echo "Welcome, $(whoami)! Today is $(date +%A)"

# Create log messages
log_message="[$(date '+%Y-%m-%d %H:%M:%S')] User $(whoami) logged in from $(hostname)"
echo "$log_message" >> /var/log/custom.log

# Generate reports
report="System Report - $(date)
Hostname: $(hostname)
Kernel: $(uname -r)
Uptime: $(uptime -p)
Load: $(uptime | awk -F'load average:' '{print $2}')"
echo "$report"
```

### In Loops

```bash
# Loop over command output
for user in $(cat /etc/passwd | cut -d: -f1); do
    echo "User: $user"
done

# Better: use while to handle spaces
while IFS= read -r user; do
    echo "User: $user"
done < <(cut -d: -f1 /etc/passwd)

# Loop over files from find
for file in $(find /tmp -name "*.log" -mtime -1); do
    echo "Recent log: $file"
done
```

### In Arithmetic Operations

```bash
# Calculate values dynamically
total_files=$(find . -type f | wc -l)
total_dirs=$(find . -type d | wc -l)
total_items=$((total_files + total_dirs))
echo "Total items: $total_items"

# Calculate percentages
used=$(df / | tail -1 | awk '{print $3}')
total=$(df / | tail -1 | awk '{print $2}')
percentage=$((used * 100 / total))
echo "Disk usage: $percentage%"
```

---

## Dynamic Scripting Techniques

Command substitution enables you to write scripts that adapt to their environment and make intelligent decisions.

## Environment-Aware Scripts

```bash
#!/bin/bash
# Script that adapts to the environment

# Detect OS
os_type=$(uname -s)
case $os_type in
    Linux)
        package_manager="apt-get"
        ;;
    Darwin)
        package_manager="brew"
        ;;
    *)
        package_manager="unknown"
        ;;
esac

echo "Detected OS: $os_type"
echo "Package manager: $package_manager"

# Detect available cores
cores=$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 1)
echo "Using $cores cores for compilation"
```

## Dynamic File and Directory Naming

```bash
#!/bin/bash
# Create organized backups with timestamps

# Generate unique backup name
backup_date=$(date +%Y%m%d)
backup_time=$(date +%H%M%S)
backup_dir="backup_${backup_date}_${backup_time}"

# Create backup directory
mkdir -p "$backup_dir"

# Generate backup filename
hostname=$(hostname)
username=$(whoami)
backup_file="${backup_dir}/${hostname}_${username}_backup.tar.gz"

echo "Creating backup: $backup_file"
tar -czf "$backup_file" ~/Documents
```

## Conditional Execution Based on System State

```bash
#!/bin/bash
# Script that checks prerequisites before running

# Check if running as root
if [ "$(id -u)" -ne 0 ]; then
    echo "Error: This script must be run as root"
    exit 1
fi

# Check available disk space (in GB)
available_space=$(df /var | tail -1 | awk '{print $4}')
required_space=1048576  # 1GB in KB

if [ "$available_space" -lt "$required_space" ]; then
    echo "Error: Insufficient disk space"
    echo "Available: $((available_space / 1024)) MB"
    echo "Required: $((required_space / 1024)) MB"
    exit 1
fi

# Check if required commands exist
for cmd in curl jq tar; do
    if ! command -v $cmd &>/dev/null; then
        echo "Error: Required command '$cmd' not found"
        exit 1
    fi
done

echo "All prerequisites met. Proceeding..."
```

## Dynamic Configuration Generation

```bash
#!/bin/bash
# Generate configuration files based on system state

# Detect system resources
total_ram=$(free -g | awk '/^Mem:/{print $2}')
cpu_cores=$(nproc)
hostname=$(hostname)

# Generate nginx worker configuration
workers=$cpu_cores
connections=$((1024 * cpu_cores))

cat > /etc/nginx/nginx.conf << EOF
user www-data;
worker_processes $workers;

events {
    worker_connections $connections;
}

http {
    server_names_hash_bucket_size 64;
    server_name $hostname;
    
    # Generated on $(date)
}
EOF

echo "Configuration generated for $cpu_cores cores, ${total_ram}GB RAM"
```

## Automated Deployment Scripts

```bash
#!/bin/bash
# Deploy application with dynamic versioning

# Generate version from git
version=$(git describe --tags --always)
build_date=$(date +%Y%m%d)
build_number=$(git rev-list --count HEAD)

full_version="${version}-${build_date}.${build_number}"

echo "Building version: $full_version"

# Create deployment package
deploy_name="myapp-${full_version}.tar.gz"

# Build with version info
echo "$full_version" > VERSION
tar -czf "$deploy_name" ./*

# Generate deployment report
cat > deployment_info.txt << EOF
Deployment Information
======================
Version: $full_version
Build Date: $(date)
Git Commit: $(git rev-parse HEAD)
Built By: $(whoami)@$(hostname)
Package: $deploy_name
EOF

echo "Deployment package created: $deploy_name"
```

## Monitoring and Alerting Scripts

```bash
#!/bin/bash
# System monitoring with dynamic thresholds

# Get current metrics
cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
mem_usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100}')
disk_usage=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')

# Current timestamp
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

# Log current state
echo "[$timestamp] CPU: ${cpu_usage}% | MEM: ${mem_usage}% | DISK: ${disk_usage}%"

# Alert if thresholds exceeded
if (( $(echo "$cpu_usage > 80" | bc -l) )); then
    echo "ALERT: High CPU usage: $cpu_usage%"
fi

if [ "$mem_usage" -gt 85 ]; then
    echo "ALERT: High memory usage: $mem_usage%"
    # Get top memory processes
    top_processes=$(ps aux --sort=-%mem | head -6)
    echo "$top_processes"
fi

if [ "$disk_usage" -gt 90 ]; then
    echo "ALERT: Critical disk usage: $disk_usage%"
    # Find large directories
    large_dirs=$(du -h / 2>/dev/null | sort -rh | head -5)
    echo "$large_dirs"
fi
```

## Interactive Scripts with Dynamic Menus

```bash
#!/bin/bash
# Dynamic menu based on available options

# Detect available services
services=$(systemctl list-units --type=service --state=running | \
           awk '/\.service/ {print $1}' | sed 's/.service//')

echo "Running Services:"
echo "================="

# Create array from command output
readarray -t service_array <<< "$services"

# Display numbered menu
for i in "${!service_array[@]}"; do
    echo "$((i+1)). ${service_array[$i]}"
done

read -p "Select a service to restart (number): " selection

# Validate and execute
if [[ "$selection" =~ ^[0-9]+$ ]] && [ "$selection" -le "${#service_array[@]}" ]; then
    selected_service="${service_array[$((selection-1))]}"
    echo "Restarting $selected_service..."
    sudo systemctl restart "$selected_service"
    
    # Check status
    if [ "$(systemctl is-active $selected_service)" = "active" ]; then
        echo "✓ $selected_service restarted successfully"
    else
        echo "✗ Failed to restart $selected_service"
    fi
else
    echo "Invalid selection"
fi
```

---

# Advanced Patterns and Best Practices

Master these advanced techniques to write more robust and efficient scripts.

## Nested Command Substitution

You can nest command substitution to create complex operations:

```bash
# Find and display the oldest file in a directory
oldest_file=$(ls -t $(find . -type f) | tail -1)
echo "Oldest file: $oldest_file"

# Get the user who owns the most files
top_owner=$(find . -type f -printf '%u\n' | sort | uniq -c | sort -rn | head -1 | awk '{print $2}')
echo "User with most files: $top_owner"

# Modern syntax makes nesting clearer
result=$(echo "Processed: $(echo "Raw: $(date)")")
```

## Process Substitution

**Process substitution** `<()` creates a temporary file descriptor that can be used as a file:

```bash
# Compare output of two commands
diff <(ls /dir1) <(ls /dir2)

# Use multiple inputs
paste <(cut -d: -f1 /etc/passwd) <(cut -d: -f3 /etc/passwd)

# Read from command output in while loop
while read -r line; do
    echo "Processing: $line"
done < <(find . -name "*.txt")
```

## Error Handling in Command Substitution

Always handle potential errors:

```bash
# Check if command succeeded before using output
if output=$(risky_command 2>&1); then
    echo "Success: $output"
else
    echo "Command failed"
fi

# Provide default values
value=$(cat /maybe/missing/file 2>/dev/null) || value="default"

# Suppress errors but still capture output
output=$(command 2>/dev/null) || output="N/A"

# Capture both stdout and stderr
output=$(command 2>&1)
```

## Performance Considerations

Command substitution creates subshells, which has performance implications:

```bash
# SLOW: Creates new subshell each iteration
for i in {1..1000}; do
    date=$(date +%s)
    echo "$date"
done

# FASTER: Call once before loop
start_time=$(date +%s)
for i in {1..1000}; do
    echo "$start_time"
done

# AVOID: Multiple substitutions in loops
for file in *.txt; do
    owner=$(stat -c %U "$file")  # Separate process each time
    size=$(stat -c %s "$file")    # Another process
    echo "$file: $owner, $size"
done

# BETTER: Single command with multiple outputs
for file in *.txt; do
    stat -c "%U %s" "$file" | while read owner size; do
        echo "$file: $owner, $size"
    done
done
```

## Quoting Best Practices

```bash
# Always quote command substitutions to preserve whitespace
filename=$(ls -1 | head -1)
echo "$filename"  # GOOD: preserves spaces

# Unquoted can cause word splitting
for file in $(find . -name "* *"); do
    echo $file  # BAD: splits on spaces
done

# Quoted prevents splitting
while IFS= read -r file; do
    echo "$file"  # GOOD: preserves spaces
done < <(find . -name "* *")
```

## Combining with Here Documents

```bash
# Use command substitution in here documents
cat << EOF > report.txt
System Report
=============
Generated: $(date)
Hostname: $(hostname)
User: $(whoami)
Uptime: $(uptime -p)

Disk Usage:
$(df -h / | tail -1)

Top 5 Processes:
$(ps aux --sort=-%mem | head -6 | tail -5)
EOF
```

## Creating Reusable Functions

```bash
#!/bin/bash
# Functions with command substitution

# Get current timestamp
get_timestamp() {
    echo "$(date '+%Y-%m-%d %H:%M:%S')"
}

# Log with timestamp
log() {
    echo "[$(get_timestamp)] $*"
}

# Get system load
get_load() {
    echo "$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}')"
}

# Usage
log "Script started"
log "Current load: $(get_load)"

# Check if service is running
is_service_running() {
    local service=$1
    [ "$(systemctl is-active $service 2>/dev/null)" = "active" ]
}

if is_service_running nginx; then
    log "Nginx is running"
fi
```

## Debugging Command Substitution

```bash
# Enable debug mode to see substitutions
set -x
result=$(echo "test")
set +x

# Use printf for debugging
printf "Debug: command output is: %s\n" "$(whoami)"

# Check if substitution worked
output=$(some_command)
if [ -z "$output" ]; then
    echo "Warning: Command produced no output"
fi

# Show both the command and its output
cmd="ls -la"
echo "Running: $cmd"
result=$(eval "$cmd")
echo "Result: $result"
```

---

# Summary

Command substitution is a fundamental technique for dynamic scripting:

- **Two syntaxes**: `$()` (preferred) and backticks (legacy)
- **Captures stdout**: Stores command output for later use
- **Enables dynamic scripts**: Adapt to environment and make decisions
- **Powerful combinations**: Use with variables, loops, conditions, and functions
- **Best practices**: Quote variables, handle errors, consider performance

Master command substitution to write flexible, automated, and intelligent bash scripts that respond to real-world conditions!