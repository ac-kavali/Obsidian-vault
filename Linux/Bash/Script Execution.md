>A shell script is a file containing commands executed by a shell (bash, zsh, etc.) to automate tasks.

# Run a Script 

## Run with bash explicitly

```shell
bash script.sh
```
or 
```shell
/bin/bash script.sh
```
--- 

## Run with sh 

```shell
sh script.sh
```
this execute the script with default shell, may vary in deffenrent distribution (**dash** on <span style="color:rgb(255, 0, 0)">archlinux</span>, Different behavior)

## Run directly as executable

```sh
chmod +x script.sh
./script.sh
```
this use the shell specified in the script's shebang line

## Using source

**source**: reads and executes commands from a specified file within the current environment shell
```sh
source script.sh
```
[[bash]]