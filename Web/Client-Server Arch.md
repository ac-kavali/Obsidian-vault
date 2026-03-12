# Client-Server Module 
==focus on : Structure, components, infrastructure ==
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