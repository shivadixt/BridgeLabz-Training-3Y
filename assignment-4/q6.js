"use strict";

/**
 * Question 6: Employee Management System (Classes + Object Methods)
 * 
 * Logic Explanation:
 * Defines an Employee class:
 * - Properties: id, name, department, salary (monthly).
 * - Methods:
 *     1. getAnnualSalary(): Returns salary * 12.
 *     2. applyBonus(percent): Adds percentage bonus to monthly salary.
 *     3. getDetails(): Formatted summary string.
 * 
 * Features:
 * - Instantiates 5 employee objects.
 * - Applies a bonus to selected employees.
 * - Displays individual annual salaries.
 * - Uses Array.prototype.reduce() to compute the organization's total annual payout.
 */

class Employee {
  constructor(id, name, department, salary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary;
  }

  // Method to calculate annual salary (12 months)
  getAnnualSalary() {
    return this.salary * 12;
  }

  // Method to apply a percentage bonus to monthly salary
  applyBonus(percent) {
    if (percent > 0) {
      const bonusAmount = (this.salary * percent) / 100;
      this.salary += bonusAmount;
      console.log(`Awarded ${percent}% bonus to ${this.name}. New monthly salary: ₹${this.salary.toLocaleString("en-IN")}`);
    }
  }

  // Helper method for formatted display
  getDetails() {
    return `ID: #${this.id} | Name: ${this.name.padEnd(8)} | Dept: ${this.department.padEnd(14)} | Monthly: ₹${this.salary.toLocaleString("en-IN").padEnd(8)} | Annual: ₹${this.getAnnualSalary().toLocaleString("en-IN")}`;
  }
}

// Create 5 employee objects
const employees = [
  new Employee(1, "Amit", "Engineering", 65000),
  new Employee(2, "Sara", "UI/UX Design", 52000),
  new Employee(3, "Kiran", "Quality Assurance", 48000),
  new Employee(4, "Neha", "Human Resources", 45000),
  new Employee(5, "Rohan", "Finance", 58000)
];

console.log("=== Employee Management System ===");
console.log("\n--- Initial Employee Records ---");
employees.forEach((emp) => console.log(emp.getDetails()));

// Apply bonus
console.log("\n--- Applying Performance Bonuses ---");
employees[0].applyBonus(10); // 10% bonus for Amit
employees[2].applyBonus(5);  // 5% bonus for Kiran

console.log("\n--- Updated Annual Salary for Each Employee ---");
employees.forEach((emp) => {
  console.log(` • ${emp.name.padEnd(8)} (${emp.department}): Annual Salary = ₹${emp.getAnnualSalary().toLocaleString("en-IN")}`);
});

// Calculate total annual payout of the company using reduce()
const totalAnnualPayout = employees.reduce((accumulator, employee) => {
  return accumulator + employee.getAnnualSalary();
}, 0);

console.log("\n=======================================================");
console.log(`Total Annual Company Payout: ₹${totalAnnualPayout.toLocaleString("en-IN")}`);
console.log("=======================================================");
