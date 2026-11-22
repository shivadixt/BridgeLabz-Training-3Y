"use strict";

/**
 * ASSIGNMENT 6 - Q3: Bug Tracker: Callback to Promise Migration
 *
 * Demonstrates:
 * - Refactoring from callback pattern to Promise pattern
 * - Creating getBugs() returning a Promise
 * - Displaying tabular output using console.table()
 * - Simulating boolean-based random API failure and handling it via .catch()
 */

// --- Original Legacy Callback Implementation (For Reference) ---
/*
function fetchBugs(callback) {
  setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
}
*/

/**
 * Modernized Promise-based bug fetcher.
 * Returns a Promise that resolves with an array of bug objects
 * or rejects if simulated network failure occurs.
 */
function getBugs() {
  return new Promise((resolve, reject) => {
    console.log("Contacting bug tracking server...");

    setTimeout(() => {
      // Simulate random API failure using a boolean flag
      // ~75% chance of success, ~25% chance of failure
      const isApiSuccessful = Math.random() > 0.25;

      if (isApiSuccessful) {
        // Structured bug list for clean console.table output
        const bugReports = [
          { id: 101, title: "UI glitch on checkout button", severity: "Low", status: "Open" },
          { id: 102, title: "API timeout on report generation", severity: "High", status: "In Progress" },
          { id: 103, title: "Login failure on Safari mobile", severity: "Critical", status: "Under Review" }
        ];
        resolve(bugReports);
      } else {
        reject("Failed to retrieve bugs: Server returned HTTP 500 Internal Server Error.");
      }
    }, 1000);
  });
}

// --- Consumption of getBugs() ---
console.log("=== Bug Tracker Migration Demo ===");

getBugs()
  .then((bugs) => {
    console.log("Bugs retrieved successfully. Displaying bug dashboard:");
    // Neatly display bug data in a formatted table
    console.table(bugs);
  })
  .catch((error) => {
    // Handle simulated API failure gracefully
    console.error("Bug Tracker Error:", error);
  });
