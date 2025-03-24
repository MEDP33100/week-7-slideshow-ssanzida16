const apiUrl = "https://api.thedogapi.com/v1/images/search?limit=10";
const bgColors = ["#f3e5f5", "#ffccbc", "#b3e5fc", "#c8e6c9", "#ffebee"]; // Lavender, Peach, Light Blue, Mint Green, Light Pink

let currentIndex = 0;
let slidesData = [];

// Fetch Dog Data from API
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to load data");
    }
    slidesData = await response.json();
    displaySlide(currentIndex);
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("slides").innerHTML = "<p>🐾 Error loading doggos. Try again later!</p>";
  }
}

// Display the Current Slide
function displaySlide(index) {
  const slidesContainer = document.getElementById("slides");
  slidesContainer.innerHTML = `
    <div class="slides">
      <img src="${slidesData[index].url}" alt="Cute Doggo" />
    </div>
    <div class="caption-container">
      🐾 Doggo ${index + 1} of ${slidesData.length}
    </div>
  `;
  
  // Change background color dynamically
  changeBackgroundColor(index);
}

// Change Background Color
function changeBackgroundColor(index) {
  document.body.style.backgroundColor = bgColors[index % bgColors.length];
}

// Previous Slide
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex === 0) ? slidesData.length - 1 : currentIndex - 1;
  displaySlide(currentIndex);
});

// Next Slide
document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex === slidesData.length - 1) ? 0 : currentIndex + 1;
  displaySlide(currentIndex);
});

// Initial Fetch
fetchData();
