let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function updateSearchHistory(city) {
  if (!searchHistory.includes(city)) {
    searchHistory.unshift(city);

    const maxHistoryLength = 5;
    searchHistory = searchHistory.slice(0, maxHistoryLength);

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
}

function displaySearchHistory() {
  const historyList = document.getElementById("historyList");

  historyList.innerHTML = "";

  searchHistory.forEach((city) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");

    button.id = `button-list`;

    listItem.textContent = city;
    button.textContent = "\u274C";

    listItem.appendChild(button);

    button.addEventListener("click", () => {
      deleteItem(city);
    });

    listItem.addEventListener("click", () => {
      performSearch(city);
    });

    historyList.appendChild(listItem);
  });
}

function performSearch(city) {
  updateSearchHistory(city);

  displaySearchHistory();
}

function deleteItem(city) {
  const index = searchHistory.indexOf(city);

  if (index !== -1) {
    searchHistory.splice(index, 1);
    displaySearchHistory();
  } else {
    console.warn(`City '${city}' not found in search history.`);
  }
}

function clearHistory() {
  const historyList = document.getElementById("historyList");

  if (historyList) {
    historyList.innerHTML = "";

    localStorage.removeItem("searchHistory");
  }
}

const clearHistoryBtn = document.getElementById("clearHistoryBtn");
if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener("click", clearHistory);
}

displaySearchHistory();
