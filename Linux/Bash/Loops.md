A quick reference for the most common loop constructs in Bash.

---

## 1. `for` Loop

### Iterate over a list of values

```bash
for item in apple banana cherry; do
  echo "Fruit: $item"
done
```

### Iterate over a range of numbers

```bash
for i in {1..5}; do
  echo "Number: $i"
done
```

### C-style `for` loop

```bash
for ((i = 0; i < 5; i++)); do
  echo "i = $i"
done
```

### Iterate over files in a directory

```bash
for file in /etc/*.conf; do
  echo "Config file: $file"
done
```

### Iterate over command output

```bash
for user in $(cat /etc/passwd | cut -d: -f1); do
  echo "User: $user"
done
```

---

## 2. `while` Loop

Runs as long as a condition is **true**.

```bash
count=1
while [ $count -le 5 ]; do
  echo "Count: $count"
  ((count++))
done
```

### Read a file line by line

```bash
while IFS= read -r line; do
  echo "$line"
done < myfile.txt
```

### While infinite loop
```bash
#!/bin/bash

while true; do
  echo "Checking disk usage"
done
```
---

## 3. `until` Loop

Runs as long as a condition is **false** (opposite of `while`).

```bash
count=1
until [ $count -gt 5 ]; do
  echo "Count: $count"
  ((count++))
done
```

---

## 4. Loop Control

### `break` — exit the loop early

```bash
for i in {1..10}; do
  if [ $i -eq 5 ]; then
    break
  fi
  echo "$i"
done
# Prints 1 2 3 4
```

### `continue` — skip to the next iteration

```bash
for i in {1..5}; do
  if [ $i -eq 3 ]; then
    continue
  fi
  echo "$i"
done
# Prints 1 2 4 5
```

---

## 5. Infinite Loop

```bash
while true; do
  echo "Running... (Ctrl+C to stop)"
  sleep 1
done
```

---

## Quick Reference

|Loop|Use when…|
|---|---|
|`for`|You know the list or range in advance|
|`while`|You loop while a condition is true|
|`until`|You loop until a condition becomes true|

---

> **Tip:** Always quote variables (`"$var"`) inside loops to avoid issues with spaces or special characters in values.