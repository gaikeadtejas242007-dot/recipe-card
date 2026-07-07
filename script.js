const TOTAL_SECONDS = 12 * 60;
const countdownDisplay = document.getElementById("countdownDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let totalSeconds = TOTAL_SECONDS;
let timerId = null;
let isRunning = false;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateDisplay() {
  if (countdownDisplay) {
    countdownDisplay.textContent = formatTime(totalSeconds);
  }
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

let start_cooking=document.getElementById("startBtn");
let procedure=document.getElementById("procedure");
start_cooking.addEventListener("click",()=>{
  procedure.style.border="red";

})
