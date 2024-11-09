const wordForm = document.getElementById("word-form");
const wordList = document.getElementById("word-list");
const copyJsonBtn = document.getElementById("copy-json");

// Predefined categories for the dropdown
const categories = [
  "numbers",
  "greetings",
  "food",
  "colors",
  "family",
  "weather",
  "animals",
];
let wordData = [];

// Initialize categories in wordData
categories.forEach((category) => {
  wordData[category] = [];
});

// Function to create category dropdown
function createCategoryDropdown() {
  const select = document.getElementById("word-category");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    select.appendChild(option);
  });
}

// Function to render the word list grouped by category
function renderWordList() {
  wordList.innerHTML = "";

  // Create sections for each category
  Object.keys(wordData).forEach((category) => {
    if (wordData[category].length > 0) {
      const categorySection = document.createElement("div");
      categorySection.className = "category-section mb-4";

      // Category header
      const categoryHeader = document.createElement("h4");
      categoryHeader.className = "mb-3 text-primary";
      categoryHeader.textContent =
        category.charAt(0).toUpperCase() + category.slice(1);
      categorySection.appendChild(categoryHeader);

      // Words in this category
      wordData[category].forEach((word, index) => {
        const wordItem = document.createElement("div");
        wordItem.className = "word-item";
        wordItem.innerHTML = `
          <div class="d-grid gap-2 d-flex justify-content-between mb-2">
            <span class="fw-bold justify-content-start">${word.korean}</span>
            <span class="justify-content-start">${word.sinhalese}</span>
            <div class="d-grid gap-2 d-flex justify-content-end">
              <button class="btn btn-danger btn-sm" onclick="deleteWord('${category}', ${index})">Delete</button>
            </div>
          </div>
        `;
        categorySection.appendChild(wordItem);
      });

      wordList.appendChild(categorySection);
    }
  });
}

// Function to add a new word
function addWord(category, korean, sinhalese) {
  if (!wordData[category]) {
    wordData[category] = [];
  }
  wordData[category].push({ korean, sinhalese });
  renderWordList();
}

// Function to delete a word
function deleteWord(category, index) {
  wordData[category].splice(index, 1);
  renderWordList();
}

// Initialize category dropdown
createCategoryDropdown();

document.getElementById("open-json").addEventListener("click", () => {
  window.location.replace(
    "https://github.com/sahangeethma/KoreanQuizV3/edit/main/words.json"
  );
});

// Handle form submission
wordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.getElementById("word-category").value;
  const koreanWord = document.getElementById("korean-word").value;
  const sinhaleseWord = document.getElementById("sinhalese-word").value;
  addWord(category, koreanWord, sinhaleseWord);
  wordForm.reset();
});

// Handle copy JSON button click
copyJsonBtn.addEventListener("click", () => {
  const structuredData = {};
  Object.keys(wordData).forEach((category) => {
    if (wordData[category].length > 0) {
      structuredData[category] = wordData[category];
    }
  });
  navigator.clipboard.writeText(JSON.stringify(structuredData, null, 2));
  alert("Word data copied to clipboard!");
});
