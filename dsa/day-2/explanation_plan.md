# Day 2: Arrays & Hashing - Frequency Counters (For Everyone)

Welcome to Day 2 of DSA! Today we are building on top of yesterday's Hashmap concept and focusing on a very powerful pattern: **Frequency Counting**.

---

## 📖 The Big Picture Concepts

### 1. What is a Frequency Counter? (The Inventory Counter 📝)
Imagine you own a candy shop. You have a big box of random candies (like chocolate, gummy bear, lollipop). You want to know exactly how many of each candy type you have.
* **The Slow Way:** Pick up a candy (e.g. chocolate), then count how many other chocolates are in the box. Then pick up a gummy bear, and count all gummy bears. This is slow and repetitive!
* **The Fast Way:** Take a blank sheet of paper (your Hashmap). Put three columns: *Candy Name* and *Count*. Reach into the box, pick a candy, and update the count on your sheet. If you see chocolate, change the count from 0 to 1. If you see it again, change it to 2. You only look at each candy exactly once! This is **O(N) time**.

### 2. Frequency Counting in JavaScript
In JS, we can use a plain object `{}` as our inventory sheet:
```javascript
const candyBox = ["chocolate", "gummy", "chocolate"];
const inventory = {};

for (let candy of candyBox) {
  // If we haven't seen this candy yet, initialize it to 0, then add 1
  inventory[candy] = (inventory[candy] || 0) + 1;
}

console.log(inventory); // Output: { chocolate: 2, gummy: 1 }
```

---

## 🛠️ The Day 2 Challenge: Valid Anagram

An **Anagram** is a word formed by rearranging the letters of another word. For example, **"cinema"** and **"iceman"** are anagrams because they use the exact same letters in different orders.

### How to Check if Two Words are Anagrams:
1. **The Sort Way (Brute Force/Easy):** If you sort the letters of "cinema" alphabetically, it becomes "aceimn". If you sort "iceman", it also becomes "aceimn". If they match, they are anagrams!
   * *Time complexity:* Sorting takes **O(N log N)** time.
2. **The Counter Way (Optimal):** Count how many times each letter appears in the first word. Then, go through the second word and subtract those counts. If all letters end up with a count of 0, they are anagrams!
   * *Time complexity:* **O(N)** because we only scan the words.

---

## 🚀 Today's Plan
1. Open the [exercises.js](file:///d:/Purushothaman/git/self-skill/dsa/day-2/exercises.js) file.
2. Write the solution code for `isAnagram`.
3. Check your work against [solutions.md](file:///d:/Purushothaman/git/self-skill/dsa/day-2/solutions.md).
