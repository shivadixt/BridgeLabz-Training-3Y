"use strict";

/**
 * Question 5: Hoisting Lab: The Sequence Trap
 * 
 * Given Sequence:
 * ----------------------------------------------------
 * console.log(score);
 * announce();
 * var score = 50;
 * function announce() { console.log("Game started"); }
 * let status = "ready";
 * startGame();
 * function startGame() {
 *   console.log(status);
 * }
 * ----------------------------------------------------
 * 
 * Task 1: Memory State Explanation during Creation vs Execution Phase:
 * 1. 'score' (declared with var):
 *    - Creation Phase: Allocated in Variable Environment and initialized to 'undefined'.
 *    - Execution Phase: Line 1 logs 'undefined'. Line 3 assigns 50.
 * 
 * 2. 'announce' (function declaration):
 *    - Creation Phase: Entire function body is hoisted into memory.
 *    - Execution Phase: Can be invoked at line 2 before declaration; logs "Game started".
 * 
 * 3. 'status' (declared with let):
 *    - Creation Phase: Allocated in Lexical Environment, but NOT initialized (in TDZ: Temporal Dead Zone).
 *    - Execution Phase: Becomes accessible only after declaration at line 5 is executed.
 * 
 * 4. 'startGame' (function declaration):
 *    - Creation Phase: Fully hoisted with body into memory.
 *    - Execution Phase: At line 6, status has already been initialized to "ready", so startGame() logs "ready".
 *    - The "Trap": If startGame() was called BEFORE line 5, it would throw ReferenceError because 'status' was in TDZ!
 * 
 * Task 2: Fix the code to run properly (declare before use).
 * 
 * Task 3: Rewrite using arrow functions to compare hoisting differences:
 * - Arrow functions assigned to 'const' or 'let' variables are in the Temporal Dead Zone before definition.
 * - Unlike function declarations, arrow functions cannot be invoked prior to their assignment line.
 */

console.log("=== Part 1: Predicted Output vs Running Original Sequence ===");
console.log("Prediction:");
console.log(" - console.log(score) -> undefined (var hoisted and initialized to undefined)");
console.log(" - announce()         -> 'Game started' (function declaration fully hoisted)");
console.log(" - startGame()        -> 'ready' (called after let status = 'ready' initialized)");
console.log("\nActual Execution Output:");

// Demonstrating original behavior:
function runOriginalSequence() {
  console.log(score); // outputs undefined
  announce();         // outputs "Game started"
  var score = 50;
  function announce() { console.log("Game started"); }
  let status = "ready";
  startGame();        // outputs "ready"
  function startGame() {
    console.log(status);
  }
}
runOriginalSequence();

console.log("\n=== Part 2: Fixed Code (Clean Sequence - Declare Before Use) ===");

function runFixedSequence() {
  // 1. Declare variables and functions at the top of the scope
  const score = 50;
  const status = "ready";

  function announceGame() {
    console.log("Game started");
  }

  function startTheGame() {
    console.log(`Game status: ${status}`);
  }

  // 2. Execute operations predictably
  console.log(`Current score: ${score}`);
  announceGame();
  startTheGame();
}
runFixedSequence();

console.log("\n=== Part 3: Rewrite Using Arrow Functions (Hoisting Comparison) ===");

function runArrowFunctionsVersion() {
  const score = 50;
  const status = "ready";

  // Arrow functions are NOT hoisted as function declarations.
  // They are variable assignments and must be defined before calling.
  const announceArrow = () => {
    console.log("Game started (from arrow function)");
  };

  const startGameArrow = () => {
    console.log(`Status: ${status} (from arrow function)`);
  };

  console.log(`Initial Score: ${score}`);
  announceArrow();
  startGameArrow();
}
runArrowFunctionsVersion();

console.log("\nSummary of Hoisting Differences:");
console.log("1. Function Declaration : Fully hoisted with body; can be called anywhere in scope.");
console.log("2. var variable         : Hoisted with 'undefined' default value.");
console.log("3. let / const          : Hoisted into TDZ (uninitialized); throws ReferenceError if accessed before declaration.");
console.log("4. Arrow Function (let/const): Stored as variable in TDZ; calling before declaration throws ReferenceError.");
