"use strict";

/**
 * ASSIGNMENT 8 - Q6: E-Commerce Inventory System
 *
 * Requirements:
 * - Inventory dataset containing products with: { id, name, category, price, stock }.
 * - Implement 4 analytical functions using core array methods:
 *   1. getLowStockProducts() -> using filter()
 *   2. sortProductsByPrice() -> using sort()
 *   3. calculateTotalInventoryValue() -> using reduce()
 *   4. groupByCategory() -> using reduce() + object accumulator
 * - Test using products from multiple categories.
 */

// Inventory Dataset across diverse categories
const inventory = [
  { id: 101, name: "Wireless Bluetooth Speaker", category: "Electronics", price: 2499, stock: 5 },
  { id: 102, name: "Ergonomic Office Chair", category: "Furniture", price: 8999, stock: 12 },
  { id: 103, name: "Noise Cancelling Headphones", category: "Electronics", price: 6999, stock: 4 },
  { id: 104, name: "Cotton Casual Shirt", category: "Clothing", price: 1299, stock: 25 },
  { id: 105, name: "Modern Coffee Table", category: "Furniture", price: 4500, stock: 8 },
  { id: 106, name: "Slim Fit Denim Jeans", category: "Clothing", price: 2199, stock: 18 },
  { id: 107, name: "JavaScript Guidebook", category: "Books", price: 650, stock: 2 },
  { id: 108, name: "Clean Code Handbook", category: "Books", price: 950, stock: 15 }
];

// 1. Filter products with stock below or equal to threshold (default: 5)
function getLowStockProducts(products, threshold = 5) {
  return products.filter((product) => product.stock <= threshold);
}

// 2. Sort products by price (pure function: creates a copy before sorting)
function sortProductsByPrice(products, ascending = true) {
  return [...products].sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
}

// 3. Calculate total inventory valuation: sum of (price * stock)
function calculateTotalInventoryValue(products) {
  return products.reduce((accumulator, product) => {
    return accumulator + (product.price * product.stock);
  }, 0);
}

// 4. Group products by category using reduce()
function groupByCategory(products) {
  return products.reduce((grouped, product) => {
    const category = product.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock
    });
    return grouped;
  }, {});
}

// =========================================================================
// Demonstrations
// =========================================================================
console.log("=== Q6: E-Commerce Inventory System Demo ===\n");

// 1. Low Stock Products (Stock <= 5)
console.log("--- 1. Low Stock Products (Stock <= 5) [using filter()] ---");
const lowStock = getLowStockProducts(inventory, 5);
console.table(lowStock);

// 2. Sorted Products by Price (Ascending)
console.log("\n--- 2. Products Sorted by Price (Ascending) [using sort()] ---");
const sortedByPrice = sortProductsByPrice(inventory, true);
console.table(sortedByPrice.map(p => ({ Name: p.name, Category: p.category, Price: `₹${p.price}` })));

// 3. Total Inventory Valuation
console.log("\n--- 3. Total Inventory Value [using reduce()] ---");
const totalValue = calculateTotalInventoryValue(inventory);
console.log(`Total Monetary Value of all Stock: ₹${totalValue.toLocaleString("en-IN")}`);

// 4. Group by Category
console.log("\n--- 4. Inventory Grouped by Category [using reduce()] ---");
const groupedInventory = groupByCategory(inventory);
console.log(JSON.stringify(groupedInventory, null, 2));
