"use strict";

/**
 * Question 4: Debugging Mystery
 * 
 * Original Code:
 * ----------------------------------------------------
 * "use strict";
 * function showMessage() {
 *   greeting = "Welcome"; // undeclared
 *   console.log(greeting);
 * }
 * showMessage();
 * ----------------------------------------------------
 * 
 * Task 1: Identify why this throws an error under strict mode:
 * In non-strict (sloppy) mode, assigning to an undeclared identifier like 'greeting = "Welcome"'
 * implicitly creates a property on the global object (window or global).
 * In strict mode ("use strict"), implicit global variable creation is prohibited.
 * When the JavaScript engine resolves the reference and finds no declaration in the scope chain,
 * it throws a ReferenceError: greeting is not defined.
 * 
 * Task 2: How scope declaration rules changed behavior:
 * By declaring the variable explicitly with 'const' (or 'let'), greeting is allocated inside the
 * Lexical Environment of the function execution context of showMessage().
 * It is properly scoped locally and cannot leak into the global scope.
 * 
 * Task 3: Debugger Observations in VS Code:
 * 1. Watch variables:
 *    - 'greeting': Initially uninitialized (TDZ) before execution line.
 *    - 'this': Evaluates to 'undefined' in strict mode function calls.
 * 2. Call Stack:
 *    - Inside showMessage(): [ showMessage() -> <global> ]
 *    - Upon function completion, the frame is popped off the Call Stack.
 */

console.log("=== Question 4: Debugging Mystery ===\n");

// Part 1: Demonstrating the Strict Mode Error safely
console.log("--- Part 1: Running the Problematic Code ---");
try {
  // Using Function() in strict mode to safely capture the exact runtime error
  const runProblematicCode = new Function(`
    "use strict";
    function faultyMessage() {
      greeting = "Welcome"; // Undeclared variable
      return greeting;
    }
    faultyMessage();
  `);
  runProblematicCode();
} catch (error) {
  console.log(`[CAUGHT RUNTIME ERROR] ${error.name}: ${error.message}`);
  console.log("Explanation: Strict mode does not allow assignment to undeclared variables.\n");
}

// Part 2: Fixed Version with Proper Variable Declaration
console.log("--- Part 2: Fixed Version with Proper Variable Declaration ---");

function showMessage() {
  // Fix: Explicitly declare the variable with let or const
  const greeting = "Welcome";
  console.log(`Message output: ${greeting}`);
}

showMessage();

// Part 3: Debugging and Call Stack summary
console.log("\n--- Part 3: VS Code Debugger Walkthrough ---");
console.log("1. Breakpoint: Set breakpoint at line: const greeting = 'Welcome';");
console.log("2. Watch Expression: Add 'greeting' in the WATCH panel.");
console.log("3. Call Stack Window:");
console.log("   - Active Frame: showMessage() [Local Scope]");
console.log("   - Caller Frame: <global> / Module Scope");
console.log("4. Step Over (F10): greeting gets value 'Welcome'.");
console.log("5. Step Out (Shift+F11): showMessage() frame is popped from Call Stack.");
