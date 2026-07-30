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
## Threads in 