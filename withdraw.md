# Cell Web: 
By Ahmed Chahi
## Month 1 — Club and foundations

| Week   | Session                                                                                                                                                                                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Week 1 | **General session · Club vision and ambitions.** Introduce NovaSec’s goal of helping students learn web security together and lead their own labs.                                                                                                              |
| Week 2 | **Beginner 1 · Enterprise networks.** Map personal, local, wireless, campus, metro and wide-area networks, plus VPNs. Identify switches, routers, access points, firewalls, proxies and servers. **Share the full 15-session roadmap for download at the end.** |
| Week 3 | **Beginner 2 · Web hacking.** Follow a browser request and introduce all ten OWASP risks, with examples like SQL injection and broken access control.                                                                                                           |
| Week 4 | **Careers and certifications.** Use Moroccan job ads to compare CCNA (networking), Security+ (foundations), eJPT and OSCP (pentesting), and BSCP (web testing).                                                                                                 |

## Month 2 — First live labs

| Week   | Session                                          | Live demo                                                      |
| ------ | ------------------------------------------------ | -------------------------------------------------------------- |
| Week 5 | **Intermediate · A02 Security Misconfiguration** | Sign in to an exposed admin panel with its default password.   |
| Week 6 | A01 Broken Access Control                        | Change an invoice ID to read another test user’s invoice.      |
| Week 7 | A05 Injection                                    | Reveal hidden records through SQL injection in a search field. |
| Week 8 | A07 Authentication Failures                      | Reuse a password-reset link.                                   |
| Week 8 | A04 Cryptographic Failures                       | Spot a test password in an HTTP capture.                       |

## Month 3 — Live labs and public exploits

| Week    | Session                                    | Live demo                                                                                                                             |
| ------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Week 9  | A06 Insecure Design                        | Redeem a single-use coupon twice.                                                                                                     |
| Week 10 | A03 Software Supply Chain Failures         | Trigger a known flaw in an outdated dependency.                                                                                       |
| Week 10 | A08 Software or Data Integrity Failures    | Install a tampered update that the app accepts without checking its signature.                                                        |
| Week 11 | A09 Security Logging and Alerting Failures | Trigger repeated failed logins and check for a log entry and an alert.                                                                |
| Week 11 | A10 Mishandling of Exceptional Conditions  | Trigger a timeout that makes a permission check grant access by mistake.                                                              |
| Week 12 | **Public exploits workshop**               | Match a product version to a CVE. Find the exploit in Exploit-DB, review the code, test it in an isolated lab, then patch and retest. |

# 
## Otmane Talhaoui
# 3 Months Roadmap Pentesting for Host/Network

- Month 1: Reconnaissance & Initial Access
(Members can independently enumerate and compromise a basic vulnerable machine)

- Month 2: Exploitation & Privilege Escalation
(Members can escalate privileges, crack hashes, and extract credentials)

- Month 3: Post-Exploitation & Pivoting
(Members can persiste, pivot, move laterally, and perform a small internal network)


## Month 1: Reconnaissance & Initial Access

### Week 1: Network Reconnaissance

- Internal vs external network pentesting
- Network topology and attack surface
- TCP vs UDP, ports, protocols
- ARP, ICMP, DNS, SMB, SSH
- Host discovery and network scanning

### Week 2: Service Enumeration

- Enumeration vs scanning
- Common services and their attack surfaces
- Anonymous access and default credentials
- Information disclosure

### Week 3: Vulnerability Assessment & Initial Access

- Vulnerability identification
- CVE, CVSS, exploitability
- Misconfigurations vs software vulnerabilities
- Password attacks
- Exploit selection and validation

### Week 4: Initial Access Practice

- Attack chain building
- From reconnaissance to exploitation
- Choosing attack vectors
- Handling shells and sessions

## Month 2: Exploitation & Privilege Escalation

### Week 5: Linux Privilege Escalation

- Linux users, groups, permissions
- SUID/SGID, sudo permissions
- Linux capabilities
- Cron jobs and services
- Kernel vulnerabilities
- Misconfigured scripts

### Week 6: Windows Privilege Escalation

- Windows users, groups, privileges
- Windows services
- Service permissions
- Unquoted service paths
- Scheduled tasks
- Stored credentials
- Windows security misconfigurations

### Week 7: Password Attacks & Credential Harvesting

- Password storage and authentication
- Linux vs Windows hashes
- NTLM authentication
- Credential reuse
- Password spraying vs brute force
- Offline password cracking

### Week 8: Post-Exploitation & Persistence

- Post-exploitation methodology
- Maintaining access
- Persistence mechanisms
- Cleanup and evidence collection
- Operational security

## Month 3: Pivoting, Lateral Movement & Internal Networks

### Week 9: Pivoting Fundamentals

- What is pivoting?
- Dual-homed machines
- Internal vs external networks
- Routing and forwarding
- Port forwarding
- SOCKS proxies
- Network segmentation

### Week 10: Lateral Movement

- Lateral movement vs privilege escalation
- Credential reuse
- Remote administration protocols
- Trust relationships
- Windows remote access

### Week 11: Active Directory Fundamentals & Pentesting

- Active Directory architecture
- Domain, forest, DC
- LDAP and Kerberos
- Domain users and groups
- Domain trusts
- Authentication vs authorization

### Week 12: Final Internal Network Pentest

Final practical assessment: giving members an unknown network containing

- 1 Hacker machine
- 1 Linux target
- 2 Windows target machines
- 1 Active Directory (DC)
- 1 internal subnet inaccessible directly

Members must independently perform:

1. Network discovery
2. Port scanning
3. Service enumeration
4. Vulnerability identification
5. Initial access
6. Linux or Windows privilege escalation
7. Credential harvesting
8. Pivoting into an internal subnet via (DMZ)
9. Lateral movement
10. AD enumeration and exploitation
11. Evidence collection


# Zakaria Tafjouti
## PWN, Forensics, Reverse Engineering & Cryptography — Roadmap

## 1. Reverse Engineering

### Beginner Sessions
- Introduction to Reverse Engineering
- Introduction to Executable Formats (PE/ELF)
- x86/x64 Assembly Fundamentals
- Registers, Stack, Heap and Memory Layout
- Calling Conventions and Function Analysis
- Introduction to Static Analysis
- Introduction to Dynamic Analysis
- Debugging with x64dbg and GDB
- Introduction to Ghidra and IDA

### Intermediate Sessions
- Disassembly and Decompilation
- Control Flow and Function Reconstruction
- Windows Internals and API Analysis
- Binary Patching and Modification
- Malware Analysis Fundamentals
- Anti-Debugging and Anti-Analysis Techniques
- Obfuscation and Deobfuscation
- Unpacking and Analyzing Protected Binaries

### Practical Activities
- Analyze unknown executable files.
- Reconstruct program logic from assembly.
- Identify suspicious functions and behaviors.
- Solve Reverse Engineering CTF challenges.
- Organize binary analysis competitions.

---

## 2. PWN / Binary Exploitation

### Beginner Sessions
- Introduction to Binary Exploitation
- Computer Memory and Process Layout
- Stack Frames and Function Calls
- Introduction to Buffer Overflows
- Introduction to GDB and Pwndbg
- Understanding Registers and Assembly
- Linux Process Internals

### Intermediate Sessions
- Stack-Based Buffer Overflows
- Format String Vulnerabilities
- Return-Oriented Programming (ROP)
- Ret2libc
- Integer Overflows
- Heap Exploitation Fundamentals
- Use-After-Free and Double-Free
- Binary Exploitation Mitigations (ASLR, DEP, PIE, Stack Canaries)

### Advanced Sessions
- Advanced Heap Exploitation
- Advanced ROP Techniques
- Linux Kernel Exploitation Fundamentals
- Windows Exploitation Fundamentals
- Exploit Development Methodology

### Practical Activities
- Exploit intentionally vulnerable binaries.
- Solve PWN CTF challenges.
- Develop custom exploitation scripts.
- Analyze real-world vulnerability write-ups.
- Organize internal PWN competitions.

---

## 3. Cryptography

### Beginner Sessions
- Introduction to Cryptography
- Mathematical Foundations
- Modular Arithmetic
- Classical Cryptography (Caesar, Vigenère)
- XOR Encryption and Analysis
- Introduction to Symmetric Encryption
- Introduction to Hashing

### Intermediate Sessions
- AES and Block Cipher Modes
- RSA and Public-Key Cryptography
- Diffie-Hellman Key Exchange
- Hash Functions and HMAC
- Random Number Generation
- Elliptic Curve Cryptography (ECC)
- Cryptographic Protocols

### Advanced Sessions
- RSA Cryptanalysis
- Padding Oracle Attacks
- Weak Random Number Generation
- Side-Channel Attacks Fundamentals
- Cryptographic Implementation Vulnerabilities
- Advanced Cryptanalysis

### Practical Activities
- Break classical encryption schemes.
- Solve RSA and AES CTF challenges.
- Analyze weak cryptographic implementations.
- Develop encryption and decryption tools.
- Organize internal Cryptography challenges.

---

## 4. Forensics

### Beginner Sessions
- Introduction to Digital Forensics
- File Systems Fundamentals
- File Metadata and File Signatures
- Disk and Memory Forensics
- Introduction to Wireshark
- Network Traffic Analysis

### Intermediate Sessions
- Memory Dump Analysis
- Windows Event Logs Analysis
- Linux System Forensics
- File Recovery and Artifact Analysis
- PCAP Analysis
- Malware Forensics

### Advanced Sessions
- Windows Memory Forensics
- Advanced Network Forensics
- Timeline Reconstruction
- Incident Investigation
- Digital Evidence Analysis

### Practical Activities
- Investigate forensic disk images.
- Analyze memory dumps.
- Investigate suspicious network traffic.
- Recover deleted files.
- Solve Digital Forensics CTF challenges.

---

## 5. Regular Activities & Meetings

- Weekly technical workshops.
- Weekly hands-on labs.
- Biweekly technical meetups.
- Biweekly CTF challenges.
- Monthly research presentations.
- Internal CTF competitions.
- Collaborative technical projects.
- Participation in external CTF competitions.
- Review and discussion of interesting CVEs and security research.

## 6. Session Structure

Each technical session will follow this structure:

1. Introduction and objectives.
2. Explanation of concepts and theoretical foundations.
3. Live demonstration using relevant tools.
4. Hands-on exercises and practical labs.
5. Questions and technical discussions.
6. Optional challenges and learning resources.

## 7. Cell Organization

The cell will be organized into three main technical tracks:

- Reverse Engineering & Forensics
- PWN / Binary Exploitation
- Cryptography

Each track will have its own sessions, labs, and challenges.

Members will be encouraged to contribute by preparing presentations, developing challenges, sharing research, and helping others.

## 8. Long-Term Objectives

- Build a strong technical community within the club.
- Help beginners develop solid cybersecurity foundations.
- Provide advanced learning opportunities for experienced members.
- Develop custom CTF challenges and practical labs.
- Encourage independent security research.
- Prepare members for national and international CTF competitions.
- Collaborate on technical projects and research.
