"use strict";

/**
 * ASSIGNMENT 6 - Q10: The Final Delivery: Async Pipeline Debugger
 *
 * Simulates a multi-step asynchronous food delivery pipeline:
 * 1. takeOrder
 * 2. prepare
 * 3. pack
 * 4. dispatch
 * 5. deliver
 *
 * Each step:
 * - Returns a Promise with a random 1-2s delay
 * - Simulates random success/failure
 * - Managed sequentially by runPipeline() using async/await and try/catch
 * - Prints "Pipeline failed!" if any stage encounters an error
 */

// Helper to generate a random delay between min and max milliseconds
function getStepDelay(minMs = 1000, maxMs = 2000) {
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
}

// Step 1: takeOrder
function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% chance of failure
      if (Math.random() < 0.10) {
        reject("Restaurant is currently unable to accept new orders.");
      } else {
        resolve("Order taken");
      }
    }, getStepDelay());
  });
}

// Step 2: prepare
function prepare() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% chance of failure
      if (Math.random() < 0.10) {
        reject("Ingredients out of stock during cooking.");
      } else {
        resolve("Food prepared");
      }
    }, getStepDelay());
  });
}

// Step 3: pack
function pack() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% chance of failure
      if (Math.random() < 0.10) {
        reject("Packaging seal broken; repacking failed.");
      } else {
        resolve("Package ready");
      }
    }, getStepDelay());
  });
}

// Step 4: dispatch
function dispatch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% chance of failure
      if (Math.random() < 0.10) {
        reject("Delivery partner vehicle broke down.");
      } else {
        resolve("Out for delivery");
      }
    }, getStepDelay());
  });
}

// Step 5: deliver
function deliver() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 10% chance of failure
      if (Math.random() < 0.10) {
        reject("Customer address not found / unreachable.");
      } else {
        resolve("Delivery completed!");
      }
    }, getStepDelay());
  });
}

/**
 * Orchestrates the full food delivery pipeline using async/await
 */
async function runPipeline() {
  console.log("Start Pipeline");

  try {
    const step1 = await takeOrder();
    console.log("Step 1: " + step1);

    const step2 = await prepare();
    console.log("Step 2: " + step2);

    const step3 = await pack();
    console.log("Step 3: " + step3);

    const step4 = await dispatch();
    console.log("Step 4: " + step4);

    const step5 = await deliver();
    console.log(step5); // Outputs: "Delivery completed!"

  } catch (error) {
    // If any step rejects, execution jumps straight to this catch block
    console.error("Pipeline failed!");
    console.error("Failure Reason:", error);
  }
}

// Run the simulation
runPipeline();

/**
 * =========================================================================
 * ASYNC BEHAVIOR AND EVENT LOOP CONTROL FLOW EXPLANATION:
 * =========================================================================
 *
 * 1. Sequential Execution via `await`:
 *    `await` pauses the execution of `runPipeline()` without blocking the main
 *    thread. The function yields control back to the Event Loop, allowing other
 *    macrotasks/microtasks to proceed freely in the background.
 *
 * 2. Promise Settlement & Resumption:
 *    When `setTimeout` finishes in the background, its callback resolves or rejects
 *    the corresponding Promise. This settlement schedules a microtask to resume
 *    `runPipeline()` right after the `await` statement.
 *
 * 3. Error Propagation:
 *    If any step's Promise rejects, the `await` expression immediately throws that
 *    rejection reason as an exception. The synchronous `try...catch` construct
 *    catches it instantly, skipping all subsequent steps and printing "Pipeline failed!".
 *
 * 4. Single-Threaded Non-Blocking I/O:
 *    Even though the pipeline takes between 5 to 10 cumulative seconds to finish,
 *    the JavaScript engine remains responsive throughout, relying purely on the
 *    timer web API and the Event Loop queue system.
 */
