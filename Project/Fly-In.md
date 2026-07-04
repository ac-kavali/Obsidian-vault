
<strong>Your Objectif</strong> : Create a Drone routing system 

your program must be executed like: 
```bash
python3 main.py map.txt
```

---
### What is the Graph 
**In General** 
A Graph is a data structure used to represent differents objects are linked together, it consists of vertices (or nodes) and edges that connect them.
There are many types of graphs depending on the problem.
A graph in this project the graph represent the nodes and the links between them starting from the start till the end. 

---
How to make a project Object-Oriented ?

---
## I started learning parsing 
completly for data parsing anywhere like parsing json, parsing logs, parsing data...
and i will use regex to enforce the parsing and also how to perform an error handling if data parsing find somthing is missing or incorrect

---
## The beguest question how to parse data completly correct and check for every detail if messing ?
---
# Making rules 
- `nb_drones`: should at the top of the file and exactly at the first line
- Zone definitions should be clear :
	- `start_hub: <name> <x> <y> [meta-data]` the line should start with `start_hub` and have a `<name>`, `x`, and `y` but metadata is optionnal
	- `end_hub` also the line of the end hub should start with exact name and have an `name`, `x`, `y` and optionnal metadata.
	- and all other lines that start with `hub` should have `name` , `x`, `y` to be a valide hub.
---
## Re in python

re.compile : used to prepare or create a re object that have the metho