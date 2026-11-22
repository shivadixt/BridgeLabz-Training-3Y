"use strict";

/**
 * Question 6: Multi-level Prototypal Inheritance Chain
 * 
 * Hierarchy:
 * Person (Level 1)
 *   ↑
 * Faculty (Level 2, inherits from Person)
 *   ↑
 * Professor (Level 3, inherits from Faculty and Person)
 * 
 * Requirements:
 * 1. Person:
 *    - Property: name
 *    - Method: introduce() -> logs general greeting with name
 * 2. Faculty:
 *    - Property: department
 *    - Method: showFacultyDetails() -> logs department info
 * 3. Professor:
 *    - Property: researchArea
 *    - Method: showResearch() -> logs research specialization
 * 4. Demonstration:
 *    - Instantiate Professor and call all 3 methods up the prototype chain.
 */

// Level 1: Person Constructor
function Person(name) {
  this.name = name;
}

Person.prototype.introduce = function() {
  console.log(`[Person Method] Hello, I am ${this.name}.`);
};

// Level 2: Faculty Constructor (inherits from Person)
function Faculty(name, department) {
  // Call super constructor
  Person.call(this, name);
  this.department = department;
}

// Inherit Person's prototype
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.showFacultyDetails = function() {
  console.log(`[Faculty Method] Department: ${this.department}`);
};

// Level 3: Professor Constructor (inherits from Faculty)
function Professor(name, department, researchArea) {
  // Call super constructor
  Faculty.call(this, name, department);
  this.researchArea = researchArea;
}

// Inherit Faculty's prototype
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.showResearch = function() {
  console.log(`[Professor Method] Research Area: ${this.researchArea}`);
};

// Comprehensive method summarizing all tiers
Professor.prototype.getFullProfile = function() {
  console.log(`\nProfessor Profile Summary:`);
  console.log(` - Name       : ${this.name}`);
  console.log(` - Department : ${this.department}`);
  console.log(` - Research   : ${this.researchArea}`);
};

console.log("=== Question 6: Multi-Level Prototype Chain ===\n");

// Instantiate a Professor object
const prof = new Professor(
  "Dr. APJ Abdul Kalam",
  "Aerospace Engineering",
  "Rocket Propulsion & Missile Avionics"
);

console.log("--- Accessing Methods Up the Prototype Chain ---");

// 1. Method from Level 1 (Person)
prof.introduce();

// 2. Method from Level 2 (Faculty)
prof.showFacultyDetails();

// 3. Method from Level 3 (Professor)
prof.showResearch();

// 4. Combined profile
prof.getFullProfile();

console.log("\n--- Prototype Chain Validation ---");
console.log("prof instanceof Professor :", prof instanceof Professor);
console.log("prof instanceof Faculty   :", prof instanceof Faculty);
console.log("prof instanceof Person    :", prof instanceof Person);
console.log("prof instanceof Object    :", prof instanceof Object);

console.log("\nPrototype Hierarchy Diagram:");
console.log("prof");
console.log(" └── Professor.prototype (has showResearch)");
console.log("      └── Faculty.prototype (has showFacultyDetails)");
console.log("           └── Person.prototype (has introduce)");
console.log("                └── Object.prototype (has toString, hasOwnProperty, etc.)");
console.log("                     └── null");
