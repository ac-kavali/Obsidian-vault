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
# Threads in code
_The POSIX thread API gives you functions to control each stage_

### pthread_create()
Creates a new thread
```c
int pthread_create(
    pthread_t *thread,
    const pthread_attr_t *attr,
    void *(*start_routine)(void *),
    void *arg
);
```
- `pthread_t *thread`: This is the variable where the system stores the identifier of the new thread.
- `pthread_attr_t`: These are optional thread attributes, for almost every 42 project just set `NULL`. 
- `start_routine`: This is the function the thread will execute.
- `void *arg`:  This is the argument passed to the thread function, you can pass any thing but you should threat it in the function passed.

### Pthread_join()
is the function used to wait for a thread to finish and optionally collect its return value.
```c
int pthread_join( pthread_t thread, void **retval );
```
- `pthread_t thread`: The ID of the thread you want to wait for. for multiple threards, you create a loop and call join for each one.
- `void`: This receives the value returned by the thread function. 

### o

---
## Simulation data structs:
### Dongle
```c
typedef struct s_dongle{
	int             id; // Which dongle is this?
	pthread_mutex_t mutex; // Protects the dongle's state
	long            cooldown_until; // When it can be used again
	int             in_use; // 0 = free, 1 = occupied
	pthread_cond_t  cond; // Lets threads wait efficiently
} t_dongle;
```
- `pthread_mutex_t` is a **data type provided by the POSIX threads (`pthread`) library** that represents a **mutex** (mutual exclusion lock).
- `mutex` the dongle resource locking and unlocking to garantee the safe access of the thread to the dongle.
- `cooldown` time before a coder can use the dongle after a another one release it.
- `in_use` the booleen 0 or 1 that indicate if it the dongle is used 
- `pthread_cond_t` is a POSIX thread data type used as a **condition variable** resource to let threads wait until a specific condition becomes true and its
  effecient cause it not use a for loop and poling, because this wasts cpu 
---
```c
typedef struct r_table_config
{
	int    number_of_coders;
	long   time_to_burnout;
	long   time_to_compile;
	long   time_to_debug;
	long   time_to_refactor;
	int    number_of_compiles_required;
	long   dongle_cooldown;
	t_scheduler  scheduler;
	pthread_mutex_t sim_mutex;
	pthread_mutex_t msg_mutex;
}t_table_config;
```
- `sim_mutex` : a mutex that protect the simulation `stop` varabiale.
- `msg_mutex` a mutex that protect the program output login.
---
```c
typedef struct s_coder
{
	int             id;
	pthread_t       thread;
	t_dongle        *left;
	t_dongle        *right;
	long            last_compile_start;
	int             compile_count;
	pthread_mutex_t state_mutex;
	struct s_simulation *sim;
} t_coder;
```
- `pthread_t thread`: the representation of the coder as OS thread. created using `pthread_create`.
- `t_dongle *right and *left`: Pointers to this coder's two neighboring dongles, the ones it must acquire _both_ of to compile
- `last_compile_start`: This is the coder's personal burnout clock to not exeed So this field holds the timestamp of the most recent time this coder **began** compiling.
- `compile_count`: number of compiles completed by this coder.
- 

---
```c  
typedef struct s_simulation
{
	t_table_config   config;
	t_dongle         *dongles;
	t_coder          *coders;
	pthread_t        monitor;
	long             start_time;
	int              stop;
	pthread_mutex_t  stop_mutex;
	pthread_mutex_t  print_mutex;
} t_simulation;
```


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



---
- [ ] The important point is that **the monitor does not care what the coder is currently doing**. It only checks **when they last started compiling**.
- [ ] The **monitor** is another thread.
