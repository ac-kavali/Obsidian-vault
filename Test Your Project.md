#### Project Structure:
```pgsql
mini_project/
├── main.c
├── add.c
├── multiply.c
├── factorial.c
├── reverse.c
└── header.h
```

##### 1 header.h : 
here where you define you function starting by `#ifndef HEADER_H` and `#define HEADER_H`, ending by `#endif`. 
```c
#ifndef HEADER_H
#define HEADER_H

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

/* Function prototypes */
int add(int a, int b);
int multiply(int a, int b);
uint64_t factorial(unsigned int n);
void reverse(char *str);

#endif
```
##### 2 add.c:
```c
#include "header.h"

int add(int a, int b)
{
    return a + b;
}
```

##### 3 multiply.c
```c
#include "header.h"    //include in every function 

int multiply(int a, int b)
{
    return a * b;
}
```

##### 4 factorial.c:
```c
#include "header.h"   //include in every funciton 

uint64_t factorial(unsigned int n)
{
    if (n == 0)
        return 1;
    return n * factorial(n - 1);
}
```

##### 5 reverse.c: 
```c
#include "header.h" //include in every function 

void reverse(char *str)
{
    int i = 0;
    int j;
    char temp;

    if (!str)
        return;

    j = 0;
    while (str[j] != '\0')
        j++;
    j--; // last index

    while (i < j)
    {
        temp = str[i];
        str[i] = str[j];
        str[j] = temp;
        i++;
        j--;
    }
}
```

##### 6 main.c :
```c 
#include "header.h"  //include in every function 

int main(void)
{
    int a = 5, b = 10;
    char text[] = "Hello, World!";

    printf("Add: %d\n", add(a, b));
    printf("Multiply: %d\n", multiply(a, b));
    printf("Factorial of %d: %llu\n", a, factorial(a));

    printf("Original string: %s\n", text);
    reverse(text);
    printf("Reversed string: %s\n", text);

    return 0;
}
```

##### 7 compiling and debugin project :
```bash
gcc -Wall -Wextra -Werror *.c -o my_program
``` 
##### 8 fix your error and run it :
```bash 
./my_program
```

##### 9 output :
```yaml
Add: 15
Multiply: 50
Factorial of 5: 120
Original string: Hello, World!
Reversed string: !dlroW ,olleH
```
