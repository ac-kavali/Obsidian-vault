>Find one of the most powerful linux commands, because it doesn't just search by name... it searches by rules (size, type, permissions, owner, date, etc).


## Table of Contents

- [[#Search By name]]
- [[#Exact name]]
- [[#Search by type]]
- [[#Search by Size]]
- [[#Execute when you find]]
- [[#Search by permissions]]
- [[#Search by owner/group]]
- [[#Search with operators]]
- [[#path Excluding]]
## Search By name
### Exact name :
```sh
find . -name "file.txt"
```
### Case-insensitive
```sh
find . -iname "file.txt"
```

### Wildcards
!!**Use Always the wildcard to search by non exact name **
```sh
find . -name "*bin*"
```

---
## Search by type

### Find only files
```sh
find . -type f
```

### Find only directories
```sh
find . -type d
```

### Find symbolic links
```sh
find . -type l
```

---
## Search by Size

### Bigger than
```sh
find . -size +100M
```

### Smaller than
```sh
find . -size -10k
```

### Between min & max
```sh 
find /path -type f -size +10M -size -50M
```

### Exact
```sh
find . -size 50M
```

| Unit | Meaning        |
| ---- | -------------- |
| `c`  | bytes          |
| `k`  | kilobytes (KB) |
| `M`  | megabytes (MB) |
| `G`  | gigabytes (GB) |

---
## Execute when you find 
you can make find execute a command for every file/directory found.
**basic syntax**
```sh
find <path> <condition> -exec <command> {} + 
```
- `{}` means **replace** this with the **current file** you find 
- `\;` executes command **one time per file**
- `+` executes command **once for many files at once** (faster)


---
## Maxdepth 

Specify a maxdepth to limit the depth of the search :
```sh
find /path -maxdepth 2 -name "file"
```
**Remember to set the maxdepth as the first flag before the other patherns**


---
## Search by permissions

**Find executable files**
```sh
find . -type f -executable
```

**Find readable files for current user**
```sh
find . -type f -readable 
```

**Find files with a specific octal permissions**
```sh
find <path> -type f -perm 777
```

--- 

## Search by owner/group

**File owned by a user**
```sh
find /home -user kavali
```

**File owned by a group**
```sh
find / -group sudo
```


---
## Search with operators
### Or operator

**-o used to specify that you want to get a file if it have just one of those propreties**
```sh
find . -name "*.c" -o -name "*.h"
```


### Not operator

**! used to inverse the search propretie like not executable or not a file ...**
```sh 
find . -type f ! -name "*.txt"
```
means find who is not a txt file

you can also use `not`
```sh
find . -type f -not -name "*.txt"
```

## path Excluding  
in case you don't want to search inside a directory and you want to skip: 
```sh
find . -name "file" ! -path "./excluded/*"
```
>[!tip] Now find will not search in the `excluded` directory.