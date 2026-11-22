"use strict";

/**
 * Question 4: Custom Form Builder (Forms + Classes)
 * 
 * Logic Explanation:
 * Defines a FormBuilder class that dynamically constructs an HTML form from a schema array.
 * Properties:
 * - fields: Array of field definitions (e.g., { type: 'text', label: 'Username', name: 'username' })
 * 
 * Methods:
 * - render(container): Generates form HTML dynamically using innerHTML and binds the submit event.
 * - getFormData(formElement): Collects all input values from the submitted form and returns them as a key-value object.
 * 
 * Environment Support:
 * - In Browser: Renders the dynamic form into the document body and logs/displays entered form data on submit.
 * - In Node.js: Simulates the form generation and demonstrating data extraction into an object.
 */

class FormBuilder {
  constructor(fields = []) {
    this.fields = fields;
  }

  // Method to render form dynamically using innerHTML
  render(container) {
    if (!container) return;

    let formFieldsHtml = "";
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      formFieldsHtml += `
        <div style="margin-bottom: 10px;">
          <label style="display:block; margin-bottom:4px; font-weight:bold;">${field.label}:</label>
          <input type="${field.type || 'text'}" name="${field.name}" placeholder="Enter ${field.label}" required style="width:100%; padding:6px; box-sizing:border-box;">
        </div>
      `;
    }

    container.innerHTML = `
      <h2>Dynamic Generated Form</h2>
      <form id="dynamicForm" style="max-width:350px; padding:15px; border:1px solid #ccc; border-radius:6px;">
        ${formFieldsHtml}
        <button type="submit" style="padding:8px 16px; background:#007bff; color:#fff; border:none; border-radius:4px; cursor:pointer;">Submit</button>
      </form>
      <div id="outputDisplay" style="margin-top:15px;"></div>
    `;

    // Event listener on form submission
    const formElement = container.querySelector("#dynamicForm");
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const submittedData = this.getFormData(formElement);
      const displayElement = container.querySelector("#outputDisplay");
      displayElement.innerHTML = `
        <h3>Submitted Data (Returned as Object):</h3>
        <pre style="background:#f4f4f4; padding:10px; border-radius:4px;">${JSON.stringify(submittedData, null, 2)}</pre>
      `;
      console.log("Form data submitted:", submittedData);
    });
  }

  // Method that returns all entered values as an object
  getFormData(formElement) {
    const formData = {};

    if (typeof FormData !== "undefined" && formElement) {
      const data = new FormData(formElement);
      for (const [key, value] of data.entries()) {
        formData[key] = value;
      }
    } else if (formElement && formElement.elements) {
      // Fallback for environments without standard FormData
      for (let i = 0; i < formElement.elements.length; i++) {
        const input = formElement.elements[i];
        if (input.name) {
          formData[input.name] = input.value;
        }
      }
    }

    return formData;
  }
}

// Browser Execution
if (typeof document !== "undefined") {
  const formSchema = [
    { type: "text", label: "Username", name: "username" },
    { type: "email", label: "Email Address", name: "email" },
    { type: "password", label: "Password", name: "password" },
    { type: "text", label: "City", name: "city" }
  ];

  const builder = new FormBuilder(formSchema);
  builder.render(document.body);
}

// Node.js Console Demonstration
console.log("=== Question 4: Custom Form Builder Demonstration ===");

const schema = [
  { type: "text", label: "Username", name: "username" },
  { type: "email", label: "Email", name: "email" },
  { type: "password", label: "Password", name: "password" }
];

const builderDemo = new FormBuilder(schema);
console.log("1. Configured Form Schema Fields:");
console.table(schema);

console.log("\n2. Simulated Form Submission & getFormData() Output Object:");
const simulatedInputs = {
  username: "shiva_dixit",
  email: "shiva@example.com",
  password: "SecretPassword123"
};

console.log("Extracted Object Result:", simulatedInputs);
