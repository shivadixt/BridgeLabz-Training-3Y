"use strict";

/**
 * ASSIGNMENT 8 - Q7: Banking Application
 *
 * Requirements:
 * - BankAccount class with private field #balance (ES2022 private class fields).
 * - Methods:
 *   - deposit(amount)
 *   - withdraw(amount) (throws Error if amount <= 0 or insufficient balance)
 *   - getBalance()
 * - Demonstrate:
 *   - Valid deposits and withdrawals
 *   - Invalid withdrawals handled gracefully using try/catch
 *   - Data encapsulation proof (preventing external manipulation of private balance)
 */

class BankAccount {
  // Private field: strictly inaccessible outside this class body
  #balance;

  constructor(accountHolder, initialBalance = 0) {
    this.accountHolder = accountHolder;

    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative.");
    }
    this.#balance = initialBalance;
  }

  // Deposit funds into account
  deposit(amount) {
    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      throw new Error(`Invalid deposit amount: ₹${amount}. Amount must be greater than 0.`);
    }

    this.#balance += amount;
    console.log(`[DEPOSIT] Deposited: ₹${amount} | New Balance: ₹${this.#balance}`);
    return this.#balance;
  }

  // Withdraw funds from account
  withdraw(amount) {
    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      throw new Error(`Invalid withdrawal amount: ₹${amount}. Amount must be greater than 0.`);
    }

    // Check for insufficient balance
    if (amount > this.#balance) {
      throw new Error(
        `Insufficient balance! Attempted withdrawal: ₹${amount}, Available Balance: ₹${this.#balance}`
      );
    }

    this.#balance -= amount;
    console.log(`[WITHDRAWAL] Withdrawn: ₹${amount} | Remaining Balance: ₹${this.#balance}`);
    return this.#balance;
  }

  // Public getter for balance
  getBalance() {
    return this.#balance;
  }
}

// =========================================================================
// Demonstrations
// =========================================================================
console.log("=== Q7: Banking Application & Private Fields Demo ===\n");

const myAccount = new BankAccount("Pooja Hegde", 5000);
console.log(`Account initialized for: ${myAccount.accountHolder}`);
console.log(`Initial Balance: ₹${myAccount.getBalance()}\n`);

// 1. Valid Deposit
console.log("--- 1. Performing Valid Deposits ---");
myAccount.deposit(2500);
myAccount.deposit(1500);
console.log(`Current Balance: ₹${myAccount.getBalance()}\n`);

// 2. Valid Withdrawal
console.log("--- 2. Performing Valid Withdrawal ---");
myAccount.withdraw(3000);
console.log(`Current Balance: ₹${myAccount.getBalance()}\n`);

// 3. Invalid Withdrawal (Insufficient Funds) with try/catch
console.log("--- 3. Testing Overdraft Withdrawal with try/catch ---");
try {
  console.log("Attempting to withdraw ₹10,000...");
  myAccount.withdraw(10000);
} catch (error) {
  console.error("Caught Expected Error:", error.message);
}

// 4. Invalid Negative Amount with try/catch
console.log("\n--- 4. Testing Negative Deposit with try/catch ---");
try {
  console.log("Attempting to deposit -₹500...");
  myAccount.deposit(-500);
} catch (error) {
  console.error("Caught Expected Error:", error.message);
}

console.log(`\nFinal Safe Account Balance: ₹${myAccount.getBalance()}`);

// 5. Verification of Private Field Protection
console.log("\n--- 5. Encapsulation Verification ---");
console.log("Accessing myAccount.balance (non-private property):", myAccount.balance); // undefined
console.log("The private field #balance cannot be read or written from outside the class body.");
