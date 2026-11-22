"use strict";

/**
 * Question 5: Movie Ticket Booking (Objects + RegExp)
 * 
 * Logic Explanation:
 * Handles movie ticket booking validation using regular expressions and numeric limits:
 * 1. Name: Alphabets and spaces only (/^[A-Za-z ]+$/).
 * 2. Email: Valid email format (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).
 * 3. Seats: Integer between 1 and 10 only.
 * 
 * Flow:
 * - Validates all inputs.
 * - If valid: Constructs booking object { name, email, seats, bookingId, ticketPrice, totalAmount }
 *   and displays formatted ticket details.
 * - If invalid: Shows specific error messages.
 */

// Core Booking Validation & Processing Function
function processBooking(nameInput, emailInput, seatsInput, movieTitle = "Inception") {
  const name = String(nameInput || "").trim();
  const email = String(emailInput || "").trim();
  const seats = Number(seatsInput);

  // 1. RegExp & Condition checks
  const namePattern = /^[A-Za-z ]+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const errors = [];

  if (!name || !namePattern.test(name)) {
    errors.push("Name must contain alphabets and spaces only.");
  }

  if (!email || !emailPattern.test(email)) {
    errors.push("Email is invalid (example: user@domain.com).");
  }

  if (!Number.isInteger(seats) || seats < 1 || seats > 10) {
    errors.push("Seats must be a whole number between 1 and 10.");
  }

  if (errors.length > 0) {
    return {
      success: false,
      errors: errors
    };
  }

  // 2. Build booking object
  const ticketPrice = 250;
  const bookingInfo = {
    bookingId: "TKT-" + Math.floor(100000 + Math.random() * 900000),
    movie: movieTitle,
    name: name,
    email: email,
    seats: seats,
    totalAmount: seats * ticketPrice,
    bookingTime: new Date().toLocaleString()
  };

  return {
    success: true,
    booking: bookingInfo
  };
}

// Browser Form Implementation
if (typeof document !== "undefined") {
  document.body.innerHTML = `
    <h2>Movie Ticket Booking</h2>
    <form id="ticketForm" style="display:flex; flex-direction:column; max-width:320px; gap:10px;">
      <label>Full Name:
        <input type="text" name="name" required style="width:100%; box-sizing:border-box;">
      </label>
      <label>Email Address:
        <input type="text" name="email" required style="width:100%; box-sizing:border-box;">
      </label>
      <label>Number of Seats (1 - 10):
        <input type="number" name="seats" min="1" max="10" required style="width:100%; box-sizing:border-box;">
      </label>
      <button type="submit" style="padding:8px; background:#28a745; color:white; border:none; cursor:pointer;">Confirm Booking</button>
      <div id="bookingResult" style="margin-top:15px;"></div>
    </form>
  `;

  const ticketForm = document.querySelector("#ticketForm");
  const resultDiv = document.querySelector("#bookingResult");

  ticketForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameVal = ticketForm.elements.name.value;
    const emailVal = ticketForm.elements.email.value;
    const seatsVal = ticketForm.elements.seats.value;

    const result = processBooking(nameVal, emailVal, seatsVal, "Interstellar");

    if (result.success) {
      const b = result.booking;
      resultDiv.innerHTML = `
        <div style="border:2px dashed #28a745; padding:12px; background:#e8f5e9; border-radius:6px;">
          <h3 style="margin:0 0 8px 0; color:#28a745;">🎟️ Booking Confirmed!</h3>
          <p><strong>Booking ID:</strong> ${b.bookingId}</p>
          <p><strong>Movie:</strong> ${b.movie}</p>
          <p><strong>Name:</strong> ${b.name}</p>
          <p><strong>Email:</strong> ${b.email}</p>
          <p><strong>Seats Booked:</strong> ${b.seats}</p>
          <p><strong>Total Amount:</strong> ₹${b.totalAmount}</p>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div style="color:red; background:#ffebee; padding:10px; border-radius:6px;">
          <strong>Booking Failed:</strong>
          <ul>${result.errors.map((err) => `<li>${err}</li>`).join("")}</ul>
        </div>
      `;
    }
  });
}

// Node.js Console Demonstration
console.log("=== Question 5: Movie Ticket Booking Simulation ===\n");

// Valid booking test
console.log("--- Test Case 1: Valid Booking ---");
const validTest = processBooking("Amit Sharma", "amit.sharma@gmail.com", 3, "Avatar 2");
if (validTest.success) {
  console.log("✓ Status: BOOKING SUCCESSFUL");
  console.log("Stored Booking Object:", validTest.booking);
}

// Invalid booking test
console.log("\n--- Test Case 2: Invalid Booking (Invalid email & seats > 10) ---");
const invalidTest = processBooking("Amit123", "amit_invalid_email", 15);
if (!invalidTest.success) {
  console.log("✗ Status: BOOKING FAILED");
  invalidTest.errors.forEach((err) => console.log(`  - Error: ${err}`));
}
