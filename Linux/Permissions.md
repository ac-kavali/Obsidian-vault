
> A comprehensive reference for permissions, environment variables, redirection, and frequently used commands.

## Table of Contents

- [[#Frequently Used Commands|Frequently Used Commands]]
- [[#Bash Shortcuts and Tips|Bash Shortcuts and Tips]]
- [[#Linux Kernel|Linux Kernel]]
- [[#PS1 Variable Customization|PS1 Variable Customization]]
- [[#File Permissions|File Permissions]]
- [[#Environment Variables|Environment Variables]]
- [[#Redirecting|Redirecting]]
- [[#Piping|Piping]]

---

## Frequently Used Commands

### General Commands

Search in command history
```bash
Ctrl + r
```

 Show difference between two text files
```bash
diff file.txt
```

 List files sorted by time (reverse order)
```bash
ls -ltrs
```

 Sort text alphabetically
```bash
sort textfile
```

 Open an image with shotwell
```bash
shotwell image.jpg
```

 Switch temporarily between bash and zsh
```bash
bash
zsh
```

 Switch shell permanently
```bash
```
chsh -s /bin/bash
```

 List content of a file with absolute path
```bash
ls /abs/path/file
```

 Show file type (jpg, mp3, etc.)
```bash
file filename
```

 Navigate in text file
```
less filename
```

 Rename file
```bash
mv filename newfilename
```

 Copy directory
```bash
cp -r dirname destination
```

 Remove directory recursively
```bash
rm -r directory
```

 Show output and save to file (tee command)
```bash
ls | tee file.txt
```



### User and Group Management

```bash
# Add a new user
sudo useradd newuser

# Add a new group
sudo groupadd newgroup

# Change file owner
sudo chown newusr file

# Change username
sudo usermod -l newusername oldusername

# Change home directory name
sudo usermod -d /home/newusername -m newusername
```

### File Timestamp Manipulation

```bash
# Show hardlinks with long format
ls -l --time-style=long-iso

# Change file date (for links use -h)
touch -d "2025-08-10 14:30:00" filename

# Force display format
touch -ct 06012342 testShell00
```

---

## Bash Shortcuts and Tips

### Conditional Expressions

```bash
# File existence checks
if [ -f filename ]; then  # file exists
if [ -e filename ]; then  # file or directory exists
if [ -z filename ]; then  # is empty
if [ -s filename ]; then  # file is not empty
```

### Wildcards and Patterns

```bash
# Remove all files with specific extension
rm *.txt

# Print sequence
echo {1..20}  # Output: 1 2 3 ... 20
```

### User Privilege Indicators

- `$` - Not privileged user
- `#` - Privileged or superuser access

### Variable Management

```bash
# Save variable content to file before changing
echo $variable > textfilepath
```


---

## Linux Kernel

### The Operating System

**Definition:** The kernel is the bridge between applications and hardware. It manages access to the CPU, memory, and devices, making sure programs can use the hardware safely and efficiently.

**System Call Process:** For an application to modify and interact with the system, it uses a system call from the system library to connect and modify the system through the kernel.

---

## PS1 Variable Customization

### Prompt Variable

**Definition:** The first message that appears when you open the terminal before the cursor, waiting for you to enter a command. It is customizable, and can be reset to default by typing `bash`.

Customize prompt
```bash
export PS1='your_custom_prompt'
```

---

## File Permissions

### Understanding Permission Display

**Example output:**

```
-rwxrwxr-x 1 kali kali 78 Mar 15 21:09 script.sh
```

**Position breakdown:**

|Position|Meaning|
|---|---|
|1|File type: `-` (file), `d` (directory), `l` (link), `c` (character file), `b` (block file)|
|2|Permissions (rwxrwxr-x)|
|3|Hard link number (1)|
|4|Owner (kali)|
|5|Group (kali)|
|6|File size (78) - use `-h` to simplify|
|7|Date (Mar 15 21:09)|
|8|Filename (script.sh)|

### Permission Modification with `chmod`

**Symbolic mode:**

```bash
# Set full permissions for others
chmod o=rwx filename

# Remove all permissions from others
chmod o= filename

# Set permissions for user and group
chmod u=rwx,g=w filename

# Add execute permission for all users
chmod +x filename

# Remove permissions using minus
chmod u-x filename
```

**Numeric mode:**

|Number|Permissions|
|---|---|
|0|`---`|
|1|`--x`|
|2|`-w-`|
|3|`-wx`|
|4|`r--`|
|5|`r-x`|
|6|`rw-`|
|7|`rwx`|

```bash
# Set permissions using numbers
chmod 700 filename
chmod 422 filename
```

### Change Owner with `chown`

```bash
# Change file owner
chown newowner filename
```

### User Management Shortcuts

```bash
# Switch to root user
sudo -i
# or
su

# Create new user
sudo adduser newusername
```

---


---

## Contributing

Feel free to suggest improvements or additional commands!

## License

This guide is provided as-is for educational purposes.