A quick reference for conditional logic in Bash.

---

## Basic Structure

Every `if` block follows this pattern:

```sh
if [ condition ]; then
  # commands
fi
```

> `fi` is simply `if` spelled backwards — it closes the block, just like `done` closes a loop.

---

## 1. Simple `if`

Runs the block only if the condition is **true**.

```bash
age=20

if [ $age -ge 18 ]; then
  echo "You are an adult."
fi
```

---

## 2. `if / else`

Runs one block if true, another if false.

```bash
age=15

if [ $age -ge 18 ]; then
  echo "You are an adult."
else
  echo "You are a minor."
fi
```

---

## 3. `if / elif / else`

Check multiple conditions in sequence.

```bash
score=75

if [ $score -ge 90 ]; then
  echo "Grade: A"
elif [ $score -ge 75 ]; then
  echo "Grade: B"
elif [ $score -ge 60 ]; then
  echo "Grade: C"
else
  echo "Grade: F"
fi
```

> You can chain as many `elif` blocks as you need.

---

## 4. Checking Strings

```bash
name="Alice"

if [ "$name" = "Alice" ]; then
  echo "Hello, Alice!"
elif [ "$name" = "Bob" ]; then
  echo "Hello, Bob!"
else
  echo "Who are you?"
fi
```

> Always **quote string variables** (`"$name"`) to avoid errors with spaces.

---

## 5. Checking Files

```bash
file="/etc/hosts"

if [ -f "$file" ]; then
  echo "$file exists and is a regular file."
elif [ -d "$file" ]; then
  echo "$file is a directory."
else
  echo "$file does not exist."
fi
```

---

## 6. Negating a Condition with `!`

```bash
if [ ! -f "/tmp/lockfile" ]; then
  echo "No lock file found, safe to proceed."
fi
```

---

## 7. Combining Conditions

### AND — both must be true (`&&` or `-a`)

```bash
age=25
citizen="yes"

if [ $age -ge 18 ] && [ "$citizen" = "yes" ]; then
  echo "Eligible to vote."
fi
```

### OR — at least one must be true (`||` or `-o`)

```bash
day="Saturday"

if [ "$day" = "Saturday" ] || [ "$day" = "Sunday" ]; then
  echo "It's the weekend!"
fi
```

---

## Comparison Operators

### Numeric

|Operator|Meaning|
|---|---|
|`-eq`|equal|
|`-ne`|not equal|
|`-lt`|less than|
|`-le`|less than or equal|
|`-gt`|greater than|
|`-ge`|greater than or equal|

### String

|Operator|Meaning|
|---|---|
|`=`|equal|
|`!=`|not equal|
|`-z`|is empty|
|`-n`|is not empty|

### File

|Operator|Meaning|
|---|---|
|`-f`|exists and is a regular file|
|`-d`|exists and is a directory|
|`-e`|exists (any type)|
|`-r`|is readable|
|`-w`|is writable|
|`-x`|is executable|

---

## Quick Structure Recap

```
if [ condition ]; then      ← opens block
  ...
elif [ condition ]; then    ← optional, repeatable
  ...
else                        ← optional fallback
  ...
fi                          ← closes block (required)
```

---

> **Tip:** Use `[[ ... ]]` (double brackets) instead of `[ ... ]` for more advanced conditions — it supports regex matching and is safer with empty variables.