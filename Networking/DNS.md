**Domaine Name System** 
is a hierarchical system that translates domain names into IP addresses, enabling computers and network devicese to locate and communicate with each other in the internet.
![[dns_layers.png|1112]]
> This is just an example where the Recursive DNS server may not be the ISP 
> it belong on your dns configuration, that is often getten from the DHCP config
> from your router, like if the dns ip server is 8.8.8.8, it means that you use google dns servers if its 1.1.1.1 , means you use cloudflare ...

## Domain Heirarchy
### TLD Servers: 
A TLD (_top-level domain_) is the most generic [domain](https://developer.mozilla.org/en-US/docs/Glossary/Domain) in the Internet's hierarchical [DNS](https://developer.mozilla.org/en-US/docs/Glossary/DNS) (domain name system). A TLD is the final component of a [domain name](https://developer.mozilla.org/en-US/docs/Glossary/Domain_name), for example, "org" in `developer.mozilla.org`.

Top level domains are known and managed by **TLD Servers** like Nasa, IANNA ROOT dns Servers.

#### Generic Top Level Domains: 
GTLD represent a type of domain names that represent specific feilds: like **.com** that represent comercial use , **.edu** represent educationnal use, **.org** represent 
an organizations websites ...etc
#### Country Code Top Level Domains:
ccTLD used for geographical purposes, for example, **.ca** for sites based in canada
**.usa** for usa , **.ja** for japan and so on.


---
## Authoritative name server:
**Authoritative Name Server:** A DNS server that stores the official DNS records of a domain (IP, mail server, etc.) and provides the final, actual answer to queries. It’s run by the domain owner, a DNS provider, or hosting provider — **not by the TLD**; the TLD just points to it.

## The registrar:
**Domain Registrar / Provider:** A company that **sells and manages domain names**. They register your domain in the TLD’s database and often **run authoritative DNS servers** by default, so your domain can be resolved without you running your own DNS.

**Who runs them:** Companies like GoDaddy, Namecheap, Hostinger, etc.
**Relation to authoritative servers:** If you use their DNS, the registrar’s servers act as the authoritative servers for your domain. If you run your own DNS, the registrar just tells the TLD where your servers are.

## The registry (TLD provider)
**Registry (TLD operator):**  
An organization responsible for **running the name servers for a top-level domain (TLD)** and maintaining the database of all domain names registered under that TLD. It not store the ip address of the domain name, but store the **Authoritative Name Server** for the domain.


--- 
## The registrant 
The **registrant** is the **person or organization that owns (uses) the domain name**.




