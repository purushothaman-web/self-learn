# Day 2 JS Solutions & Explanations

Here are the detailed solutions and event loop tracing explanations for Day 2. Please try solving the questions in [exercises.js](file:///d:/Purushothaman/git/self-skill/js/day-2/exercises.js) before reading this!

---

## 🧩 Exercise 1: Predict the Console Output

### 1. The Correct Order of Output:
```text
1: Start
7: End
3: Promise 1
5: Promise 2
2: Timeout 1
6: Timeout 3
4: Timeout 2 inside Promise
```

### 2. Tracing the Event Loop Step-by-Step:

1. **Synchronous Execution (Call Stack):**
   * Prints `1: Start` immediately.
   * Encounters `setTimeout (Timeout 1)`. Hands it to Web APIs. Timer ends immediately (0ms), and its callback is pushed to the **Macrotask Queue**.
   * Encounters `Promise 1`. Pushes `.then()` callback to the **Microtask Queue**.
   * Encounters `Promise 2`. Pushes `.then()` callback to the **Microtask Queue**.
   * Encounters `setTimeout (Timeout 3)`. Hands to Web APIs. Pushed to the **Macrotask Queue** (behind Timeout 1).
   * Prints `7: End` immediately.
   * *Call Stack is now empty!*

2. **Clear Microtasks (Microtask Queue):**
   * Git / JS engine checks the Microtask Queue. It has two microtasks:
     * **Microtask 1 (Promise 1):** Prints `3: Promise 1`.
     * **Microtask 2 (Promise 2):** 
       * Schedules `setTimeout (Timeout 2)` to Web APIs, which immediately pushes its callback to the **Macrotask Queue** (behind Timeout 3).
       * Prints `5: Promise 2`.
   * *Microtask Queue is now empty!*

3. **Run Next Macrotask (Macrotask Queue):**
   * The Macrotask Queue currently holds: `[Timeout 1, Timeout 3, Timeout 2]`.
   * JS pulls the first macrotask (`Timeout 1`): Prints `2: Timeout 1`.
   * Stack is empty. Checking microtasks (none).
   * JS pulls the second macrotask (`Timeout 3`): Prints `6: Timeout 3`.
   * Stack is empty. Checking microtasks (none).
   * JS pulls the third macrotask (`Timeout 2`): Prints `4: Timeout 2 inside Promise`.

---

## 🧩 Exercise 2: Promisification

### 1. The Strategy
To convert a callback function to return a Promise:
* Wrap the callback function inside a new `Promise` constructor.
* The constructor gives you two callback actions: `resolve` (for success) and `reject` (for errors).
* Call the original callback function. In its callback argument, if an error is present, call `reject(error)`. Otherwise, call `resolve(result)`.

### 2. The Code Solution
```javascript
function fetchUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    fetchUserDataCallback(userId, (error, data) => {
      if (error) {
        reject(error); // Triggers the .catch() block
      } else {
        resolve(data);  // Triggers the .then() block
      }
    });
  });
}
```

---

## 💡 Key Interview Takeaway
If an interviewer asks: **"What is the difference between microtasks and macrotasks?"**
You can answer:
> "Macrotasks represent tasks that are queued by the host environment (like browser timers, fetch requests, or UI events). Microtasks are queued by JavaScript execution itself (like Promise resolutions or queueMicrotask). The event loop guarantees that the Call Stack will be completely cleared, and **every single pending microtask in the queue will be executed**, before the next macrotask is allowed to run."
