# Day 1: Arrays & Hashing (For Everyone)

Welcome to Day 1 of your DSA Journey! This guide is designed to make these concepts so simple that anyone from age 1 to 60 can understand them.

---

## 📖 The Big Picture Concepts

### 1. What is an Array? (The Mailbox Row 📭)
Imagine a long street with a row of identical mailboxes numbered `0, 1, 2, 3, 4...`.
* **If you know the mailbox number (index):** You can walk straight to mailbox `3` and open it instantly. This is super fast! (In computer science, we call this **O(1) time**).
* **If you are looking for a specific letter (value) but don't know the box number:** You have to start at mailbox `0`, open it, check the name, then open mailbox `1`, check the name, and so on, until you find it. If there are 100 mailboxes, you might have to open 100 doors. This is slow! (We call this **O(N) time**, where N is the number of boxes).

### 2. What is a Hashmap / JavaScript Object? (The Magic Index Book 📖)
Now, imagine you hire a super-fast assistant who has a magic index book.
* Instead of searching through every mailbox, you just say: *"Find the letter for Purushothaman."*
* The assistant looks at the book, immediately points to mailbox `5`, and hands you the letter.
* This lookup takes **no time at all**, regardless of whether there are 5 mailboxes or 5,000,000 mailboxes.
* In JavaScript, a plain object `{}` or a `Map` acts as this magic index book.

---

## ⚡ Big O Notation: How We Measure Speed & Memory

When we write code, we measure two things:
1. **Time Complexity (Speed):** How many operations does the computer have to do as our list of items grows?
2. **Space Complexity (Memory):** How much extra storage (like notebooks or temporary boxes) do we need to solve the problem?

| Analogy | Time (Speed) | Space (Memory) |
| :--- | :--- | :--- |
| **Fastest (O(1))** | Instant lookup (like opening a known mailbox) | No extra boxes/storage needed |
| **Medium (O(N))** | Checking every box one by one (takes longer for longer lists) | Creating a copy of the list or a full index book |
| **Slow (O(N²))** | Comparing every single mailbox with every other mailbox (takes a very long time) | Rare in simple problems, but uses lots of memory if storing pairs |

---

## 🛠️ The Day 1 Challenges

Today we are going to solve two classic problems using our mailboxes and magic books.

### Problem 1: Contains Duplicate
* **The Goal:** Look at a list of numbers. Tell me if any number appears more than once.
* **Example:** `[1, 2, 3, 1]` -> Returns `true` (because `1` is duplicated).
* **The Slow Way (Brute Force):** Compare every number with every other number. (O(N²) time).
* **The Fast Way (Hashing):** Walk down the list. Put each number you see into your "magic index book". Before putting a number in, check if it's already in the book. If it is, you found a duplicate! (O(N) time).

### Problem 2: Two Sum
* **The Goal:** Given a list of numbers and a target sum, find the two numbers that add up to the target, and return their positions (indices).
* **Example:** Numbers: `[2, 7, 11, 15]`, Target: `9`. Output: `[0, 1]` (because `2 + 7 = 9`).
* **The Slow Way (Brute Force):** Pair every number with every other number to see if they add up to the target. (O(N²) time).
* **The Fast Way (Hashing):** Walk down the list. At each number, calculate what target partner you need. (e.g., if you are at `2` and the target is `9`, you need a `7`). Check if the `7` is in your magic book. If it isn't, store `2` in the book and keep walking. (O(N) time).

---

## 🚀 Today's Plan
1. Open the [exercises.js](file:///d:/Purushothaman/git/self-skill/dsa/day-1/exercises.js) file.
2. Read the comments and try to write the solution code.
3. If you get stuck or want to check your answers, open [solutions.md](file:///d:/Purushothaman/git/self-skill/dsa/day-1/solutions.md).
