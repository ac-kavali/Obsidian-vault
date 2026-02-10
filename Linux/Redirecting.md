## Table of content
- [[#Definition:|Definition:]]
- [[#Truncate vs Append|Truncate vs Append]]
	- [[#Truncate:|Truncate]]
	- [[#Append:|Append:]]
- [[#Standard Output Redirection|Standard Output Redirection]]
- [[#Standard Error Redirection|Standard Error Redirection]]
- [[#Both Output and Error|Both Output and Error]]

---
### Definition:
**Sending** the output or input of a command to a different place, like a file instead of the terminal, or from one command to another.

### Truncate vs Append
#### Truncate (>):
1. Create specified file if it does not exist
2. Remove file's previous content
3. Replace with new content
#### Append (>>):
1. Create specified file if it does not exist
2. Append to file (writing to new line)
3. Keep previous content
### Standard Output Redirection

```bash
# Truncate output to file
command > file.txt

# Append output to file
command >> file.txt

# Append text to file
echo "text" >> file.txt
```

### Standard Error Redirection

```bash
# Truncate stderr to file (2 is stderr file descriptor)
command 2> file.txt

# Append stderr to file
command 2>> file.txt
```

### Both Output and Error

```bash
# Truncate both stdout and stderr
command &> file.txt

# Append both stdout and stderr
command >> file.txt 2>&1

# Separate stdout and stderr to different files
command 1> file.txt 2> erreur.txt

# Discard output completely
command > /dev/null
```

---

