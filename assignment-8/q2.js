"use strict";

/**
 * ASSIGNMENT 8 - Q2: Online Food Ordering (map + Error Handling)
 *
 * Requirements:
 * - Array of menu items with prices.
 * - Function calculateBill(orderItems) that:
 *   - Uses map() to get the price list of ordered items.
 *   - Uses reduce() to calculate the grand total.
 *   - Throws an Error if an ordered item is not present on the menu.
 * - Uses try/catch blocks to display meaningful messages for both valid and invalid orders.
 */

// Restaurant Menu
const restaurantMenu = [
  { item: "Burger", price: 120 },
  { item: "Pizza", price: 250 },
  { item: "Pasta", price: 180 },
  { item: "French Fries", price: 90 },
  { item: "Cold Coffee", price: 70 },
  { item: "Garlic Bread", price: 110 }
];

/**
 * Calculates bill for ordered items
 * @param {string[]} orderItems - Array of item names ordered
 * @returns {number} Grand total price
 */
function calculateBill(orderItems) {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error("Order must contain at least one item.");
  }

  // 1. Use map() to extract the price for each ordered item
  const priceList = orderItems.map((orderedItemName) => {
    const menuItem = restaurantMenu.find(
      (m) => m.item.toLowerCase() === String(orderedItemName).trim().toLowerCase()
    );

    if (!menuItem) {
      // Throw an error if an invalid item is requested
      throw new Error(`Item "${orderedItemName}" is not available on the menu.`);
    }

    return menuItem.price;
  });

  // 2. Use reduce() to compute the grand total
  const grandTotal = priceList.reduce((acc, currentPrice) => {
    return acc + currentPrice;
  }, 0);

  return { priceList, grandTotal };
}

// Helper function to process an order with try/catch
function processOrder(customerName, orderItems) {
  console.log(`\nProcessing Order for: ${customerName}`);
  console.log(`Ordered Items: [${orderItems.join(", ")}]`);

  try {
    const { priceList, grandTotal } = calculateBill(orderItems);
    console.log("Price breakdown:", priceList.map((p) => `₹${p}`).join(" + "));
    console.log(`Order Status: SUCCESS | Total Bill: ₹${grandTotal}`);
  } catch (error) {
    console.error(`Order Status: FAILED | Reason: ${error.message}`);
  }
}

// =========================================================================
// Demonstrations
// =========================================================================
console.log("=== Q2: Online Food Ordering System Demo ===");
console.log("Available Menu:");
restaurantMenu.forEach((m) => console.log(` - ${m.item}: ₹${m.price}`));

// Valid order 1
processOrder("Rahul", ["Pizza", "Cold Coffee", "Garlic Bread"]);

// Valid order 2
processOrder("Simran", ["Burger", "French Fries"]);

// Invalid order 1 (Contains unavailable item: "Sushi")
processOrder("Amit", ["Burger", "Sushi", "Cold Coffee"]);

// Invalid order 2 (Empty order list)
processOrder("Sneha", []);
