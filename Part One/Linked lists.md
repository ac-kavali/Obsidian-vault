## <span class ="color-cyan">why linked list </span> : 
#### <span class ="color-purple">What the problems that was in arrays data structure, and solved by linked lists? :</span> 

 - The fixe size of the array, you can't increase or add an element to the array if it is full, you should reallocate an other array and move all element to the new array 
 
 - *A*nd when you want to add an element to a specific index also you need to move all the array element where this take more time and more resources like cpu and RAM.
 
 - **An array requires a contiguous block of memory, This means:** The memory addresses allocated for the array must be sequential, one right after the other.
 
 - If the available free memory is fragmented (scattered in small, non-adjacent blocks), you cannot create the array—even if the total free memory is technically large enough.

---
### <span class ="color-cyan">1. Declaring a linked list </span>: 
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
## <span class ="color-cyan">2. Creating a Node </span>:
\- before creating the first node, inicial the head, 
  What `head` really represents
- `head` is **not** a node itself. 
- It’s a **pointer that _points to_ the first node** in the list.
*So* when you first create the list, there are **no nodes yet**.
```c
Node *head = NULL;
```

--- 
## <span class ="color-cyan">3. Insert New Nodes </span>:
<span class ="color-purple">A) Never make the head the first node itself because</span>:
   ### ❌ 1. The list will _never empty_
   You can’t check:
```c
if(head = NULL);
```
you can't detect an empty list anymore — because it always has one node (7).  
That makes your `add_head()` and `add_end()` functions **less flexible**.

| Term     | Meaning                               |
| -------- | ------------------------------------- |
| **Node** | One element of the list (data + next) |
| **Head** | Pointer to the first node             |
| **Next** | Pointer to the next node              |
| **NULL** | Marks the end of the list             |
<span class ="color-purple">B) function to insert to head</span>:
1. Allocating the `new_node`, (failed allocation return `head`).
2. Identify the data and next for the `new_node`.
3. return the `new_node`.

<span class ="color-purple">C) function to insert to the end</span>:
4. Allocating the `new_node`.
5. Identify the data and the next of the `new_nod`.
6. If no head return the `new_node` it self.
7. Declare a `tmp` that copy the head for the list traverse.
8. Traverse the list to find an empty `tmp->next`.
9. add the `new_node` in the `tmp->next`.
10. return the head with her new end added.

---
## <span class ="color-cyan">4. Use insert functions, print the list </span>:
<span class ="color-purple">A) calling the insert the insert functions</span>:
  ```c 
  typedef struct node {
	   int data;
	   struct node *next;
   }Node;
   
  int main(void){
	Node *head = NULL;
	
	head = add_head(head, 3); //insert 3 in the first node.
	head = add_head(head, 1); //will take place before the 3 node.
	head = add_end(head, 4); //being at end of list.
  }
  ```

 <span class ="color-purple">B) Printing the list :</span>
  ```c
tmp = head;
while (tmp)  // Loop continues while current node is NOT NULL
{
    printf("%d\n", tmp->value);
    tmp = tmp->next;
}
  ```
\- The loop check if the current loop is empty if no it print.
```c
#include 
int main  
``