**Intro**
A web server is a software that listens for incoming connections and then utilises the HTTP protocol to deliver web content to its clients.

**Get started**
The most common web server software you'll come across is Apache, Nginx, IIS and NodeJS. A Web server delivers files from what's called its root directory, which is defined in the software settings. For example, Nginx and Apache share the same default location of /var/www/html in Linux operating systems, and IIS uses C:\inetpub\wwwroot for the Windows operating systems. So, for example, if you requested the file `http://www.example.com/picture.jpg` , it would send the file `/var/www/html/picture.jpg` from its local hard drive.



- what means listning(use the example of a call center that wait a call)
- what is the part that is responsible of shoosing the port based on the prefix (http/https)
- how they work and how they are devloped and built
- setup a web server on your local host 
- how it understand the request (http(s) request)
- how it treath databases
- explain the type of applications that is huge to not be able to use just one servers and use the load balancers with multiple servers