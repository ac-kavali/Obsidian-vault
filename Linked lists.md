## <span class ="color-cyan">why linked list </span> : 
#### <span class ="color-purple">What the problems that was in arrays data structure, and solved by linked lists? :</span> 

 - The fixe size of the array, you can't increase or add an element to the array if it is full, you should reallocate an other array and move all element to the new array 
 
 - *A*nd when you want to add an element to a specific index also you need to move all the array element where this take more time and more resources like cpu and RAM.
 
 - **An array requires a contiguous block of memory, This means:** The memory addresses allocated for the array must be sequential, one right after the other.
 
 - If the available free memory is fragmented (scattered in small, non-adjacent blocks), you cannot create the array—even if the total free memory is technically large enough.

---
### 1. Declaring a linked list : 
   ```c 
   typedef struct node {
	   int data;
	   struct node *next;
   }Node;
```

\- <span class ="color-pink">typedef</span>: used to create a new type shortcut with nickname used to reference to it.
\- <span class ="color-cyan">Node</span>:the type nickname created by the `typedef`.

*<span class ="color-orange">note</span>*: **You should define your `struct` type outside of `main()` and outside of any function.**
Because:
- You want **all functions** (like `create_node`, `print_list`, `add_node`, etc.) to know what a `Node` is.
- If you declare the `struct` **inside** `main()`, only `main()` can see it — other functions can’t use it.

---
### 2. Creating a Node :
  When you create your **first node** in a linked list, that node is called the **head**.
```c
Node *head = malloc (sizeof(Node)); //Creating the first node.
head -> data = 3;
head -> next = NULL;
```

| Term     | Meaning                               |
| -------- | ------------------------------------- |
| **Node** | One element of the list (data + next) |
| **Head** | Pointer to the first node             |
| **Next** | Pointer to the next node              |
| **NULL** | Marks the end of the list             |

--- 
### 3. Insert New Nodes :
linked lists we never use the first type because we need a flexible variable that can point to any new node, right?
   