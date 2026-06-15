# Day 1: JavaScript Closures & Scope (For Everyone)

Welcome to Day 1 of your JS Revision! Today, we are going to master one of the most famous (and frequently asked) topics in JavaScript: **Scope and Closures**.

---

## 📖 The Big Picture Concepts

### 1. Scope (Where do my toys live? 🧸)
Imagine you live in a house with a locked room.
* **Global Scope (The Front Yard 🌳):** Anything placed in the front yard can be seen and used by anyone in the neighborhood.
* **Function Scope (The House 🏠):** Items inside the house can only be used by people inside the house. Neighbors outside cannot reach in and take them.
* **Block Scope (The Locked Closet 🔒):** Inside the house, you have a locked closet (created by `let` and `const`). Only people inside that specific room can open that closet.

*Rule of Scope:* Outer rooms cannot look inside inner rooms. But inner rooms **can** look outside to outer rooms!

### 2. Lexical Scope (Where you were born 👶)
JavaScript determines where a variable is accessible based on **where the code was written** in your file, NOT where the code is run. 
* If you write a function inside another function, the inner function will always remember its outer parent's variables, because that's where it was born.

### 3. Closure (The Backpack 🎒)
Imagine a kid is leaving their childhood home. Before they step out, they pack a **backpack** with a copy of all the items (variables) in their house.
* No matter where they travel in the world (even if the childhood home is demolished/finished running), they can open their backpack and use those items.
* In JS: **A closure is a function that remembers its outer variables even after the outer function has finished executing.**

---

## 🛠️ The Day 1 Challenges

Today we are going to write code using closures for two key use cases:

### Problem 1: Secret Agent (Data Privacy)
* **Goal:** Create a function that keeps a secret password private. No one should be able to read or change the password directly, but they can verify if their guess is correct.
* **Why it uses Closures:** The secret is stored in the outer function. The returned inner function can check it, but outer code cannot access the variable directly.

### Problem 2: Custom Greeting Factory (Function Factory)
* **Goal:** Write a function that creates personalized greeting functions (e.g., a function that says "Hello, Purushothaman" or "Hi, Friend").
* **Why it uses Closures:** The outer function takes a greeting (like "Hello"). The inner function remembers this greeting and adds the person's name to it.

---

## 🚀 Today's Plan
1. Open the [exercises.js](file:///d:/Purushothaman/git/self-skill/js/day-1/exercises.js) file.
2. Read the comments and write the code.
3. Check your work against [solutions.md](file:///d:/Purushothaman/git/self-skill/js/day-1/solutions.md).
