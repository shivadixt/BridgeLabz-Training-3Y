"use strict";

/**
 * ASSIGNMENT 7 - Q6: Real-Time Table Filter Using input Event
 *
 * Requirements:
 * - Student Table with columns: Name, Branch, CGPA.
 * - Real-time filtering using the 'input' event on a search input box.
 * - Filtering must be case-insensitive across all student fields.
 * - Displays a dedicated "No results found" row when no student matches.
 *
 * Supports both:
 * - Browser: Interactive table with real-time DOM row filtering and feedback.
 * - Node.js / Console: Filter function testing multiple queries (case-insensitivity, partial match, no results).
 */

// Student dataset
const studentData = [
  { name: "Aarav Sharma", branch: "Computer Science", cgpa: 9.4 },
  { name: "Priya Patel", branch: "Information Technology", cgpa: 8.9 },
  { name: "Rohan Verma", branch: "Mechanical Engineering", cgpa: 7.8 },
  { name: "Sneha Reddy", branch: "Electronics & Communication", cgpa: 9.1 },
  { name: "Vikram Singh", branch: "Civil Engineering", cgpa: 8.2 },
  { name: "Ananya Iyer", branch: "Computer Science", cgpa: 9.6 }
];

/**
 * Pure filter function to evaluate matching students
 */
function filterStudents(students, searchQuery) {
  const query = String(searchQuery || "").toLowerCase().trim();
  if (!query) return students;

  return students.filter((student) => {
    const nameMatch = student.name.toLowerCase().includes(query);
    const branchMatch = student.branch.toLowerCase().includes(query);
    const cgpaMatch = String(student.cgpa).toLowerCase().includes(query);
    return nameMatch || branchMatch || cgpaMatch;
  });
}

// =========================================================================
// Browser DOM Implementation
// =========================================================================
if (typeof document !== "undefined") {
  const tableContainer = document.createElement("div");
  tableContainer.id = "table-filter-app";
  tableContainer.innerHTML = `
    <style>
      #table-filter-app { font-family: Arial, sans-serif; max-width: 650px; margin: 25px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
      #table-filter-app h2 { margin-top: 0; }
      .search-box { width: 100%; box-sizing: border-box; padding: 10px 12px; font-size: 14px; margin-bottom: 16px; border: 1px solid #ccc; border-radius: 4px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
      th { background-color: #f3f4f6; color: #374151; font-weight: bold; }
      tr:hover { background-color: #f9fafb; }
      .no-results { text-align: center; color: #dc2626; font-style: italic; padding: 16px; }
    </style>

    <h2>Real-Time Student Directory</h2>
    <input type="text" id="studentSearchInput" class="search-box" placeholder="Search by name, branch, or CGPA..." />

    <table id="studentTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Branch</th>
          <th>CGPA</th>
        </tr>
      </thead>
      <tbody id="studentTableBody"></tbody>
    </table>
  `;
  document.body.appendChild(tableContainer);

  const searchInput = document.getElementById("studentSearchInput");
  const tableBody = document.getElementById("studentTableBody");

  // Render rows dynamically
  function renderTable(matchingList) {
    tableBody.innerHTML = "";

    if (matchingList.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `<td colspan="3" class="no-results">No results found</td>`;
      tableBody.appendChild(emptyRow);
      return;
    }

    matchingList.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.branch}</td>
        <td>${student.cgpa}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Real-time filtering on input event
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value;
    const filtered = filterStudents(studentData, query);
    renderTable(filtered);
  });

  // Initial render
  renderTable(studentData);
}

// =========================================================================
// Node.js Console Demonstration
// =========================================================================
console.log("=== Q6: Real-Time Table Filter Test Simulation ===");

const testQueries = ["computer", "CIVIL", "9.6", "Mechanical", "nonexistent_term"];

testQueries.forEach((q) => {
  const results = filterStudents(studentData, q);
  console.log(`\nQuery: "${q}" -> Found ${results.length} result(s):`);
  if (results.length > 0) {
    console.table(results);
  } else {
    console.log("No results found");
  }
});
