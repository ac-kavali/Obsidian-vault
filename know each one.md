### take_dongle()

- it lock the dongle (cause no other one can access it cause i will change the variable of `is_used` )
- to a coder takes the dongles it should take the right one then the left one , 
- i push the coder to get its place in the queue
- while the dongle | is taken or in cooldown state | or the coder still not in the head of the queue 

---
### coder_routine()
coder routine where we see that htey do there the concurrency to take the dongle at the same time and this is implimented using the separate thread assignement where each coder is taken to execute it routine by a thread.
-  converting the arguments from (void *) to (t_coder *)
-  handle the case if there is just one coder and one dongle we give it its right dongle and wait until he burn out.

---
### assigne_dongle()

---
### pthread_create()
where i assigne each coder to a thread to execute the [[#coder_routine()]] 
and clean all and distroy the mutexes if the any of the creation fails 


---
