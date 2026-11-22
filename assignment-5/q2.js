"use strict";

/**
 * Question 2: Higher-Order Functions with Array Operations
 * 
 * Logic Explanation:
 * applyOperation(numbers, operation) takes an array of numbers and an operation callback.
 * It iterates over each element, invokes the callback on each element,
 * and collects the transformed values into a new array.
 * 
 * Demonstrations:
 * 1. Double each number in [1, 2, 3, 4] -> [2, 4, 6, 8]
 * 2. Square each number in [1, 2, 3, 4] -> [1, 4, 9, 16]
 */

// Higher-order function
function applyOperation(numbers, operation) {
  if (!Array.isArray(numbers)) {
    throw new TypeError("First argument must be an array.");
  }
  if (typeof operation !== "function") {
    throw new TypeError("Second argument must be a callback function.");
  }

  const results = [];
  for (let i = 0; i < numbers.length; i++) {
    const transformedValue = operation(numbers[i], i, numbers);
    results.push(transformedValue);
  }
  return results;
}

// Callback functions
const doubleNumber = (num) => num * 2;
const squareNumber = (num) => num * num;

// Sample input
const inputNumbers = [1, 2, 3, 4];

console.log("=== Question 2: Array Operations Using Callbacks ===\n");
console.log(`Initial Array: [${inputNumbers.join(", ")}]\n`);

// 1. Double each number
const doubled = applyOperation(inputNumbers, doubleNumber);
console.log("--- Operation 1: Double Each Number ---");
console.log(`Applied: (num) => num * 2`);
console.log("Result:", doubled); // [2, 4, 6, 8]

// 2. Square each number
const squared = applyOperation(inputNumbers, squareNumber);
console.log("\n--- Operation 2: Square Each Number ---");
console.log(`Applied: (num) => num * num`);
console.log("Result:", squared); // [1, 4, 9, 16]

// 3. Additional example: Add 10 to each number
const plusTen = applyOperation(inputNumbers, (num) => num + 10);
console.log("\n--- Operation 3: Add 10 to Each Number ---");
console.log(`Applied: (num) => num + 10`);
console.log("Result:", plusTen); // [11, 12, 13, 14]
