# Day 1 JS Solutions & Explanations

Here are the solutions for today's JavaScript concepts. Only read this after you have attempted the exercises in [exercises.js](file:///d:/Purushothaman/git/self-skill/js/day-1/exercises.js)!

---

## 🧩 Problem 1: Secret Agent (Data Privacy)

### 1. The Strategy
We define `realSecret` as a parameter of the outer function. This makes it act as a local variable.
Since the outer function returns an object with methods that reference `realSecret`, those methods create a **closure** over the variable.
The variable remains locked in memory, accessible *only* to those two methods.

### 2. The Code Solution
```javascript
function createSecretAgent(realSecret) {
  // realSecret is trapped inside this function's scope.
  // There is no getter or setter for it directly.
  
  return {
    guessSecret: function(guess) {
      // Accesses realSecret through closure
      return guess === realSecret;
    },
    updateSecret: function(oldSecret, newSecret) {
      // Verifies oldSecret before updating the trapped variable
      if (oldSecret === realSecret) {
        realSecret = newSecret;
      }
    }
  };
}
```

---

## 🧩 Problem 2: Custom Greeting Factory (Function Factory)

### 1. The Strategy
We pass a `salutation` (like "Hello") to the outer function. The outer function returns a new inner function.
The inner function remembers the `salutation` because of the closure, and combines it with the `name` argument passed to it when called later.

### 2. The Code Solution
```javascript
function makeGreeting(salutation) {
  // The returned function remembers whatever "salutation" was passed in
  return function(name) {
    return `${salutation}, ${name}!`;
  };
}
```

---

## 💡 Key Interview Takeaway
If an interviewer asks: **"What is a real-world use case you've built using closures?"**
You can say:
> "I used closures to implement **data privacy** and encapsulation. For example, creating helper modules where certain configuration settings or tokens are kept completely private inside the parent scope, and only exposed through restricted methods (like a getter or verifier function), preventing outer code from accidentally modifying them."
