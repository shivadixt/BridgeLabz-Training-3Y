"use strict";

/**
 * Question 8: Custom Prototype Method Array.prototype.myMap()
 * 
 * Logic Explanation:
 * The built-in Array.prototype.map() creates a new array populated with the results
 * of calling a provided callback function on every element in the calling array.
 * 
 * Implementation Details:
 * 1. Attaches 'myMap' to Array.prototype so all array instances inherit it.
 * 2. Uses 'this' to reference the calling array instance.
 * 3. Handles callback arguments: (currentValue, index, array).
 * 4. Checks sparse slots (holes) using 'in' operator to avoid processing unassigned indices.
 * 5. Returns a new array without mutating the original array.
 */

// Custom prototype method
Array.prototype.myMap = function(callback) {
  // Validate that callback is a function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = [];
  // 'this' points to the array calling myMap
  for (let i = 0; i < this.length; i++) {
    // Only process indices that actually exist on the array (handles sparse arrays)
    if (i in this) {
      result.push(callback(this[i], i, this));
    }
  }

  return result;
};

console.log("=== Question 8: Custom Array.prototype.myMap() ===\n");

// Test 1: Doubling numbers (as specified in assignment)
const numbers = [1, 2, 3];
const doubled = numbers.myMap((num) => num * 2);

console.log("--- Test 1: Basic Numeric Transformation ---");
console.log("Original Array:", numbers);
console.log("Doubled Result:", doubled); // [2, 4, 6]

// Test 2: Formatting strings with index and array reference
const fruits = ["apple", "banana", "cherry"];
const formattedFruits = fruits.myMap((fruit, index, arr) => {
  return `${index + 1}. ${fruit.toUpperCase()} (Total: ${arr.length})`;
});

console.log("\n--- Test 2: String Formatting with (element, index, array) ---");
console.log("Result:", formattedFruits);

// Test 3: Comparison with native Array.prototype.map
const sampleData = [10, 20, 30, 40];
const nativeResult = sampleData.map((x) => x / 2);
const customResult = sampleData.myMap((x) => x / 2);

console.log("\n--- Test 3: Comparing with Native .map() ---");
console.log("Native .map() result :", nativeResult);
console.log("Custom .myMap() result:", customResult);
console.log("Matches native behavior?:", JSON.stringify(nativeResult) === JSON.stringify(customResult));

// Test 4: Ensuring original array is not mutated
console.log("\nOriginal array remained untouched:", sampleData);
