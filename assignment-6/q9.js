"use strict";

/**
 * ASSIGNMENT 6 - Q9: Debugging the Event Loop
 *
 * Task:
 * Predict and explain the exact execution order of the following snippet:
 *
 * console.log("Script start");
 * setTimeout(() => console.log("Timeout callback"), 0);
 * Promise.resolve().then(() => console.log("Promise callback"));
 * console.log("Script end");
 *
 * =========================================================================
 * PREDICTED OUTPUT ORDER (Written prior to execution):
 * =========================================================================
 * 1. "Script start"     -> Synchronous code executed immediately on the Call Stack.
 * 2. "Script end"       -> Synchronous code executed immediately on the Call Stack.
 * 3. "Promise callback" -> Microtask queue is drained immediately when Call Stack is empty.
 * 4. "Timeout callback" -> Macrotask queue is processed on the subsequent event loop tick.
 * =========================================================================
 */

console.log("=== Event Loop Execution Order Demonstration ===");

// 1. Synchronous log
console.log("Script start");

// 2. Macrotask (Timer phase)
setTimeout(() => {
  console.log("Timeout callback");
}, 0);

// 3. Microtask (Promise resolution job)
Promise.resolve().then(() => {
  console.log("Promise callback");
});

// 4. Synchronous log
console.log("Script end");

/**
 * =========================================================================
 * DETAILED EXPLANATION: Microtasks vs. Macrotasks in the Event Loop
 * =========================================================================
 *
 * Step 1: Call Stack (Synchronous Phase)
 * - `console.log("Script start")` is pushed onto the Call Stack, logs "Script start", and pops off.
 * - `setTimeout(..., 0)` is called. The host environment (browser / Node.js) registers the timer.
 *   Even with a 0ms delay, its callback is enqueued into the **Macrotask Queue** (Task Queue).
 * - `Promise.resolve().then(...)` creates an already-resolved Promise.
 *   Its `.then()` callback is enqueued into the **Microtask Queue** (Job Queue).
 * - `console.log("Script end")` is pushed onto the Call Stack, logs "Script end", and pops off.
 *
 * Step 2: Call Stack is Now Empty!
 * - At the end of every task or synchronous execution phase, the Event Loop checks
 *   the **Microtask Queue** first.
 * - The Event Loop MUST completely drain all tasks in the Microtask Queue before moving
 *   to any other queue.
 * - Therefore, the Promise callback is dequeued, pushed to the Call Stack, and logs
 *   "Promise callback".
 *
 * Step 3: Macrotask Queue Execution
 * - Once the Microtask Queue is completely empty (and rendering opportunities in browsers pass),
 *   the Event Loop picks the next available task from the **Macrotask Queue**.
 * - The `setTimeout` callback runs, logging "Timeout callback".
 *
 * Conclusion:
 * Promises (microtasks) execute before setTimeout (macrotasks) because the Event Loop specification
 * guarantees microtask priority and complete queue drainage after each task.
 */
