"use strict";

/**
 * Question 3: Transaction Validator
 * 
 * Logic Explanation:
 * Loops through transactions and enforces validation rules:
 * - Throws custom errors for:
 *     1. Null or undefined entries (NullTransactionError)
 *     2. Missing 'id' or 'amount' (MissingPropertyError)
 *     3. Negative transaction amounts (NegativeAmountError)
 * - Categorizes valid transactions and invalid transactions with error types into separate arrays.
 * - Prints a final summary report.
 * 
 * Debug Observations:
 * - Breakpoint target: Place a breakpoint at the start of the 'for' loop (line with 'try {')
 *   or inside 'catch (error) {'.
 * - Watch variables to monitor:
 *     1. 'currentTx' - to inspect the current transaction object being evaluated.
 *     2. 'error.name' - to observe which custom error was triggered.
 *     3. 'validTransactions.length' & 'invalidTransactions.length' - to track counts.
 */

// Custom Error Classes for structured categorization
class NullTransactionError extends Error {
  constructor(message) {
    super(message);
    this.name = "NullTransactionError";
  }
}

class MissingPropertyError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingPropertyError";
  }
}

class NegativeAmountError extends Error {
  constructor(message) {
    super(message);
    this.name = "NegativeAmountError";
  }
}

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

const validTransactions = [];
const invalidTransactions = [];

console.log("=== Processing Transactions ===");

// 1. Loop through each transaction
for (let i = 0; i < transactions.length; i++) {
  const currentTx = transactions[i];

  try {
    // [DEBUG BREAKPOINT RECOMMENDED HERE]
    // Watch: currentTx, validTransactions.length, invalidTransactions.length

    // 2. Throw custom errors
    // Case 1: Null entries
    if (currentTx === null || currentTx === undefined) {
      throw new NullTransactionError(`Transaction at index ${i} is null or undefined.`);
    }

    // Case 2: Missing id or amount
    if (currentTx.id === undefined) {
      throw new MissingPropertyError(`Transaction at index ${i} is missing the 'id' property.`);
    }

    if (currentTx.amount === undefined) {
      throw new MissingPropertyError(`Transaction #${currentTx.id} is missing the 'amount' property.`);
    }

    if (typeof currentTx.amount !== "number" || isNaN(currentTx.amount)) {
      throw new MissingPropertyError(`Transaction #${currentTx.id} has a non-numeric amount.`);
    }

    // Case 3: Negative amount
    if (currentTx.amount < 0) {
      throw new NegativeAmountError(`Transaction #${currentTx.id} has a negative amount: ₹${currentTx.amount}.`);
    }

    // 3. Collect valid transactions
    validTransactions.push(currentTx);
    console.log(`[APPROVED] Transaction #${currentTx.id} -> Amount: ₹${currentTx.amount}`);

  } catch (error) {
    // 3. Catch and categorize each error type
    invalidTransactions.push({
      entry: currentTx,
      errorType: error.name,
      message: error.message
    });

    console.log(`[REJECTED] Category: ${error.name} | Details: ${error.message}`);
  }
}

// 4. Print final reports with counts of successful and failed transactions
console.log("\n=== Final Transaction Report ===");
console.log(`Total transactions evaluated: ${transactions.length}`);
console.log(`Successful (Valid) transactions: ${validTransactions.length}`);
console.log(`Failed (Invalid) transactions: ${invalidTransactions.length}`);

console.log("\n--- Approved Transactions ---");
for (let i = 0; i < validTransactions.length; i++) {
  console.log(`  ✓ ID: ${validTransactions[i].id}, Amount: ₹${validTransactions[i].amount}`);
}

console.log("\n--- Rejected Transactions Categorization ---");
for (let j = 0; j < invalidTransactions.length; j++) {
  console.log(`  ✗ [${invalidTransactions[j].errorType}] ${invalidTransactions[j].message}`);
}
