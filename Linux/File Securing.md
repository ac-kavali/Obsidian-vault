
## Secure a file using GPG 
_(GNU Pravacy Guard)_

### **Crypting**
```sh
gpg -c archive.tar.xz 
```
A input for the passphrase will be asked

**Output**:
```
archive.tar.xz.gpg
```

### **Decrypting**
```sh
gdp -d archive.tar.xz.gpg > archive.tar.xz.gpg
```
Will ask you to enter the _passphrase_.
**Output**:
```
archive.tar.gz 
```

**Extract file** 
```sh
tar -xf archive.tar.xz 
```