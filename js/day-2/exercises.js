// JS Revision Day 2: Async, Promises & Event Loop Exercises

/**
 * Exercise 1: Predict the Console Output
 * 
 * Look at the code block below. Without running it first, write down the numbers
 * in the order they will print to the console.
 * 
 * Explain WHY the numbers printed in that order using the Call Stack, 
 * Microtask Queue, and Macrotask Queue concepts.
 */
function predictEventLoop() {
  console.log("1: Start");

  setTimeout(() => {
    console.log("2: Timeout 1");
  }, 0);

  Promise.resolve().then(() => {
    console.log("3: Promise 1");
  });

  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log("4: Timeout 2 inside Promise");
    }, 0);
    console.log("5: Promise 2");
  });

  setTimeout(() => {
    console.log("6: Timeout 3");
  }, 0);

  console.log("7: End");
}

// Your Prediction: Write down your order here (e.g. 1, 2, 3...)
// Reason: 


/**
 * Exercise 2: Promisification
 * 
 * In Node.js or legacy code, we often find callback-based APIs.
 * Convert the callback-based `fetchUserData` function into a Promise-based one.
 */

// Legacy function (Do not modify this function)
function fetchUserDataCallback(userId, callback) {
  setTimeout(() => {
    if (userId === 1) {
      callback(null, { id: 1, name: "Purushothaman" });
    } else {
      callback(new Error("User not found"));
    }
  }, 500);
}

function fetchUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    fetchUserDataCallback(userId, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

// ==========================================
// Execution Area (Run: node js/day-2/exercises.js)
// ==========================================
console.log("--- Running Exercise 1 Prediction ---");
predictEventLoop();

console.log("\n--- Running Exercise 2 Test ---");
fetchUserDataPromise(1)
  .then(user => console.log("Success:", user))
  .catch(err => console.log("Error:", err.message));

fetchUserDataPromise(99)
  .then(user => console.log("Success:", user))
  .catch(err => console.log("Error:", err.message));
