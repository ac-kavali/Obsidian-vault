## Table of content:
- [[#CPU hirarchy:|CPU hirarchy:]]
- [[#Run the program|Run the program]]
- [[#pthread_create()|pthread_create()]]
- [[#pthread_join()|pthread_join()]]
- [[#pthread_mutex_init()|pthread_mutex_init()]]
- [[#pthread_mutex_lock()|pthread_mutex_lock()]]
- [[#pthread_mutex_unlock()|pthread_mutex_unlock()]]
- [[#pthread_mutex_distroy()|pthread_mutex_distroy()]]
- [[#pthread_cond_init()|pthread_cond_init()]]
- [[#pthread_cond_wait()|pthread_cond_wait()]]
- [[#pthread_cond_timedwait()|pthread_cond_timedwait()]]
- [[#pthread_cond_signal()|pthread_cond_signal()]]
- [[#pthread_cond_broadcast()|pthread_cond_broadcast()]]
- [[#pthread_cond_destroy|pthread_cond_destroy]]
- [[#gettimeofday()|gettimeofday()]]
- [[#clock_gettime()|clock_gettime()]]
- [[#usleep()|usleep()]]
- [[#Simulation data structs:|Simulation data structs:]]
- [[#Simulation data structs:#Dongle|Dongle]]
- [[#Responsibilities of the monitor]]

---
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

### pthread_join()
is the function used to wait for a thread to finish and optionally collect its return value.
```c
int pthread_join( pthread_t thread, void **retval );
```
- `pthread_t thread`: The ID of the thread you want to wait for. for multiple threards, you create a loop and call join for each one.
- `void`: This receives the value returned by the thread function. 

### pthread_mutex_init()
is used to **create and initialize a mutex**.
```c
int pthread_mutex_init(
    pthread_mutex_t *mutex,
    const pthread_mutexattr_t *attr
);
```
- `pthread_mutex_t *mutex`: This is the mutex you want to initialize. after you declared it using `pthread_mutex_t *mutex` in your code.
- `pthread_mutexattr_t`: This define mutex attribute, also NULL for your project.

### pthread_mutex_lock()
is the function that **takes ownership of a mutex (locks it)** so that only one thread can enter a protected section of code at a time.
```c
int pthread_mutex_lock(pthread_mutex_t *mutex);
```
`pthread_mutex_t *mutex`: the address of the mutex you want to lock

### pthread_mutex_unlock()
It **releases the mutex**, allowing other threads that are waiting for this mutex to continue.
```c
int pthread_mutex_unlock(pthread_mutex_t *mutex);
```
`pthread_mutex_t *mutex`: It takes the address of the mutex you want to unlock.


### pthread_mutex_distroy()
is used to **delete a mutex when you no longer need it**.
```c
int pthread_mutex_destroy(pthread_mutex_t *mutex);
```
`pthread_mutex_t *mutex`: It takes the address of the mutex you want to distroy.


### pthread_cond_init()
 creates and initializes a **condition variable**.
```c
int pthread_cond_init(
    pthread_cond_t *cond,
    const pthread_condattr_t *attr
);
```
`pthread_cond_t *cond`: the address of the condition  variable you want to initialize


### pthread_cond_wait()
is the function that makes a thread **sleep until another thread signals that something has changed**.
It only blocks **the current thread** that calls it.
```c
int pthread_cond_wait(
    pthread_cond_t *cond,
    pthread_mutex_t *mutex
);
```
`*cond`: the address of the condition variable you waiting on.
`*mutex`: the address of the mutex protecting the shared data that is declared with  `pthread_mutex_t`



### pthread_cond_timedwait()
It waits for a condition **until a specific timeout time**. If nobody signals it before that time, it wakes up automatically.
```c
int pthread_cond_timedwait(
    pthread_cond_t *cond,
    pthread_mutex_t *mutex,
    const struct timespec *abstime
);
```
`const struct timespec *abstime`: This is the timeout moment. its a struct timespec :
```c
//To call `pthread_cond_timedwait()`, you first need to create and fill a `struct timespec`.
struct timespec timeout;
// Get current time clock_gettime(CLOCK_REALTIME, &timeout);
// Add 5 seconds to current time
timeout.tv_sec += 5;
pthread_mutex_lock(&mutex);
int ret = pthread_cond_timedwait( &cond, &mutex, &timeout );
```

### pthread_cond_signal()
is used to **wake up one thread that is waiting on a condition variable**.
```c
int pthread_cond_signal(pthread_cond_t *cond);

// if the waiting queue: [T1] [T2] [T3] [T4] [T5]
// it wake up the [T1] and let the [T2] [T3] [T4] [T5]
```
`cond`: The condition variable you want to signal .

### pthread_cond_broadcast()
is used to **wake up all threads waiting on a condition variable**.
```c
int pthread_cond_broadcast(pthread_cond_t *cond);
```
`cond`: The condition variable you want to signal .


### pthread_cond_destroy
is used to **destroy (clean up) a condition variable** when you no longer need it.
```c
int pthread_cond_destroy(pthread_cond_t *cond);
```



### gettimeofday()
It is commonly used in pthread simulations (like your Codexion project) to measure elapsed time.
```c
#include <sys/time.h>
int gettimeofday(
    struct timeval *tv,     //timeval struct 
    struct timezone *tz    //time zone not being used to day, so you use just NULL.
);
```
#### Example"
```c
#include <stdio.h>
#include <sys/time.h>

int main(void)
{
    struct timeval tv;

    gettimeofday(&tv, NULL);

    printf("Seconds: %ld\n", tv.tv_sec);
    printf("Microseconds: %ld\n", tv.tv_usec);

    return 0;
}
```


### clock_gettime()
is a function used to get the **current time from a clock source** with high precision.
```c
#include <time.h>
int clock_gettime(
    clockid_t clockid,
    struct timespec *tp   // timespec struct 
);

//example
clock_gettime(CLOCK_REALTIME, &ts);
```
`CLOCK_TREALTIME`: **clock ID** (`clockid_t`) is the value that tells `clock_gettime()` **which clock source you want to read**.
_common clock id_:
`CLOCK_REALTIME`: real time clock.
`CLOCK_MONOTONIC`: It is a clock that starts from an unspecified point always increases never goes backward

### usleep()
 is a function that makes the **current thread sleep (pause execution) for a specified number**
```c
#include <unistd.h>

int usleep(useconds_t usec);
```
`usec`: means **microseconds** and 1s = 1M microseconde

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
## Responsibilities of the monitor
It repeatedly checks:
1. **Has any coder burned out (died)?**
2. **Has every coder compiled enough times?** (if the optional argument exists)
If either condition is true:
- Mark the simulation as finished.
- Print the burnout message (only for the first coder that burns out).
- Exit the monitor thread.


---
- [x] What is a dongle? 
- [x] What is a mutex?
- [x] a race condition?
- [x] What is a cooldown ? 
- [x] allocate the dongles dynamicaly?
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
- [ ] A condition variable is like a **waiting room**. Many threads can enter this waiting room and sleep until some event happens.
