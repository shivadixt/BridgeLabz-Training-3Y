"use strict";

/**
 * Question 2: Employee Bonus Calculator
 * 
 * Logic Explanation:
 * Calculates annual bonus for employees based on years of service:
 * - If years > 3, bonus is 10% of salary (salary * 0.10).
 * - Otherwise (years <= 3), bonus is 5% of salary (salary * 0.05).
 * 
 * Strict Mode & Hoisting:
 * - "use strict" ensures all variables are declared explicitly with let or const.
 * - 'const' and 'let' remain in the Temporal Dead Zone (TDZ) until their declaration lines.
 * 
 * Debug & Error Handling Observations:
 * - Uses try...catch to safely validate missing properties, non-numeric strings, or invalid inputs.
 */

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" },
  // Edge case to demonstrate error handling in try...catch
  { name: "Rahul", salary: "invalid_salary", years: "3" }
];

console.log("=== Employee Bonus Calculation Report ===");
console.log("-----------------------------------------------------------------------------------------");

for (let i = 0; i < employees.length; i++) {
  try {
    const employee = employees[i];

    // 3. Strict validation: Check if employee object and required properties exist
    if (!employee || typeof employee !== "object") {
      throw new Error(`Record at index ${i} is not a valid object.`);
    }

    if (!employee.name || employee.salary === undefined || employee.years === undefined) {
      throw new Error(`Missing required property (name, salary, or years) for employee at index ${i}.`);
    }

    // 1. Convert salary and years to numbers
    const salaryNumber = Number(employee.salary);
    const yearsNumber = Number(employee.years);

    if (isNaN(salaryNumber)) {
      throw new Error(`Salary "${employee.salary}" for ${employee.name} is not a valid number.`);
    }

    if (isNaN(yearsNumber)) {
      throw new Error(`Years of service "${employee.years}" for ${employee.name} is not a valid number.`);
    }

    if (salaryNumber < 0 || yearsNumber < 0) {
      throw new Error(`Salary and years must be non-negative for employee ${employee.name}.`);
    }

    // 2. Calculate bonus = (salary * 0.1) if years > 3 else (salary * 0.05)
    let bonusRate = 0.05;
    if (yearsNumber > 3) {
      bonusRate = 0.10;
    }

    const bonusAmount = salaryNumber * bonusRate;
    const totalPayout = salaryNumber + bonusAmount;

    // 4. Use template strings to print each employee's formatted details
    console.log(
      `Employee: ${employee.name.padEnd(8)} | ` +
      `Salary: ₹${salaryNumber.toLocaleString("en-IN")} | ` +
      `Years: ${yearsNumber} | ` +
      `Bonus (${(bonusRate * 100)}%): ₹${bonusAmount.toLocaleString("en-IN")} | ` +
      `Total: ₹${totalPayout.toLocaleString("en-IN")}`
    );

  } catch (error) {
    // 5. Catch conversion or missing property errors
    console.log(`[HANDLED ERROR] ${error.message}`);
  }
}

console.log("-----------------------------------------------------------------------------------------");
