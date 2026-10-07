/* =========================
   HINT SYSTEM
   حلقه‌ی نبض روی گل‌ها
   ========================= */

(function () {
  let hintFlower = null;
  let firstHintTimer = null;
  let rehintTimer = null;
  let userClicked = false;

  /* =========================
       انتخاب گل رندوم
       ========================= */

  function pickRandomFlower() {
    const flowers = document.querySelectorAll(".flower");
    if (!flowers.length) return null;

    const unopened = Array.from(flowers).filter(
      (f) => !f.classList.contains("opened"),
    );

    if (!unopened.length) return null;

    const candidates = unopened.filter((f) => {
      const top = parseFloat(f.style.top);
      return top > 65;
    });

    const pool = candidates.length ? candidates : unopened;

    return pool[Math.floor(Math.random() * pool.length)];
  }

  /* =========================
       پاک کردن نبض
       ========================= */

  function clearHint() {
    document.querySelectorAll(".flower.hint").forEach((f) => {
      f.classList.remove("hint");
    });

    hintFlower = null;
  }

  /* =========================
       نمایش نبض
       ========================= */

  function showHint() {
    if (userClicked) return;

    clearHint();

    hintFlower = pickRandomFlower();

    if (hintFlower) {
      hintFlower.classList.add("hint");
    }
  }

  /* =========================
       زمان‌بندی نبض مجدد
       ========================= */

  function scheduleRehint() {
    if (userClicked) return;

    clearTimeout(rehintTimer);

    rehintTimer = setTimeout(() => {
      if (userClicked) return;

      showHint();
      scheduleRehint();
    }, 10000);
  }

  /* =========================
       شروع
       ========================= */

  function start() {
    firstHintTimer = setTimeout(() => {
      if (userClicked) return;

      showHint();
      scheduleRehint();
    }, 5000);
  }

  /* =========================
       با کلیک روی گل، نبض بره
       ========================= */

  function handleClick(event) {
    const clickedFlower = event.target.closest(".flower");

    if (!clickedFlower) return;

    userClicked = true;

    clearTimeout(firstHintTimer);
    clearTimeout(rehintTimer);

    clearHint();

    setTimeout(clearHint, 50);
    setTimeout(clearHint, 150);
    setTimeout(clearHint, 300);
    setTimeout(clearHint, 600);
  }

  /* =========================
       اجرا
       ========================= */

  function init() {
    document.addEventListener("click", handleClick, true);
    document.addEventListener("touchstart", handleClick, {
      passive: true,
      capture: true,
    });

    start();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
