"use strict";

/**
 * Question 1: Callback Functions and Flow
 * 
 * Logic Explanation:
 * A callback function is a function passed as an argument to another function,
 * which is then executed inside the outer function to complete a specific routine.
 * 
 * Requirements:
 * - greetUser(name, callback): Prints "Hello <name>" and then executes the callback.
 * - showEndMessage(): Callback function that prints "Welcome to the course!".
 * - Demonstrates callback execution flow clearly.
 */

// Callback function
function showEndMessage() {
  console.log("Welcome to the course!");
}

// Higher-order function that accepts a callback
function greetUser(name, callback) {
  console.log(`Hello ${name}`);

  // Ensure callback is a valid function before invoking
  if (typeof callback === "function") {
    callback();
  } else {
    console.log("No valid callback function provided.");
  }
}

console.log("=== Question 1: Callback Flow Demonstration ===\n");

console.log("--- Execution 1: Standard Named Callback ---");
greetUser("Shiva", showEndMessage);

console.log("\n--- Execution 2: Inline Anonymous Callback ---");
greetUser("Aman", function() {
  console.log("Good luck with your web development journey!");
});

console.log("\n--- Execution 3: Arrow Function Callback ---");
greetUser("Pooja", () => {
  console.log("Your batch starts today at 10:00 AM.");
});

console.log("\nCallback Flow Summary:");
console.log("1. greetUser() is invoked with arguments: name string and callback function reference.");
console.log("2. greetUser() runs its own logic first (prints 'Hello <name>').");
console.log("3. greetUser() transfers control to the callback function by calling callback().");
console.log("4. The callback function completes its task (prints welcome message).");
