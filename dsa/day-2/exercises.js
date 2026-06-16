// DSA Day 2: Arrays & Hashing Exercises
// Focus: Frequency Counting Pattern

/**
 * Problem: Valid Anagram
 * 
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * 
 * Example 1:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 * 
 * Example 2:
 * Input: s = "rat", t = "car"
 * Output: false
 */
function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const charCounts = {};

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charCounts[char] = (charCounts[char] || 0) + 1;
  }

  for (let i = 0; i < t.length; i++) {
    const char = t[i];

    if (!charCounts[char]) {
      return false;
    }

    charCounts[char]--;
  }

  return true;
}

// ==========================================
// Test Cases (Run: node dsa/day-2/exercises.js)
// ==========================================

console.log("--- Testing Problem: Valid Anagram ---");
console.log("Test 1 ('anagram', 'nagaram'): expected true, got ->", isAnagram("anagram", "nagaram"));
console.log("Test 2 ('rat', 'car'): expected false, got ->", isAnagram("rat", "car"));
console.log("Test 3 ('a', 'ab'): expected false, got ->", isAnagram("a", "ab"));
console.log("Test 4 ('ab', 'a'): expected false, got ->", isAnagram("ab", "a"));
console.log("Test 5 ('', ''): expected true, got ->", isAnagram("", ""));
