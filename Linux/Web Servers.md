**Introduction**:
Another crucial element in web development is the communication between browsers and web servers. Setting up a web server on a Linux operating system can be done in several ways, with popular options including Nginx, IIS, and Apache. Among these, Apache is one of the most widely used web servers. Think of Apache as the engine that powers your website, ensuring smooth communication between your website and visitors.

# Inside web servers

Popular web servers like 
- Apache HTTP Server
- Nginx
- Microsoft IIS
They are mostly written in **C** or **C++**
\- To be very fast.
\- Low level control over memory.
\- Efficient and Secure.
*PHP or Perl would be too slow for building the core web server engine.*

---
# Server-side Scripting language

Languages like:
- JS
- Python
- PHP
- Perl
- Ruby
are used to build:
*The web application not the server itself*

#### Example:
- Apache (written in C) receives a request
- It passes the request to PHP
- PHP generates dynamic HTML
- Apache sends the response back to the client
---
## Java-script

Is a programing/scripting language, originaly created to run inside the browser to make websites interactive.

---
## Node.js


**Node.js** is a **runtime environment** that allows you to run JavaScript **outside the browser**.
### The Relationship (Very Important)

**Node.js runs JavaScript**
Think like this:
- JavaScript = the language
- Node.js = the machine that executes that language outside the browser
Just like:
- C language → compiled by GCC
- Python → executed by Python interpreter
- JavaScript → executed by browser OR Node.js

**PHP is not just a language —it also comes with a **built-in web server since PHP 5.4.**