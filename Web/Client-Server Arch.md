# Client-Server Module 

## The process:
- User enters a URL in the browser (example: www.example.com).
- Browser performs a DNS lookup to convert the domain name into an IP address.
- Browser establishes a connection and sends an HTTP/HTTPS request to the server using that IP.
- Server responds with website resources like HTML, CSS, JavaScript, and images.
- Browser renders the webpage by processing these files and displaying the content.
## Components
**Client**: A device or an web-application that request data or infromations from a server following many protocols and application layers 

**Server**: A hug resources device, handle requests that cam from the client side, using server side process, and returning the documents requested from the client side .

**Network**: The socket and the Network infrastructure used, starting from DNS Resolution till protocols like the http(s) and tls, ssh , tcp, ip used make a reliable connection between the client and server.

**API**: 


## Listning processes :
When a process is listening on a port, the OS kernel manages incoming packets.  
The server process is usually sleeping and not polling.  
When the NIC receives a packet it triggers an interrupt, the kernel processes the packet, determines which socket it belongs to, and then wakes the process waiting on that socket.
then : 
- The packet is processed by the TCP/IP stack.
- The **payload** (the actual data) is extracted.
- That payload is placed in a **receive buffer in kernel memory**.

The process cannot access kernel memory directly.
Instead, the kernel exposes the socket to the process through a **file descriptor**.
after the process runs on the CPU and can trigger a system call. The CPU switches to kernel mode, the kernel executes the requested operation (like creating a socket), and then the kernel returns a file descriptor to the process.

The whole cycle : 
```s
Running
↓
Process calls accept()
↓
Kernel blocks process
↓
Client connects
↓
Kernel wakes process
↓
accept() returns new file descriptor (client_fd)
↓
Process calls recv(client_fd)
↓
Kernel blocks if no data
↓
Packet arrives
↓
Kernel wakes process
↓
recv() returns the received data
```

**You will not use The syscalls directly** 
```
YOU WORK HERE (Backend Dev)
        ↓
[ Your Code - Python/Node.js/Go/Java ]
        ↓
[ Web Framework - Django/Express/Spring ]
        ↓
[ HTTP Library ]
        ↓
[ Language Runtime / Standard Library ]
        ↓
[ libc / OS Library ]
        ↓
[ System Calls - accept(), recv(), send() ]  ← rarely touched
        ↓
[ Kernel / OS ]
        ↓
[ Network Hardware ]
```

here we talking about the api that you wrote it using js or python ... and a framwork like django , laravel, express.js
As an API developer with Django, Laravel, or Express — your entire job is: **read the request, run your logic, query the database, send a response.** The framework is your silent partner handling everything beneath that. You think in **HTTP, JSON, routes, and business logic** — never in sockets or system calls.