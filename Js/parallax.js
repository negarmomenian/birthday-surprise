/* =========================
   GYROSCOPE PARALLAX
   پارالاکس با ژیروسکوپ موبایل
   ========================= */

const Parallax = (() => {
  /* =========================
       تنظیمات
       ========================= */

  /* حساسیت کلی (هرچی بیشتر، حرکت بیشتر) */
  const SENSITIVITY = 1.0;

  /* محدودیت حداکثر حرکت (پیکسل) */
  const MAX_MOVE = 30;

  /* نرم‌کننده (0 = بدون نرم‌سازی، 1 = خیلی نرم) */
  const SMOOTHING = 0.85;

  /* =========================
       وضعیت فعلی
       ========================= */

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  let isActive = false;
  let animationFrame = null;

  /* =========================
       لایه‌ها و مقدار حرکت
       ========================= */

  const layers = [
    /* دورترین لایه‌ها — حرکت کم */
    { selector: ".stars", depth: 0.1 },
    { selector: ".moon", depth: 0.15 },
    { selector: ".clouds", depth: 0.2 },
    { selector: ".clouds-over", depth: 0.2 },

    /* لایه‌های میانی */
    { selector: ".meadow", depth: 0.3 },
    { selector: ".atmosphere-layer", depth: 0.35 },
    { selector: ".light-layer", depth: 0.35 },

    /* گل‌های دشت */
    { selector: "#flowers", depth: 0.55 },

    /* پیش‌زمینه — حرکت زیاد */
    { selector: ".particles", depth: 0.75 },
    { selector: ".leaves", depth: 0.9 },
    { selector: ".bloom-flower", depth: 0.7 },
  ];

  /* =========================
       ذخیره‌ی المان‌ها
       ========================= */

  let elements = [];

  /* =========================
       به‌روزرسانی موقعیت
       ========================= */

  function update() {
    if (!isActive) return;

    /* نرم‌سازی حرکت */

    currentX += (targetX - currentX) * (1 - SMOOTHING);
    currentY += (targetY - currentY) * (1 - SMOOTHING);

    /* اعمال روی هر لایه */

    elements.forEach((item) => {
      if (!item.el) return;

      const x = currentX * item.depth;
      const y = currentY * item.depth;

      /* ✅ فقط transform اضافه کن، بدون از دست دادن transform اصلی */

      item.el.style.setProperty("--parallax-x", `${x}px`);
      item.el.style.setProperty("--parallax-y", `${y}px`);
    });

    animationFrame = requestAnimationFrame(update);
  }

  /* =========================
       شروع
       ========================= */

  function start() {
    /* ذخیره‌ی المان‌ها */

    elements = layers
      .map((layer) => ({
        el: document.querySelector(layer.selector),
        depth: layer.depth,
      }))
      .filter((item) => item.el);

    console.log("📱 پارالاکس فعال — تعداد لایه‌ها:", elements.length);

    /* درخواست دسترسی به ژیروسکوپ (برای iOS) */

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      /* iOS 13+ */

      DeviceOrientationEvent.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            enable();
          } else {
            console.log("⚠️ کاربر اجازه‌ی ژیروسکوپ نداد");
          }
        })
        .catch((err) => {
          console.log("⚠️ خطا در دسترسی ژیروسکوپ:", err);
        });
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      /* اندروید و سایر */

      enable();
    } else {
      console.log("⚠️ ژیروسکوپ پشتیبانی نمی‌شه");
    }
  }

  /* =========================
       فعال‌سازی listener
       ========================= */

  function enable() {
    isActive = true;

    window.addEventListener("deviceorientation", handleOrientation, true);

    update();
  }

  /* =========================
       مدیریت حرکت گوشی
       ========================= */

  function handleOrientation(event) {
    /* gamma = چپ-راست (کج کردن گوشی به چپ/راست) */
    /* beta  = بالا-پایین (کج کردن گوشی به جلو/عقب) */

    const gamma = event.gamma || 0; /* -90 تا +90 */
    const beta = event.beta || 0; /* -180 تا +180 */

    /* محدود کردن به بازه‌ی -45 تا +45 */

    const clampedGamma = Math.max(-45, Math.min(45, gamma));
    const clampedBeta = Math.max(
      -45,
      Math.min(45, beta - 45),
    ); /* beta به طور پیش‌فرض 45-60 هست تو حالت عادی */

    /* محاسبه‌ی موقعیت هدف */

    targetX = (clampedGamma / 45) * MAX_MOVE * SENSITIVITY;
    targetY = (clampedBeta / 45) * MAX_MOVE * SENSITIVITY;
  }

  /* =========================
       توقف
       ========================= */

  function stop() {
    isActive = false;

    window.removeEventListener("deviceorientation", handleOrientation);

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  }

  /* =========================
       API عمومی
       ========================= */

  return {
    start,
    stop,
  };
})();
