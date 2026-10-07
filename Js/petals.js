/* =========================
   BLOOM FLOWER SYSTEM
   گل بابونه‌ی در حال شکفتن
   ========================= */

const BloomFlower = (() => {
  let flowerEl = null;
  let petalsLayer = null;
  let currentCountEl = null;

  let totalPetals = 0;
  let currentPetals = 0;
  let petalScale = 1;
  let clickAttached = false;

  /* =========================
       ساخت گل
       ========================= */

  function create(total) {
    totalPetals = total;

    const world = document.getElementById("world");
    if (!world) {
      console.warn("⚠️ #world پیدا نشد");
      return;
    }

    const old = world.querySelector(".bloom-flower");
    if (old) old.remove();

    flowerEl = document.createElement("div");
    flowerEl.className = "bloom-flower";

    flowerEl.innerHTML = `
            <div class="stem"></div>
            <div class="bud"></div>
            <div class="petals-layer"></div>
            <div class="core"></div>
            <div class="bloom-count">
                <span class="bloom-current">0</span>
                <span class="bloom-separator">/</span>
                <span class="bloom-total">${total}</span>
            </div>
        `;

    world.appendChild(flowerEl);

    petalsLayer = flowerEl.querySelector(".petals-layer");
    currentCountEl = flowerEl.querySelector(".bloom-current");

    updatePetalScale();

    setTimeout(() => {
      flowerEl.classList.add("visible");
    }, 2000);
  }

  function updatePetalScale() {
    if (!flowerEl) return;

    const size = flowerEl.offsetWidth;

    petalScale = size / 70;

    if (petalScale < 0.7) petalScale = 0.7;
    if (petalScale > 1.2) petalScale = 1.2;
  }

  /* =========================
       اضافه کردن گلبرگ
       ========================= */

  function addPetal(fromX, fromY) {
    if (!flowerEl || !petalsLayer) {
      console.warn("⚠️ گل پایانی هنوز ساخته نشده");
      return;
    }

    currentPetals++;

    updateCounter();

    if (fromX !== undefined && fromY !== undefined) {
      flyPetal(fromX, fromY, () => {
        placePetal(currentPetals);
      });
    } else {
      placePetal(currentPetals);
    }

    if (currentPetals >= totalPetals) {
      setTimeout(bloom, 1600);
    }
  }

  /* =========================
       پرواز گلبرگ
       ========================= */

  function flyPetal(startX, startY, onArrive) {
    if (!flowerEl) return;

    const rect = flowerEl.getBoundingClientRect();

    const endX = rect.left + rect.width / 2;
    const endY = rect.top + rect.height / 2;

    const petal = document.createElement("div");
    petal.className = "flying-petal";

    petal.style.left = `${startX}px`;
    petal.style.top = `${startY}px`;

    document.body.appendChild(petal);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const dx = endX - startX;
        const dy = endY - startY;

        petal.style.transform = `translate(${dx}px, ${dy}px) rotate(540deg) scale(0.6)`;

        petal.style.opacity = "0.4";
      });
    });

    setTimeout(() => {
      petal.remove();
      if (onArrive) onArrive();
    }, 1300);
  }

  /* =========================
       قرار دادن گلبرگ دور گل
       ========================= */

  function placePetal(index) {
    if (!petalsLayer) return;

    const angle = ((index - 1) / totalPetals) * 360;

    const petal = document.createElement("span");
    petal.className = "petal";

    petal.style.setProperty("--petal-angle", `${angle}deg`);
    petal.style.setProperty("--petal-scale", petalScale);

    petalsLayer.appendChild(petal);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        petal.classList.add("placed");
      });
    });
  }

  /* =========================
       آپدیت شمارنده
       ========================= */

  function updateCounter() {
    if (!currentCountEl) return;

    /* ✅ اضافه کردن صفر قبل از اعداد ۱ تا ۹ */

    const displayNumber =
      currentPetals < 10 ? `0${currentPetals}` : `${currentPetals}`;

    currentCountEl.textContent = displayNumber;

    currentCountEl.classList.add("pulse");

    setTimeout(() => {
      currentCountEl.classList.remove("pulse");
    }, 400);
  }

  /* =========================
       شکوفه‌ی نهایی
       ========================= */

  function bloom() {
    if (!flowerEl) return;

    flowerEl.classList.add("blooming");

    attachBloomClick();

    /* پیام تبریک — بعد از بسته شدن پنل */

    const tryShowMessage = () => {
      const panel = document.getElementById("memory-panel");

      if (panel && panel.querySelector(".memory-overlay.visible")) {
        setTimeout(tryShowMessage, 500);
        return;
      }

      if (typeof showBirthdayMessage === "function") {
        showBirthdayMessage();
      }
    };

    setTimeout(tryShowMessage, 1500);
  }

  /* =========================
       کلیک روی گل نهایی
       ========================= */

  function attachBloomClick() {
    if (!flowerEl) return;

    if (clickAttached) return;

    clickAttached = true;

    /* کلیک کوتاه — یه بار پخش */

    flowerEl.addEventListener("click", (event) => {
      event.stopPropagation();
      burstPetals();
    });
  }
  /* =========================
   AUTO BURST
   پخش خودکار گلبرگ (تا وقتی پنل بازه)
   ========================= */

  let autoBurstInterval = null;

  function startAutoBurst() {
    if (autoBurstInterval) return;

    autoBurstInterval = setInterval(() => {
      burstPetals();
    }, 500);
  }

  function stopAutoBurst() {
    if (autoBurstInterval) {
      clearInterval(autoBurstInterval);
      autoBurstInterval = null;
    }
  }

  /* =========================
       پخش گلبرگ‌ها
       ========================= */

  function burstPetals() {
    if (!flowerEl) return;

    const rect = flowerEl.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const count = 12;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 70;

      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      const petal = document.createElement("div");
      petal.className = "burst-petal";

      petal.style.left = `${centerX}px`;
      petal.style.top = `${centerY}px`;

      document.body.appendChild(petal);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          petal.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720}deg) scale(0.4)`;

          petal.style.opacity = "0";
        });
      });

      setTimeout(() => {
        petal.remove();
      }, 1400);
    }
  }

  /* =========================
       API عمومی
       ========================= */

  /* =========================
   RESET
   ریست کردن state
   ========================= */

  function reset() {
    currentPetals = 0;
    clickAttached = false;

    if (flowerEl) {
      flowerEl.classList.remove("blooming");
    }
  }

  return {
    create,
    addPetal,
    reset,
    startAutoBurst,
    stopAutoBurst,

    get total() {
      return totalPetals;
    },
    get current() {
      return currentPetals;
    },
    get element() {
      return flowerEl;
    },
  };
})();
