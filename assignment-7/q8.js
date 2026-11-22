"use strict";

/**
 * ASSIGNMENT 7 - Q8: Custom Dropdown Using Only JavaScript (No <select> Tag)
 *
 * Requirements:
 * - Build a custom dropdown menu without using any <select> tag.
 * - A button toggles (shows/hides) the options menu.
 * - Clicking an option updates the button text with the selected option.
 * - Clicking outside the dropdown automatically closes it.
 * - MUST use the Event Capturing phase (addEventListener(..., true)) for the outside-click closing mechanism.
 *
 * Supports both:
 * - Browser: Interactive custom dropdown with capturing phase outside-click detection.
 * - Node.js / Console: Simulated state transitions and capturing phase explanation.
 */

// Available Dropdown Options
const dropdownOptions = [
  { id: "js", label: "JavaScript (ES6+)" },
  { id: "ts", label: "TypeScript" },
  { id: "py", label: "Python 3" },
  { id: "rs", label: "Rust" },
  { id: "go", label: "Go (Golang)" }
];

// =========================================================================
// Browser DOM Implementation
// =========================================================================
if (typeof document !== "undefined") {
  const app = document.createElement("div");
  app.id = "dropdown-app";
  app.innerHTML = `
    <style>
      #dropdown-app { font-family: Arial, sans-serif; max-width: 320px; margin: 40px auto; }
      .dropdown-container { position: relative; width: 100%; user-select: none; }
      .dropdown-btn {
        width: 100%;
        padding: 12px 16px;
        background-color: #ffffff;
        border: 2px solid #2563eb;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 600;
        color: #1e3a8a;
        text-align: left;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .dropdown-btn:hover { background-color: #eff6ff; }
      .dropdown-menu {
        position: absolute;
        top: 105%;
        left: 0;
        right: 0;
        background-color: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        list-style: none;
        padding: 6px 0;
        margin: 0;
        display: none;
        z-index: 50;
      }
      .dropdown-menu.open { display: block; }
      .dropdown-item {
        padding: 10px 16px;
        font-size: 14px;
        color: #334155;
        cursor: pointer;
        transition: background-color 0.15s;
      }
      .dropdown-item:hover { background-color: #dbeafe; color: #1d4ed8; }
      .dropdown-item.selected { font-weight: bold; background-color: #eff6ff; }
      .log-box { margin-top: 25px; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; font-size: 12px; font-family: monospace; }
    </style>

    <h2>Custom JavaScript Dropdown</h2>
    <div class="dropdown-container" id="customDropdown">
      <button class="dropdown-btn" id="dropdownToggleBtn">
        <span id="selectedLabel">Select Technology</span>
        <span>▼</span>
      </button>
      <ul class="dropdown-menu" id="dropdownMenu"></ul>
    </div>
    <div class="log-box" id="phaseLog">Event Logs: Ready</div>
  `;
  document.body.appendChild(app);

  const dropdownContainer = document.getElementById("customDropdown");
  const toggleBtn = document.getElementById("dropdownToggleBtn");
  const selectedLabel = document.getElementById("selectedLabel");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const phaseLog = document.getElementById("phaseLog");

  let isOpen = false;

  // Populate options dynamically without <select>
  dropdownOptions.forEach((opt) => {
    const li = document.createElement("li");
    li.className = "dropdown-item";
    li.dataset.value = opt.id;
    li.textContent = opt.label;
    dropdownMenu.appendChild(li);
  });

  function openDropdown() {
    isOpen = true;
    dropdownMenu.classList.add("open");
  }

  function closeDropdown() {
    isOpen = false;
    dropdownMenu.classList.remove("open");
  }

  // Toggle button click handler
  toggleBtn.addEventListener("click", () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  // Option selection
  dropdownMenu.addEventListener("click", (event) => {
    const item = event.target.closest(".dropdown-item");
    if (!item) return;

    // Update label
    selectedLabel.textContent = item.textContent;

    // Highlight selected item
    dropdownMenu.querySelectorAll(".dropdown-item").forEach((el) => el.classList.remove("selected"));
    item.classList.add("selected");

    phaseLog.textContent = `Event Log: Option selected -> "${item.textContent}"`;
    closeDropdown();
  });

  // =========================================================================
  // CAPTURING PHASE Outside-Click Listener
  // The 3rd parameter `true` registers the listener in the Capturing Phase!
  // =========================================================================
  document.addEventListener(
    "click",
    (event) => {
      // In the capturing phase, the event descends from window -> document -> body
      if (isOpen && !dropdownContainer.contains(event.target)) {
        closeDropdown();
        phaseLog.textContent = "Event Log: [Capturing Phase] Clicked outside dropdown -> Closed.";
        console.log("[Capturing Phase]: Outside click intercepted at document root before target reached.");
      }
    },
    true // <-- CAPTURING PHASE FLAG
  );
}

// =========================================================================
// Node.js Console Demonstration
// =========================================================================
console.log("=== Q8: Custom Dropdown & Event Capturing Simulation ===");

class MockDropdown {
  constructor() {
    this.isOpen = false;
    this.selectedOption = null;
  }
  toggle() {
    this.isOpen = !this.isOpen;
    console.log(`[Button Click]: Dropdown is now ${this.isOpen ? "OPEN" : "CLOSED"}`);
  }
  select(value) {
    this.selectedOption = value;
    this.isOpen = false;
    console.log(`[Option Click]: Selected "${value}". Dropdown is now CLOSED.`);
  }
  handleOutsideClick(isInside) {
    if (!isInside && this.isOpen) {
      this.isOpen = false;
      console.log(`[Capturing Phase Listener]: Click outside detected on document -> Dropdown automatically CLOSED.`);
    }
  }
}

const mock = new MockDropdown();
mock.toggle(); // opens
mock.select("TypeScript"); // selects and closes
mock.toggle(); // opens again
mock.handleOutsideClick(false); // outside click closes in capturing phase
console.log("Final State:", { isOpen: mock.isOpen, selectedOption: mock.selectedOption });
