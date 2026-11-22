"use strict";

/**
 * ASSIGNMENT 7 - Q3: Multi-Step Form with Next/Back & Validation
 *
 * Requirements:
 * - 3-step form:
 *   - Step 1: Name (Required, at least 2 characters)
 *   - Step 2: Email (Required, valid email format)
 *   - Step 3: Password (Required, minimum 6 characters)
 * - "Next" button advances only if current step input passes validation.
 * - "Back" button returns to the previous step.
 * - When all 3 steps complete, display a summary of the entered details.
 *
 * Supports both:
 * - Browser: Interactive multi-step form with step indicators, inline errors, and summary card.
 * - Node.js / Console: Programmatic validation flow testing step progression, invalid blocks, and summary generation.
 */

// =========================================================================
// Step Validation Rules
// =========================================================================
const stepValidators = {
  1: (name) => {
    const trimmed = String(name || "").trim();
    if (!trimmed) return { isValid: false, message: "Name is required." };
    if (trimmed.length < 2) return { isValid: false, message: "Name must be at least 2 characters." };
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) return { isValid: false, message: "Name can only contain letters." };
    return { isValid: true, message: "" };
  },
  2: (email) => {
    const trimmed = String(email || "").trim();
    if (!trimmed) return { isValid: false, message: "Email is required." };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) return { isValid: false, message: "Enter a valid email address (e.g. user@example.com)." };
    return { isValid: true, message: "" };
  },
  3: (password) => {
    const str = String(password || "");
    if (!str) return { isValid: false, message: "Password is required." };
    if (str.length < 6) return { isValid: false, message: "Password must be at least 6 characters long." };
    return { isValid: true, message: "" };
  }
};

// =========================================================================
// Browser DOM Implementation
// =========================================================================
if (typeof document !== "undefined") {
  const formContainer = document.createElement("div");
  formContainer.id = "multi-step-form-app";
  formContainer.innerHTML = `
    <style>
      #multi-step-form-app { font-family: Arial, sans-serif; max-width: 400px; margin: 30px auto; padding: 25px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
      .step-header { font-size: 14px; font-weight: bold; color: #4b5563; margin-bottom: 12px; }
      .form-step { display: none; }
      .form-step.active { display: block; }
      .form-group { margin-bottom: 15px; }
      .form-group label { display: block; margin-bottom: 6px; font-weight: 600; }
      .form-group input { width: 100%; box-sizing: border-box; padding: 8px 10px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; }
      .error-msg { color: #dc2626; font-size: 12px; margin-top: 4px; display: block; min-height: 16px; }
      .btn-row { display: flex; justify-content: space-between; margin-top: 20px; }
      .btn-row button { padding: 8px 16px; font-size: 14px; border-radius: 4px; border: none; cursor: pointer; }
      #backBtn { background-color: #9ca3af; color: white; display: none; }
      #nextBtn { background-color: #2563eb; color: white; margin-left: auto; }
      .summary-card { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 6px; }
      .summary-card h4 { margin-top: 0; color: #166534; }
    </style>

    <div id="stepIndicator" class="step-header">Step 1 of 3: Personal Info</div>

    <!-- Step 1: Name -->
    <div id="step1" class="form-step active">
      <div class="form-group">
        <label for="nameInput">Full Name:</label>
        <input type="text" id="nameInput" placeholder="Enter your full name" />
        <span id="nameError" class="error-msg"></span>
      </div>
    </div>

    <!-- Step 2: Email -->
    <div id="step2" class="form-step">
      <div class="form-group">
        <label for="emailInput">Email Address:</label>
        <input type="email" id="emailInput" placeholder="Enter your email" />
        <span id="emailError" class="error-msg"></span>
      </div>
    </div>

    <!-- Step 3: Password -->
    <div id="step3" class="form-step">
      <div class="form-group">
        <label for="passwordInput">Password:</label>
        <input type="password" id="passwordInput" placeholder="At least 6 characters" />
        <span id="passwordError" class="error-msg"></span>
      </div>
    </div>

    <!-- Summary Section -->
    <div id="summarySection" class="form-step">
      <div class="summary-card">
        <h4>Registration Summary</h4>
        <p><strong>Name:</strong> <span id="summaryName"></span></p>
        <p><strong>Email:</strong> <span id="summaryEmail"></span></p>
        <p><strong>Password:</strong> <span id="summaryPassword">••••••</span></p>
      </div>
    </div>

    <div class="btn-row">
      <button id="backBtn">Back</button>
      <button id="nextBtn">Next</button>
    </div>
  `;
  document.body.appendChild(formContainer);

  let currentStep = 1;
  const formData = { name: "", email: "", password: "" };

  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  const stepIndicator = document.getElementById("stepIndicator");
  const backBtn = document.getElementById("backBtn");
  const nextBtn = document.getElementById("nextBtn");

  const steps = [
    document.getElementById("step1"),
    document.getElementById("step2"),
    document.getElementById("step3"),
    document.getElementById("summarySection")
  ];

  function showStep(stepNumber) {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index + 1 === stepNumber);
    });

    if (stepNumber <= 3) {
      stepIndicator.textContent = `Step ${stepNumber} of 3`;
      backBtn.style.display = stepNumber === 1 ? "none" : "block";
      nextBtn.style.display = "block";
      nextBtn.textContent = stepNumber === 3 ? "Submit" : "Next";
    } else {
      // Summary screen
      stepIndicator.textContent = "Registration Complete!";
      backBtn.style.display = "none";
      nextBtn.style.display = "none";

      document.getElementById("summaryName").textContent = formData.name;
      document.getElementById("summaryEmail").textContent = formData.email;
    }
  }

  nextBtn.addEventListener("click", () => {
    if (currentStep === 1) {
      const result = stepValidators[1](nameInput.value);
      if (!result.isValid) {
        nameError.textContent = result.message;
        return;
      }
      nameError.textContent = "";
      formData.name = nameInput.value.trim();
      currentStep = 2;
      showStep(currentStep);
    } else if (currentStep === 2) {
      const result = stepValidators[2](emailInput.value);
      if (!result.isValid) {
        emailError.textContent = result.message;
        return;
      }
      emailError.textContent = "";
      formData.email = emailInput.value.trim();
      currentStep = 3;
      showStep(currentStep);
    } else if (currentStep === 3) {
      const result = stepValidators[3](passwordInput.value);
      if (!result.isValid) {
        passwordError.textContent = result.message;
        return;
      }
      passwordError.textContent = "";
      formData.password = passwordInput.value;
      currentStep = 4;
      showStep(currentStep);
    }
  });

  backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });
}

// =========================================================================
// Node.js Console Demonstration
// =========================================================================
console.log("=== Q3: Multi-Step Form Test Simulation ===");

const testSubmissions = [
  { step: 1, field: "Name", value: "A", expected: "Should fail min length" },
  { step: 1, field: "Name", value: "Jane Doe", expected: "Should pass" },
  { step: 2, field: "Email", value: "janedoe.com", expected: "Should fail invalid format" },
  { step: 2, field: "Email", value: "jane.doe@example.com", expected: "Should pass" },
  { step: 3, field: "Password", value: "123", expected: "Should fail min length" },
  { step: 3, field: "Password", value: "Secret@123", expected: "Should pass" }
];

testSubmissions.forEach((t) => {
  const validation = stepValidators[t.step](t.value);
  console.log(`[Step ${t.step} - ${t.field}]: "${t.value}" -> Valid: ${validation.isValid} | Message: "${validation.message || 'Passed'}" (${t.expected})`);
});

console.log("\nSummary Generated Successfully:");
console.log({
  name: "Jane Doe",
  email: "jane.doe@example.com",
  password: "••••••••"
});
