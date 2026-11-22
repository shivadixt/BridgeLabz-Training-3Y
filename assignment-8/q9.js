"use strict";

/**
 * ASSIGNMENT 8 - Q9: Fitness App Analytics
 *
 * Requirements:
 * Given workout dataset:
 * [
 *   { user: "A", steps: 8000, calories: 300 },
 *   { user: "B", steps: 12000, calories: 500 },
 *   { user: "C", steps: 4000, calories: 200 }
 * ]
 *
 * FitnessAnalytics class methods:
 * - getActiveUsers(): Filters users with steps > 7000 using filter().
 * - getAverageCalories(): Calculates average calories using reduce().
 * - getUserSummary(): Formats messages using map().
 * - Throws an Error if dataset is empty.
 * - Executes all methods and verifies error handling.
 */

class FitnessAnalytics {
  constructor(workoutData = []) {
    this.data = workoutData;
  }

  // Helper method to guard against empty or invalid datasets
  #validateDataset() {
    if (!Array.isArray(this.data) || this.data.length === 0) {
      throw new Error("Dataset is empty! Cannot perform analytics on empty data.");
    }
  }

  // 1. Get active users with steps > threshold (default 7000) using filter()
  getActiveUsers(threshold = 7000) {
    this.#validateDataset();
    return this.data.filter((entry) => entry.steps > threshold);
  }

  // 2. Compute average calories burned across all users using reduce()
  getAverageCalories() {
    this.#validateDataset();

    const totalCalories = this.data.reduce((sum, entry) => {
      return sum + entry.calories;
    }, 0);

    const average = totalCalories / this.data.length;
    return Number(average.toFixed(2));
  }

  // 3. Format user summary messages using map()
  getUserSummary() {
    this.#validateDataset();

    return this.data.map((entry) => {
      return `User "${entry.user}": Logged ${entry.steps.toLocaleString()} steps and burned ${entry.calories} kcal.`;
    });
  }
}

// =========================================================================
// Demonstrations
// =========================================================================
console.log("=== Q9: Fitness App Analytics Demo ===\n");

const sampleWorkoutData = [
  { user: "A", steps: 8000, calories: 300 },
  { user: "B", steps: 12000, calories: 500 },
  { user: "C", steps: 4000, calories: 200 }
];

const analytics = new FitnessAnalytics(sampleWorkoutData);

// 1. Active Users (steps > 7000)
console.log("--- 1. Active Users (Steps > 7000) [filter()] ---");
const activeUsers = analytics.getActiveUsers();
console.table(activeUsers);

// 2. Average Calories Burned
console.log("\n--- 2. Average Calories Burned [reduce()] ---");
const avgCal = analytics.getAverageCalories();
console.log(`Average Calories Burned: ${avgCal} kcal`);

// 3. User Summaries
console.log("\n--- 3. User Summaries [map()] ---");
const summaries = analytics.getUserSummary();
summaries.forEach((msg) => console.log(msg));

// 4. Error Handling for Empty Dataset
console.log("\n--- 4. Error Handling: Empty Dataset ---");
try {
  const emptyAnalytics = new FitnessAnalytics([]);
  emptyAnalytics.getActiveUsers();
} catch (error) {
  console.error("Caught Expected Error:", error.message);
}
