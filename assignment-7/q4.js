"use strict";

/**
 * ASSIGNMENT 7 - Q4: Theme Switcher Using Attribute Manipulation
 *
 * Requirements:
 * - 3 distinct themes: Light, Dark, Blue.
 * - Clicking a theme button applies a class to <body>.
 * - All themes MUST be applied using setAttribute().
 * - Save the current active theme in a custom HTML5 attribute: data-theme="...".
 *
 * Supports both:
 * - Browser: Live theme switcher buttons with dynamic setAttribute() calls and theme-aware CSS.
 * - Node.js / Console: Simulated DOM element attribute manipulation tests.
 */

// Supported Themes
const VALID_THEMES = ["light", "dark", "blue"];

/**
 * Applies a theme to a target element strictly using setAttribute().
 */
function applyTheme(element, themeName) {
  if (!VALID_THEMES.includes(themeName)) {
    throw new Error(`Invalid theme: "${themeName}". Expected one of: ${VALID_THEMES.join(", ")}`);
  }

  // 1. Add theme class to element using setAttribute()
  element.setAttribute("class", `theme-${themeName}`);

  // 2. Save current theme in custom attribute data-theme
  element.setAttribute("data-theme", themeName);

  return {
    className: element.getAttribute("class"),
    dataTheme: element.getAttribute("data-theme")
  };
}

// =========================================================================
// Browser DOM Implementation
// =========================================================================
if (typeof document !== "undefined") {
  const switcherContainer = document.createElement("div");
  switcherContainer.id = "theme-switcher-app";
  switcherContainer.innerHTML = `
    <style>
      /* Base Theme Styles */
      body {
        transition: background-color 0.3s ease, color 0.3s ease;
        margin: 0;
        padding: 20px;
        font-family: Arial, sans-serif;
      }

      /* Light Theme */
      body.theme-light, body[data-theme="light"] {
        background-color: #f9fafb;
        color: #111827;
      }

      /* Dark Theme */
      body.theme-dark, body[data-theme="dark"] {
        background-color: #111827;
        color: #f9fafb;
      }

      /* Blue Theme */
      body.theme-blue, body[data-theme="blue"] {
        background-color: #1e3a8a;
        color: #ffffff;
      }

      #theme-switcher-app {
        max-width: 450px;
        margin: 30px auto;
        padding: 20px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(128, 128, 128, 0.3);
        border-radius: 8px;
        text-align: center;
      }

      .theme-btn-group {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 15px;
      }

      .theme-btn {
        padding: 10px 18px;
        font-size: 14px;
        font-weight: bold;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: transform 0.1s ease;
      }
      .theme-btn:active { transform: scale(0.96); }
      .btn-light { background: #e5e7eb; color: #1f2937; }
      .btn-dark { background: #374151; color: #f9fafb; }
      .btn-blue { background: #3b82f6; color: #ffffff; }
      .status-text { margin-top: 15px; font-size: 13px; font-family: monospace; }
    </style>

    <h2>Theme Switcher Demo</h2>
    <p>Select a theme below to manipulate body attributes dynamically:</p>
    <div class="theme-btn-group">
      <button class="theme-btn btn-light" id="btnThemeLight">Light</button>
      <button class="theme-btn btn-dark" id="btnThemeDark">Dark</button>
      <button class="theme-btn btn-blue" id="btnThemeBlue">Blue</button>
    </div>
    <div class="status-text" id="themeStatus">Current Theme: Light</div>
  `;
  document.body.appendChild(switcherContainer);

  const statusText = document.getElementById("themeStatus");

  function handleThemeChange(theme) {
    applyTheme(document.body, theme);
    statusText.textContent = `Current Theme: ${theme.toUpperCase()} (data-theme="${document.body.getAttribute('data-theme')}")`;
  }

  document.getElementById("btnThemeLight").addEventListener("click", () => handleThemeChange("light"));
  document.getElementById("btnThemeDark").addEventListener("click", () => handleThemeChange("dark"));
  document.getElementById("btnThemeBlue").addEventListener("click", () => handleThemeChange("blue"));

  // Default to light theme on initial load using setAttribute()
  handleThemeChange("light");
}

// =========================================================================
// Node.js Console Demonstration
// =========================================================================
console.log("=== Q4: Theme Switcher Attribute Manipulation Simulation ===");

// Simulated DOM Element for Node environment testing
class MockElement {
  constructor() {
    this.attributes = {};
  }
  setAttribute(attr, value) {
    this.attributes[attr] = String(value);
  }
  getAttribute(attr) {
    return this.attributes[attr] || null;
  }
}

const mockBody = new MockElement();

["light", "dark", "blue"].forEach((theme) => {
  const result = applyTheme(mockBody, theme);
  console.log(`[Switch to '${theme}'] -> class="${result.className}" | data-theme="${result.dataTheme}"`);
});
