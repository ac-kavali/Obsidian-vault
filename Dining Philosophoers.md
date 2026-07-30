### CPU hirarchy:
**CPU socket**:
- A CPU socket is the physical connector on the motherboard where the processor is installed.
**CPU processor**
- The CPU is the chip that performs computations.
**Core**: 
A core is an independent processing unit inside the CPU.
each core can excute instructions independently, A **core** is an independent processing unit inside the CPU.

**Threads**:
A thread is a logical execution path.
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


---
- [ ] What is a dongle? 
- [ ] What is a mutex?
- [ ] What is a cooldown ? 
- [ ] why we need a cooldown delay?
- [ ] what is a semaphore?
- [ ] How to create separate monitor thread that checks whether a coder has burned out?