### Linux Text Processing Commands Guide
>A comprehensive reference guide for essential Linux commands used for text manipulation, searching, and processing.

## Table of Contents
- [[#File Search Commands|File Search Commands]]
- [[#Text Manipulation|Text Manipulation]]
- [[#Text Extraction|Text Extraction]]
- [[#File Processing|File Processing]]
- [[#Advanced Text Processing|Advanced Text Processing]]
- [[#Regular Expressions|Regular Expressions]]
- [[#Tips and Best Practices|Tips and Best Practices]]
- [[#Contributing|Contributing]]
- [[#License|License]]


---

## File Search Commands

### `find`

Search for files and directories in a directory hierarchy.

```bash
# Find all .txt files in Desktop
find ~/Desktop -name "*.txt"

# Find specific file (specify directory first)
find . -name "findscript.txt"

# Search in multiple directories
find dir1 dir2 -name "text"

# Case-insensitive search
find . -iname "txt"

# Find by type (f=files, d=directories)
find . -type f -name "name"

# Find files containing specific text
find . -name "*.txt" -exec grep -l "some thing" {} \;
```

**Additional Options:**

- Customize by size and empty files
- Combine with other commands using `-exec`

---

## Text Manipulation

### `paste`

Merge lines of files side by side.

```bash
# Basic paste (tab-separated by default)
paste file1.txt file2.txt

# Custom delimiter
paste -d ',' file1.txt file2.txt
```

**Example:**

```
file1.txt    file2.txt    Result
A            1            A    1
B            2            B    2
C            3            C    3
```

### `sed`

Stream editor for filtering and transforming text.

```bash
# Replace all occurrences
sed "s/oldword/newword/g" file.txt

# Replace on specific line
sed "1s/oldword/newword/" file.txt

# Replace first occurrence per line only
sed "s/oldword/newword/" file.txt

# Save changes permanently
sed -i "s/oldword/newword/g" file.txt

# Delete a word
sed -i "s/oldword//g" file.txt

# Delete lines containing a word
sed -i "/word/d" file.txt

# Remove empty lines
sed -i "/^$/d" file.txt

# Remove first 2 lines
sed -i "1,2d" file.txt
```

### `tr`

Translate or delete characters.

```bash
# Convert to uppercase
echo "hello world" | tr [a-z] [A-Z]

# Delete lowercase characters
echo "hello world" | tr -d [a-z]
```

---

## Text Extraction

### `cut`

Extract sections from each line of files.

**Extract by character position:**

```bash
# Extract first character
cut -c 1 textfile.txt

# Extract characters 1-3
cut -c 1-3 textfile.txt

# Extract 2nd and 4th characters
cut -c 2,4 textfile.txt
```

**Extract by fields (columns):**

```bash
# Extract columns 2 and 3 (tab-delimited by default)
cut -f 2,3 file.txt

# Custom delimiter (space)
cut -d ' ' -f 1 spacefile.txt

# Extract columns 2-3 with space delimiter
cut -d ' ' -f 2-3 spacefile.txt

# Only show lines with delimiter
cut -f 2,5 -s file.txt
```

### `head`

Display the beginning of files.

```bash
# Show first 10 lines (default)
head textfile.txt

# Specify number of lines
head -n 1 textfile.txt
```

### `tail`

Display the end of files.

```bash
# Show last 10 lines (default)
tail textfile.txt

# Specify number of lines
tail -n 12 file.txt

# Follow file changes in real-time
tail -f file.txt
```

---

## File Processing

### `sort`

Sort lines of text files (uses ASCII ordering: uppercase before lowercase).

```bash
# Basic sort
sort file.txt

# Reverse order
sort -r file.txt
```

### `uniq`

Filter out duplicate lines (works best with sorted input).

```bash
# Remove duplicates
uniq file.txt

# Sort then remove duplicates
sort file.txt | uniq
```

### `split`

Divide a file into smaller files.

**By number of lines:**

```bash
split -l 100 fichier.txt Ahmed_
```

**By data size:**

```bash
split -b 4k fichier.txt Ahmed_
```

### `join`

Merge files based on a common field.

```bash
join file1.txt file2.txt
```

### `expand` / `unexpand`

Convert between tabs and spaces.

```bash
# Convert tabs to spaces
echo -e "nom\tprénom" | expand

# Convert spaces to tabs
unexpand file.txt
```

### `nl`

Number lines of files.

```bash
nl file.txt
```

### `wc`

Count lines, words, and characters.

```bash
# Show all counts
wc file.txt
# Output: lines words characters

# Count lines only
wc -l file.txt

# Count words only
wc -w file.txt

# Count characters only
wc -c file.txt
```

---

## Advanced Text Processing

### `awk`

Pattern scanning and processing language (more flexible than `cut` for variable spacing).

```bash
# Print first column
awk '{print $1}' file.txt

# Print all columns
awk '{print $0}' file.txt

# Custom field separator
awk -F ";" '{print $1}' file.txt

# Multiple columns
awk -F " " '{print $1 $3}' file.txt

# Add text between columns
awk -F " " '{print $1 " " $3 "/"}' file.txt

# Mathematical operations
awk -F " " '{print $1*2}' file.txt

# Division example
awk -F "/" '{print $2/$3}' /etc/shells

# Print last column
awk '{print $NF}' file.txt

# Skip first line (NR = Number of Records)
awk 'NR > 1 {print}' /etc/shells

# Filter lines starting with "root"
awk '/^root/ {print}' /etc/passwd

# Lines starting with numbers
awk '/^[0-9]/ {print}' file.txt
```

### `grep`

Search for patterns in files.

**Basic Options:**

```bash
# Case-insensitive search
grep -i "apple" file.txt

# Extended regex (no need for escape characters)
grep -E "regex" file.txt

# Show line numbers
grep -n "apple" file.txt

# Invert match (lines NOT containing pattern)
grep -v "apple" file.txt

# Count occurrences
grep -c "apple" file.txt
```

**Pattern Matching:**

```bash
# Lines starting with 'a'
grep "^a" file.txt

# Lines ending with 'a'
grep "a$" file.txt

# Lines containing a, b, or c
grep "[abc]" fruits.txt

# Character range
grep "[A-Z]" fruits.txt

# Negated character class
grep "[^abc]" fruits.txt

# Multiple ranges
grep "[A-Za-z0-9]" fruits.txt

# Filter empty lines
grep -v "^$" fruits.txt
```

### `last`

Show list of last logged-in users.

```bash
last
```

---

## Regular Expressions

### Basic Syntax

|Symbol|Meaning|
|---|---|
|`.`|Any single character (except newlines)|
|`*`|Zero or more of the previous character|
|`+`|One or more of the previous character|
|`?`|Zero or one of the previous character|
|`^`|Start of string|
|`$`|End of string|
|`[ ]`|Character class (any one character in list)|
|`[^]`|Negated character class|
|`{n}`|Exactly n repetitions|
|`{n,}`|n or more repetitions|
|`{n,m}`|Between n and m repetitions|
|`()`|Grouping|
|`\`|Escape character|

### Special Character Classes

|Pattern|Meaning|
|---|---|
|`\d`|Any digit|
|`\w`|Word character (letter, digit, underscore)|
|`\s`|Whitespace character|

### Practical Examples

**Date validation (dd/mm/yyyy, 1900-2029):**

```bash
grep -E '((0[1-9]|[12][0-9]|3[01])[./-](0[1-9]|1[0-2])[./-](19[0-9]{2}|20[0-2][0-9]))'
```

**Email extraction:**

```bash
grep -E '([a-z0-9_!@#$%^&*+]@(gmail|email)\.com)' accounts.txt
```

**Example output:**

```
ahmedpale@gmail.com
ahmed343chahi@gmail.com
ahmadpalei3#2@email.com
```

### Perl-Compatible Regex (PCRE)

Use `-P` flag for advanced regex features:

```bash
grep -P 'advanced_regex_pattern' file.txt
```

### Practice Resources

Test and learn regex patterns at: [regex101.com](https://regex101.com/)

---

## Tips and Best Practices

1. **Combine commands with pipes** for powerful text processing workflows
2. **Use `-i` with `sed`** to save changes permanently
3. **Sort before using `uniq`** for accurate duplicate removal
4. **Use `grep -E`** for extended regex without escaping special characters
5. **Test regex patterns** on sample data before applying to important files

---

## Contributing

Feel free to suggest improvements or additional commands!

## License

This guide is provided as-is for educational purposes.
