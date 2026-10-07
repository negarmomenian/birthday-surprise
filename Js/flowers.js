/* =========================
   FLOWER POSITIONS
   چیدمان رندوم ۲۳ گل
   ========================= */

function generateFlowerPositions() {
  const positions = [];

  /* ۲ گل پیش‌زمینه (کنارها) */

  positions.push({
    x: 6,
    y: 97,
    rotation: -12,
    scale: 1.0,
    opacity: 0.98,
    blur: 0,
    brightness: 1,
    state: "closed",
  });

  positions.push({
    x: 94,
    y: 97,
    rotation: 9,
    scale: 0.98,
    opacity: 0.98,
    blur: 0,
    brightness: 1,
    state: "closed",
  });

  /* تولید بقیه به صورت رندوم */

  const totalFlowers = 23;
  let attempts = 0;
  const MAX_ATTEMPTS = 50000;

  while (positions.length < totalFlowers && attempts < MAX_ATTEMPTS) {
    attempts++;

    const x = 3 + Math.random() * 94;
    const y = 55 + Math.random() * 43;

    /* فیلتر ۱: ناحیه‌ی غنچه (پایین-چپ) */
    if (x < 28 && y > 82) continue;

    /* فیلتر ۲: صورت و موهای مهدیه */
    if (x > 28 && x < 75 && y > 25 && y < 60) continue;

    /* فیلتر ۳: بدن و لباس مهدیه */
    if (x > 33 && x < 72 && y > 58 && y < 95) continue;

    /* فیلتر ۴: فاصله از گل‌های قبلی */
    let tooClose = false;

    for (let i = 0; i < positions.length; i++) {
      const p = positions[i];

      if (Math.abs(p.x - x) < 6 && Math.abs(p.y - y) < 4) {
        tooClose = true;
        break;
      }
    }

    if (tooClose) continue;

    const depthFactor = (y - 55) / 43;

    const scale = 0.5 + depthFactor * 0.4 + Math.random() * 0.2;
    const opacity = 0.68 + depthFactor * 0.3;
    const blur = (1 - depthFactor) * 0.85;
    const brightness = 0.88 + depthFactor * 0.12;
    const rotation = -18 + Math.random() * 36;

    positions.push({
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      rotation: Math.round(rotation),
      scale: Math.round(scale * 100) / 100,
      opacity: Math.round(opacity * 100) / 100,
      blur: Math.round(blur * 100) / 100,
      brightness: Math.round(brightness * 100) / 100,
      state: "closed",
    });
  }

  console.log("🌸 تعداد گل‌ها:", positions.length);

  positions.sort((a, b) => a.y - b.y);

  return positions;
}

/* =========================
   متغیرهای سراسری
   ========================= */

const flowerPositions = generateFlowerPositions();
const totalFlowers = flowerPositions.length;

/* =========================
   CREATE FLOWERS
   ========================= */

function createFlowers() {
  const container = document.getElementById("flowers");

  if (!container) {
    console.warn("⚠️ #flowers پیدا نشد");
    return;
  }

  container.innerHTML = "";

  /* ساخت گل پایانی (غنچه) */

  if (!window.__bloomFlowerCreated) {
    window.__bloomFlowerCreated = true;

    if (typeof BloomFlower !== "undefined") {
      setTimeout(() => {
        BloomFlower.create(totalFlowers);
      }, 2000);
    } else {
      console.warn("⚠️ BloomFlower تعریف نشده");
    }
  }

  /* ساخت گل‌های دشت */

  flowerPositions.forEach((position, index) => {
    const flower = document.createElement("button");

    flower.className = "flower";

    flower.style.left = `${position.x}%`;
    flower.style.top = `${position.y}%`;

    flower.style.setProperty("--rotation", `${position.rotation}deg`);
    flower.style.setProperty("--scale", position.scale);
    flower.style.setProperty("--opacity", position.opacity);
    flower.style.setProperty("--blur", `${position.blur}px`);
    flower.style.setProperty("--brightness", position.brightness);

    flower.setAttribute("aria-label", `Chamomile flower ${index + 1}`);

    const image = document.createElement("img");
    image.src = "assets/images/flowers/chamomile-closed.png";
    image.alt = "";

    flower.appendChild(image);

    flower.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      /* اگه قبلاً باز شده بود، فقط پنل رو باز کن */
      if (flower.classList.contains("opened")) {
        openMemory(index % memories.length);
        return;
      }

      /* اولین کلیک: گل رو باز کن */
      flower.classList.add("opened");

      image.src = "assets/images/flowers/chamomile-open.png";

      const rect = flower.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      if (typeof BloomFlower !== "undefined") {
        BloomFlower.addPetal(centerX, centerY);
      }

      /* چک کن این گل چندمین گل باز شده */
      const openedCount = document.querySelectorAll(".flower.opened").length;
      const isFinalFlower = openedCount === totalFlowers;

      /* ذرات طلایی */
      if (typeof MagicParticles !== "undefined") {
        if (isFinalFlower) {
          MagicParticles.finalBurst(centerX, centerY);

          setTimeout(() => {
            MagicParticles.finalFlash();
          }, 300);
        } else {
          MagicParticles.burst(centerX, centerY);
        }
      }

      /* پنل رو با تأخیر باز کن */
      const delay = isFinalFlower ? 1400 : 600;

      setTimeout(() => {
        openMemory(index % memories.length);
      }, delay);
    });

    /* برای موبایل */
    flower.addEventListener(
      "touchstart",
      () => {
        flower.dataset.touched = "1";
        setTimeout(() => {
          flower.dataset.touched = "0";
        }, 500);
      },
      { passive: true },
    );

    container.appendChild(flower);
  });
}

/* =========================
   BIRTHDAY MESSAGE
   ========================= */

function showBirthdayMessage() {
  if (document.querySelector(".birthday-overlay")) {
    return;
  }

  const world = document.getElementById("world");
  if (!world) return;

  const overlay = document.createElement("div");
  overlay.className = "birthday-overlay";

  overlay.innerHTML = `
        <div class="birthday-card">

            <div class="birthday-icon">🌼</div>

            <h1 class="birthday-title" dir="rtl">
                ۲۳ تا چیزی که جوونه منو تا الان ساختن!
            </h1>

            <p class="birthday-message" dir="rtl">
                هر گلبرگ، یه چیز خاص از تو بود.<br>
                حالا یه گل کامل شد...<br>
                ولی تو از هر گلی قشنگ‌تری.<br>
                تولدت مبارک، بابونه من.💛
            </p>

            <button class="birthday-close" aria-label="Close">
                بزن منو، عاح
            </button>

        </div>
    `;

  world.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add("visible");
  });

  /* شروع پخش خودکار گلبرگ */

  if (typeof BloomFlower !== "undefined" && BloomFlower.startAutoBurst) {
    setTimeout(() => {
      BloomFlower.startAutoBurst();
    }, 800);
  }

  const closeBtn = overlay.querySelector(".birthday-close");

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("visible");

    setTimeout(() => {
      overlay.remove();
      showAfterMessage();
    }, 700);
  });
}

/* =========================
   AFTER MESSAGE
   ========================= */

function showAfterMessage() {
  if (document.querySelector(".after-overlay")) {
    return;
  }

  const world = document.getElementById("world");
  if (!world) return;

  const overlay = document.createElement("div");
  overlay.className = "after-overlay";

  overlay.innerHTML = `
        <div class="after-card">

            <p class="after-text" dir="rtl">
                بزرگ شدی جوونه من <br>
                هرسال که میگذره میری تو پوست و استخوان این آدم <br>
                دوستت دارم دختر قشنگ من <br>
                امبدوارم امسال چشات از ته دل بخندن <br>
                بهترین اتفاق ها برات رقم بخوره و <br>
                تک تک آرزوهات خاطره شن <br>
                یادت نره چقدر دوستت دارم، تولدت مبارک قلب من💛
            </p>

            <button class="after-replay" dir="rtl">
                برگردیم از اول
            </button>

        </div>
    `;

  world.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add("visible");
  });

  /* ✅ دکمه‌ی دوباره */

  const replayBtn = overlay.querySelector(".after-replay");

  replayBtn.addEventListener("click", () => {
    console.log("👆 دکمه دوباره ببین کلیک شد");

    /* محو کردن overlay */
    overlay.classList.remove("visible");

    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
    }, 700);

    /* ریست کردن گل‌ها */
    resetFlowers();
  });
}

/* =========================
   RESET FLOWERS
   ========================= */

function resetFlowers() {
  console.log("🔄 resetFlowers شروع شد");

  /* ۱. توقف پخش خودکار */
  if (typeof BloomFlower !== "undefined" && BloomFlower.stopAutoBurst) {
    BloomFlower.stopAutoBurst();
  }

  /* ۲. بستن گل‌های دشت */
  document.querySelectorAll(".flower").forEach((f) => {
    f.classList.remove("opened");
    f.classList.remove("hint");

    const img = f.querySelector("img");
    if (img) {
      img.src = "assets/images/flowers/chamomile-closed.png";
    }
  });

  /* ۳. حذف گل پایانی قدیمی */
  const oldBloom = document.querySelector(".bloom-flower");
  if (oldBloom) {
    oldBloom.remove();
  }

  /* ۴. ریست state داخلی */
  if (typeof BloomFlower !== "undefined" && BloomFlower.reset) {
    BloomFlower.reset();
  }

  /* ۵. ساخت گل پایانی جدید */
  if (typeof BloomFlower !== "undefined") {
    window.__bloomFlowerCreated = false;

    setTimeout(() => {
      BloomFlower.create(totalFlowers);
      window.__bloomFlowerCreated = true;
      console.log("🌸 گل پایانی جدید ساخته شد");
    }, 500);
  }

  console.log("✅ resetFlowers تموم شد");
}
