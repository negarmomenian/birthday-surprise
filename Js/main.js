/* =========================
   REAL WORLD TIME
   ========================= */

function updateWorldTime() {
  const timeData = getTimeProgress();

  setSkyState(timeData.state, timeData.progress);
}

/* =========================
   TEST STATES
   ========================= */

const testStates = ["dawn", "day", "golden", "twilight", "night", "night"];

let testIndex = 0;

let manualTestMode = false;

/* =========================
   MANUAL TIME TEST
   ========================= */

function testTimeState(state) {
  manualTestMode = true;

  setSkyState(state, 0);
}

/* =========================
   KEYBOARD TEST
   ========================= */

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "1" && key <= "6") {
    const index = Number(key) - 1;

    testIndex = index;

    testTimeState(testStates[index]);
  }

  if (key.toLowerCase() === "r") {
    manualTestMode = false;

    updateWorldTime();
  }
});

/* =========================
   REAL TIME CLOCK
   ========================= */

function startWorldClock() {
  updateWorldTime();

  setInterval(() => {
    if (manualTestMode) return;

    updateWorldTime();
  }, 1000);
}

/* =========================
   START
   ========================= */

startWorldClock();

createFlowers();
/* =========================
   HIDDEN CONSOLE MESSAGE
   پیام مخفی برای مهدیه
   ========================= */

console.log(
  "%c برای ماه آسمونم 🌙",
  "font-size: 28px; color: #d9a441; font-weight: bold; text-shadow: 0 0 10px rgba(217,164,65,0.5); padding: 10px 0;",
);

console.log(
  "%cاگه اینو می‌بینی، یعنی  .\nتولدت مبارک. 🌙",
  "font-size: 14px; color: #8a5a22; padding: 10px 0; line-height: 1.8;",
);
