const TOTAL_BAKE_SECONDS = 12 * 60;

const ingredientsToggle = document.getElementById("ingredientsToggle");
const ingredientsList = document.getElementById("ingredientsList");
const ingredientsIcon = document.getElementById("ingredientsIcon");

const stepsToggle = document.getElementById("stepsToggle");
const stepsList = document.getElementById("stepsList");
const stepsIcon = document.getElementById("stepsIcon");

const startCookingBtn = document.getElementById("startCookingBtn");
const nextStepBtn = document.getElementById("nextStepBtn");
const timerBtn = document.getElementById("timerBtn");
const printBtn = document.getElementById("printBtn");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

const timerDisplay = document.getElementById("timerDisplay");
const timerValue = document.getElementById("timerValue");
const cookingStatus = document.getElementById("cookingStatus");

const stepItems = Array.from(document.querySelectorAll(".step-item"));
const ingredientItems = Array.from(document.querySelectorAll(".ingredient-item"));

let currentStepIndex = -1;
let cookingStarted = false;
let timerInterval = null;
let secondsRemaining = TOTAL_BAKE_SECONDS;

function setSectionCollapsed(listEl, toggleEl, iconEl, collapsed) {
  listEl.classList.toggle("collapsed", collapsed);
  toggleEl.setAttribute("aria-expanded", String(!collapsed));
}

ingredientsToggle.addEventListener("click", () => {
  const isCollapsed = ingredientsList.classList.contains("collapsed");
  setSectionCollapsed(ingredientsList, ingredientsToggle, ingredientsIcon, !isCollapsed);
});

stepsToggle.addEventListener("click", () => {
  const isCollapsed = stepsList.classList.contains("collapsed");
  setSectionCollapsed(stepsList, stepsToggle, stepsIcon, !isCollapsed);
});

ingredientItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("checked");
    updateProgress();
  });
});

function updateProgress() {
  const checkedCount = ingredientItems.filter((i) => i.classList.contains("checked")).length;
  const ingredientProgress = ingredientItems.length ? checkedCount / ingredientItems.length : 0;

  const stepProgress = cookingStarted && currentStepIndex >= 0
    ? (currentStepIndex + 1) / stepItems.length
    : 0;

  const combined = Math.round(((ingredientProgress * 0.4) + (stepProgress * 0.6)) * 100);
  progressFill.style.width = combined + "%";
  progressPercent.textContent = combined + "%";
}

function highlightStep(index) {
  stepItems.forEach((item, i) => {
    item.classList.remove("active");
    if (i < index) {
      item.classList.add("done");
    } else {
      item.classList.remove("done");
    }
  });

  if (index >= 0 && index < stepItems.length) {
    stepItems[index].classList.add("active");
    stepItems[index].scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function setStatus(message) {
  cookingStatus.textContent = message;
}

startCookingBtn.addEventListener("click", () => {
  if (cookingStarted) return;

  cookingStarted = true;
  currentStepIndex = 0;

  setSectionCollapsed(stepsList, stepsToggle, stepsIcon, false);
  highlightStep(currentStepIndex);
  updateProgress();

  startCookingBtn.disabled = true;
  startCookingBtn.textContent = "Cooking Started";
  nextStepBtn.disabled = false;
  timerBtn.disabled = false;

  setStatus("Step 1 of " + stepItems.length + " — let's get cooking!");
});

nextStepBtn.addEventListener("click", () => {
  if (!cookingStarted) return;

  if (currentStepIndex < stepItems.length - 1) {
    currentStepIndex += 1;
    highlightStep(currentStepIndex);
    updateProgress();
    setStatus("Step " + (currentStepIndex + 1) + " of " + stepItems.length + ".");
  }

  if (currentStepIndex === stepItems.length - 1) {
    nextStepBtn.disabled = true;
    nextStepBtn.textContent = "All Steps Done";
    setStatus("All steps complete — enjoy your lava cake!");
  }
});

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function updateTimerDisplay() {
  timerValue.textContent = formatTime(secondsRemaining);
  timerValue.classList.toggle("timer-urgent", secondsRemaining <= 30 && secondsRemaining > 0);
}

timerBtn.addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerBtn.textContent = "Start Timer";
    setStatus("Timer paused.");
    return;
  }

  timerDisplay.hidden = false;
  timerBtn.textContent = "Pause Timer";
  setStatus("Baking timer running — " + formatTime(secondsRemaining) + " remaining.");

  timerInterval = setInterval(() => {
    secondsRemaining -= 1;
    updateTimerDisplay();

    if (secondsRemaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerBtn.disabled = true;
      timerBtn.textContent = "Timer Finished";
      setStatus("Time's up! Take the lava cakes out of the oven.");
    }
  }, 1000);
});

printBtn.addEventListener("click", () => {
  window.print();
});

updateTimerDisplay();
updateProgress();

const accordion = document.querySelector(".accordion");
const header = document.querySelector(".accordion-header");

header.addEventListener("click", () => {
    accordion.classList.toggle("closed");
});