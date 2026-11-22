"use strict";

/**
 * ASSIGNMENT 6 - Q7: The Lazy Loader: Promise Combinator Practice
 *
 * Demonstrates:
 * - Using Promise.allSettled() to handle multiple asynchronous module loaders
 * - Allowing independent modules to resolve/reject without short-circuiting the rest
 * - Randomly rejecting one Promise to simulate real-world service disruption
 * - Calculating total execution duration using Date.now()
 */

// Module 1: Profile Loader (resolves after 2000ms)
function loadProfile() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 20% random rejection
      if (Math.random() < 0.2) {
        reject("Profile service timed out");
      } else {
        resolve("Profile Loaded");
      }
    }, 2000);
  });
}

// Module 2: Posts Loader (resolves after 1500ms, with random simulated rejection)
function loadPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 50% random rejection to demonstrate settled failures
      const fails = Math.random() < 0.5;
      if (fails) {
        reject("Posts database connection lost");
      } else {
        resolve("Posts Loaded");
      }
    }, 1500);
  });
}

// Module 3: Messages Loader (resolves after 1000ms)
function loadMessages() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 20% random rejection
      if (Math.random() < 0.2) {
        reject("Messages inbox sync error");
      } else {
        resolve("Messages Loaded");
      }
    }, 1000);
  });
}

// --- Main Execution Flow ---
console.log("=== Dashboard Module Loader (Promise.allSettled) ===");
console.log("Initiating asynchronous loading for Profile, Posts, and Messages...");

const moduleNames = ["Profile Module", "Posts Module", "Messages Module"];
const startTime = Date.now();

Promise.allSettled([loadProfile(), loadPosts(), loadMessages()]).then((results) => {
  const endTime = Date.now();
  const totalTimeTaken = endTime - startTime;

  console.log("\n--- Module Load Report ---");
  results.forEach((result, index) => {
    const name = moduleNames[index];
    if (result.status === "fulfilled") {
      console.log(`[SUCCESS] ${name}: ${result.value}`);
    } else {
      console.log(`[FAILED]  ${name}: Reason -> ${result.reason}`);
    }
  });

  console.log("\n-------------------------------------------");
  console.log(`Total time taken: ${totalTimeTaken} ms (~${(totalTimeTaken / 1000).toFixed(2)} seconds)`);
  console.log("Observation: Even if a module fails, Promise.allSettled waits for all promises to finish without aborting!");
});
