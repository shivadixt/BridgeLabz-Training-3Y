"use strict";

/**
 * Question 3: Arrow Functions vs Normal Functions with 'this'
 * 
 * Objective:
 * 1. Create an object user with property 'name' and method 'showName' as an arrow function.
 * 2. Log the output and explain why this.name is undefined.
 * 3. Fix the problem by replacing the arrow function with a regular function/method shorthand.
 * 
 * Deep Dive Explanation:
 * - Arrow functions do NOT possess their own 'this' binding. Instead, they capture 'this'
 *   lexically from the enclosing outer execution context at the time they are defined.
 * - When defining an object literal, curly braces { } do NOT create a new local lexical scope.
 *   Therefore, the enclosing scope of the arrow function is the global/module scope.
 * - In global/module scope, 'this.name' does not exist (or refers to global/undefined in strict mode).
 * - Regular functions, on the other hand, bind 'this' dynamically to the object that invokes
 *   the method (e.g., in 'user.showName()', 'this' points directly to 'user').
 */

console.log("=== Question 3: 'this' Keyword Behavior in Methods ===\n");

// Part 1: Arrow function method demonstrating the issue
console.log("--- Part 1: Method Written as an Arrow Function ---");

const userWithArrow = {
  name: "Shiva",
  showName: () => {
    // 'this' does NOT point to userWithArrow!
    // It captures 'this' from the outer module/global scope.
    console.log(`[Arrow Function] Name is: ${this ? this.name : undefined}`);
  }
};

userWithArrow.showName();

console.log("\nExplanation of why this.name is undefined:");
console.log("1. Arrow functions do not bind their own 'this'.");
console.log("2. They retain the 'this' value of the enclosing lexical context where the object was declared.");
console.log("3. Since object literals do not create a scope, 'this' refers to the global/module wrapper, where 'name' is undefined.");

// Part 2: Fixed version using a regular function
console.log("\n--- Part 2: Fixed Version Using Normal Function ---");

const userWithNormalFunction = {
  name: "Shiva",
  showName: function() {
    // Normal function dynamically binds 'this' to the caller object (userWithNormalFunction)
    console.log(`[Normal Function] Name is: ${this.name}`);
  }
};

userWithNormalFunction.showName();

// Part 3: ES6 Method Shorthand (also valid and clean)
console.log("\n--- Part 3: Using ES6 Method Shorthand Syntax ---");

const userWithMethodShorthand = {
  name: "Shiva Dixit",
  showName() {
    console.log(`[Method Shorthand] Name is: ${this.name}`);
  }
};

userWithMethodShorthand.showName();
