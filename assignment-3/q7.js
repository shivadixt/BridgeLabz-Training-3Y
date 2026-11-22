"use strict";

/**
 * Question 7: Smart Calculator
 * 
 * Given Data:
 * const operations = ["add", "divide", "power", "root", "subtract"];
 * const num1 = 25, num2 = 0;
 * 
 * Tasks:
 * 1. Use a switch statement to handle each operation.
 * 2. Add custom error handling for:
 *    - Division by zero
 *    - Square root of a negative number
 * 3. Throw InvalidOperationError if operation is not recognized.
 * 4. Wrap each calculation in try...catch and print results in a formatted summary.
 * 
 * Error Handling & Hoisting Notes:
 * - Custom errors provide clear semantic distinction between mathematical domain errors
 *   and invalid operation errors.
 * - 'switch' evaluates exact cases cleanly without implicit type conversions.
 */

// Custom error classes
class InvalidOperationError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidOperationError";
  }
}

class MathDomainError extends Error {
  constructor(message) {
    super(message);
    this.name = "MathDomainError";
  }
}

// 1. Calculator function with switch
function calculate(operation, a, b) {
  switch (operation) {
    case "add":
      return a + b;

    case "subtract":
      return a - b;

    case "multiply":
      return a * b;

    case "divide":
      // 2. Custom error handling for divide by 0
      if (b === 0) {
        throw new MathDomainError("Cannot divide by zero (b = 0).");
      }
      return a / b;

    case "power":
      return Math.pow(a, b);

    case "root":
      // 2. Custom error handling for root of negative number
      if (a < 0) {
        throw new MathDomainError(`Cannot calculate square root of a negative number (a = ${a}).`);
      }
      return Math.sqrt(a);

    default:
      // 3. Unrecognized operation throws InvalidOperationError
      throw new InvalidOperationError(`Operation '${operation}' is not recognized.`);
  }
}

const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25;
const num2 = 0;

// Adding additional test cases to verify unrecognized operations and negative roots
const testQueue = [
  ...operations.map((op) => ({ op, a: num1, b: num2 })),
  { op: "modulus", a: num1, b: num2 },   // Unrecognized operation test
  { op: "root", a: -25, b: 0 }           // Negative root test
];

const resultsSummary = [];

console.log("=== Smart Calculator Execution ===");
console.log(`Base Inputs: num1 = ${num1}, num2 = ${num2}\n`);

// 4. Wrap in try...catch and process each operation
for (let i = 0; i < testQueue.length; i++) {
  const { op, a, b } = testQueue[i];

  try {
    const result = calculate(op, a, b);
    resultsSummary.push({
      operation: op,
      inputA: a,
      inputB: b,
      status: "SUCCESS",
      output: result
    });
    console.log(`✓ Operation: '${op}' | Inputs: (${a}, ${b}) -> Result: ${result}`);
  } catch (error) {
    resultsSummary.push({
      operation: op,
      inputA: a,
      inputB: b,
      status: `FAILED [${error.name}]`,
      output: error.message
    });
    console.log(`✗ Operation: '${op}' | Inputs: (${a}, ${b}) -> Error: [${error.name}] ${error.message}`);
  }
}

// 4. Formatted Summary Report
console.log("\n======================== Smart Calculator Summary Report ========================");
console.log("Operation\t| Inputs\t| Status\t\t| Output / Details");
console.log("---------------------------------------------------------------------------------");
for (let j = 0; j < resultsSummary.length; j++) {
  const item = resultsSummary[j];
  const inputStr = `(${item.inputA}, ${item.inputB})`;
  console.log(
    `${item.operation.padEnd(10)}\t| ${inputStr.padEnd(8)}\t| ${item.status.padEnd(20)}\t| ${item.output}`
  );
}
console.log("=================================================================================");
