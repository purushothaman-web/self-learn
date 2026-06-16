# Day 2: JS Async, Promises & Event Loop (For Everyone)

Welcome to Day 2! Today we are demystifying how JavaScript executes asynchronous code. This is one of the top 3 most common interview questions for intermediate developers.

---

## 📖 The Big Picture Concepts

### 1. The Restaurant Kitchen Analogy 🍳
JavaScript is **single-threaded**, which means it can only do **one thing at a time**. Imagine a kitchen with only **one Head Chef**:

* **The Call Stack (The Head Chef 👨‍🍳):** The chef works on tasks one-by-one. If they are chopping onions, they finish it, then move to the next task.
* **Web APIs (The Oven 🌡️):** If a dish needs to bake for 10 minutes (`setTimeout`), the chef doesn't stand staring at the oven. They put the dish in the oven, set a timer, and immediately continue chopping onions. The oven handles the waiting.
* **The Microtask Queue (The Urgent Note Board 📋):** If the chef gets an urgent note saying *"Check if the soup is boiling over!"* (a **Promise `.then()`** or `await`), this goes on the urgent board. The chef MUST clear all urgent notes before serving any normal dishes.
* **The Callback/Macrotask Queue (The Ready Orders Table 🍽️):** When the oven timer rings, the oven puts the baked dish on this table. The waiter can only serve this dish when the Chef has finished all tasks on their main board AND all urgent notes.
* **The Event Loop (The Waiter 🏃‍♂️):** The waiter watches the Chef. As soon as the Chef is doing nothing (Call Stack is empty), the waiter:
  1. Hands the Chef all tasks from the **Urgent Note Board (Microtasks)** first.
  2. Hands the Chef the next task from the **Ready Orders Table (Macrotasks)**.

---

## ⚡ Macrotasks vs Microtasks

Not all async code is treated equally in JavaScript:

| Task Type | Examples | Priority |
| :--- | :--- | :--- |
| **Synchronous** | Plain console.log, loops, math calculations | **1 (Immediate)** |
| **Microtasks** | Promise `.then()`, `async/await`, `queueMicrotask()` | **2 (High - runs before next macrotask)** |
| **Macrotasks** | `setTimeout`, `setInterval`, network requests, user clicks | **3 (Low - runs after microtasks)** |

---

## 🛠️ The Day 2 Challenge

We will practice:
1. Predicting the output sequence of a complex script containing synchronous code, Promises, and `setTimeout`.
2. Converting a legacy callback-based function into a Promise-based one (Promisification).

---

## 🚀 Today's Plan
1. Open the [exercises.js](file:///d:/Purushothaman/git/self-skill/js/day-2/exercises.js) file.
2. Read the console ordering code and write your prediction, then write the conversion function.
3. Verify by running the file in Node.
4. Check your work against [solutions.md](file:///d:/Purushothaman/git/self-skill/js/day-2/solutions.md).
