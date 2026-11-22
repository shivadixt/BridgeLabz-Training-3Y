"use strict";

/**
 * ASSIGNMENT 6 - Q2: Task Scheduler: Micro vs Macro Challenge
 *
 * Demonstrates the order of execution between:
 * 1. Synchronous code (Call Stack)
 * 2. Microtasks (Promise.then callbacks)
 * 3. Macrotasks (setTimeout callbacks)
 *
 * Expected Console Output Order:
 * 1. "Start" (Synchronous)
 * 2. "Mid-script checkpoint" (Synchronous)
 * 3. "End" (Synchronous)
 * 4. "Microtask: Promise.then() executed" (Microtask Queue)
 * 5. "Macrotask: setTimeout() executed" (Macrotask / Task Queue)
 */

console.log("Start");

// Macrotask: Scheduled via setTimeout
// Placed in the host environment / timer web API and pushed to the Macrotask Queue
setTimeout(() => {
  console.log("Macrotask: setTimeout() executed");
}, 0);

// Microtask: Scheduled via a resolved Promise
// Callback is immediately enqueued in the Microtask Queue (Promise job queue)
Promise.resolve().then(() => {
  console.log("Microtask: Promise.then() executed");
});

// Synchronous Log
console.log("Mid-script checkpoint");

// Synchronous Log
console.log("End");

/**
 * =========================================================================
 * EXPLANATION: Why Microtasks Run Before Macrotasks
 * =========================================================================
 *
 * 1. Call Stack First:
 *    The JavaScript engine executes all synchronous statements on the Call
 *    Stack line by line ("Start" -> "Mid-script checkpoint" -> "End").
 *
 * 2. Event Loop Tick & Microtask Queue Drainage:
 *    As soon as the synchronous script finishes and the Call Stack becomes
 *    empty, the Event Loop checks the Microtask Queue first.
 *    The engine MUST execute and drain all microtasks in the Microtask Queue
 *    before it yields control to rendering or picks any task from the Macrotask Queue.
 *
 * 3. Macrotask Queue (Task Queue):
 *    Only after all pending microtasks have been completely processed does the
 *    Event Loop inspect the Macrotask Queue and pick the oldest task
 *    (e.g., the setTimeout callback) to run.
 *
 * 4. Summary of Priority:
 *    Synchronous Code (Call Stack) > Microtasks (Promise.then, queueMicrotask) > Macrotasks (setTimeout, setInterval, I/O)
 */
