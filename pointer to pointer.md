### 1. What a double pointer really means:
```c
int x = 10;
int *p = &x;
int **pp = &p;
```
So:
- `x` → value 10
- `p` → points to `x` 
- `pp` → points to `p`
```css
pp → p → x → 10
```
### 1. Basic setup
Let’s start with this structure:
```c
typedef struct s_node {
    int data;
    struct s_node *next;
} Node;

Node *head = NULL;
Node **ptr_head = &head; // pointer to the pointer "head"
Node *new = malloc(sizeof(Node));
new->data = 42;
new->next = NULL;

```
Now you have:

| Variable   | Type      | Value                    | Points to                   |
| ---------- | --------- | ------------------------ | --------------------------- |
| `head`     | `Node  *` | `NULL`                   | nothing                     |
| `ptr_head` | `Node **` | address of `head`        | `head`                      |
| `new`      | `Node *`  | address of a Node struct | Node `{data=42, next=NULL}` |

---
### 🧩 Case 1: `**ptr_head = new;` (wrong type)

### Not valid in this context

`*ptr_head` is already a `Node *`,  
so `**ptr_head` would be a `Node` (not a pointer).  
You can’t assign `new` (a `Node *`) to a `Node` — **type mismatch**.

✅ You almost never use `**ptr_head = new;` in linked lists.  
It would mean “replace the _entire content_ of the struct `head` points to,” not its pointer.

So ignore this case for now.

---
### ✅ Case 2: `*ptr_head = new;`

This is the **real, correct, and important one**.

###   What happens:

`*ptr_head` is the same as `head`,  
so this line does exactly the same thing as:
