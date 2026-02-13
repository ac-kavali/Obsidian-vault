**Definition:** Key-value pairs that store and give processes and applications the system information needed to work.

### Viewing Environment Variables

```bash
# Show all environment variables
set
env

# Show all with pagination
set | more
```

### Common Shell Variables

|Variable|Description|
|---|---|
|`$PATH`|Used to look up executables (commands)|
|`$PWD`|Present working directory|
|`$OLDPWD`|Previous working directory|
|`$?`|Exit status of the last command|
|`$PS1`|Primary command line prompt|
|`$RANDOM`|Pseudo random integer between 0 and 32767|
|`$CPUTYPE`|Contains CPU architecture and other information|

## Modifying Environment Variables

**Save before changing:**

```bash
# Save PS1 content to file before modification
echo $PS1 > pscommand.txt

# Change PS1
PS1='Kali/d$f'

# Export to save changes in all environments
export PS1
```

**Add to PATH:**

```bash
# Add new directory to PATH
PATH=$PATH:/root/newhackingtool
```

**Create custom variable:**

```bash
# Create variable (always use capitals)
VARNAME="content"

# Display variable
echo $VARNAME  # Output: content
```

---
## Create Custom Env Variable
### 1. Identify your shell

Run:
```
echo $SHELL
```
- If it says `/bin/bash` → your config file is `~/.bashrc`
- If it says `/bin/zsh` → your config file is `~/.zshrc`



---




in Theme of [[Linux]]