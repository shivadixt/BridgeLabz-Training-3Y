"use strict";

/**
 * ASSIGNMENT 8 - Q4: Employee Inheritance & Runtime Polymorphism
 *
 * Requirements:
 * - Create class Employee with properties: name, department and method work().
 * - Create class Manager that inherits from Employee and overrides work().
 * - Create objects and demonstrate runtime polymorphism.
 */

// Base Class: Employee
class Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }

  // Base implementation of work()
  work() {
    return `${this.name} is working on daily deliverables in the ${this.department} department.`;
  }
}

// Derived Class: Manager
class Manager extends Employee {
  constructor(name, department, teamSize = 5) {
    super(name, department); // Call parent constructor
    this.teamSize = teamSize;
  }

  // Overridden method: specialized behavior for Manager
  work() {
    return `${this.name} is directing projects and managing a team of ${this.teamSize} people in ${this.department}.`;
  }
}

// =========================================================================
// Demonstrating Runtime Polymorphism
// =========================================================================
console.log("=== Q4: Employee Inheritance & Runtime Polymorphism Demo ===");

// Heterogeneous array of Employee and Manager objects
const workforce = [
  new Employee("Kavita Rao", "Software Development"),
  new Manager("Rajesh Mehra", "Engineering", 12),
  new Employee("Deepak Gupta", "Quality Assurance"),
  new Manager("Sunita Sharma", "Product Management", 8)
];

console.log("Executing workforce.work() via polymorphic dispatch:\n");

// Runtime Polymorphism in action:
// The same function call `person.work()` behaves differently depending on the
// actual runtime class of the object (Employee vs Manager).
workforce.forEach((member, index) => {
  console.log(`[Member #${index + 1}] Class: ${member.constructor.name}`);
  console.log(`Action: ${member.work()}`);
  console.log("-------------------------------------------------------------------");
});

/**
 * =========================================================================
 * RUNTIME POLYMORPHISM EXPLANATION:
 * =========================================================================
 *
 * - Polymorphism ("many forms") allows objects of different classes to be
 *   treated through a common interface.
 * - Here, both Employee and Manager share the `work()` method signature.
 * - When iterating through `workforce`, the JavaScript runtime inspects
 *   the prototype chain of each instance at runtime and invokes the most
 *   specific implementation of `work()`.
 */
