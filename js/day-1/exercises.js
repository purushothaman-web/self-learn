// JS Revision Day 1: Closures & Scope Exercises

/**
 * Problem 1: Secret Agent (Data Privacy)
 * 
 * Create a function `createSecretAgent(realSecret)` that:
 * 1. Has a private variable containing the `realSecret`.
 * 2. Returns an object with two methods:
 *    - `guessSecret(guess)`: Returns true if the guess matches `realSecret`, false otherwise.
 *    - `updateSecret(oldSecret, newSecret)`: Updates `realSecret` to `newSecret` ONLY if `oldSecret` is correct.
 * 
 * Constraint: The `realSecret` variable must NOT be directly accessible from the outside.
 */
function createSecretAgent(realSecret) {
  // Write your code here
  
}


/**
 * Problem 2: Custom Greeting Factory (Function Factory)
 * 
 * Create a function `makeGreeting(salutation)` that takes a string like "Hello" or "Hi".
 * It should return a new function that takes a `name` and returns the greeting string.
 * 
 * Example:
 * const sayHello = makeGreeting("Hello");
 * sayHello("Purushothaman") -> "Hello, Purushothaman!"
 */
function makeGreeting(salutation) {
  // Write your code here
  
}

// ==========================================
// Test Cases (Run: node js/day-1/exercises.js)
// ==========================================

console.log("--- Testing Problem 1: Secret Agent ---");
const agent = createSecretAgent("007-Skyfall");
console.log("Verify realSecret is undefined ->", agent.realSecret); // Should be undefined (private!)
console.log("Guess incorrect secret (expected false) ->", agent.guessSecret("wrong-secret"));
console.log("Guess correct secret (expected true) ->", agent.guessSecret("007-Skyfall"));

agent.updateSecret("wrong-secret", "new-secret");
console.log("Update with wrong password (expected true to old) ->", agent.guessSecret("007-Skyfall")); // Should still be 007-Skyfall

agent.updateSecret("007-Skyfall", "Spectre-999");
console.log("Update with correct password (expected true to new) ->", agent.guessSecret("Spectre-999"));


console.log("\n--- Testing Problem 2: Greeting Factory ---");
const sayHello = makeGreeting("Hello");
const sayHola = makeGreeting("Hola");

console.log("Greeting 1 ->", sayHello("Purushothaman")); // Expected: "Hello, Purushothaman!"
console.log("Greeting 2 ->", sayHola("Amigo")); // Expected: "Hola, Amigo!"
