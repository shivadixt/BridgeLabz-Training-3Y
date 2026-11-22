"use strict";

/**
 * ASSIGNMENT 6 - Q8: Order Processing Flow: Async Retry Mechanism
 *
 * Demonstrates:
 * - submitOrder() returning a Promise that fails 50% of the time
 * - processOrder() implementing an async retry loop (up to 3 attempts) with await
 * - Logging "Attempt X: Success" or "Attempt X: Failed"
 * - Throwing "Order could not be processed" if all attempts fail
 * - Graceful top-level try/catch error handling
 */

// Simulates order submission with a 50% failure rate
function submitOrder(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 50% failure simulation
      const isSuccess = Math.random() >= 0.5;
      if (isSuccess) {
        resolve(`Order #${orderId} verified and payment received.`);
      } else {
        reject(`Payment gateway timeout for Order #${orderId}`);
      }
    }, 600);
  });
}

/**
 * Retries order submission up to 3 times before throwing a final error.
 */
async function processOrder(orderId) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Sending request for Order #${orderId} (Attempt ${attempt}/${maxAttempts})...`);
      const result = await submitOrder(orderId);

      // On success: log and return result immediately
      console.log(`Attempt ${attempt}: Success - ${result}`);
      return result;
    } catch (error) {
      // On failure: log attempt failure
      console.log(`Attempt ${attempt}: Failed (${error})`);

      // If all 3 attempts failed, throw the required final error
      if (attempt === maxAttempts) {
        throw new Error("Order could not be processed");
      }

      // Small pause before retrying
      console.log(`Retrying in 400ms...`);
      await new Promise((r) => setTimeout(r, 400));
    }
  }
}

// --- Main Execution Flow with Graceful Error Handling ---
async function main() {
  console.log("=== Order Processing & Retry Demo ===");
  try {
    const confirmation = await processOrder(8052);
    console.log("\n[SUCCESS] Final Status: Order completed successfully!");
  } catch (finalError) {
    console.error("\n[FAILURE] Final Status:", finalError.message);
  }
}

main();
