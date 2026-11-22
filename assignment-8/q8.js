"use strict";

/**
 * ASSIGNMENT 8 - Q8: Movie Ticket Booking System
 *
 * Requirements:
 * - MovieTicket class with properties: movieName, seatNo, price.
 * - OnlineTicket class that inherits from MovieTicket and adds:
 *   - convenienceFee
 *   - method getTotalAmount()
 * - Add a method printTicket() directly to MovieTicket.prototype.
 * - Call printTicket() using OnlineTicket objects to demonstrate the prototype chain.
 */

// Base Class
class MovieTicket {
  constructor(movieName, seatNo, price) {
    this.movieName = movieName;
    this.seatNo = seatNo;
    this.price = Number(price);
  }
}

// Derived Class
class OnlineTicket extends MovieTicket {
  constructor(movieName, seatNo, price, convenienceFee = 50) {
    super(movieName, seatNo, price);
    this.convenienceFee = Number(convenienceFee);
  }

  // Calculate total price including convenience fee
  getTotalAmount() {
    return this.price + this.convenienceFee;
  }
}

// =========================================================================
// Adding method to MovieTicket.prototype
// =========================================================================
MovieTicket.prototype.printTicket = function () {
  const isOnline = typeof this.getTotalAmount === "function";
  const total = isOnline ? this.getTotalAmount() : this.price;

  console.log("=========================================");
  console.log("             ADMIT ONE                   ");
  console.log(`Movie:           ${this.movieName}`);
  console.log(`Seat Number:     ${this.seatNo}`);
  console.log(`Base Price:      ₹${this.price}`);
  if (isOnline) {
    console.log(`Convenience Fee: ₹${this.convenienceFee}`);
  }
  console.log(`Final Payable:   ₹${total}`);
  console.log("=========================================");
};

// =========================================================================
// Demonstrations
// =========================================================================
console.log("=== Q8: Movie Ticket Booking & Prototype Chain Demo ===\n");

// 1. Regular Movie Ticket
const counterTicket = new MovieTicket("Inception", "G-12", 350);
console.log("1. Counter Ticket (Base Class Instance):");
counterTicket.printTicket();

// 2. Online Movie Ticket (Inherits from MovieTicket)
const onlineTicket1 = new OnlineTicket("Interstellar (IMAX)", "F-14", 550, 60);
const onlineTicket2 = new OnlineTicket("Oppenheimer", "D-08", 450, 45);

console.log("\n2. Online Tickets (Calling printTicket via Prototype Chain):");
onlineTicket1.printTicket();
onlineTicket2.printTicket();

// 3. Verifying Prototype Chain Resolution
console.log("\n--- Prototype Chain Inspection ---");
console.log("onlineTicket1 instanceof OnlineTicket: ", onlineTicket1 instanceof OnlineTicket); // true
console.log("onlineTicket1 instanceof MovieTicket:  ", onlineTicket1 instanceof MovieTicket);  // true
console.log("onlineTicket1 instanceof Object:       ", onlineTicket1 instanceof Object);       // true

// Does onlineTicket1 have printTicket as its own property?
console.log("Has own property 'printTicket':", onlineTicket1.hasOwnProperty("printTicket")); // false (lives on MovieTicket.prototype)
console.log("Does MovieTicket.prototype have 'printTicket':", MovieTicket.prototype.hasOwnProperty("printTicket")); // true
