## <span class ="color-cyan">why linked list </span> : 
#### <span class ="color-purple">What the problems that was in arrays data structure, and solved by linked lists? :</span> 

 - The fixe size of the array, you can't increase or add an element to the array if it is full, you should reallocate an other array and move all element to the new array 
 
 - *A*nd when you want to add an element to a specific index also you need to move all the array element where this take more time and more resources like cpu and RAM.
 
 - **An array requires a contiguous block of memory, This means:** The memory addresses allocated for the array must be sequential, one right after the other.
 
 - If the available free memory is fragmented (scattered in small, non-adjacent blocks), you cannot create the array—even if the total free memory is technically large enough.

---
## 1. Declaring a Linked List

```c
typedef struct node {
    int data;
    struct node *next;
} Node;
```

- **`typedef`**: Used to create a new type shortcut with a nickname used to reference it.
- **`Node`**: The type nickname created by the `typedef`.

**Note**: You should define your `struct` type outside of `main()` and outside of any function.

**Why?**

- You want **all functions** (like `create_node`, `print_list`, `add_node`, etc.) to know what a `Node` is.
- If you declare the `struct` **inside** `main()`, only `main()` can see it — other functions can't use it.

---

## 2. Creating a Node

Before creating the first node, initialize the head.

### What `head` Really Represents

- `head` is **not** a node itself.
- It's a **pointer that points to the first node** in the list.
- When you first create the list, there are **no nodes yet**.

```c
Node *head = NULL;
```

---

## 3. Insert New Nodes

### A) Never Make the Head the First Node Itself

**Why?**

#### ❌ Problem 1: The List Will Never Be Empty

You can't check:

```c
if (head == NULL)  // This will never be true
```

You can't detect an empty list anymore — because it always has one node.  
That makes your `add_head()` and `add_end()` functions **less flexible**.

### Key Terms

|Term|Meaning|
|---|---|
|**Node**|One element of the list (data + next)|
|**Head**|Pointer to the first node|
|**Next**|Pointer to the next node|
|**NULL**|Marks the end of the list|

### B) Function to Insert at Head

**Steps:**

1. Allocate the `new_node` (if allocation fails, return `head`).
2. Set the data and next for the `new_node`.
3. Return the `new_node`.

```c
Node *add_head(Node *head, int data) {
    Node *new_node = malloc(sizeof(Node));
    if (new_node == NULL)
        return head;  // Allocation failed
    
    new_node->data = data;
    new_node->next = head;  // Point to current head
    
    return new_node;  // New node becomes the head
}
```

### C) Function to Insert at End

**Steps:**

1. Allocate the `new_node`.
2. Set the data and next of the `new_node`.
3. If no head exists, return the `new_node` itself.
4. Declare a `tmp` that copies the head for list traversal.
5. Traverse the list to find an empty `tmp->next`.
6. Add the `new_node` in the `tmp->next`.
7. Return the head with the new end added.

```c
Node *add_end(Node *head, int data) {
    Node *new_node = malloc(sizeof(Node));
    if (new_node == NULL)
        return head;  // Allocation failed
    
    new_node->data = data;
    new_node->next = NULL;
    
    // If list is empty, new node becomes head
    if (head == NULL)
        return new_node;
    
    // Traverse to the end
    Node *tmp = head;
    while (tmp->next != NULL) {
        tmp = tmp->next;
    }
    
    tmp->next = new_node;  // Add new node at end
    return head;
}
```

---

## 4. Use Insert Functions and Print the List

### A) Calling the Insert Functions

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *next;
} Node;

int main(void) {
    Node *head = NULL;
    
    head = add_head(head, 3);  // Insert 3 in the first node
    head = add_head(head, 1);  // Will take place before the 3 node
    head = add_end(head, 4);   // Being at end of list
    
    // List now: 1 -> 3 -> 4 -> NULL
    
    print_list(head);
    
    return 0;
}
```

### B) Printing the List

```c
void print_list(Node *head) {
    Node *tmp = head;
    
    while (tmp)  // Loop continues while current node is NOT NULL
    {
        printf("%d\n", tmp->data);
        tmp = tmp->next;
    }
}
```

**How it works:**

- The loop checks if the current node is not empty.
- If not empty, it prints the data.
- Then moves to the next node.
- When `tmp` becomes `NULL`, the loop stops.

---

## Complete Example

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *next;
} Node;

// Insert at head
Node *add_head(Node *head, int data) {
    Node *new_node = malloc(sizeof(Node));
    if (new_node == NULL)
        return head;
    
    new_node->data = data;
    new_node->next = head;
    
    return new_node;
}

// Insert at end
Node *add_end(Node *head, int data) {
    Node *new_node = malloc(sizeof(Node));
    if (new_node == NULL)
        return head;
    
    new_node->data = data;
    new_node->next = NULL;
    
    if (head == NULL)
        return new_node;
    
    Node *tmp = head;
    while (tmp->next != NULL) {
        tmp = tmp->next;
    }
    
    tmp->next = new_node;
    return head;
}

// Print list
void print_list(Node *head) {
    Node *tmp = head;
    
    while (tmp) {
        printf("%d -> ", tmp->data);
        tmp = tmp->next;
    }
    printf("NULL\n");
}

// Main function
int main(void) {
    Node *head = NULL;
    
    head = add_head(head, 3);
    head = add_head(head, 1);
    head = add_end(head, 4);
    head = add_end(head, 5);
    
    printf("Linked List: ");
    print_list(head);
    
    return 0;
}
```

**Output:**

```
Linked List: 1 -> 3 -> 4 -> 5 -> NULL
```

---

## Summary

**Key Points:**
- Always initialize head to `NULL`
- Use `typedef` to create a clean type name
- Never make head the first node — keep it as a pointer
- Use helper functions to insert at head or end
- Always check for `NULL` to detect empty lists
- Traverse with a temporary pointer to avoid losing the head