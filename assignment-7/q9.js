"use strict";

/**
 * ASSIGNMENT 7 - Q9: Form Submit Blocker with preventDefault() and Live Errors
 *
 * Requirements:
 * - Form with fields:
 *   - Name: required (non-empty)
 *   - Email: required (must contain '@' and valid domain format)
 *   - Password: minimum 6 characters
 * - On submit: if any field is invalid, display inline error messages.
 * - Always use event.preventDefault() to stop native form submission and page reload.
 * - Live error clearing: As soon as user corrects an invalid input (on 'input' event), the inline error automatically disappears.
 * - When all fields are valid: display "Form Submitted Successfully".
 *
 * Supports both:
 * - Browser: Interactive form with live validation feedback, error clearing, and success alert banner.
 * - Node.js / Console: Comprehensive validation test suite simulating submit prevention and live correction.
 */

// Field validation helpers
const formValidators = {
  name: (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) return { isValid: false, message: "Name is required." };
    if (trimmed.length < 2) return { isValid: false, message: "Name must be at least 2 characters." };
    return { isValid: true, message: "" };
  },
  email: (value) => {
    const trimmed = String(value || "").trim();
    if (!trimmed) return { isValid: false, message: "Email is required." };
    if (!trimmed.includes("@") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return { isValid: false, message: "Email must be valid and contain an '@' symbol." };
    }
    return { isValid: true, message: "" };
  },
  password: (value) => {
    const str = String(value || "");
    if (!str) return { isValid: false, message: "Password is required." };
    if (str.length < 6) return { isValid: false, message: "Password must be at least 6 characters long." };
    return { isValid: true, message: "" };
  }
};

// =========================================================================
// Browser DOM Implementation
// =========================================================================
if (typeof document !== "undefined") {
  const container = document.createElement("div");
  container.id = "form-validator-app";
  container.innerHTML = `
    <style>
      #form-validator-app { font-family: Arial, sans-serif; max-width: 400px; margin: 30px auto; padding: 25px; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      #form-validator-app h2 { margin-top: 0; color: #1e293b; }
      .form-field { margin-bottom: 16px; }
      .form-field label { display: block; font-weight: 600; margin-bottom: 6px; color: #334155; }
      .form-field input { width: 100%; box-sizing: border-box; padding: 10px; font-size: 14px; border: 1px solid #94a3b8; border-radius: 4px; outline: none; transition: border-color 0.2s; }
      .form-field input.invalid { border-color: #dc2626; background-color: #fef2f2; }
      .form-field input.valid { border-color: #16a34a; }
      .inline-error { color: #dc2626; font-size: 12px; margin-top: 4px; min-height: 16px; display: block; }
      .submit-btn { width: 100%; padding: 12px; font-size: 15px; font-weight: bold; background-color: #2563eb; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
      .submit-btn:hover { background-color: #1d4ed8; }
      .success-box { display: none; margin-top: 15px; padding: 12px; background-color: #dcfce7; color: #15803d; border: 1px solid #86efac; border-radius: 4px; text-align: center; font-weight: bold; }
    </style>

    <h2>Registration Form</h2>
    <form id="secureForm" novalidate>
      <div class="form-field">
        <label for="inputName">Full Name</label>
        <input type="text" id="inputName" placeholder="John Doe" />
        <span class="inline-error" id="nameError"></span>
      </div>

      <div class="form-field">
        <label for="inputEmail">Email Address</label>
        <input type="email" id="inputEmail" placeholder="john@example.com" />
        <span class="inline-error" id="emailError"></span>
      </div>

      <div class="form-field">
        <label for="inputPassword">Password</label>
        <input type="password" id="inputPassword" placeholder="Minimum 6 characters" />
        <span class="inline-error" id="passwordError"></span>
      </div>

      <button type="submit" class="submit-btn" id="submitBtn">Submit Registration</button>
    </form>

    <div class="success-box" id="formSuccessMessage">Form Submitted Successfully</div>
  `;
  document.body.appendChild(container);

  const form = document.getElementById("secureForm");
  const nameInput = document.getElementById("inputName");
  const emailInput = document.getElementById("inputEmail");
  const passwordInput = document.getElementById("inputPassword");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const successBox = document.getElementById("formSuccessMessage");

  // Helper to validate and update a single field UI
  function checkField(input, errorElement, validator) {
    const result = validator(input.value);
    if (!result.isValid) {
      errorElement.textContent = result.message;
      input.classList.add("invalid");
      input.classList.remove("valid");
      return false;
    } else {
      errorElement.textContent = "";
      input.classList.remove("invalid");
      input.classList.add("valid");
      return true;
    }
  }

  // --- LIVE ERROR CORRECTION ON 'INPUT' EVENT ---
  // On correcting input, errors disappear automatically
  nameInput.addEventListener("input", () => {
    if (nameError.textContent) {
      checkField(nameInput, nameError, formValidators.name);
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailError.textContent) {
      checkField(emailInput, emailError, formValidators.email);
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordError.textContent) {
      checkField(passwordInput, passwordError, formValidators.password);
    }
  });

  // --- FORM SUBMIT HANDLER WITH PREVENTDEFAULT() ---
  form.addEventListener("submit", (event) => {
    // 1. Prevent native form submission and page reload
    event.preventDefault();

    const isNameValid = checkField(nameInput, nameError, formValidators.name);
    const isEmailValid = checkField(emailInput, emailError, formValidators.email);
    const isPasswordValid = checkField(passwordInput, passwordError, formValidators.password);

    if (isNameValid && isEmailValid && isPasswordValid) {
      // All fields valid -> show success message
      successBox.style.display = "block";
      console.log("Form Submitted Successfully:", {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
      });
    } else {
      // Errors present -> hide success message
      successBox.style.display = "none";
      console.warn("Form submission blocked due to invalid input fields.");
    }
  });
}

// =========================================================================
// Node.js Console Demonstration
// =========================================================================
console.log("=== Q9: Form Submit Blocker & Live Errors Simulation ===");

function testFormSubmission(formData) {
  const nameResult = formValidators.name(formData.name);
  const emailResult = formValidators.email(formData.email);
  const passResult = formValidators.password(formData.password);

  const errors = {};
  if (!nameResult.isValid) errors.name = nameResult.message;
  if (!emailResult.isValid) errors.email = emailResult.message;
  if (!passResult.isValid) errors.password = passResult.message;

  const isFormValid = Object.keys(errors).length === 0;

  return {
    isFormValid,
    errors,
    message: isFormValid ? "Form Submitted Successfully" : "Submission Blocked (Inline errors shown)"
  };
}

console.log("\n1. Testing with Invalid Inputs (Empty Form Submission):");
console.log(testFormSubmission({ name: "", email: "", password: "" }));

console.log("\n2. Testing with Partial Correction (Missing '@' in email, short password):");
console.log(testFormSubmission({ name: "Alex Morgan", email: "alexdomain.com", password: "123" }));

console.log("\n3. Testing with All Inputs Corrected:");
console.log(testFormSubmission({ name: "Alex Morgan", email: "alex@domain.com", password: "securePassword123" }));
