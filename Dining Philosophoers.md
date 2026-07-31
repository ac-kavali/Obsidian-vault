### CPU hirarchy:
**CPU socket**:
- A CPU socket is the physical connector on the motherboard where the processor is installed.
**CPU processor**
- The CPU is the chip that performs computations.
**Core**: 
A core is an independent processing unit inside the CPU.
each core can excute instructions independently, A **core** is an independent processing unit inside the CPU.

**Threads**:
A thread is the smallest execution unite in a process where a single process consiste a multiple threads that runs indepently and executing there task but share resources like memory, registers ...
   There are two meanings of "thread":
   - _Software thread_: is the smallest unit of excution inside a program a single program can have multiple threads runing at the same time 
   - _Hardware thread_ (logical processors): A processing context provided by a CPU core. [[Computing#Logical processors]]
   can be also called a hyper thread this part of the [video](https://youtu.be/cvcAxk0jvDk?si=8Rw_bcReW4lWoUE8&t=118) explain it carefuly

<u>Question</u>: **Can one core have multiple hardware threads?**
-  Yes, usually 2 with SMT/Hyper-Threading.
---
### Run the program
```bash
./codexion <number_of_coders> <time_to_burnout> <time_to_compile> <time_to_debug> <time_to_refactor> <n_of_compiles_req> <dongle_cooldown> <sche> 
```


---
## Threads in code
_The POSIX thread API gives you functions to control each stage_
### pthread_create()
Creates a new thread.


---
- [x] What is a dongle? 
- [x] What is a mutex?
- [x] a race condition?
- [x] What is a cooldown ? 
- [ ] allocate the dongles dynamicaly?
- [ ] why we need a cooldown delay?
- [ ] what is a semaphore?
- [ ] How to create separate monitor thread that checks whether a coder has burned out?
- [ ] understand race condition and how to use the mutix to manually save data and lock variable units

--- 
#### Cooldown
there are many dongle as the number of coders , after coder releases a dongle , it enters a **cooldown** period before anyone can use
#### Dongle
A dongle (struct with id, mutex, ...) is a shared resource in the simulation. In C, we represent each dongle with a `t_dongle` structure that stores all the information needed to manage that resource safely between threads.
#### Mutex
a special lock tool in computer programming, It's a simple object that can be in one of two states: **locked** or **unlocked**. It guarantees that only one thread at a time can hold it locked
its like : 
```c
pthread_mutex_lock(&dongle->lock);
if (dongle->in_use == 0)
{
    dongle->in_use = 1;
}
pthread_mutex_unlock(&dongle->lock);
```
This protect the resource from a deadlock and race conditions
#### Race condition
Without protection, both threads could read `in_use == 0` **at the exact same instant**, both think it's free, and both set it to 1 and walk away thinking they alone hold the dongle. That's a race condition