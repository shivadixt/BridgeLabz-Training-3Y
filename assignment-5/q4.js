"use strict";

/**
 * Question 4: Constructor Functions & Prototype Method Sharing
 * 
 * Logic Explanation:
 * In JavaScript, constructor functions act as blueprints for creating objects.
 * Instead of attaching methods directly inside the constructor (which duplicates the
 * function in memory for every single instance), methods are added to the constructor's
 * .prototype property.
 * 
 * All instances created with 'new' share the exact same function reference via the prototype chain (__proto__).
 * 
 * Tasks:
 * 1. Constructor function Car(brand, model).
 * 2. Prototype method getDetails() printing brand and model.
 * 3. Create two car objects and invoke getDetails().
 * 4. Verify method reference equality (car1.getDetails === car2.getDetails).
 */

// 1. Constructor Function
function Car(brand, model) {
  this.brand = brand;
  this.model = model;
}

// 2. Add method to the prototype
Car.prototype.getDetails = function() {
  return `Car Details -> Brand: ${this.brand} | Model: ${this.model}`;
};

console.log("=== Question 4: Constructor Functions & Prototype Method Sharing ===\n");

// 3. Create two car objects
const car1 = new Car("Toyota", "Camry");
const car2 = new Car("Honda", "City");

// Invoke the method from both instances
console.log("Calling getDetails() on car1:");
console.log(car1.getDetails());

console.log("\nCalling getDetails() on car2:");
console.log(car2.getDetails());

// 4. Demonstrate and verify method sharing
console.log("\n--- Verification of Prototype Method Sharing ---");
const isMethodShared = car1.getDetails === car2.getDetails;
console.log(`car1.getDetails === car2.getDetails : ${isMethodShared}`);

console.log("\nPrototype Chain Inspection:");
console.log("car1.__proto__ === Car.prototype :", Object.getPrototypeOf(car1) === Car.prototype);
console.log("car2.__proto__ === Car.prototype :", Object.getPrototypeOf(car2) === Car.prototype);

console.log("\nMemory Advantage:");
console.log("Because getDetails is defined on Car.prototype, it exists only once in memory.");
console.log("Both car1 and car2 delegate method lookup to Car.prototype rather than storing redundant copies.");
