# Day 2 Solutions & Explanations: Valid Anagram

Here are the solutions for today's challenge. Try to code it yourself in [exercises.js](file:///d:/Purushothaman/git/self-skill/dsa/day-2/exercises.js) before looking!

---

## 🧩 Problem: Valid Anagram

### 1. Approach A: Sorting (Short & Simple)
If two words are anagrams, sorting their letters alphabetically will produce identical strings.
* In JavaScript, we can split the string into an array, sort it, and join it back:
  `s.split('').sort().join('')`
* **Complexity:**
  * **Time Complexity:** O(N log N) — because sorting an array of size N takes O(N log N) operations.
  * **Space Complexity:** O(N) — because splitting the string creates a new array of characters.

### 2. Approach B: Frequency Counter (Optimal 🚀)
We check if the strings have different lengths. If they do, they *cannot* be anagrams.
Next, we create a single frequency map (using a plain object) to count the characters:
1. Walk through string `s`. For each letter, increase its count in the map.
2. Walk through string `t`. For each letter, decrease its count in the map.
3. If a letter in `t` is not in the map, or if its count drops below 0, return `false`.
4. If we successfully finish both walks, return `true`.

### 3. The Code (Approach B)
```javascript
function isAnagram(s, t) {
  // If lengths are different, they cannot be anagrams
  if (s.length !== t.length) {
    return false;
  }
  
  const charCounts = {};
  
  // Count characters in string s
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charCounts[char] = (charCounts[char] || 0) + 1;
  }
  
  // Decrease counts using string t
  for (let i = 0; i < t.length; i++) {
    const char = t[i];
    
    // If the letter was never counted in s, or if we have more of it in t
    if (!charCounts[char]) {
      return false;
    }
    
    charCounts[char]--;
  }
  
  return true;
}
```

### 4. Complexity Analysis (Approach B)
* **Time Complexity: O(N)**
  * *Why?* We loop through string `s` once and string `t` once. Hashmap read/write actions are O(1) speed.
* **Space Complexity: O(K) where K is alphabet size (O(1) in practice)**
  * *Why?* The hashmap only stores unique characters. If we assume standard English lowercase letters, the map will never hold more than 26 key-value pairs, which is constant space.

---

## 💡 Key Pattern Takeaway
Whenever you see a problem asking you to compare **character counts, matching pairs, or duplicates**, think of **Frequency Counting using a Hashmap (Object)**. It almost always reduces O(N²) time complexity to O(N).
