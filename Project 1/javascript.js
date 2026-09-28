let count = 0;

const countDisplay = document.getElementById("count");

const updateCount = (amount) => {
  count += amount;
  countDisplay.textContent = count;
};

document.getElementById("increase").addEventListener("click", () => {
  updateCount(1);
});

document.getElementById("decrease").addEventListener("click", () => {
  updateCount(-1);
});

document.getElementById("reset").addEventListener("click", () => {
  count = 0;
  countDisplay.textContent = count;
});