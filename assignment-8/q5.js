"use strict";

/**
 * ASSIGNMENT 8 - Q5: Ride-Sharing Application
 *
 * Requirements:
 * - User class with properties: name, rating.
 * - Driver class that inherits from User and adds vehicle details.
 * - Trip class with properties: fromLocation, toLocation, distance.
 * - calculateFare() method inside Trip based on distance.
 * - Throws an Error if distance is negative, non-numeric, or not provided.
 * - Uses try/catch to handle errors gracefully.
 */

// Base Class: User
class User {
  constructor(name, rating) {
    this.name = name;
    this.rating = Number(rating);
  }

  getProfile() {
    return `${this.name} (Rating: ${this.rating}/5)`;
  }
}

// Derived Class: Driver
class Driver extends User {
  constructor(name, rating, vehicleModel, vehicleNumber) {
    super(name, rating);
    this.vehicleModel = vehicleModel;
    this.vehicleNumber = vehicleNumber;
  }

  getDriverDetails() {
    return `${this.getProfile()} | Vehicle: ${this.vehicleModel} [${this.vehicleNumber}]`;
  }
}

// Trip Class
class Trip {
  constructor(rider, driver, fromLocation, toLocation, distance) {
    this.rider = rider;
    this.driver = driver;
    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.distance = distance;
  }

  /**
   * Calculates trip fare: Base fare (₹50) + ₹14 per km
   */
  calculateFare(ratePerKm = 14, baseFare = 50) {
    // 1. Check if distance is provided and is a valid number
    if (this.distance === undefined || this.distance === null || typeof this.distance !== "number" || isNaN(this.distance)) {
      throw new Error(`Distance must be a valid number. Received: ${this.distance}`);
    }

    // 2. Check if distance is non-negative
    if (this.distance < 0) {
      throw new Error(`Distance cannot be negative. Received: ${this.distance} km`);
    }

    const totalFare = baseFare + this.distance * ratePerKm;
    return Number(totalFare.toFixed(2));
  }

  getTripSummary() {
    return `Route: ${this.fromLocation} -> ${this.toLocation} (${this.distance} km)`;
  }
}

// Helper to execute and safely handle fare calculation
function bookAndBillTrip(trip) {
  console.log(`\n--- Booking Details ---`);
  console.log(`Rider:  ${trip.rider.getProfile()}`);
  console.log(`Driver: ${trip.driver.getDriverDetails()}`);
  console.log(trip.getTripSummary());

  try {
    const fare = trip.calculateFare();
    console.log(`Fare Status: SUCCESS | Total Fare: ₹${fare}`);
  } catch (error) {
    console.error(`Fare Status: ERROR | ${error.message}`);
  }
}

// =========================================================================
// Demonstrations
// =========================================================================
console.log("=== Q5: Ride-Sharing Application Demo ===");

const rider1 = new User("Tanmay Joshi", 4.8);
const driver1 = new Driver("Harish Nair", 4.9, "Toyota Innova", "MH-02-CB-1234");

// Scenario 1: Valid Trip
const validTrip = new Trip(rider1, driver1, "Andheri East", "Bandra Kurla Complex", 12.5);
bookAndBillTrip(validTrip);

// Scenario 2: Invalid Trip with Negative Distance
const negativeDistanceTrip = new Trip(rider1, driver1, "Connaught Place", "Noida Sector 18", -8);
bookAndBillTrip(negativeDistanceTrip);

// Scenario 3: Invalid Trip with Missing Distance
const missingDistanceTrip = new Trip(rider1, driver1, "Indiranagar", "Electronic City", undefined);
bookAndBillTrip(missingDistanceTrip);
