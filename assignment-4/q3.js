"use strict";

/**
 * Question 3: Library Management System (Classes + Objects)
 * 
 * Logic Explanation:
 * Defines a Book class representing library catalog items.
 * Properties: title, author, isbn, isIssued (default: false).
 * 
 * Methods:
 * - issueBook(): Marks the book as issued if available; otherwise reports already issued.
 * - returnBook(): Marks the book as available again.
 * - getDetails(): Returns a formatted string with book details and availability status.
 * 
 * Operations:
 * 1. Creates an array of book objects.
 * 2. Displays all available books (isIssued === false).
 * 3. Provides a helper function to search and issue a book by ISBN.
 */

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isIssued = false;
  }

  // Method to issue the book
  issueBook() {
    if (this.isIssued) {
      return false; // Already issued
    }
    this.isIssued = true;
    return true; // Successfully issued
  }

  // Method to return the book
  returnBook() {
    this.isIssued = false;
  }

  // Helper method to display book information
  getDetails() {
    const status = this.isIssued ? "[ISSUED]" : "[AVAILABLE]";
    return `${status.padEnd(12)} "${this.title}" by ${this.author.padEnd(18)} (ISBN: ${this.isbn})`;
  }
}

// Create an array of book objects
const library = [
  new Book("Atomic Habits", "James Clear", "9780735211292"),
  new Book("Clean Code", "Robert C. Martin", "9780132350884"),
  new Book("The Alchemist", "Paulo Coelho", "9780061122415"),
  new Book("To Kill a Mockingbird", "Harper Lee", "9780060935467"),
  new Book("1984", "George Orwell", "9780451524935")
];

// Display all available books
function displayAvailableBooks() {
  console.log("\n--- Currently Available Books in Library ---");
  const availableBooks = library.filter((book) => !book.isIssued);

  if (availableBooks.length === 0) {
    console.log("No books are currently available.");
  } else {
    for (let i = 0; i < availableBooks.length; i++) {
      console.log(` ${i + 1}. ${availableBooks[i].getDetails()}`);
    }
  }
}

// Issue a book by searching its ISBN
function issueBookByIsbn(searchIsbn) {
  console.log(`\nAttempting to issue book with ISBN: ${searchIsbn}...`);
  const book = library.find((item) => item.isbn === searchIsbn);

  if (!book) {
    console.log(`[FAILED] No book found with ISBN: ${searchIsbn}`);
    return;
  }

  if (book.issueBook()) {
    console.log(`[SUCCESS] "${book.title}" has been successfully issued!`);
  } else {
    console.log(`[UNAVAILABLE] "${book.title}" is already issued to someone else.`);
  }
}

console.log("=== Library Management System ===");

// 1. Initial inventory display
displayAvailableBooks();

// 2. Issue a book by ISBN
issueBookByIsbn("9780132350884"); // Clean Code

// 3. Try issuing the same book again (should fail)
issueBookByIsbn("9780132350884");

// 4. Issue another book
issueBookByIsbn("9780061122415"); // The Alchemist

// 5. Try issuing a non-existent ISBN
issueBookByIsbn("9999999999999");

// 6. Display available books after transactions
displayAvailableBooks();
