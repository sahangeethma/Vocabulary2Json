const wordForm = document.getElementById("word-form");
const wordList = document.getElementById("word-list");
const copyJsonBtn = document.getElementById("copy-json");

// Predefined categories for the dropdown
const categories = [
  {
    section: "Preparatory Lessons",
    disabled: true,
    items: [
      "1-2. 한글 익히기",
      "3-4. 안녕하세요",
      "5. 주말 잘 보내세요"
    ],
  },
  {
    section: "Basic Life",
    disabled: true,
    items: [
      "6. 저는 투안입니다",
      "7. 여기가 사무실이에요",
      "8. 12시 30분에 점심을 먹어요",
      "9. 가족이 몇 명이에요?",
      "10. 어제 도서관에서 한국어를 공부했어요",
      "11. 사과 다섯 개 주세요",
      "12. 병원 옆에 약국이 있어요",
      "13. 시청 앞에서 일곱 시에 만나요",
      "14. 저는 비빔밥을 먹을래요",
      "15. 날씨가 맑아서 기분이 좋아요",
    ],
  },
  {
    section: "Daily and Leisure Life",
    disabled: true,
    items: [
      "16. 시간이 있을 때 주로 테니스를 치러 가요",
      "17. 휴가 때 제주도에 다녀올 거예요",
      "18. 버스나 지하철을 타고 가요",
      "19. 거기 한국가구지요?",
      "20. 저는 설거지를 할게요",
      "21. 상 차리는 것을 도와줄까요?",
      "22. 무단횡단을 하면 안 돼요",
      "23. 어르신께는 두 손으로 물건을 드려야 돼요",
      "24. 한국 영화를 보면서 공부해요",
      "25. 일요일마다 교회에 가요",
    ],
  },
  {
    section: "Public Institutions",
    disabled: true,
    items: [
      "26. 밥을 먹은 후에 이 약을 드세요",
      "27. 어디가 아프십니까?",
      "28. 통장을 만들려고 왔어요",
      "29. 필리핀으로 엽서를 보내고 싶은데요",
      "30. 거기에서 태권도를 배울 수 있어요?",
    ],
  },
  {
    section: "Understanding Korea",
    disabled: true,
    items: [
      "31. 우리 고향은 서울보다 공기가 맑아요",
      "32. 복날에는 삼계탕을 먹어요",
      "33. 송편을 만드는 체험도 할 수 있어요",
      "34. 아기 옷을 선물하는 게 어때요?",
      "35. 한국 드라마가 재미있잖아요",
    ],
  },
  {
    section: "Workplace Culture",
    disabled: true,
    items: [
      "36. 단정한 모습이 좋아 보여요",
      "37. 출입문은 꼭 닫읍시다",
      "38. 일할 맛이 나요",
      "39. 오늘 회식을 하자고 해요",
      "40. 불쾌감을 느꼈다면 그건 성희롱이에요",
    ],
  },
  {
    section: "Work Life",
    disabled: true,
    items: [
      "41. 드라이버로 해 보세요",
      "42. 이 기계 어떻게 작동하는지 알아요?",
      "43. 철근을 옮겨 놓으세요",
      "44. 페인트 작업을 했거든요",
      "45. 허리를 챙겼는데요",
      "46. 더 신경 쓰도록 하자",
      "47. 재고를 파악하는 것이 중요해요",
      "48. 다치지 않도록 조심하세요",
      "49. 안전화를 안 신으면 다칠 수 있어요",
      "50. 열심히 해 준 덕분이에요",
    ],
  },
  {
    section: "Laws and Regulations",
    disabled: true,
    items: [
      "51. 한국에 가서 일을 하고 싶은데요",
      "52. 근로 조건이 좋은 편이에요",
      "53. 외국인 등록을 하러 가요",
      "54. 보험금을 신청하려고 해요",
      "55. 급여 명세서를 확인해 보세요",
      "56. 이번 여름 휴가 계획은 세웠어요?",
      "57. 사업장을 변경하고 싶은데",
      "58. 체류 기간을 연장한 후에 꼭 신고해야 해",
    ],
  },
  {
    section: "Work Life Team",
    disabled: true,
    items: ["59. 산업 안전Ⅰ", "60. 산업 안전Ⅱ"],
  },
];

let wordData = [];

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
    "https://github.com/sahangeethma/KoreanQuizV4/edit/main/words.json"
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
