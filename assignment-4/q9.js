"use strict";

/**
 * Question 9: Shopping Cart Total (Classes + RegExp for Coupon)
 * 
 * Logic Explanation:
 * Defines a Cart class managing an e-commerce shopping basket:
 * - Properties: items (array of { name, price, quantity }).
 * - Methods:
 *     1. addItem(name, price, quantity): Adds a product entry to the cart.
 *     2. getTotal(): Calculates subtotal using Array.prototype.reduce().
 *     3. applyCoupon(couponCode): Validates coupon format using RegExp:
 *        Format must match: /^(SAVE|DISC)(\d{1,2})$/i
 *        - Group 1: Prefix ("SAVE" or "DISC")
 *        - Group 2: Percentage discount digits (e.g. 20, 10, 50)
 *        - Applies the discount percentage and returns the final discounted price.
 */

class Cart {
  constructor() {
    this.items = [];
  }

  // Method to add items to cart
  addItem(name, price, quantity = 1) {
    if (price > 0 && quantity > 0) {
      this.items.push({
        name: String(name),
        price: Number(price),
        quantity: Number(quantity)
      });
      console.log(`Added to cart: ${quantity}x ${name} @ ₹${price} each.`);
    } else {
      console.log("Invalid item price or quantity.");
    }
  }

  // Method to calculate subtotal
  getTotal() {
    return this.items.reduce((accumulator, item) => {
      return accumulator + (item.price * item.quantity);
    }, 0);
  }

  // Method to apply and validate coupon using RegExp
  applyCoupon(couponCode) {
    const rawCode = String(couponCode || "").trim().toUpperCase();
    const couponPattern = /^(SAVE|DISC)(\d{1,2})$/;

    const match = rawCode.match(couponPattern);

    if (!match) {
      throw new Error(`Invalid Coupon: "${couponCode}". Coupon format must be like SAVE20 or DISC10.`);
    }

    const prefix = match[1]; // SAVE or DISC
    const discountPercent = Number(match[2]); // e.g. 20 or 10

    if (discountPercent <= 0 || discountPercent > 90) {
      throw new Error(`Coupon discount ${discountPercent}% is out of valid range (1% - 90%).`);
    }

    const subtotal = this.getTotal();
    const discountAmount = (subtotal * discountPercent) / 100;
    const finalTotal = subtotal - discountAmount;

    return {
      coupon: rawCode,
      prefix: prefix,
      discountPercent: discountPercent,
      discountAmount: discountAmount,
      subtotal: subtotal,
      finalTotal: finalTotal
    };
  }

  // Display cart contents
  displayCart() {
    console.log("\n--- Current Cart Contents ---");
    if (this.items.length === 0) {
      console.log("Cart is empty.");
      return;
    }
    this.items.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      console.log(` ${index + 1}. ${item.name.padEnd(16)} | Qty: ${item.quantity} | Unit Price: ₹${item.price} | Total: ₹${lineTotal}`);
    });
    console.log(`Subtotal: ₹${this.getTotal().toFixed(2)}`);
  }
}

console.log("=== Question 9: Shopping Cart Total with Coupon Validation ===\n");

// 1. Create cart and add items
const myCart = new Cart();
myCart.addItem("Wireless Headphones", 2499, 1);
myCart.addItem("USB-C Fast Cable", 499, 2);
myCart.addItem("Laptop Stand", 1299, 1);

// 2. Display cart subtotal
myCart.displayCart();

// 3. Test Coupons with RegExp Validation
const couponsToTest = ["SAVE20", "DISC10", "WELCOME50", "SAVE999", "disc15"];

console.log("\n=== Testing Coupons ===");
couponsToTest.forEach((code) => {
  try {
    const result = myCart.applyCoupon(code);
    console.log(`✓ [VALID] Coupon '${code}': Applied ${result.discountPercent}% off! Saved: ₹${result.discountAmount.toFixed(2)} | Final Total: ₹${result.finalTotal.toFixed(2)}`);
  } catch (error) {
    console.log(`✗ [REJECTED] ${error.message}`);
  }
});
