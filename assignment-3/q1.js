"use strict";

/**
 * Question 1: Dynamic Data Parser
 * 
 * Logic Explanation:
 * We receive mixed data types from an API simulation:
 * const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];
 * 
 * We iterate through each element and convert it into:
 * 1. Number form  : Number(value)
 * 2. Boolean form : Boolean(value)
 * 3. String form  : String(value)
 * 
 * We skip invalid numbers (such as NaN, whitespace " ", "100px", null, and undefined)
 * and log them separately into an invalid data array.
 * Valid numeric values are collected into a separate valid numeric array.
 * 
 * Hoisting & Scope Notes:
 * - "use strict" prevents accidental global variables.
 * - 'const' and 'let' are block-scoped variables, avoiding 'var' hoisting bugs.
 * 
 * Debug Observations:
 * - Number(" ") evaluates to 0 and Number(null) evaluates to 0 in JavaScript due to type coercion quirks.
 * - To treat them as invalid as instructed, we check for null/undefined and check if strings are empty/whitespace using .trim().
 */

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

const validNumericData = [];
const invalidData = [];

console.log("=== Dynamic Data Parser Report ===");
console.log("--------------------------------------------------------------------------------");
console.log("Original Value\t| As Number\t| As Boolean\t| As String\t| Numeric Status");
console.log("--------------------------------------------------------------------------------");

for (let i = 0; i < apiData.length; i++) {
  const item = apiData[i];

  // 1. Convert into Number, Boolean, and String forms
  const numberForm = Number(item);
  const booleanForm = Boolean(item);
  const stringForm = String(item);

  // 2. Identify whether the item is a valid numeric value
  let isValidNumber = true;

  if (item === null || item === undefined) {
    isValidNumber = false;
  } else if (typeof item === "string" && item.trim() === "") {
    isValidNumber = false;
  } else if (isNaN(numberForm)) {
    isValidNumber = false;
  }

  // 3. Separate into valid and invalid arrays
  if (isValidNumber) {
    validNumericData.push({
      original: item,
      parsedValue: numberForm
    });
    console.log(`${String(item)}\t\t| ${numberForm}\t\t| ${booleanForm}\t\t| "${stringForm}"\t\t| [VALID]`);
  } else {
    invalidData.push({
      original: item,
      reason: isNaN(numberForm) ? "Coerces to NaN" : "Coercion quirk / empty / null"
    });
    console.log(`${String(item)}\t\t| ${numberForm}\t\t| ${booleanForm}\t\t| "${stringForm}"\t\t| [SKIPPED - INVALID]`);
  }
}

console.log("--------------------------------------------------------------------------------");
console.log("\n=== Summary Report ===");
console.log(`Total items processed: ${apiData.length}`);
console.log(`Valid numeric items count: ${validNumericData.length}`);
console.log("Valid numbers:", validNumericData.map((d) => d.parsedValue));

console.log(`\nInvalid items count: ${invalidData.length}`);
console.log("Invalid entries skipped:");
for (let j = 0; j < invalidData.length; j++) {
  console.log(` - Item: ${String(invalidData[j].original)} (Reason: ${invalidData[j].reason})`);
}
