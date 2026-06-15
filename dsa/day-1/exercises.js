// DSA Day 1: Arrays & Hashing Exercises
// Focus: O(1) lookups using JavaScript Objects / Maps

/**
 * Problem 1: Contains Duplicate
 * 
 * Given an array of integers, return true if any value appears at least twice in the array.
 * Return false if every element is distinct.
 * 
 * Example 1:
 * Input: nums = [1, 2, 3, 1]
 * Output: true
 * 
 * Example 2:
 * Input: nums = [1, 2, 3, 4]
 * Output: false
 */
function containsDuplicate(nums) {
  // Write your code here
  
}


/**
 * Problem 2: Two Sum
 * 
 * Given an array of integers nums and an integer target, return indices of the two numbers 
 * such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the 
 * same element twice. You can return the answer in any order.
 * 
 * Example 1:
 * Input: nums = [2, 7, 11, 15], target = 9
 * Output: [0, 1] (because nums[0] + nums[1] == 9)
 * 
 * Example 2:
 * Input: nums = [3, 2, 4], target = 6
 * Output: [1, 2]
 */
function twoSum(nums, target) {
  // Write your code here
  
}

// ==========================================
// Test Cases (You can run this file to test your solutions!)
// ==========================================

console.log("--- Testing Problem 1: Contains Duplicate ---");
console.log("Test 1 [1,2,3,1]: expected true, got ->", containsDuplicate([1, 2, 3, 1]));
console.log("Test 2 [1,2,3,4]: expected false, got ->", containsDuplicate([1, 2, 3, 4]));
console.log("Test 3 []: expected false, got ->", containsDuplicate([]));

console.log("\n--- Testing Problem 2: Two Sum ---");
console.log("Test 1 [2,7,11,15] target 9: expected [0,1], got ->", JSON.stringify(twoSum([2, 7, 11, 15], 9)));
console.log("Test 2 [3,2,4] target 6: expected [1,2], got ->", JSON.stringify(twoSum([3, 2, 4], 6)));
console.log("Test 3 [3,3] target 6: expected [0,1], got ->", JSON.stringify(twoSum([3, 3], 6)));
