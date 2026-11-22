"use strict";

/**
 * ASSIGNMENT 8 - Q3: Product Discount System
 *
 * Requirements:
 * - Product constructor function with properties: name, price.
 * - Prototype method applyDiscount(percent) returning the new discounted price.
 * - Create 3 products and apply different discounts.
 * - Explain how abstraction simplifies operations.
 */

// 1. Constructor Function
function Product(name, price) {
  this.name = name;
  this.price = Number(price);
}

// 2. Add applyDiscount() method to Product prototype
// Prototype methods are shared among all instances, saving memory
Product.prototype.applyDiscount = function (percent) {
  if (typeof percent !== "number" || percent < 0 || percent > 100) {
    throw new Error(`Invalid discount percent: ${percent}%. Must be between 0 and 100.`);
  }

  const discountAmount = (this.price * percent) / 100;
  const discountedPrice = this.price - discountAmount;

  return Number(discountedPrice.toFixed(2));
};

// Prototype method to display product summary
Product.prototype.getDetails = function () {
  return `${this.name} - Original Price: ₹${this.price}`;
};

// =========================================================================
// Demonstrating Abstraction with 3 Products
// =========================================================================
console.log("=== Q3: Product Discount System & Abstraction Demo ===");

const product1 = new Product("Gaming Laptop", 85000);
const product2 = new Product("Wireless Headphones", 4500);
const product3 = new Product("Smart Watch", 12000);

const productsToDiscount = [
  { product: product1, discountPercent: 10 },
  { product: product2, discountPercent: 15 },
  { product: product3, discountPercent: 20 }
];

productsToDiscount.forEach(({ product, discountPercent }) => {
  console.log(product.getDetails());
  const finalPrice = product.applyDiscount(discountPercent);
  console.log(` -> After ${discountPercent}% Discount: ₹${finalPrice}\n`);
});

/**
 * =========================================================================
 * HOW ABSTRACTION HELPS SIMPLIFY OPERATIONS:
 * =========================================================================
 *
 * 1. Hiding Complexity:
 *    The consumer of the Product object does not need to know the mathematical
 *    formula for percentage reduction or precision rounding. They simply call:
 *    `product.applyDiscount(15)` and receive the correct result.
 *
 * 2. Separation of Concerns & Reusability:
 *    If business rules for calculating discounts change (e.g., adding maximum
 *    discount caps or tax deductions), we only update the prototype method
 *    in one single place without breaking external caller code.
 *
 * 3. Consistent Interface:
 *    Every product object, regardless of whether it is a laptop or a watch,
 *    presents the exact same uniform interface to calculate discounts.
 */
