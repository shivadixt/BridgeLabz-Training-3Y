"use strict";

/**
 * ASSIGNMENT 7 - Q5: Image Gallery with Modal Preview
 *
 * Requirements:
 * - Image grid displaying 6 images.
 * - Clicking any image opens a modal popup displaying an enlarged version.
 * - Clicking outside the modal (on the background overlay) closes the modal.
 * - Uses event.stopPropagation() on the modal container so clicking inside the modal does NOT close it.
 *
 * Supports both:
 * - Browser: Interactive grid, modal popup with stopPropagation() event flow, and close controls.
 * - Node.js / Console: Simulation of event bubbling and stopPropagation behavior.
 */

// Sample Gallery Data (6 Images)
const galleryImages = [
  { id: 1, title: "Mountain Sunset", thumb: "https://picsum.photos/id/10/300/200", full: "https://picsum.photos/id/10/800/600" },
  { id: 2, title: "Misty Forest", thumb: "https://picsum.photos/id/28/300/200", full: "https://picsum.photos/id/28/800/600" },
  { id: 3, title: "Pacific Seashore", thumb: "https://picsum.photos/id/16/300/200", full: "https://picsum.photos/id/16/800/600" },
  { id: 4, title: "City Skyline", thumb: "https://picsum.photos/id/48/300/200", full: "https://picsum.photos/id/48/800/600" },
  { id: 5, title: "Autumn Pathway", thumb: "https://picsum.photos/id/54/300/200", full: "https://picsum.photos/id/54/800/600" },
  { id: 6, title: "Starry Night Lake", thumb: "https://picsum.photos/id/29/300/200", full: "https://picsum.photos/id/29/800/600" }
];

// =========================================================================
// Browser DOM Implementation
// =========================================================================
if (typeof document !== "undefined") {
  const galleryApp = document.createElement("div");
  galleryApp.id = "gallery-app";
  galleryApp.innerHTML = `
    <style>
      #gallery-app { font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; padding: 15px; }
      .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
      .gallery-item { cursor: pointer; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.15); transition: transform 0.2s; }
      .gallery-item:hover { transform: scale(1.03); }
      .gallery-item img { width: 100%; height: 180px; object-fit: cover; display: block; }
      .gallery-item p { margin: 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; }

      /* Modal Overlay (Backdrop) */
      .modal-overlay {
        display: none;
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .modal-overlay.active { display: flex; }

      /* Modal Content Box */
      .modal-content {
        background: #ffffff;
        padding: 16px;
        border-radius: 8px;
        max-width: 650px;
        width: 90%;
        position: relative;
        box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      }
      .modal-content img { width: 100%; max-height: 450px; object-fit: contain; border-radius: 4px; }
      .modal-content h3 { margin: 10px 0 0 0; text-align: center; font-size: 16px; color: #1f2937; }
      .close-btn {
        position: absolute;
        top: 8px; right: 12px;
        font-size: 24px; font-weight: bold;
        color: #6b7280; cursor: pointer;
      }
      .close-btn:hover { color: #111; }
    </style>

    <h2>Image Gallery with Modal Preview</h2>
    <p>Click any thumbnail to open the modal preview:</p>
    <div class="gallery-grid" id="galleryGrid"></div>

    <!-- Modal Popup Structure -->
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal-content" id="modalContent">
        <span class="close-btn" id="closeModalBtn">&times;</span>
        <img id="modalImage" src="" alt="Enlarged Preview" />
        <h3 id="modalCaption"></h3>
      </div>
    </div>
  `;
  document.body.appendChild(galleryApp);

  const galleryGrid = document.getElementById("galleryGrid");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Populate gallery items
  galleryImages.forEach((imgData) => {
    const card = document.createElement("div");
    card.className = "gallery-item";
    card.innerHTML = `
      <img src="${imgData.thumb}" alt="${imgData.title}" />
      <p>${imgData.title}</p>
    `;
    card.addEventListener("click", () => {
      openModal(imgData.full, imgData.title);
    });
    galleryGrid.appendChild(card);
  });

  function openModal(fullSrc, title) {
    modalImage.src = fullSrc;
    modalCaption.textContent = title;
    modalOverlay.classList.add("active");
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
  }

  // 1. Close modal when clicking outside (on the overlay backdrop)
  modalOverlay.addEventListener("click", () => {
    console.log("Clicked on modal backdrop -> Closing modal");
    closeModal();
  });

  // 2. STOP PROPAGATION inside modal content so clicking inside does NOT trigger overlay click
  modalContent.addEventListener("click", (event) => {
    console.log("Clicked inside modal content -> event.stopPropagation() called");
    event.stopPropagation();
  });

  // 3. Close button explicitly closes the modal
  closeModalBtn.addEventListener("click", () => {
    closeModal();
  });
}

// =========================================================================
// Node.js Console Demonstration
// =========================================================================
console.log("=== Q5: Image Gallery & stopPropagation Demonstration ===");

class MockModalEvent {
  constructor(targetName) {
    this.targetName = targetName;
    this.propagationStopped = false;
  }
  stopPropagation() {
    this.propagationStopped = true;
  }
}

function handleMockClick(target) {
  const event = new MockModalEvent(target);

  if (target === "modalContent" || target === "modalImage") {
    event.stopPropagation();
    console.log(`[Click on ${target}]: stopPropagation() invoked -> Event does NOT bubble to overlay. Modal stays OPEN.`);
    return false; // modal stays open
  } else if (target === "modalOverlay") {
    console.log(`[Click on ${target}]: Event reached overlay -> Modal is CLOSED.`);
    return true; // modal closes
  }
}

console.log("\nSimulating Click Events:");
handleMockClick("modalContent");
handleMockClick("modalImage");
handleMockClick("modalOverlay");
