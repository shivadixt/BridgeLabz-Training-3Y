"use strict";

/**
 * ASSIGNMENT 6 - Q5: Frontend Rush: Avoiding Callback Hell
 *
 * Demonstrates:
 * 1. Simulating 5 async stages (design -> build -> test -> deploy -> celebrate) using nested callbacks (Callback Hell / Pyramid of Doom)
 * 2. Refactoring the entire pipeline using Promises and async/await
 * 3. In-depth comments explaining the readability and maintenance benefits of async/await
 */

// =========================================================================
// PART 1: The Legacy Approach — Callback Hell (Pyramid of Doom)
// =========================================================================

function designStageCb(callback) {
  setTimeout(() => {
    console.log("[Callbacks] Stage 1: Design finalized");
    callback();
  }, 1000);
}

function buildStageCb(callback) {
  setTimeout(() => {
    console.log("[Callbacks] Stage 2: Code built and bundled");
    callback();
  }, 1000);
}

function testStageCb(callback) {
  setTimeout(() => {
    console.log("[Callbacks] Stage 3: Automated tests passed");
    callback();
  }, 1000);
}

function deployStageCb(callback) {
  setTimeout(() => {
    console.log("[Callbacks] Stage 4: Production deployment finished");
    callback();
  }, 1000);
}

function celebrateStageCb(callback) {
  setTimeout(() => {
    console.log("[Callbacks] Stage 5: Team celebration! 🎉");
    callback();
  }, 1000);
}

function runCallbackHell(onComplete) {
  console.log("--- Starting Pipeline with Nested Callbacks ---");

  // Deeply nested pyramid of doom:
  designStageCb(() => {
    buildStageCb(() => {
      testStageCb(() => {
        deployStageCb(() => {
          celebrateStageCb(() => {
            console.log("[Callbacks] Pipeline finished via nested callbacks.\n");
            onComplete();
          });
        });
      });
    });
  });
}

// =========================================================================
// PART 2: Modern Refactoring — Async / Await
// =========================================================================

// Generic helper function returning a Promise after a given delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function designStage() {
  await delay(1000);
  console.log("[Async/Await] Stage 1: Design finalized");
}

async function buildStage() {
  await delay(1000);
  console.log("[Async/Await] Stage 2: Code built and bundled");
}

async function testStage() {
  await delay(1000);
  console.log("[Async/Await] Stage 3: Automated tests passed");
}

async function deployStage() {
  await delay(1000);
  console.log("[Async/Await] Stage 4: Production deployment finished");
}

async function celebrateStage() {
  await delay(1000);
  console.log("[Async/Await] Stage 5: Team celebration! 🎉");
}

async function runModernPipeline() {
  console.log("--- Starting Pipeline with Clean Async/Await ---");
  try {
    // Each step reads sequentially like synchronous code
    await designStage();
    await buildStage();
    await testStage();
    await deployStage();
    await celebrateStage();
    console.log("[Async/Await] Pipeline finished successfully!");
  } catch (error) {
    console.error("Pipeline encountered an error:", error);
  }
}

// =========================================================================
// EXECUTION: Run callbacks first, then clean async/await
// =========================================================================
runCallbackHell(() => {
  runModernPipeline();
});

/**
 * =========================================================================
 * WHY ASYNC/AWAIT IMPROVES READABILITY AND CODE QUALITY:
 * =========================================================================
 *
 * 1. Flat, Linear Code Flow:
 *    Nested callbacks grow horizontally ("Pyramid of Doom"), making indentation
 *    deep and hard to follow. Async/await maintains a clean, vertical, top-to-bottom flow.
 *
 * 2. Unified Error Handling:
 *    With callbacks, every nested level needs its own error check (e.g. if (err) {...}).
 *    With async/await, standard try...catch blocks can wrap the entire workflow cleanly.
 *
 * 3. Easier Maintenance & Refactoring:
 *    Adding, removing, or reordering a pipeline step in async/await is as simple
 *    as moving one line of code (`await step()`), whereas in callback hell it
 *    requires reorganizing the entire nesting structure and matching closing braces.
 *
 * 4. Better Debugging:
 *    Stack traces in async/await point directly to the line of the failing step,
 *    unlike nested anonymous callbacks which obscure origin context.
 */
