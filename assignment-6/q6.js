"use strict";

/**
 * ASSIGNMENT 6 - Q6: E-Commerce Dashboard: Product Card Fetcher
 *
 * Demonstrates:
 * - Fetching product data from the Fake Store API (https://fakestoreapi.com/products)
 * - Using async/await with fetch API
 * - Formatting and logging product details (Title, Price with $, Image URL)
 * - Robust error handling with try/catch, outputting "Failed to load products. Please try again."
 * - Bonus: Dynamic HTML product card generation using document.createElement() when running in a browser
 */

const API_URL = "https://fakestoreapi.com/products";

/**
 * Optional Bonus: Render product cards into the DOM if running inside a browser.
 */
function renderProductCardsInDOM(products) {
  if (typeof document === "undefined") {
    // Running in Node.js environment; DOM manipulation is skipped
    return;
  }

  const container = document.getElementById("product-list") || document.body;

  products.forEach((product) => {
    // Create outer card container
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "8px";
    card.style.padding = "16px";
    card.style.margin = "12px";
    card.style.maxWidth = "280px";
    card.style.display = "inline-block";
    card.style.verticalAlign = "top";
    card.style.textAlign = "center";

    // Product Image
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.style.maxHeight = "150px";
    img.style.objectFit = "contain";
    img.style.marginBottom = "8px";

    // Product Title
    const title = document.createElement("h3");
    title.textContent = product.title;
    title.style.fontSize = "14px";
    title.style.minHeight = "40px";

    // Product Price
    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    price.style.fontWeight = "bold";
    price.style.color = "#2c7a7b";

    // Assemble card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    container.appendChild(card);
  });

  console.log("[DOM Bonus] HTML product cards successfully rendered into the page.");
}

/**
 * Fetches and displays products from Fake Store API
 */
async function fetchAndDisplayProducts() {
  console.log("Fetching product listings from:", API_URL);

  try {
    // Add a 6-second timeout signal to avoid hanging if the mock API is slow/unreachable
    const response = await fetch(API_URL, { signal: AbortSignal.timeout(6000) });

    // Validate HTTP response status
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    console.log(`\nSuccessfully received ${products.length} products:\n`);

    // Display formatted details for each product (sample first 5 for neat console readability)
    const displayCount = Math.min(products.length, 5);
    for (let i = 0; i < displayCount; i++) {
      const product = products[i];
      console.log(`Product: ${product.title}`);
      console.log(`Price: $${product.price}`);
      console.log(`Image: ${product.image}`);
      console.log("----------------------------------------");
    }

    if (products.length > displayCount) {
      console.log(`... and ${products.length - displayCount} more products.\n`);
    }

    // Call optional DOM card generator if in browser
    renderProductCardsInDOM(products);

  } catch (error) {
    // Required error message if network or parsing fails
    console.error("Failed to load products. Please try again.");
    if (error && error.message) {
      console.error("Debug info:", error.message);
    }
  }
}

// Execute the fetcher
fetchAndDisplayProducts();
