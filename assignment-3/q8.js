"use strict";

/**
 * Question 8: Strict Mode Showdown
 * 
 * Target Code:
 * ----------------------------------------------------
 * function demo(a, a) {
 *   total = 10;
 *   delete total;
 * }
 * demo(5, 10);
 * ----------------------------------------------------
 * 
 * Tasks:
 * 1. Run this with and without "use strict".
 * 2. Record the errors and differences in behavior.
 * 3. Explain why strict mode makes these operations illegal.
 * 4. Show a correct version using ES6 rules.
 */

console.log("=== Strict Mode Showdown: Comparative Analysis ===\n");

// Task 1 & 2: Running WITHOUT "use strict" (Sloppy Mode)
console.log("--- 1. Behavior WITHOUT 'use strict' (Sloppy Mode) ---");
try {
  // We use Function() in non-strict mode to safely demonstrate sloppy behavior
  const nonStrictFunction = new Function("a", "a", `
    // In sloppy mode:
    // 1. Duplicate parameter (a, a) is allowed.
    // 2. Assigning to undeclared total attaches to the global object.
    // 3. Deleting it returns true without throwing an error.
    global.total = 10;
    var deleteResult = delete global.total;
    return {
      parameterValueA: a, // Second 'a' overwrote the first
      deleteResult: deleteResult
    };
  `);

  const sloppyResult = nonStrictFunction(5, 10);
  console.log("Status: Executed WITHOUT throwing an error (silent bugs permitted):");
  console.log(` - Duplicate parameter value 'a': ${sloppyResult.parameterValueA} (first argument 5 was lost!)`);
  console.log(" - Undeclared 'total' was silently attached to global scope (value: 10)");
  console.log(` - 'delete total' executed without SyntaxError (result: ${sloppyResult.deleteResult})`);
} catch (err) {
  console.log(`Sloppy mode error: ${err.message}`);
}

// Task 1 & 2: Running WITH "use strict" (Strict Mode)
console.log("\n--- 2. Behavior WITH 'use strict' (Strict Mode) ---");

// Test A: Duplicate parameter names
console.log("[Test A] Duplicate parameter names 'function demo(a, a)':");
try {
  new Function(`
    "use strict";
    function demo(a, a) {}
  `)();
} catch (err) {
  console.log(` -> Caught: [${err.name}] ${err.message}`);
}

// Test B: Undeclared variable assignment
console.log("[Test B] Undeclared variable assignment 'total = 10':");
try {
  new Function(`
    "use strict";
    function demo(a, b) {
      total = 10;
    }
    demo(5, 10);
  `)();
} catch (err) {
  console.log(` -> Caught: [${err.name}] ${err.message}`);
}

// Test C: Deleting an unqualified identifier
console.log("[Test C] Deleting an unqualified identifier 'delete total':");
try {
  new Function(`
    "use strict";
    var total = 10;
    delete total;
  `)();
} catch (err) {
  console.log(` -> Caught: [${err.name}] ${err.message}`);
}

// Task 3: Why Strict Mode makes these operations illegal
console.log("\n--- 3. Why Strict Mode Disallows These Operations ---");
console.log("1. Duplicate Parameters (a, a):");
console.log("   - In sloppy mode, the second parameter silently overwrites the first.");
console.log("   - The programmer loses access to the first argument, causing obscure logical bugs.");
console.log("   - Strict mode forces unique parameter names to prevent unintended parameter shadowing.");
console.log("\n2. Implicit Globals (total = 10):");
console.log("   - Forgetting 'let', 'const', or 'var' leaks variables into the global namespace.");
console.log("   - This leads to memory leaks and dangerous name collisions across independent scripts.");
console.log("   - Strict mode mandates explicit declaration.");
console.log("\n3. Deleting Identifiers (delete total):");
console.log("   - 'delete' in JavaScript is designed exclusively for removing configurable object properties.");
console.log("   - Deleting plain variable names or function names is semantically invalid and indicates confusion.");
console.log("   - Strict mode throws a compile-time SyntaxError to flag this immediately.");

// Task 4: Correct ES6 Version
console.log("\n--- 4. Correct Version using ES6 Rules ---");

function calculateTotal(valueA, valueB) {
  // Explicit declaration using 'const' and 'let'
  const baseValue = valueA;
  const incrementValue = valueB;
  let total = baseValue + incrementValue;

  console.log(`Values: valueA = ${baseValue}, valueB = ${incrementValue}`);
  console.log(`Total calculated: ${total}`);

  // No 'delete' operator on local variables; memory is naturally garbage-collected
  return total;
}

const finalTotal = calculateTotal(5, 10);
console.log(`Function returned: ${finalTotal}`);
