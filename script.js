const wordForm = document.getElementById("word-form");
const wordList = document.getElementById("word-list");
const copyJsonBtn = document.getElementById("copy-json");

// Predefined categories for the dropdown
const categories = [
  "6.basic_life.my_name_is_tuan",
  "7.basic_life.this_is_the_office",
  "8.basic_life.i_have_lunch_at_1230_pm",
  "9.basic_life.how_many_family_members_do_you_have",
  "10.basic_life.i_studied_korean_at_the_library_yesterday",
  "11.basic_life.please_give_me_five_apples",
  "12.basic_life.there_is_a_pharmacy_next_to_the_hospital",
  "13.basic_life.lets_meet_in_front_of_city_hall_at_7_oclock",
  "14.basic_life.i_would_like_to_have_bibimbap",
  "15.basic_life.i_feel_good_because_the_weather_is_clear_and_sunny",

  "16.daily_and_leisure_life.i_usually_play_tennis_when_i_have_time",
  "17.daily_and_leisure_life.i_will_go_visit_jejudo_over_the_break",
  "18.daily_and_leisure_life.i_go_by_bus_or_subway",
  "19.daily_and_leisure_life.this_is_hangook_furniture_isnt_it",
  "20.daily_and_leisure_life.ill_wash_the_dishes",
  "21.daily_and_leisure_life.would_you_like_some_help_setting_the_table",
  "22.daily_and_leisure_life.do_not_jaywalk",
  "23.daily_and_leisure_life.use_both_hands_when_giving_something_to_your_elders",
  "24.daily_and_leisure_life.i_watch_korean_movies_to_study_the_korean_language",
  "25.daily_and_leisure_life.i_go_to_church_every_sunday",

  "26.public_institutions.please_take_this_medicine_after_a_meal",
  "27.public_institutions.where_does_it_hurt",
  "28.public_institutions.i_came_to_open_a_bank_account",
  "29.public_institutions.i_would_like_to_send_a_postcard_to_the_philippines",
  "30.public_institutions.can_i_learn_taekwondo_there",
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
