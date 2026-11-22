"use strict";

/**
 * Question 9: JSON Audit
 * 
 * Given Data:
 * const rawData = [
 *   '{"user":"Alex","age":25}',
 *   '{"id":2}',
 *   '{invalid}',
 *   '{"user":"Mina","age":"22"}'
 * ];
 * 
 * Tasks:
 * 1. Parse each entry in a loop using try...catch.
 * 2. Detect missing keys (user, age) and invalid JSON syntax.
 * 3. Push valid entries to a clean array; log errors with line numbers.
 * 4. Debug step-by-step to see how control flows on error.
 * 5. Add bonus: convert age to Number and filter under-18 users.
 * 
 * Control Flow & Debugging Notes:
 * - When an error occurs (e.g. JSON.parse fails on line 3), JavaScript interrupts normal
 *   sequential execution and immediately transfers control to the enclosing 'catch' block.
 * - Statements after the throwing statement inside the 'try' block are skipped.
 * - After 'catch' executes, the loop continues to the next iteration.
 */

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}',
  // Bonus test case: valid JSON with user and age, but age < 18
  '{"user":"Sam","age":"16"}'
];

const cleanUsers = [];
const auditErrors = [];

console.log("=== JSON Audit Processing Log ===");
console.log("--------------------------------------------------------------------------------");

for (let i = 0; i < rawData.length; i++) {
  const lineNumber = i + 1;
  const rawEntry = rawData[i];

  try {
    // Step 1: Parse entry using JSON.parse
    let parsedData;
    try {
      parsedData = JSON.parse(rawEntry);
    } catch (parseErr) {
      // Catch syntax errors specifically from malformed JSON strings
      throw new Error(`Malformed JSON syntax: '${rawEntry}'`);
    }

    // Step 2: Validate object structure and missing required keys (user, age)
    if (!parsedData || typeof parsedData !== "object" || Array.isArray(parsedData)) {
      throw new Error("Parsed content is not a valid JSON object.");
    }

    const missingKeys = [];
    if (!("user" in parsedData)) {
      missingKeys.push("user");
    }
    if (!("age" in parsedData)) {
      missingKeys.push("age");
    }

    if (missingKeys.length > 0) {
      throw new Error(`Missing required key(s): [${missingKeys.join(", ")}]`);
    }

    // Step 5 (Bonus): Convert age to Number and validate
    const ageAsNumber = Number(parsedData.age);
    if (isNaN(ageAsNumber)) {
      throw new Error(`Age property is not a valid number: "${parsedData.age}"`);
    }

    // Step 5 (Bonus): Filter under-18 users
    if (ageAsNumber < 18) {
      console.log(`[Line ${lineNumber}] FILTERED: User '${parsedData.user}' is under 18 (Age: ${ageAsNumber}). Excluded from adults list.`);
      continue;
    }

    // Step 3: Push valid and normalized entries to clean array
    const validRecord = {
      user: String(parsedData.user),
      age: ageAsNumber
    };
    cleanUsers.push(validRecord);

    console.log(`[Line ${lineNumber}] VALID: Accepted user '${validRecord.user}' (Age: ${validRecord.age})`);

  } catch (error) {
    // Step 3: Log errors with line numbers
    auditErrors.push({
      line: lineNumber,
      rawString: rawEntry,
      errorReason: error.message
    });

    console.log(`[Line ${lineNumber}] REJECTED: ${error.message}`);
  }
}

console.log("--------------------------------------------------------------------------------");

// Final Audit Report
console.log("\n=== Clean Valid Users Array ===");
console.table(cleanUsers);

console.log("\n=== Audit Error Log (Summary) ===");
console.log(`Total records processed: ${rawData.length}`);
console.log(`Valid records accepted: ${cleanUsers.length}`);
console.log(`Errors encountered: ${auditErrors.length}`);

for (let j = 0; j < auditErrors.length; j++) {
  console.log(` - Line ${auditErrors[j].line}: ${auditErrors[j].errorReason}`);
}

console.log("\n=== Debug Step-by-Step Control Flow Explanation ===");
console.log("1. At Line 1: JSON parses successfully -> 'user' & 'age' present -> age converted to 25 -> pushed to cleanUsers.");
console.log("2. At Line 2: JSON parses -> missing 'user' & 'age' -> throws Error -> jumps directly to catch block.");
console.log("3. At Line 3: JSON.parse fails on '{invalid}' -> catches SyntaxError -> throws custom Error -> jumps to catch block.");
console.log("4. At Line 4: JSON parses -> string age '22' converted to number 22 -> age >= 18 -> pushed to cleanUsers.");
console.log("5. At Line 5: JSON parses -> age 16 < 18 -> filtered out using continue, skipped from cleanUsers.");
