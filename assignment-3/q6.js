"use strict";

/**
 * Question 6: Pyramid Pattern Generator
 * 
 * Objective:
 * Generate the pattern:
 * *
 * * *
 * * * *
 * * * * *
 * 
 * Tasks:
 * 1. Replace let with var and observe changes in scoping and variable re-use.
 * 2. Debug step-by-step to track variable re-use hazards.
 * 3. Add an outer loop limit controlled by user input parameter (default = 5).
 * 4. Use "use strict" to catch undeclared loop variables.
 * 
 * Scoping & Hoisting Notes:
 * - 'let' is block-scoped: each loop iteration has its own scope. Variables do not leak outside.
 * - 'var' is function-scoped / globally-scoped: variables are hoisted to function top and leak outside loops.
 * - Variable Re-use Risk with 'var':
 *     If an inner loop re-uses the same 'var i', it mutates the outer loop counter, causing
 *     premature termination or an infinite loop.
 */

// 3. Generator with outer loop limit (default = 5) using modern 'let'
console.log("=== Part 1: Pyramid Pattern using 'let' (default limit = 5) ===");

function generatePyramid(limit = 5) {
  const numRows = Number(limit) || 5;

  for (let i = 1; i <= numRows; i++) {
    let rowPattern = "";
    for (let j = 1; j <= i; j++) {
      rowPattern += (j === 1 ? "*" : " *");
    }
    console.log(rowPattern);
  }
}

// Generate default 5 rows
generatePyramid(5);

console.log("\n=== Part 2: Observing 'let' vs 'var' Scoping & Variable Re-use ===");

function demonstrateVarScoping(limit = 4) {
  console.log("Generating with 'var':");
  for (var row = 1; row <= limit; row++) {
    var line = "";
    for (var col = 1; col <= row; col++) {
      line += (col === 1 ? "*" : " *");
    }
    console.log(line);
  }

  // Debug Observation:
  // With 'var', 'row' and 'col' leak into the function scope and still exist after loops end!
  console.log(`[Debug Observation with 'var'] Variables leaked outside loop: row = ${row}, col = ${col}`);
  console.log("If 'let' were used instead, accessing 'row' or 'col' outside would throw a ReferenceError.");
}

demonstrateVarScoping(4);

console.log("\n=== Part 3: Debugging Variable Re-use Hazard with 'var' ===");
console.log("Observation: If both outer and inner loops accidentally re-use the same variable name 'k' with 'var':");

function demonstrateVarAccidentalReuse() {
  var outputLog = [];
  // Notice: Both loops share 'k' in function scope
  for (var k = 1; k <= 3; k++) {
    for (var k = 1; k <= 2; k++) {
      // Inner loop modifies the outer loop's 'k'!
    }
    outputLog.push(`Outer loop step finished with k = ${k}`);
    break; // We break to prevent infinite loop from variable collision
  }
  console.log(`Inner loop corrupted counter: ${outputLog[0]}`);
  console.log("Conclusion: Always use block-scoped 'let' to ensure loops maintain independent counters.");
}

demonstrateVarAccidentalReuse();

console.log("\n=== Part 4: Strict Mode Catching Undeclared Loop Variables ===");

function demonstrateUndeclaredCatch() {
  try {
    // If a developer forgets 'let' or 'var' (e.g. for (undeclaredCounter = 1; ...))
    const runUndeclared = new Function(`
      "use strict";
      for (undeclaredCounter = 1; undeclaredCounter <= 3; undeclaredCounter++) {
        // ...
      }
    `);
    runUndeclared();
  } catch (error) {
    console.log(`[STRICT MODE CAUGHT ERROR] ${error.name}: ${error.message}`);
    console.log("Observation: 'use strict' prevented accidental creation of global loop variable.");
  }
}

demonstrateUndeclaredCatch();
