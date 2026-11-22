"use strict";

/**
 * ASSIGNMENT 8 - Q1: Student Result Processing (reduce + Classes)
 *
 * Requirements:
 * - Create a Student class with properties: name, marks[].
 * - Method calculateAverage() using Array.prototype.reduce().
 * - Method getGrade() returning:
 *   - "A" (Average >= 90)
 *   - "B" (Average >= 75 and < 90)
 *   - "C" (Average >= 50 and < 75)
 *   - "F" (Average < 50)
 * - Test the class with at least 3 students and log outputs.
 */

class Student {
  constructor(name, marks = []) {
    this.name = name;
    this.marks = marks;
  }

  // Calculate average of marks using reduce()
  calculateAverage() {
    if (!this.marks || this.marks.length === 0) {
      return 0;
    }

    const totalMarks = this.marks.reduce((accumulator, currentMark) => {
      return accumulator + currentMark;
    }, 0);

    const average = totalMarks / this.marks.length;
    return Number(average.toFixed(2));
  }

  // Return letter grade based on calculated average
  getGrade() {
    const avg = this.calculateAverage();

    if (avg >= 90) return "A";
    if (avg >= 75) return "B";
    if (avg >= 50) return "C";
    return "F";
  }

  // Helper method to display complete student result
  displayResult() {
    const avg = this.calculateAverage();
    const grade = this.getGrade();
    console.log(`Student: ${this.name} | Marks: [${this.marks.join(", ")}] | Average: ${avg} | Grade: ${grade}`);
  }
}

// =========================================================================
// Testing with 3 Students
// =========================================================================
console.log("=== Q1: Student Result Processing Demo ===");

const student1 = new Student("Aarav Sharma", [95, 92, 88, 94, 91]); // Expected: Grade A
const student2 = new Student("Priya Patel", [78, 82, 75, 80, 85]);  // Expected: Grade B
const student3 = new Student("Rohan Verma", [52, 48, 60, 55, 50]);  // Expected: Grade C
const student4 = new Student("Vikram Singh", [40, 35, 45, 30, 42]); // Expected: Grade F

student1.displayResult();
student2.displayResult();
student3.displayResult();
student4.displayResult();
