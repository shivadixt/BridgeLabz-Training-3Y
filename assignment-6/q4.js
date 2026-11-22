"use strict";

/**
 * ASSIGNMENT 6 - Q4: DevOps Delay: Async Timeout Race
 *
 * Demonstrates concurrent Promise management:
 * - Server A responds in 2000ms
 * - Server B responds in 3000ms
 * - Promise.race() determines the fastest responder
 * - Promise.all() coordinates full deployment across all servers
 * - Random failure handling using Math.random() and .catch()
 */

// Helper to simulate Server A deployment (2 seconds delay)
function deployServerA() {
  return new Promise((resolve, reject) => {
    console.log("[Server A] Deployment initialized...");
    setTimeout(() => {
      // 15% random failure probability
      if (Math.random() < 0.15) {
        reject("Server A failed: Out of disk space during build.");
      } else {
        resolve("Server A ready (us-east-1)");
      }
    }, 2000);
  });
}

// Helper to simulate Server B deployment (3 seconds delay)
function deployServerB() {
  return new Promise((resolve, reject) => {
    console.log("[Server B] Deployment initialized...");
    setTimeout(() => {
      // 15% random failure probability
      if (Math.random() < 0.15) {
        reject("Server B failed: Connection timeout during sync.");
      } else {
        resolve("Server B ready (eu-central-1)");
      }
    }, 3000);
  });
}

console.log("=== DevOps Deployment Tracker ===");

// 1. Determine Fastest Responder with Promise.race()
// Promise.race settles as soon as ANY promise settles (resolves or rejects)
const racePromiseA = deployServerA();
const racePromiseB = deployServerB();

console.log("\n--- Tracking Fastest Server Response (Promise.race) ---");
Promise.race([racePromiseA, racePromiseB])
  .then((winner) => {
    console.log("Fastest response:", winner);
  })
  .catch((error) => {
    console.error("Fastest response resulted in an error:", error);
  });

// 2. Wait for All Deployments to Complete with Promise.all()
// Promise.all waits until all promises resolve, or rejects immediately if any fails
console.log("\n--- Tracking Complete Deployment (Promise.all) ---");
Promise.all([racePromiseA, racePromiseB])
  .then((allResults) => {
    console.log("Deployment completed for all servers");
    console.log("Deployed Servers Status:", allResults);
  })
  .catch((error) => {
    console.error("Deployment incomplete due to server failure:", error);
  });
