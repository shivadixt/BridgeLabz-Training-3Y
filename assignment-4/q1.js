"use strict";

/**
 * Question 1: E-Commerce Product Manager (Classes + Objects)
 * 
 * Logic Explanation:
 * Defines a Product class representing items in an e-commerce catalog.
 * Properties: id, name, price, category.
 * Methods:
 * - applyDiscount(percent): Reducess product price by the specified discount percentage.
 * - getDetails(): Returns a formatted description string.
 * 
 * Features:
 * - Creates an array of multiple Product instances.
 * - Applies a discount to select items.
 * - Filters and displays products with price > ₹1000.
 */

class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  // Method to apply discount percentage
  applyDiscount(percent) {
    if (percent > 0 && percent <= 100) {
      const discountAmount = (this.price * percent) / 100;
      this.price -= discountAmount;
      console.log(`Applied ${percent}% discount on ${this.name}. New Price: ₹${this.price.toFixed(2)}`);
    } else {
      console.log("Invalid discount percentage.");
    }
  }

  // Method to display product details
  getDetails() {
    return `ID: #${this.id} | Product: ${this.name.padEnd(14)} | Category: ${this.category.padEnd(12)} | Price: ₹${this.price.toFixed(2)}`;
  }
}

// Create multiple product objects and store in array
const products = [
  new Product(101, "Laptop", 65000, "Electronics"),
  new Product(102, "Wireless Mouse", 850, "Electronics"),
  new Product(103, "Office Desk", 12500, "Furniture"),
  new Product(104, "Notebook", 120, "Stationery"),
  new Product(105, "Smart Watch", 4500, "Wearables")
];

console.log("=== All Products in Inventory ===");
for (let i = 0; i < products.length; i++) {
  console.log(products[i].getDetails());
}

// Apply discount to Laptop (10%) and Smart Watch (15%)
console.log("\n=== Applying Discounts ===");
products[0].applyDiscount(10);
products[4].applyDiscount(15);

// Filter and display products with price > 1000
console.log("\n=== Products with Price > ₹1000 ===");
const expensiveProducts = products.filter((product) => product.price > 1000);

for (let j = 0; j < expensiveProducts.length; j++) {
  console.log(expensiveProducts[j].getDetails());
}
