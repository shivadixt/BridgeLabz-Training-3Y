"use strict";

/**
 * Question 9: ES6 Class Inheritance (Person -> Student) vs Prototypal Inheritance
 * 
 * Logic Explanation:
 * ES6 introduced the 'class', 'extends', and 'super()' keywords as modern syntactic
 * sugar over JavaScript's existing prototype-based inheritance model.
 * 
 * Key Connections:
 * - 'class Student extends Person' replaces 'Student.prototype = Object.create(Person.prototype)'.
 * - 'super(name)' inside constructor replaces 'Person.call(this, name)'.
 * - Methods declared inside class body are automatically placed on the class's .prototype.
 * 
 * Objective:
 * 1. Implement Person and Student classes using ES6 class syntax.
 * 2. Demonstrate that ES6 class instances behave identically to prototype-based instances.
 * 3. Inspect underlying prototype properties to prove they use the same prototype chain under the hood.
 */

// 1. ES6 Parent Class
class Person {
  constructor(name) {
    this.name = name;
  }

  printName() {
    console.log(`Person Name: ${this.name}`);
  }
}

// 2. ES6 Child Class with extends and super()
class Student extends Person {
  constructor(name, branch) {
    // Invoke parent constructor
    super(name);
    this.branch = branch;
  }

  printBranch() {
    console.log(`Branch / Specialization: ${this.branch}`);
  }

  printStudentDetails() {
    console.log(`Student Record -> Name: ${this.name} | Branch: ${this.branch}`);
  }
}

console.log("=== Question 9: ES6 Class Inheritance (Person -> Student) ===\n");

// Instantiate using ES6 class
const studentClass = new Student("Shiva Dixit", "Computer Science & Engineering");

console.log("--- Executing Methods on ES6 Student Instance ---");
studentClass.printName();            // Inherited from Person
studentClass.printBranch();          // Defined on Student
studentClass.printStudentDetails();   // Combined method

console.log("\n--- Prototype Chain Equivalence Demonstration ---");
console.log("1. instanceof Checks:");
console.log("   studentClass instanceof Student :", studentClass instanceof Student);
console.log("   studentClass instanceof Person  :", studentClass instanceof Person);
console.log("   studentClass instanceof Object  :", studentClass instanceof Object);

console.log("\n2. Underlying Prototype Chain Verification:");
console.log("   Object.getPrototypeOf(studentClass) === Student.prototype       :", Object.getPrototypeOf(studentClass) === Student.prototype);
console.log("   Object.getPrototypeOf(Student.prototype) === Person.prototype:", Object.getPrototypeOf(Student.prototype) === Person.prototype);
console.log("   Object.getPrototypeOf(Person.prototype) === Object.prototype :", Object.getPrototypeOf(Person.prototype) === Object.prototype);

console.log("\n3. Method Placement on Prototype:");
console.log("   printName is on Person.prototype   :", "printName" in Person.prototype);
console.log("   printBranch is on Student.prototype:", "printBranch" in Student.prototype);

console.log("\nConclusion:");
console.log("Both the ES6 'class ... extends' syntax and the ES5 constructor function / prototype");
console.log("approach create the exact same prototype chain in the JavaScript engine memory.");
console.log("ES6 classes simply provide cleaner, more readable syntax without changing the underlying prototypal nature.");
