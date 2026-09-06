
# Python Virtual Envirement:

>A Python virtual environment is an isolated directory on your computer that contains a specific Python interpreter and its own set of installed packages, independent of other projects or the system's global Python installation

Imagine this situation:

- Project A needs **Django 3.2**
- Project B needs **Django 5.0**
- Your system can’t safely use both at the same time 😬
👉 A **virtual environment (venv)** solves this.

**the command to create a virtual machine**:
```python
python3 -m venv venv_name
```
`-m`: means, run this module as program.
`venv`: is the module that creat virtual-envirements.
`venv_name`: you can name your created envirement 

### Run you code using a envirement python
```bash
|_file.py
|_venv
    |_bin
    |_include
    |_lib
    |... envirement files]
```
run using the vertual envirement executable:
```css
@ubuntu> venv/bin/python file.py 
```

---
# The libraries Used

>**sys**: gives information about the Python interpreter and system paths
>**os**: lets you interact with the file system(`os.path.basename()`) to
   get folder names.
>**site** gives info about where Python packages are installed

used as:
`sys.executable`: full path to the python interpreter currently runing the script.
`sys.prefix`: "root" of the current Python environment
	- if inside a virtual environment point to the venv folder.
	- if system python, points to system Python location.
`sys.base_prefix`: system python prefix.
`{os.path.basename(prefix)}`: prefix = sys.prefix et os.path.basename()
means give me the last part of the path.
```python
os.path.basname("/home/kavali/project/ex0/matrix_env)
```
output:
```python
matrix_env
```

---

# Pip

>`pip` downloads, installs, upgrades, and removes **Python libraries**.
>like: 
- pandas
- numpy
- requests
- matplotlib
python by itself is very small 
pip help python to be powerfull
**to use:**
```cs
pip install pandas
```



# Pandas

>pandas is a Python library for working with data in tables.

# Numpy

>It means `Numerical Python` its a library made for numbers, math, arrays.


# Matplotlib

>is a library for drawing graphs and plots, it answer questions like:
- How do my numbers look? 
- Is it increasing?
- What is the trend?


# difference between pip and Poetry

**pip**: A package installer
**Poetry**: A project manager

how pip work:
- Read requirements.txt
- install packages into the active Python envirement
- Does not manage the project structure
- Does not create environment automaticaly 

what is **Poetry** is good at:
- Creating virtual environements
- Managing dependencies 
- locking exact versions
- managing project metadata.



# Requests 

>Lets python send/receive data from website in a simple way.


# Importlib

>`importlib` is a **standard Python module** that lets you **import things dynamically**, _while your program is running_
example:
```python
import importlib

math = importlib.import_module("math")
print(math.sqrt(16))
```



# Sys.exit()

>is about **stopping your program on purpose** and telling the system **that something went wrong**.
```python
import sys
sys.exit()
```
This **immediately stops** the Python program.
**No more code runs after it**
Exit status:
`0` : program ended successfully.
`1` (or any non-zero number) program ended with and error.


# Common status codes: 
|Code|Meaning|
|---|---|
|200|Success ✅|
|400|Bad request ❌|
|401|Unauthorized ❌|
|403|Forbidden ❌|
|404|Not found ❌|
|500|Server error ❌|

Tomle file
is the same requerements in for the pip command 

---
# Environment Variable

>**key–value pair** stored **outside your code**, provided by the
>operating system.



# Dotenv 
```python
pip install python-dotenv
```
It loads **environment variables from a `.env` file** into Python.

