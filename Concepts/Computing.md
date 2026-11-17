## Logical processors
We know that each core is a computation unit that can work on one task at a time. _Hyper-Threading_
is a technology invented by Intel. Normally, when a core executes a task, it must load the task's information and code into its internal registers so it can work on it.
During execution, there are moments when the core has to wait, for example while data is being fetched from memory while it can execute more than 50 instruction.
With _Hyper-Threading_, the core can keep the information for more than one task in its architectural state (such as its registers), allowing it to switch between them very quickly. This means the chip can keep track of two software threads at the same time. Although the two threads share the same physical core, the processor can use otherwise idle execution resources to make progress on both, improving overall efficiency.
### single thread program 
is when you create a regular c program it use just one thread. and called single thread program 

### Hyper-threading

![[Pasted image 20260802125130.png|602]]

## Core: 
if the core support hyper-threading : 
```
Physical Core 
├── Logical Processor 0 # hardware thread
└── Logical Processor 1 
```

## Posix Threads in C 
```c
#include <pthread.h>

int instructions1(char *var, int var2){
	block of code ...
}

int instructions2(char *somthign...){
	block of code ...
}

int main(){
	pthread t1;
	pthread t2;
	
	pthread_create(&t1, NULL, &instructions1, NULL);
	pthread_create(&t2, NULL, &instructions2, NULL);
}

```

**Creating two threads gives the OS scheduler two independent execution contexts to schedule, instead of one.** This gives the scheduler the opportunity to execute them in parallel, but doesn't guarantee it.

---
## Deadlock 
A deadlock happens when threads are stuck forever because each one is waiting for something held by another thread.
example : 
```
Thread A owns Resource 1
Thread B owns Resource 2

Thread A waits for Resource 2
Thread B waits for Resource 1
```
a resource can be a variable locked by thread A by a mutex or a database row , or a file ...


--- 
- [ ] That is **exactly correct**. You do not need to manually create, destroy, or manage threads to exploit Hyper-Threading its implimented by cpu archetecture. 
