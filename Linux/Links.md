- [[#Links in Linux|Links in Linux]]

## Links in Linux

### Hard Links

**Definition:** Attached to the inode on hard disk, not to original file. Even if original is removed, hard link still exists.

```bash
# Create hard link
ln file filetolink
```

**Note:** A file with 2 or 3 hardlinks means the file content in hard disk is reachable by 2 other files with different filenames.

### Soft Links (Symbolic Links)

**Definition:** Attached to the original file and depends on it. No longer exists if original file is removed.

```bash
# Create symbolic link (force with -f if needed)
ln -s target_file linknamefile
```

### Additional Options

```bash
# Show files by modification date, comma-separated
ls -tmp
```
