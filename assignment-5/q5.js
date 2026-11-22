"use strict";

/**
 * Question 5: Prototype-based Inheritance (Person -> Student)
 * 
 * Logic Explanation:
 * Prototypal inheritance allows one constructor function to inherit properties and methods
 * from another constructor function.
 * 
 * Steps for Constructor Inheritance:
 * 1. Constructor Stealing (Call Super Constructor):
 *    Inside the child constructor Student, invoke Person.call(this, name) to initialize parent properties.
 * 2. Prototype Linking:
 *    Set Student.prototype = Object.create(Person.prototype) to link the prototype chain.
 * 3. Constructor Reset:
 *    Reset Student.prototype.constructor = Student so constructor references point correctly.
 * 4. Add Child Prototype Methods:
 *    Add printBranch() to Student.prototype.
 */

// 1. Parent Constructor
function Person(name) {
  this.name = name;
}

// Parent Prototype Method
Person.prototype.printName = function() {
  console.log(`Person Name: ${this.name}`);
};

// 2. Child Constructor inheriting from Person
function Student(name, branch) {
  // Call the super constructor with 'this' context
  Person.call(this, name);
  this.branch = branch;
}

// 3. Link Student's prototype to Person's prototype
Student.prototype = Object.create(Person.prototype);

// 4. Restore the constructor property
Student.prototype.constructor = Student;

// Child Prototype Method
Student.prototype.printBranch = function() {
  console.log(`Branch / Specialization: ${this.branch}`);
};

// Composite method demonstrating access to both parent and child properties
Student.prototype.printStudentDetails = function() {
  console.log(`Student Record -> Name: ${this.name} | Branch: ${this.branch}`);
};

console.log("=== Question 5: Prototype Chain (Person -> Student) ===\n");

// Instantiate a Student object
const student1 = new Student("Shiva Dixit", "Computer Science & Engineering");

console.log("--- Calling Inherited & Own Methods ---");
// Method inherited from Person.prototype
student1.printName();

// Method defined on Student.prototype
student1.printBranch();

// Combined details method
student1.printStudentDetails();

console.log("\n--- Prototype Chain Verification ---");
console.log("student1 instanceof Student :", student1 instanceof Student);
console.log("student1 instanceof Person  :", student1 instanceof Person);
console.log("student1 instanceof Object  :", student1 instanceof Object);

console.log("\nPrototype Links:");
console.log("Object.getPrototypeOf(student1) === Student.prototype       :", Object.getPrototypeOf(student1) === Student.prototype);
console.log("Object.getPrototypeOf(Student.prototype) === Person.prototype:", Object.getPrototypeOf(Student.prototype) === Person.prototype);
console.log("Object.getPrototypeOf(Person.prototype) === Object.prototype :", Object.getPrototypeOf(Person.prototype) === Object.prototype);

console.log("\nLookup Flow for student1.printName():");
console.log("student1 (not found) -> Student.prototype (not found) -> Person.prototype (found & executed!)");
