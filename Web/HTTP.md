[Insperation](Excalidraw/Http.md)
## HTTP: Hypertext Transfer Protocol
**HTTP** is an [application-layer](https://en.wikipedia.org/wiki/Application_Layer) protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers, but it can also be used for other purposes, such as machine-to-machine communication, programmatic access to APIs, and more.
[details](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

## HTTP Request
- The client establishes a TCP connection (or the appropriate connection if the transport layer is not TCP).
- The client sends its request, and waits for the answer.
- The server processes the request, sending back its answer, providing a status code and appropriate data.

**Request line**: the first line of an HTTP request message. It contains three elements separated by single spaces and terminated by a carriage return and line feed , first element is the request method(GET, POST...), the second element is the target-resources, which resource inside the server you want, the third is the protocol version.

**Header**:Headers takes the form of Key:Value and carry metadata about the request, this includes data about the host, client’s user agent, language preferences and more. The server leverages this information to identify the browser and OS version of the client. HTTP
 
**CRLF**: is a blank line with just `\r\n` the that tell the browser that is the end of the header, and start of the body.
each line in the http requests and responses ends with `\r`:Carriage Return and, `\n`: New Line, they both used because, the difference of the operating systems to identify the end of line is different, like Mac os use `\r` , linux `\n`, and windows `\r\n`, where the use of CRLF at each end solved this problem.

**Body**: is a sequence of bytes containing the data sent by a client to a server after the header section. It is typically used with methods like `POST`, `PUT`, and `PATCH` to create or update resources on the server.

## HTTP Response
 The message a server sends back to a client after receiving and processing the request by the server (API).

**Status Line**: This is the first line of every HTTP response and contains three elements
- HTTP Version.
- Status Code.
- Reason Phrase

**Header**: fields in an HTTP response message that pass additional context and metadata Key:Value about the response or the server itself, give the browser information about the response content like `Content-Type`, `Set-Cookie`, `Cache-Control` ...

**CRLF**: like the request the crlf line separate the header from the body.

**Body**: The body contains the actual content being returned, if any. Not all responses have a body — for example, `204 No Content` or `304 Not Modified` typically don't.
