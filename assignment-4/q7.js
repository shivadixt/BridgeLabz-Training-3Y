"use strict";

/**
 * Question 7: Login Form Validation using RegExp
 * 
 * Logic Explanation:
 * Validates login credentials using dedicated Regular Expressions:
 * 1. Username:
 *    - At least 5 characters: /^.{5,}$/
 * 2. Password:
 *    - At least 8 characters: /^.{8,}$/
 *    - At least one uppercase letter: /[A-Z]/
 *    - At least one lowercase letter: /[a-z]/
 *    - At least one digit: /\d/
 *    - At least one special character: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
 * 
 * Outcome:
 * - If all rules pass: Returns success message.
 * - Otherwise: Returns a list of specific, granular error messages describing which requirements failed.
 */

function validateLoginCredentials(username, password) {
  const errors = [];

  const u = String(username || "").trim();
  const p = String(password || "");

  // 1. Username validation
  if (!/^.{5,}$/.test(u)) {
    errors.push("Username must be at least 5 characters long.");
  }

  // 2. Password validation checks
  if (!/^.{8,}$/.test(p)) {
    errors.push("Password must be at least 8 characters long.");
  }

  if (!/[A-Z]/.test(p)) {
    errors.push("Password must contain at least one uppercase letter (A-Z).");
  }

  if (!/[a-z]/.test(p)) {
    errors.push("Password must contain at least one lowercase letter (a-z).");
  }

  if (!/\d/.test(p)) {
    errors.push("Password must contain at least one number (0-9).");
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p)) {
    errors.push("Password must contain at least one special character (!@#$%^&*...).");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    message: errors.length === 0 ? "Login validation passed successfully!" : "Validation failed."
  };
}

// Browser Form Implementation
if (typeof document !== "undefined") {
  document.body.innerHTML = `
    <h2>User Login</h2>
    <form id="loginForm" style="display:flex; flex-direction:column; max-width:300px; gap:8px;">
      <label>Username:
        <input type="text" name="username" placeholder="Min 5 characters" style="width:100%; box-sizing:border-box;">
      </label>
      <label>Password:
        <input type="password" name="password" placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special" style="width:100%; box-sizing:border-box;">
      </label>
      <button type="submit" style="padding:8px; background:#007bff; color:white; border:none; cursor:pointer;">Login</button>
      <div id="loginFeedback" style="margin-top:12px;"></div>
    </form>
  `;

  const loginForm = document.querySelector("#loginForm");
  const feedback = document.querySelector("#loginFeedback");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userVal = loginForm.elements.username.value;
    const passVal = loginForm.elements.password.value;

    const result = validateLoginCredentials(userVal, passVal);

    if (result.isValid) {
      feedback.innerHTML = `<p style="color:green; font-weight:bold;">✓ ${result.message}</p>`;
    } else {
      feedback.innerHTML = `
        <div style="color:red; background:#ffebee; padding:8px; border-radius:4px;">
          <strong>Login Error:</strong>
          <ul style="margin:4px 0 0 18px; padding:0;">
            ${result.errors.map((err) => `<li>${err}</li>`).join("")}
          </ul>
        </div>
      `;
    }
  });
}

// Node.js Console Demonstration Test Suite
console.log("=== Question 7: Login Form Validation Test Suite ===\n");

const loginTestCases = [
  {
    title: "All Valid Credentials",
    user: "john_doe",
    pass: "Secure@Pass123"
  },
  {
    title: "Short Username and Weak Password",
    user: "joe",
    pass: "short"
  },
  {
    title: "Password Missing Special Character & Uppercase",
    user: "validuser",
    pass: "password123"
  }
];

loginTestCases.forEach((tc, idx) => {
  console.log(`--- Test Case ${idx + 1}: ${tc.title} ---`);
  console.log(`Input: username="${tc.user}", password="${tc.pass}"`);
  const res = validateLoginCredentials(tc.user, tc.pass);

  if (res.isValid) {
    console.log(`✓ Result: ${res.message}`);
  } else {
    console.log("✗ Result: Validation failed with errors:");
    res.errors.forEach((e) => console.log(`   - ${e}`));
  }
  console.log("");
});
