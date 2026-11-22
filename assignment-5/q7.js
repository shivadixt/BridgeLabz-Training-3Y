"use strict";

/**
 * Question 7: Function Closures
 * 
 * Logic Explanation:
 * A closure is a fundamental feature in JavaScript where an inner function retains
 * access to variables from its outer (enclosing) function's lexical scope, even after
 * the outer function has finished executing and returned.
 * 
 * Task:
 * Write makeMultiplier(multiplier) returning an inner function that takes a number
 * and multiplies it by multiplier.
 * 
 * Example:
 * const triple = makeMultiplier(3);
 * console.log(triple(5)); // 15
 */

function makeMultiplier(multiplier) {
  // 'multiplier' is a local variable in makeMultiplier's execution context.
  return function(number) {
    // The returned inner function remembers 'multiplier' via closure.
    return number * multiplier;
  };
}

console.log("=== Question 7: Function Closures (makeMultiplier) ===\n");

// Create multiplier functions
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const timesTen = makeMultiplier(10);

console.log("--- Executing Multiplier Functions ---");
console.log("triple(5)   :", triple(5));     // 15
console.log("double(8)   :", double(8));     // 16
console.log("timesTen(7) :", timesTen(7));   // 70

console.log("\n--- Detailed Explanation of How Closure Works Here ---");
console.log("1. Outer Execution Phase:");
console.log("   - makeMultiplier(3) is called.");
console.log("   - Its execution context is created with local argument multiplier = 3.");
console.log("   - It returns the inner function definition and its execution context finishes.");
console.log("   - Normal stack frames are destroyed, BUT the returned function holds a live reference");
console.log("     to the Lexical Environment where multiplier = 3 was created.");
console.log("\n2. Inner Execution Phase:");
console.log("   - When triple(5) is invoked later, its own execution context is created (number = 5).");
console.log("   - When resolving 'multiplier', JavaScript cannot find it in triple's local scope.");
console.log("   - It looks outward into the saved closure scope, finds multiplier = 3, and computes 5 * 3 = 15.");
console.log("\n3. Encapsulation & Independence:");
console.log("   - Each call to makeMultiplier() produces an independent closure memory record.");
console.log("   - 'double' holds multiplier = 2, while 'triple' holds multiplier = 3 without interference.");
