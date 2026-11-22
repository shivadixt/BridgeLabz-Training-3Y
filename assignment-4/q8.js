"use strict";

/**
 * Question 8: Dynamic Object Updater
 * 
 * Logic Explanation:
 * Maintains a live user object:
 *   const user = { name: "John", email: "john@mail.com", age: 21 };
 * 
 * - Generates a form pre-filled with the current user object values.
 * - On form submission:
 *     1. Reads input values from the DOM.
 *     2. Mutates the original user object properties in real-time.
 *     3. Renders the updated object state directly below the form in the DOM.
 * 
 * Supports both:
 * - Browser: Live DOM event listening, real-time object mutation, and rendering.
 * - Node.js: Simulates update cycles and logs state transitions in the console.
 */

const user = {
  name: "John",
  email: "john@mail.com",
  age: 21
};

// Function to update user object in real time
function updateUserObject(newName, newEmail, newAge) {
  if (newName !== undefined && newName.trim() !== "") {
    user.name = newName.trim();
  }
  if (newEmail !== undefined && newEmail.trim() !== "") {
    user.email = newEmail.trim();
  }
  if (newAge !== undefined && !isNaN(Number(newAge))) {
    user.age = Number(newAge);
  }
  return user;
}

// Browser Implementation
if (typeof document !== "undefined") {
  document.body.innerHTML = `
    <h2>Dynamic Object Updater</h2>
    <form id="editUserForm" style="display:flex; flex-direction:column; max-width:320px; gap:8px;">
      <label>Name:
        <input type="text" name="name" id="inputName" value="${user.name}" style="width:100%; box-sizing:border-box;">
      </label>
      <label>Email:
        <input type="email" name="email" id="inputEmail" value="${user.email}" style="width:100%; box-sizing:border-box;">
      </label>
      <label>Age:
        <input type="number" name="age" id="inputAge" value="${user.age}" style="width:100%; box-sizing:border-box;">
      </label>
      <button type="submit" style="padding:8px; background:#17a2b8; color:white; border:none; cursor:pointer;">Update User Object</button>
    </form>

    <div style="margin-top:20px;">
      <h3>Live User Object in Memory:</h3>
      <pre id="userDisplay" style="background:#f4f4f4; padding:12px; border-left:4px solid #17a2b8; font-size:14px;"></pre>
    </div>
  `;

  const display = document.querySelector("#userDisplay");
  const form = document.querySelector("#editUserForm");

  const renderDisplay = () => {
    display.textContent = JSON.stringify(user, null, 2);
  };

  // Initial render
  renderDisplay();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = form.elements.name.value;
    const newEmail = form.elements.email.value;
    const newAge = form.elements.age.value;

    updateUserObject(newName, newEmail, newAge);
    renderDisplay();
    console.log("Updated user object in real time:", user);
  });
}

// Node.js Console Simulation
console.log("=== Question 8: Dynamic Object Updater Simulation ===\n");
console.log("Initial User Object State:");
console.log(user);

console.log("\nSimulating Form Submit Event with new data...");
updateUserObject("Johnathan Doe", "john.doe@company.org", 25);

console.log("\nUpdated User Object State:");
console.log(user);

console.log("\nSimulating Second Update...");
updateUserObject("Alex Smith", "alex@mail.com", 30);
console.log(user);
