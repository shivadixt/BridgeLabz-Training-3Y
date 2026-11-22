"use strict";

/**
 * ASSIGNMENT 7 - Q1: Dynamic Product List Manager
 * (Add, Edit, Delete – Using Event Delegation)
 *
 * Requirements:
 * - User can add new products using an input box.
 * - Each product appears with "Edit" and "Delete" buttons.
 * - Editing allows inline text editing.
 * - Event delegation is used on the parent <ul> to handle Edit/Delete actions.
 * - If user clicks outside the currently edited item, the edit mode auto-saves.
 *
 * Supports both:
 * - Browser: Interactive DOM manipulation with event delegation and click-outside auto-save.
 * - Node.js / Console: Simulated lifecycle tests demonstrating add, edit, auto-save, and delete.
 */

// =========================================================================
// Product Manager Core Logic
// =========================================================================
class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
    this.editingId = null;
  }

  addProduct(name) {
    const trimmedName = String(name || "").trim();
    if (!trimmedName) {
      return { success: false, message: "Product name cannot be empty." };
    }
    const newProduct = { id: this.nextId++, name: trimmedName };
    this.products.push(newProduct);
    return { success: true, product: newProduct };
  }

  deleteProduct(id) {
    const initialCount = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialCount;
  }

  updateProduct(id, newName) {
    const trimmed = String(newName || "").trim();
    const product = this.products.find((p) => p.id === id);
    if (!product) return false;
    if (trimmed) {
      product.name = trimmed;
    }
    return true;
  }
}

// =========================================================================
// Browser DOM Implementation
// =========================================================================
if (typeof document !== "undefined") {
  // Mount UI styles and elements
  const appContainer = document.createElement("div");
  appContainer.id = "product-app";
  appContainer.innerHTML = `
    <style>
      #product-app { font-family: Arial, sans-serif; max-width: 450px; margin: 20px auto; padding: 15px; border: 1px solid #ddd; border-radius: 6px; }
      #product-app h2 { margin-top: 0; }
      .input-group { display: flex; gap: 8px; margin-bottom: 15px; }
      .input-group input { flex: 1; padding: 8px; font-size: 14px; }
      .input-group button { padding: 8px 14px; background: #2563eb; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
      #productList { list-style: none; padding: 0; margin: 0; }
      #productList li { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-bottom: 1px solid #eee; }
      #productList li.editing { background: #fef9c3; }
      .product-text { flex: 1; margin-right: 10px; cursor: pointer; }
      .inline-edit-input { flex: 1; padding: 4px 6px; margin-right: 10px; font-size: 14px; }
      .btn-group { display: flex; gap: 6px; }
      .btn-group button { padding: 4px 8px; font-size: 12px; border: none; border-radius: 3px; cursor: pointer; }
      .edit-btn { background: #f59e0b; color: #fff; }
      .delete-btn { background: #ef4444; color: #fff; }
    </style>
    <h2>Product List Manager</h2>
    <div class="input-group">
      <input type="text" id="newProductName" placeholder="Enter product name..." />
      <button id="addProductBtn">Add Product</button>
    </div>
    <ul id="productList"></ul>
  `;
  document.body.appendChild(appContainer);

  const productList = document.getElementById("productList");
  const newProductNameInput = document.getElementById("newProductName");
  const addProductBtn = document.getElementById("addProductBtn");

  let activeEditLi = null;

  // Function to create a product list item DOM element
  function createProductItem(id, name) {
    const li = document.createElement("li");
    li.dataset.id = String(id);
    li.innerHTML = `
      <span class="product-text">${name}</span>
      <div class="btn-group">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    return li;
  }

  // Save current active inline edit
  function saveActiveEdit() {
    if (!activeEditLi) return;
    const input = activeEditLi.querySelector(".inline-edit-input");
    if (input) {
      const newName = input.value.trim() || input.dataset.originalName;
      const span = document.createElement("span");
      span.className = "product-text";
      span.textContent = newName;
      input.replaceWith(span);

      const editBtn = activeEditLi.querySelector(".edit-btn");
      if (editBtn) editBtn.textContent = "Edit";
      activeEditLi.classList.remove("editing");
    }
    activeEditLi = null;
  }

  // Add Product Button Click
  addProductBtn.addEventListener("click", () => {
    saveActiveEdit();
    const name = newProductNameInput.value.trim();
    if (!name) return;
    const newItem = createProductItem(Date.now(), name);
    productList.appendChild(newItem);
    newProductNameInput.value = "";
    newProductNameInput.focus();
  });

  // Event Delegation on parent <ul> for Edit and Delete
  productList.addEventListener("click", (event) => {
    const target = event.target;
    const li = target.closest("li");
    if (!li) return;

    // Handle Delete
    if (target.classList.contains("delete-btn")) {
      if (activeEditLi === li) activeEditLi = null;
      li.remove();
      return;
    }

    // Handle Edit
    if (target.classList.contains("edit-btn")) {
      if (activeEditLi && activeEditLi !== li) {
        saveActiveEdit();
      }

      if (activeEditLi === li) {
        // Toggle save if edit clicked again
        saveActiveEdit();
      } else {
        // Enter edit mode
        activeEditLi = li;
        li.classList.add("editing");
        const span = li.querySelector(".product-text");
        if (span) {
          const currentText = span.textContent;
          const input = document.createElement("input");
          input.type = "text";
          input.className = "inline-edit-input";
          input.value = currentText;
          input.dataset.originalName = currentText;
          span.replaceWith(input);
          input.focus();
          target.textContent = "Save";
        }
      }
    }
  });

  // Auto-save when user clicks outside the currently edited item
  document.addEventListener("click", (event) => {
    if (!activeEditLi) return;
    // Check if clicked inside the edited li
    if (!activeEditLi.contains(event.target)) {
      saveActiveEdit();
    }
  });
}

// =========================================================================
// Node.js Console Demonstration
// =========================================================================
console.log("=== Q1: Dynamic Product List Manager Test Simulation ===");
const manager = new ProductManager();

console.log("\n1. Adding Products:");
console.log(manager.addProduct("Wireless Mouse"));
console.log(manager.addProduct("Mechanical Keyboard"));
console.log(manager.addProduct("Gaming Monitor"));
console.log("Current Products:", manager.products);

console.log("\n2. Inline Editing Product with ID 2:");
manager.updateProduct(2, "RGB Mechanical Keyboard");
console.log("Updated Product:", manager.products.find((p) => p.id === 2));

console.log("\n3. Click-Outside Auto-Save Simulation for ID 1:");
manager.updateProduct(1, "Ergonomic Wireless Mouse");
console.log("Auto-Saved Product:", manager.products.find((p) => p.id === 1));

console.log("\n4. Event Delegation - Deleting Product with ID 3:");
manager.deleteProduct(3);
console.log("Remaining Products after Delete:", manager.products);
