- [ ] Each time you need to use the mutex is because the variables shared between all the threads and to avoid race condition
### take_dongle

- it lock the dongle (cause no other one can access it cause i will change the variable of `is_used` )
- to a coder takes the dongles it should take the right one then the left one , 
- i push the coder to get its place in the queue
- while the dongle | is taken or in cooldown state | or the coder still not in the head of the queue 
- availablity of the dongle in the initialization is set to 0 , and when a coder release the the dongle it set it to the current time  + cooldown_time 

---
### coder_routine
coder routine where we see that they do there the concurrency to take the dongle at the same time and this is implimented using the separate thread assignement where each coder is taken to execute it routine by a thread.
-  converting the arguments from (void *) to (t_coder *)
-  handle the case if there is just one coder and one dongle we give it its right dongle and wait until he burn out.
- and while the simulation not ended and the coder not fully compiled it loop over `take_dongle()`, `coder_compile`, `release_dongle`
- then check if the coder is fully compiled if yes break if not, debug and refactor. and loop again 
![[Pasted image 20260804170429.png]]

---
### assigne_dongle

---
### pthread_create
where i assigne each coder to a thread to execute the [[#coder_routine()]] 
and clean all and distroy the mutexes if the any of the creation fails 


---
### check_all_done
here i loop over all the coders variable (is fully complied) if any one not compiled i return 0 if they are fully compiled i set the program end and i return 1

---
### release_dongle
- always lock the mutex of the dongle 
- set `dongle->is_taken = 0`
- and unlock it again 
- set the dongle availablity time to `current + cooldown`
- and broadcast the waiting threads on the condition variable of the dongle
---
### custom sleep 
here we use the time x to sleep but instead of just sleeping this x time we need to check if the program is still runing, then we should sleep and each time we need to check the burn out

---
### check burnout
looping over all the coders and checking if each one is fully compilled skip it , if not check the if its burned out if just one burned out you 
should return and print the who burned out 