### What is docker :
**Docker** is an open-source platform that uses **operating-system-level virtualization** to package software into lightweight, isolated units called **containers**

---
### What problem docker solved ? 
The main expression related on the problem that docker solved is : 
"_It works on my machine, but it doesn't work on yours._"
that they are caused by : 
- a messing file .
- software version mismatch.
- the heaviness of virtual machines

---
## How docker works
Docker works by packaging an application and all of its dependencies into a lightweight, isolated unit called a container



![[docker-on-linux-windows-mac.jpg|1044]]


---
## Docker Engine
```
Docker Engine 
	├── Docker daemon (dockerd) 
	├── Docker CLI (docker) 
	└── container runtime components
```
The **daemon** is the important background service.

![[dockerimages.png|690]]

### Docker Deamon
is a background service, that runs on the host machine does the work of running and managing both containers and container images and orchestrate there operations.

### Containers
A **Container** is a runnable instance of the image. You create, start, stop, move, delete containers with the Docker API or CLI.




### Docker Client



### Docker Host


### Docker Hub

### Dockerfile
Each instruction in a Dockerfile creates a layer in the image, the more instructions the larger the docker image.



this means that the layers are stored together in the image but each
layer identify what the changes starting from its previous layer

--- 
<strong>Question to answer:</strong>
- [ ] 