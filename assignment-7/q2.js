"use strict";

/**
 * ASSIGNMENT 7 - Q2: Live Character Counter with Warning Behavior
 *
 * Requirements:
 * - Textarea with maximum character limit of 100.
 * - Shows remaining characters dynamically.
 * - Counter turns yellow when 20 characters or fewer remain.
 * - Counter turns red when 0 characters remain.
 * - Prevents further typing at limit using preventDefault() on keydown.
 * - "Reset" button clears the text and resets the counter.
 *
 * Supports both:
 * - Browser: Interactive DOM textarea, event listeners, dynamic style updates, and preventDefault().
 * - Node.js / Console: Logic validator and test suite simulating typing, warning triggers, and limit blocking.
 */

const MAX_CHARACTERS = 100;
const WARNING_THRESHOLD = 20;

// =========================================================================
// Character Counter Logic Helper
// =========================================================================
function getCounterState(currentLength) {
  const remaining = MAX_CHARACTERS - currentLength;

  let colorState = "normal"; // default
  let message = `${remaining} characters remaining`;

  if (remaining <= 0) {
    colorState = "red";
    message = "0 characters left (Limit reached)";
  } else if (remaining <= WARNING_THRESHOLD) {
    colorState = "yellow";
    message = `${remaining} characters left (Warning: near limit)`;
  }

  return {
    remaining: Math.max(0, remaining),
    colorState: colorState,
    message: message,
    isBlocked: remaining <= 0
  };
}

// =========================================================================
// Browser DOM Implementation
// =========================================================================
if (typeof document !== "undefined") {
  const container = document.createElement("div");
  container.id = "counter-app";
  container.innerHTML = `
    <style>
      #counter-app { font-family: Arial, sans-serif; max-width: 420px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
      #counter-app h3 { margin-top: 0; }
      textarea#messageInput { width: 100%; height: 110px; box-sizing: border-box; padding: 10px; font-size: 14px; border: 1px solid #aaa; border-radius: 4px; resize: none; outline: none; }
      .counter-info { margin-top: 8px; font-weight: bold; font-size: 14px; transition: color 0.2s ease; }
      .counter-info.normal { color: #374151; }
      .counter-info.yellow { color: #d97706; }
      .counter-info.red { color: #dc2626; }
      button#resetBtn { margin-top: 12px; padding: 8px 16px; background-color: #4b5563; color: white; border: none; border-radius: 4px; cursor: pointer; }
      button#resetBtn:hover { background-color: #374151; }
    </style>
    <h3>Live Character Counter</h3>
    <textarea id="messageInput" placeholder="Type your message here (Max 100 chars)..."></textarea>
    <div id="charCounter" class="counter-info normal">100 characters remaining</div>
    <button id="resetBtn">Reset</button>
  `;
  document.body.appendChild(container);

  const textarea = document.getElementById("messageInput");
  const counterDisplay = document.getElementById("charCounter");
  const resetBtn = document.getElementById("resetBtn");

  // Allowed control keys that should not be blocked even at 0 characters remaining
  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"];

  // Update UI appearance based on current text length
  function updateCounterUI() {
    const textLength = textarea.value.length;
    const state = getCounterState(textLength);

    counterDisplay.textContent = state.message;
    counterDisplay.className = `counter-info ${state.colorState}`;
  }

  // Prevent typing additional characters when at limit
  textarea.addEventListener("keydown", (event) => {
    const currentLength = textarea.value.length;

    // Check if limit is reached and key is not a navigational or deletion key
    if (currentLength >= MAX_CHARACTERS && !allowedKeys.includes(event.key) && !event.ctrlKey && !event.metaKey) {
      event.preventDefault(); // Block input typing
      updateCounterUI();
    }
  });

  // Handle live input updates and paste truncation
  textarea.addEventListener("input", () => {
    if (textarea.value.length > MAX_CHARACTERS) {
      textarea.value = textarea.value.substring(0, MAX_CHARACTERS);
    }
    updateCounterUI();
  });

  // Reset button clears textarea and resets counter
  resetBtn.addEventListener("click", () => {
    textarea.value = "";
    updateCounterUI();
    textarea.focus();
  });

  // Initial render
  updateCounterUI();
}

// =========================================================================
// Node.js Console Demonstration
// =========================================================================
console.log("=== Q2: Live Character Counter Test Simulation ===");

const testLengths = [30, 80, 85, 95, 100, 105];

testLengths.forEach((length) => {
  const simulatedLength = Math.min(length, MAX_CHARACTERS);
  const state = getCounterState(simulatedLength);
  console.log(`[Input Length: ${length}] -> State Color: ${state.colorState.toUpperCase()} | Message: "${state.message}" | Blocked: ${state.isBlocked}`);
});

console.log("\nReset Action Simulation:");
const resetState = getCounterState(0);
console.log(`[After Reset] -> State Color: ${resetState.colorState.toUpperCase()} | Message: "${resetState.message}" | Remaining: ${resetState.remaining}`);
