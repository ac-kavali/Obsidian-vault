### `awk`

 is a command and (also a text processing language) invented for processing text in linux (more flexible than `cut` for variable spacing).

---
** Print first column**
```bash
awk '{print $1}' file.txt
```

---
**Print all columns**
```sh
awk '{print $0}' file.txt
```
---
**Custom field separator**
```sh
awk -F ";" '{print $1}' file.txt
```
---
 **Multiple columns**
```sh
awk -F " " '{print $1 $3}' file.txt
```
---
**Add text between columns**
```sh
awk -F " " '{print $1 " " $3 "/"}' file.txt
```
---
**Mathematical operations**
```sh
awk -F " " '{print $1*2}' file.txt
```
---
**Division example**
```sh
awk -F "/" '{print $2/$3}' /etc/shells
```
---
**Print last column**
```sh
awk '{print $NF}' file.txt
```
---
**Skip first line (NR = Number of Records)**
```sh
awk 'NR > 1 {print}' /etc/shells
```
---
**Filter lines starting with "root"**
```sh
awk '/^root/ {print}' /etc/passwd
```
---
**Lines starting with numbers**
```sh
awk '/^[0-9]/ {print}' file.txt
```

