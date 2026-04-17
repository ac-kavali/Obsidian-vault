

### Alias a command
```shell
alias ll='ls -la'
```
### Unalias a command
```shell
unalias ll
```


---
### Kill 

stoping execution in a shell script refers to halting the the script's progress, often due to an error, a specific condition being met, or a user's requiest. This can be control the flow of the script.
the **kill** command is commonly used to:
- terminate unresponsive processes.
- Manage system resources by stopping unnecessary processes.
- Send specific signals to processes for custom handling.

```bash
kill -9 [PID]
```
- `-9` Is a signal that top totally the process.
```bash
kill -l
```
- list all signal names.

Specify a signal by its name
```bash
kill -s SIGTERM [PID]
```

kill a process using its name
```bash
pkill -9 [process_name]
```

[[Bash]]