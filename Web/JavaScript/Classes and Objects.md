A complete guide to understanding Object-Oriented Programming in JavaScript.

---

## 1. How to Create a Class

A **class** is a blueprint for creating objects. Use the `class` keyword followed by the class name (by convention, capitalized).

```js
class Animal {
  // class body goes here
}
```

You can then use this blueprint to create as many objects (instances) as you need — each one will share the same structure defined in the class.

---

## 2. The `constructor` Keyword

The `constructor` is a **special method** that runs automatically when a new object is created from the class. It is used to **initialize the object's properties**.

```js
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
}
```

**Key rules:**

- Each class can only have **one** `constructor`.
- If you don't define one, JavaScript provides a default empty constructor.
- It always runs first, before any other method.

---

## 3. The `this` Keyword

Inside a class, `this` refers to the **current instance** of the class — i.e., the specific object being created or used.

```js
class Animal {
  constructor(name, species) {
    this.name = name;       // "this" = the new object being created
    this.species = species; // assigns "species" to that object
  }
}

const cat = new Animal("Whiskers", "Felis catus");
console.log(cat.name);    // "Whiskers"
console.log(cat.species); // "Felis catus"
```

Think of `this` as a way of saying _"attach this value to **me**, the current object"_.

> ⚠️ **Watch out:** `this` can behave differently depending on context (e.g., inside arrow functions vs regular functions). Inside class methods, it reliably refers to the instance.

---

## 4. How to Create Methods

**Methods** are functions defined inside a class. They describe the **behaviors** or **actions** an object can perform.

```js
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }

  // Method: no "function" keyword needed inside a class
  speak() {
    console.log(`${this.name} makes a sound.`);
  }

  describe() {
    return `${this.name} is a ${this.species}.`;
  }
}

const dog = new Animal("Rex", "Canis lupus");
dog.speak();           // "Rex makes a sound."
console.log(dog.describe()); // "Rex is a Canis lupus."
```

**Key rules:**

- Do **not** use the `function` keyword inside a class body.
- Methods are shared across all instances (they live on the prototype), making them memory-efficient.
- Methods have access to `this`, so they can read and modify the instance's properties.

---

## 5. The `new` Keyword

The `new` keyword is used to **create a new instance** (object) from a class. It triggers a series of steps under the hood:

```js
const lion = new Animal("Simba", "Panthera leo");
```

When `new` is called, JavaScript:

1. **Creates** a new empty object `{}`.
2. **Sets** its prototype to `Animal.prototype`.
3. **Runs** the `constructor` with `this` pointing to the new object.
4. **Returns** the new object automatically.

```js
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  info() {
    return `${this.brand} ${this.model}`;
  }
}

const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Honda", "Civic");

console.log(car1.info()); // "Toyota Corolla"
console.log(car2.info()); // "Honda Civic"
```

> Each call to `new` creates a **completely independent** object. `car1` and `car2` share the same methods but have their own separate properties.

---

## Full Example: Putting It All Together

```js
class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient funds.");
    } else {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
    }
  }

  getBalance() {
    return `${this.owner}'s balance: $${this.balance}`;
  }
}

const account = new BankAccount("Alice", 500);
account.deposit(200);   // Deposited $200. New balance: $700
account.withdraw(100);  // Withdrew $100. New balance: $600
console.log(account.getBalance()); // Alice's balance: $600
```

---

## Quick Reference

|Concept|Purpose|
|---|---|
|`class`|Defines a blueprint for objects|
|`constructor()`|Initializes an object's properties on creation|
|`this`|Refers to the current object instance|
|Methods|Functions inside a class that define object behavior|
|`new`|Creates a new instance from a class|