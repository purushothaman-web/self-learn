# Day 1 Solutions & Explanations

Here are the detailed, easy-to-understand solutions for today's problems. Only read these after you have tried solving them yourself in [exercises.js](file:///d:/Purushothaman/git/self-skill/dsa/day-1/exercises.js)!

---

## 🧩 Problem 1: Contains Duplicate

### 1. The Strategy (How to solve it)
We walk through the list of numbers one by one. As we walk, we write down every number we see in our notebook (a JavaScript `Set` or `Object`).
* Before we write down a number, we check: *"Is this number already in my notebook?"*
* If **Yes**: We found a duplicate! We immediately stop and return `true`.
* If **No**: We write it in the notebook and keep going.
* If we check all numbers and finish the list without finding any duplicate, we return `false`.

### 2. The Code Solution
```javascript
function containsDuplicate(nums) {
  // We use a Set, which is a collection of unique values with O(1) lookup speed.
  const seenNumbers = new Set();
  
  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    
    // If the number is already in our set, we have a duplicate!
    if (seenNumbers.has(currentNum)) {
      return true;
    }
    
    // Otherwise, remember this number
    seenNumbers.add(currentNum);
  }
  
  // If we went through the whole array and found no duplicates
  return false;
}
```

### 3. Complexity Analysis
* **Time Complexity: O(N)**
  * *Why?* We only walk through the list of numbers once. Checking if a number is in a `Set` is instant (O(1)).
* **Space Complexity: O(N)**
  * *Why?* In the worst case (where there are no duplicates), we have to store all N numbers in our `seenNumbers` Set.

---

## 🧩 Problem 2: Two Sum

### 1. The Strategy (How to solve it)
Imagine the target sum is `9`. We walk down the array:
1. We see `2`. We think: *"To get 9, I need a partner of 7 (9 - 2 = 7)."*
2. We ask our notebook: *"Have I seen a 7 before?"*
3. Since our notebook is empty, we write down: `2` is at index `0`.
4. Next, we see `7`. We think: *"To get 9, I need a partner of 2 (9 - 7 = 2)."*
5. We ask our notebook: *"Have I seen a 2 before?"*
6. **Yes!** The notebook says we saw `2` at index `0`.
7. We immediately return the positions: `[0, 1]`!

### 2. The Code Solution
```javascript
function twoSum(nums, target) {
  // We use an Object (hashmap) to store the numbers we've seen and their index positions.
  // Key = the number, Value = its index position in the array.
  const seenNumbers = {}; 
  
  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const neededPartner = target - currentNum;
    
    // Check if the needed partner is already in our notebook.
    // We check if it is not undefined because index 0 is falsy in JS.
    if (seenNumbers[neededPartner] !== undefined) {
      // Return the index of the partner we saw earlier, and the current index.
      return [seenNumbers[neededPartner], i];
    }
    
    // Otherwise, write down the current number and its index in our notebook.
    seenNumbers[currentNum] = i;
  }
  
  // Return empty array if no solution is found (though the problem guarantees one solution exists)
  return [];
}
```

### 3. Complexity Analysis
* **Time Complexity: O(N)**
  * *Why?* We only loop through the array once. Checking if the partner is in the `seenNumbers` object is instant (O(1)).
* **Space Complexity: O(N)**
  * *Why?* In the worst case, we might store almost all N numbers in our `seenNumbers` object before finding a match.
