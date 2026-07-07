const TOTAL_SECONDS = 12 * 60;
const countdownDisplay = document.getElementById("countdownDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const progressBar = document.getElementById("progressBar");

let totalSeconds = TOTAL_SECONDS;
let timerId = null;
let isRunning = false;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateProgress() {
  if (!progressBar) return;
  const percent = Math.round(((TOTAL_SECONDS - totalSeconds) / TOTAL_SECONDS) * 100);
  progressBar.style.width = `${percent}%`;
  progressBar.textContent = `${percent}%`;
  progressBar.setAttribute("aria-valuenow", String(percent));
}

function updateDisplay() {
  if (countdownDisplay) {
    countdownDisplay.textContent = formatTime(totalSeconds);
  }
  updateProgress();
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  updateProgress();
  timerId = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds -= 1;
      updateDisplay();
    } else {
      stopTimer();
      isRunning = false;
      alert("Time's Up!");
    }
  }, 1000);
}

startBtn?.addEventListener("click", () => {
  startTimer();
});

pauseBtn?.addEventListener("click", () => {
  stopTimer();
  isRunning = false;
});

resetBtn?.addEventListener("click", () => {
  stopTimer();
  isRunning = false;
  totalSeconds = TOTAL_SECONDS;
  updateDisplay();
});

updateDisplay();
const timerActionBtn = document.getElementById("timerActionBtn");
timerActionBtn?.addEventListener("click", () => {
  startTimer();
});

const receiptButton = document.getElementById("recipt");
const receiptBox = document.getElementById("receiptBox");

receiptButton?.addEventListener("click", () => {
  receiptBox?.classList.toggle("hidden");
});

const nextBtn = document.getElementById("next");
const stepsDropdown = document.getElementById("stepsDropdown");
const stepBoxes = stepsDropdown?.querySelectorAll(".ingredient-box");
let currentStepIndex = 0;

function clearStepHighlight() {
  stepBoxes?.forEach((box) => box.classList.remove("active"));
}

function showCurrentStep() {
  if (!stepBoxes?.length) return;
  if (stepsDropdown) {
    stepsDropdown.open = true;
  }
  const stepBox = stepBoxes[currentStepIndex];
  clearStepHighlight();
  stepBox.classList.add("active");
  stepBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

nextBtn?.addEventListener("click", () => {
  showCurrentStep();
  currentStepIndex = (currentStepIndex + 1) % stepBoxes.length;
});

let start_cooking = document.getElementById("startCookingBtn");
let procedure = document.getElementById("procedure");
start_cooking?.addEventListener("click", () => {
  procedure.style.border = "2px solid red";
});
