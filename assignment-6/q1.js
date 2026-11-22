"use strict";

/**
 * ASSIGNMENT 6 - Q1: The Startup Morning: Async Coffee Maker
 *
 * Automating coffee preparation through three asynchronous steps:
 * 1. Boiling water (1-2 seconds)
 * 2. Brewing coffee (1-2 seconds)
 * 3. Pouring into a cup (1-2 seconds)
 *
 * Demonstrates:
 * - Functions returning Promises
 * - Promise chaining with .then()
 * - Error handling with .catch()
 * - Simulating random failures with Math.random()
 */

// Helper function to generate a random delay between min and max milliseconds
function getRandomDelay(minMs, maxMs) {
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
}

// Step 1: Boiling water
function boilWater() {
  return new Promise((resolve, reject) => {
    const delay = getRandomDelay(1000, 2000);
    console.log("Step 1: Boiling water started... (waiting " + (delay / 1000).toFixed(1) + "s)");

    setTimeout(() => {
      // 15% chance of simulated failure
      const isFailed = Math.random() < 0.15;
      if (isFailed) {
        reject("Boiler overheated! Water could not be boiled.");
      } else {
        resolve("Water boiled successfully.");
      }
    }, delay);
  });
}

// Step 2: Brewing coffee
function brewCoffee() {
  return new Promise((resolve, reject) => {
    const delay = getRandomDelay(1000, 2000);
    console.log("Step 2: Brewing coffee started... (waiting " + (delay / 1000).toFixed(1) + "s)");

    setTimeout(() => {
      // 15% chance of simulated failure
      const isFailed = Math.random() < 0.15;
      if (isFailed) {
        reject("Coffee maker clogged! Beans could not be brewed.");
      } else {
        resolve("Coffee brewed successfully.");
      }
    }, delay);
  });
}

// Step 3: Pouring into cup
function pourIntoCup() {
  return new Promise((resolve, reject) => {
    const delay = getRandomDelay(1000, 2000);
    console.log("Step 3: Pouring coffee into cup... (waiting " + (delay / 1000).toFixed(1) + "s)");

    setTimeout(() => {
      // 15% chance of simulated failure
      const isFailed = Math.random() < 0.15;
      if (isFailed) {
        reject("Cup cracked while pouring hot coffee!");
      } else {
        resolve("Coffee poured into cup successfully.");
      }
    }, delay);
  });
}

// --- Execute Process with Promise Chaining ---
console.log("=== Starting Coffee Preparation Pipeline ===");

boilWater()
  .then((boilResult) => {
    console.log("Log:", boilResult);
    return brewCoffee(); // Returns next promise in the chain
  })
  .then((brewResult) => {
    console.log("Log:", brewResult);
    return pourIntoCup(); // Returns next promise in the chain
  })
  .then((pourResult) => {
    console.log("Log:", pourResult);
    console.log("Coffee ready for the team!");
  })
  .catch((error) => {
    // Centralized error handling: catches failure at any point in the chain
    console.error("Coffee preparation failed:", error);
  });
