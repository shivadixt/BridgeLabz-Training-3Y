"use strict";

/**
 * ASSIGNMENT 7 - Q7: Detect Mouse Path & Coordinates Logger
 *
 * Requirements:
 * - A 400x400 box <div>.
 * - Tracks mouse movements inside the box and shows live clientX, clientY coordinates.
 * - On double-click (dblclick) inside the box, drops a red dot at the exact click position.
 *
 * Supports both:
 * - Browser: Interactive 400x400 canvas box, live coordinates HUD, and dynamic red dot placement.
 * - Node.js / Console: Simulated event coordinates calculation and dot placement records.
 */

// Dot creator calculation logic
function calculateDotPosition(offsetX, offsetY, dotRadius = 5) {
  return {
    left: offsetX - dotRadius,
    top: offsetY - dotRadius,
    dotRadius: dotRadius
  };
}

// =========================================================================
// Browser DOM Implementation
// =========================================================================
if (typeof document !== "undefined") {
  const container = document.createElement("div");
  container.id = "mouse-tracker-app";
  container.innerHTML = `
    <style>
      #mouse-tracker-app { font-family: Arial, sans-serif; max-width: 460px; margin: 20px auto; text-align: center; }
      #coordHUD { font-family: monospace; font-size: 15px; margin-bottom: 12px; font-weight: bold; color: #1e3a8a; }
      #trackingBox {
        width: 400px;
        height: 400px;
        margin: 0 auto;
        position: relative;
        background-color: #f1f5f9;
        border: 2px dashed #2563eb;
        border-radius: 8px;
        cursor: crosshair;
        overflow: hidden;
        user-select: none;
      }
      .red-dot {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #dc2626;
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 4px rgba(220, 38, 38, 0.8);
      }
      .instructions { font-size: 13px; color: #64748b; margin-top: 10px; }
    </style>

    <h2>Mouse Tracker & Coordinates Logger</h2>
    <div id="coordHUD">Move mouse inside the box below</div>
    <div id="trackingBox"></div>
    <p class="instructions">Move mouse to view clientX / clientY. <strong>Double-click</strong> inside the box to drop a red dot!</p>
  `;
  document.body.appendChild(container);

  const trackingBox = document.getElementById("trackingBox");
  const coordHUD = document.getElementById("coordHUD");

  // 1. Track live mouse coordinates on mousemove
  trackingBox.addEventListener("mousemove", (event) => {
    coordHUD.textContent = `clientX: ${event.clientX}px | clientY: ${event.clientY}px (Box: X=${event.offsetX}, Y=${event.offsetY})`;
  });

  // Reset display when cursor leaves the box
  trackingBox.addEventListener("mouseleave", () => {
    coordHUD.textContent = `Cursor outside box (Ready)`;
  });

  // 2. Drop a red dot at the click position on double-click
  trackingBox.addEventListener("dblclick", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    const dotPos = calculateDotPosition(x, y, 5);

    const dot = document.createElement("div");
    dot.className = "red-dot";
    dot.style.left = `${dotPos.left}px`;
    dot.style.top = `${dotPos.top}px`;

    trackingBox.appendChild(dot);
    console.log(`[Double Click] Red dot dropped at Box Offset: (${x}, ${y}) | Viewport: (${event.clientX}, ${event.clientY})`);
  });
}

// =========================================================================
// Node.js Console Demonstration
// =========================================================================
console.log("=== Q7: Mouse Coordinates & Dot Placement Simulation ===");

const simulatedEvents = [
  { type: "mousemove", clientX: 230, clientY: 180, offsetX: 100, offsetY: 120 },
  { type: "mousemove", clientX: 350, clientY: 290, offsetX: 220, offsetY: 230 },
  { type: "dblclick",  clientX: 350, clientY: 290, offsetX: 220, offsetY: 230 },
  { type: "dblclick",  clientX: 180, clientY: 140, offsetX: 50,  offsetY: 80 }
];

simulatedEvents.forEach((ev) => {
  if (ev.type === "mousemove") {
    console.log(`[Mouse Move] clientX: ${ev.clientX}px, clientY: ${ev.clientY}px | Box Offset: (${ev.offsetX}, ${ev.offsetY})`);
  } else if (ev.type === "dblclick") {
    const dot = calculateDotPosition(ev.offsetX, ev.offsetY);
    console.log(`[Double Click Triggered] -> Red dot created at style left: ${dot.left}px, top: ${dot.top}px (Center: ${ev.offsetX}, ${ev.offsetY})`);
  }
});
