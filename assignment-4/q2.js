"use strict";

/**
 * Question 2: Student Form Validator (Forms + RegExp)
 * 
 * Logic Explanation:
 * Validates student registration inputs using Regular Expressions:
 * 1. Name: Only alphabets (letters and spaces): /^[A-Za-z ]+$/
 * 2. Email: Standard email format: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
 * 3. Phone: Exactly 10 digits: /^\d{10}$/
 * 4. Password: At least 1 uppercase letter, 1 number, and 1 special character:
 *    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/
 * 
 * Supports both:
 * - Browser environment: Sets input border to green/red and displays error message.
 * - Node.js environment: Demonstrates test suite for validation functions in the console.
 */

// Validation Rules Map
const validationRules = {
  name: {
    pattern: /^[A-Za-z ]+$/,
    errorMessage: "Name must contain only alphabets and spaces."
  },
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: "Email must be a valid format (e.g., student@domain.com)."
  },
  phone: {
    pattern: /^\d{10}$/,
    errorMessage: "Phone must contain exactly 10 digits."
  },
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
    errorMessage: "Password must have at least 1 uppercase, 1 number, and 1 special character."
  }
};

// Core validator function
function validateField(fieldName, value) {
  const rule = validationRules[fieldName];
  if (!rule) return { isValid: false, message: "Unknown field." };

  const trimmedValue = String(value || "").trim();
  const isValid = rule.pattern.test(trimmedValue);

  return {
    isValid: isValid,
    message: isValid ? "Valid" : rule.errorMessage
  };
}

// Browser DOM Implementation
if (typeof document !== "undefined") {
  document.body.innerHTML = `
    <h2>Student Registration Form</h2>
    <form id="studentForm" style="display:flex; flex-direction:column; max-width:320px; gap:8px;">
      <label>Name:
        <input type="text" name="name" id="name" style="width:100%; box-sizing:border-box;">
        <small class="error-msg" style="color:red;"></small>
      </label>
      <label>Email:
        <input type="text" name="email" id="email" style="width:100%; box-sizing:border-box;">
        <small class="error-msg" style="color:red;"></small>
      </label>
      <label>Phone:
        <input type="text" name="phone" id="phone" style="width:100%; box-sizing:border-box;">
        <small class="error-msg" style="color:red;"></small>
      </label>
      <label>Password:
        <input type="password" name="password" id="password" style="width:100%; box-sizing:border-box;">
        <small class="error-msg" style="color:red;"></small>
      </label>
      <button type="submit" style="margin-top:10px;">Register</button>
      <div id="statusMessage" style="font-weight:bold; margin-top:10px;"></div>
    </form>
  `;

  const form = document.querySelector("#studentForm");
  const statusMessage = document.querySelector("#statusMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isFormValid = true;

    for (const fieldName in validationRules) {
      const input = form.elements[fieldName];
      const errorMsgElement = input.parentElement.querySelector(".error-msg");
      const result = validateField(fieldName, input.value);

      if (result.isValid) {
        input.style.border = "2px solid green";
        errorMsgElement.textContent = "";
      } else {
        input.style.border = "2px solid red";
        errorMsgElement.textContent = result.message;
        isFormValid = false;
      }
    }

    if (isFormValid) {
      statusMessage.style.color = "green";
      statusMessage.textContent = "Registration Successful!";
    } else {
      statusMessage.style.color = "red";
      statusMessage.textContent = "Please resolve the highlighted validation errors.";
    }
  });
}

// Node.js Console Demonstration
console.log("=== Question 2: Student Form Validator Test Suite ===");

const sampleTestCases = [
  { field: "name", value: "Shiva Dixit", expected: "valid" },
  { field: "name", value: "Shiva123", expected: "invalid (numbers in name)" },
  { field: "email", value: "shiva@example.com", expected: "valid" },
  { field: "email", value: "shiva_at_example.com", expected: "invalid (missing @)" },
  { field: "phone", value: "9876543210", expected: "valid (10 digits)" },
  { field: "phone", value: "98765", expected: "invalid (short)" },
  { field: "password", value: "Pass@123", expected: "valid (uppercase + number + special)" },
  { field: "password", value: "password", expected: "invalid (no uppercase/number/special)" }
];

sampleTestCases.forEach((test) => {
  const result = validateField(test.field, test.value);
  const borderVisual = result.isValid ? "[BORDER: GREEN]" : "[BORDER: RED]";
  console.log(`${borderVisual} Field: ${test.field.padEnd(8)} | Value: "${test.value}" -> Status: ${result.isValid ? "PASS" : "FAIL"} (${result.message})`);
});
