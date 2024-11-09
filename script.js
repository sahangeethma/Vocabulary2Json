const wordForm = document.getElementById("word-form");
const wordList = document.getElementById("word-list");
const copyJsonBtn = document.getElementById("copy-json");

// Predefined categories for the dropdown
const categories = [
  {
    section: "Preparatory Lessons",
    disabled: true,
    items: ["1-4. Hello", "5. Have A Great Weekend"],
  },
  {
    section: "Basic Life",
    disabled: true,
    items: [
      "6. My Name Is Tuan",
      "7. This Is The Office",
      "8. I Have Lunch At 12:30 Pm",
      "9. How Many Family Members Do You Have?",
      "10. I Studied Korean At The Library Yesterday",
      "11. Please Give Me Five Apples",
      "12. There Is A Pharmacy Next To The Hospital",
      "13. Let's Meet In Front Of City Hall At 7 O'clock",
      "14. I Would Like To Have Bibimbap",
      "15. I Feel Good Because The Weather Is Clear And Sunny",
    ],
  },
  {
    section: "Daily and Leisure Life",
    disabled: true,
    items: [
      "16. I Usually Go Play Tennis When I Have Time",
      "17. I Will Go Visit Jejudo Over The Break",
      "18. I Go By Bus Or By Subway",
      "19. This Is Hangook Furniture, Isn't It?",
      "20. I’ll Wash The Dishes",
      "21. Would You Like Some Help Setting The Table?",
      "22. Do Not Jaywalk",
      "23. Use Both Hands When Giving Something To Your Elders",
      "24. I Watch Korean Movies To Study The Korean Language",
      "25. I Go To Church Every Sunday",
    ],
  },
  {
    section: "Public Institutions",
    disabled: true,
    items: [
      "26. Please Take This Medicine After A Meal",
      "27. Where Does It Hurt?",
      "28. I Came To Open A Bank Account",
      "29. I Would Like To Send A Postcard To The Philippines",
      "30. Can I Learn Taekwondo There?",
    ],
  },
  {
    section: "Understanding Korea",
    disabled: true,
    items: [
      "31. It's Much Fresher In My Hometown Than It Is In Seoul",
      "32. We Eat Samgyetang On The Hottest Day Of The Year In Summer",
      "33. You Can Try Making Songpyeon",
      "34. How About Giving Baby Clothes As A Gift?",
      "35. You Know That Korean Dramas Are Fun, Don't You?",
    ],
  },
  {
    section: "Workplace Culture",
    disabled: true,
    items: [
      "36. It's Good That You Look Neat And Tidy",
      "37. Keep The Entrance Closed",
      "38. I Like Working Here",
      "39. I Was Told That We Would Have A Company Dinner Today",
      "40. If You Felt Uncomfortable, Then That Was Sexual Harassment",
    ],
  },
  {
    section: "Work Life",
    disabled: true,
    items: [
      "41. Try A Screwdriver",
      "42. Do You Know How To Operate This Machine?",
      "43. Please Move The Rebar",
      "44. It's Because I Was Painting",
      "45. I Have My Hoe Ready",
      "46. Let's Keep An Eye On Them",
      "47. It's Important To Keep Track Of Stock",
      "48. Please Make Sure That You Don't Get Injured",
      "49. If You Don't Wear Safety Shoes, You May Get Injured",
      "50. You Should Take Credit For This",
    ],
  },
  {
    section: "Laws And Regulations",
    disabled: true,
    items: [
      "51. I Would Like To Work In Korea",
      "52. I Have Been Offered Pretty Decent Working Conditions",
      "53. I'm On My Way To Apply For Alien Registration",
      "54. I Plan To File An Insurance Claim",
      "55. Please Check Your Pay Stub",
      "56. Have You Planned Your Summer Vacation?",
      "57. I Would Like To Change My Work Location",
      "58. You Have To Report To The Office After Extending Your Stay",
    ],
  },
  {
    section: "Work Life Team",
    disabled: true,
    items: ["59. Industrial Safety I", "60. Industrial Safety II"],
  },
];
let wordData = [];

// // Initialize categories in wordData
// categories.forEach((category) => {
//   wordData[category] = [];
// });

// // Function to create category dropdown
// function createCategoryDropdown() {
//   const select = document.getElementById("word-category");
//   categories.forEach((category) => {
//     const option = document.createElement("option");
//     option.value = category;
//     option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
//     select.appendChild(option);
//   });
// }

// Initialize wordData for each category
categories.forEach((section) => {
  section.items.forEach((item) => {
    wordData[item] = [];
  });
});

// Function to create category dropdown
function createCategoryDropdown() {
  const select = document.getElementById("word-category");

  categories.forEach((section) => {
    // Create disabled option for the section title
    const sectionOption = document.createElement("option");
    sectionOption.textContent = section.section;
    sectionOption.disabled = section.disabled;
    sectionOption.style.fontWeight = "bold"; // Optional: to make section title bold
    select.appendChild(sectionOption);

    // Create options for each item in the section
    section.items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      select.appendChild(option);
    });
  });
}

// Call the function to populate the dropdown
createCategoryDropdown();

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
// createCategoryDropdown();

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
