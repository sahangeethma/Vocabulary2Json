const wordForm = document.getElementById("word-form");
const wordList = document.getElementById("word-list");
const copyJsonBtn = document.getElementById("copy-json");

let wordData = [];

// Function to render the word list
function renderWordList() {
  wordList.innerHTML = "";
  wordData.forEach((word, index) => {
    const wordItem = document.createElement("div");
    wordItem.className = "word-item";
    wordItem.innerHTML = `
      <div class="d-grid gap-2 d-flex justify-content-between mb-2">
        <span class="fw-bold justify-content-start">${word.korean}</span>
        <span class="justify-content-start">${word.sinhalese}</span>
        <div class="d-grid gap-2 d-flex justify-content-end">
          <button class="btn btn-danger btn-sm" onclick="deleteWord(${index})">Delete</button>
        </div>
      </div>
    `;
    wordList.appendChild(wordItem);
  });
}

// Function to add a new word
function addWord(korean, sinhalese) {
  wordData.push({ korean, sinhalese });
  renderWordList();
}

// Function to delete a word
function deleteWord(index) {
  wordData.splice(index, 1);
  renderWordList();
}

// Handle form submission
wordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const koreanWord = document.getElementById("korean-word").value;
  const sinhaleseWord = document.getElementById("sinhalese-word").value;
  addWord(koreanWord, sinhaleseWord);
  wordForm.reset();
});

// Handle copy JSON button click
copyJsonBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(JSON.stringify(wordData));
  alert("Word data copied to clipboard!");
});
