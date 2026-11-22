"use strict";

/**
 * Question 10: Nested Hoisting and Closures
 * 
 * Target Code:
 * ----------------------------------------------------
 * function outer() {
 *   console.log(count);
 *   var count = 5;
 *   function inner() {
 *     console.log(count);
 *     var count = 10;
 *   }
 *   inner();
 * }
 * outer();
 * ----------------------------------------------------
 * 
 * Task 1: Predict and Explain Output:
 * - Predicted Output:
 *     undefined
 *     undefined
 * 
 * - Explanation:
 *   1. When outer() is invoked:
 *      A new Function Execution Context for outer() is created.
 *      During its Creation (Memory Allocation) Phase, 'var count' is hoisted inside outer's
 *      local variable environment and initialized to 'undefined'.
 *      When console.log(count) runs on the first line of outer(), it prints 'undefined'.
 *      Then, 'count = 5;' assigns 5 to outer's local variable.
 * 
 *   2. When inner() is invoked:
 *      A separate Function Execution Context for inner() is created.
 *      During its Creation Phase, inner has its OWN local declaration: 'var count = 10;'.
 *      This inner 'var count' is hoisted into inner's local memory environment and initialized to 'undefined'.
 *      When console.log(count) runs inside inner(), JavaScript finds 'count' in inner's OWN local scope.
 *      Because it is found locally, JavaScript does NOT look up the scope chain to outer's 'count' (Variable Shadowing).
 *      Since inner's local 'count' is unassigned at that line, it prints 'undefined'.
 * 
 * Task 2: Separate Memory Contexts (Variable Environments):
 *   [Global Context]
 *      └── outer Context (Memory: { count: undefined -> 5, inner: f })
 *             └── inner Context (Memory: { count: undefined -> 10 })
 *   Each function execution context creates an isolated memory record (Environment Record).
 * 
 * Task 3: Converting to Arrow Function & Behavioral Changes:
 *   - Variant A: If the arrow function retains 'var count = 10', 'count' is still local to the arrow function,
 *     printing 'undefined'.
 *   - Variant B: If the inner arrow function does NOT re-declare 'count', it forms a true closure over
 *     outer's lexical environment and logs 5!
 * 
 * Task 4: Debug Session and Call Stack Flow:
 *   1. Global Execution Context pushed to Call Stack.
 *   2. outer() is called -> [Global, outer()]
 *   3. inner() is called -> [Global, outer(), inner()]
 *   4. inner() finishes -> popped off -> [Global, outer()]
 *   5. outer() finishes -> popped off -> [Global]
 */

console.log("=== Question 10: Nested Hoisting and Closures ===\n");

// Task 1: Running the original code and verifying predicted output
console.log("--- 1. Original Function Execution Output ---");

function outer() {
  console.log(`[outer scope before assignment]: count = ${count}`);
  var count = 5;

  function inner() {
    console.log(`[inner scope before assignment]: count = ${count}`);
    var count = 10;
  }

  inner();
}

outer();

// Task 2: Demonstrating Memory Contexts & Variable Shadowing
console.log("\n--- 2. Memory Contexts & Scope Chain Visualization ---");
console.log("Step 1: outer() Memory Allocation -> count: undefined, inner: function");
console.log("Step 2: outer() Execution Line 1  -> logs 'undefined'");
console.log("Step 3: outer() Execution Line 2  -> count becomes 5");
console.log("Step 4: inner() Memory Allocation -> its OWN local count: undefined");
console.log("Step 5: inner() Execution Line 1  -> logs 'undefined' (shadows outer count)");
console.log("Step 6: inner() Execution Line 2  -> inner count becomes 10");

// Task 3: Converting inner to an Arrow Function
console.log("\n--- 3. Behavior with Arrow Functions ---");

// Case A: Arrow function WITH local variable declaration
console.log("Case A: Arrow function with its own 'var count = 10':");
function outerWithArrowLocalVar() {
  var count = 5;

  const innerArrow = () => {
    console.log(` - Inner arrow with local 'var count': count = ${count}`);
    var count = 10; // Hoisted locally within arrow function
  };

  innerArrow();
}
outerWithArrowLocalVar();

// Case B: Arrow function WITHOUT local variable declaration (Accessing Closure)
console.log("\nCase B: Arrow function WITHOUT re-declaring 'count' (Closure in action):");
function outerWithArrowClosure() {
  const count = 5;

  const innerArrow = () => {
    // Lexical lookup: accesses 'count' from outer's enclosing scope
    console.log(` - Inner arrow accessing outer closure: count = ${count}`);
  };

  innerArrow();
}
outerWithArrowClosure();

// Task 4: Call Stack Flow Walkthrough
console.log("\n--- 4. Debugging & Call Stack Flow Walkthrough ---");
console.log("Frame 1: Call Stack = [ Global Context ]");
console.log("Frame 2: outer() called -> Call Stack = [ Global, outer() ]");
console.log("         Local Scope Watch: count = undefined -> 5");
console.log("Frame 3: inner() called -> Call Stack = [ Global, outer(), inner() ]");
console.log("         Local Scope Watch: inner's count = undefined -> 10");
console.log("Frame 4: inner() returns -> popped -> Call Stack = [ Global, outer() ]");
console.log("Frame 5: outer() returns -> popped -> Call Stack = [ Global ]");
