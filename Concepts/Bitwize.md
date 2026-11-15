# Operations

![[bitwizeOperators.png]]

---
# Byte ordering(endianness)
In Computer science when we want to define how a bytes or a data type store we mostly depend on what byte ordering in our System 
- **Big-endian**: Stores data bites from left to right, MSB is in the right that match most of memroy adderesses layout in modern systems 
![[Pasted image 20261115112915.png|1277]]

- **Little-endian**: MSF is in the right, the opposite of the big-endian, this make it more overhead to read and interpret for human, but its wildely used in most of modern system rather than the big-indian 
![[Pasted image 20261115112825.png|1277]]

**We maked the memory level representation clear, but we need also to get an idea about the CPU, ALU how it interpret it :** 
### CPU 
We'll use a typical x86-64 Linux computer as our example



---
# Bit Shifting

It is sliding the digits of a binary number left or right using `<<` or `>>` operators.
### Steps
- you need the value `int` `unsigned int` `char` ...
- a bitwize operator like `<<` or `>>`.
- the Shift amount : an integer telling how many position shift. 
### Example
```c
int main(void)
{
	int a;
	a = 10; 
	a = a << 1; //shifting a bits to left by 1 position
}
128 
```
## Shifting Values calculating : 
- `<<` *Left shifting* : when you shift to left you multiple by 2.
```cs
n = n << amount; // n = n * 2^amount
```
- `>>` *Right shifting* : when you shift to right you divide by 2.
```cs
n = n >> amount; // n = n / 2^amount
```

Examples
`>>` : right shifting :
![[bitwize_example1.png]]

`&` : the `And` operation: 
![[bitwize_example2.png]]
