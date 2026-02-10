# Operations

![[bitwizeOperators.png]]
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
