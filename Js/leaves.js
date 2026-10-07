/* =========================
   FALLING AUTUMN LEAVES
   برگ‌های پاییزی — با عکس واقعی
   ========================= */

function createLeaves() {
  const container = document.getElementById("leaves");

  if (!container) {
    console.warn("⚠️ #leaves پیدا نشد");
    return;
  }

  /* =========================
       مسیرهای برگ‌ها
       ========================= */

  const leafImages = [
    "assets/images/leaves/leaf-1.png",
    "assets/images/leaves/leaf-2.png",
    "assets/images/leaves/leaf-3.png",
    "assets/images/leaves/leaf-4.png",
  ];

  /* =========================
       تعداد
       ========================= */

  const isMobile = window.matchMedia("(max-width: 600px)").matches;

  const count = isMobile ? 14 : 18;

  container.innerHTML = "";

  /* =========================
       ساخت برگ‌ها
       ========================= */

  for (let i = 0; i < count; i++) {
    const leaf = document.createElement("span");
    leaf.className = "leaf";

    /* =========================
           عکس رندوم
           ========================= */

    const randomImage =
      leafImages[Math.floor(Math.random() * leafImages.length)];

    leaf.style.backgroundImage = `url(${randomImage})`;

    /* =========================
           جهت حرکت — دقیقاً متعادل
           ========================= */

    const direction = i % 2 === 0 ? "right-to-left" : "left-to-right";

    leaf.classList.add(direction);

    /* =========================
           عمق
           ========================= */

    const depthIndex = i % 3;

    let depthClass;
    let opacity;

    if (depthIndex === 0) {
      depthClass = "far";
      opacity = 0.25 + Math.random() * 0.15; /* 0.25-0.40 */
    } else if (depthIndex === 1) {
      depthClass = "mid";
      opacity = 0.45 + Math.random() * 0.15; /* 0.45-0.60 */
    } else {
      depthClass = "near";
      opacity = 0.65 + Math.random() * 0.15; /* 0.65-0.80 */
    }

    leaf.classList.add(depthClass);

    /* =========================
           ارتفاع شروع — یکنواخت
           ========================= */

    const startY = 3 + Math.random() * 70;

    leaf.style.setProperty("--start-y", `${startY}vh`);

    /* =========================
           مدت زمان
           ========================= */

    leaf.style.setProperty("--drift-duration", `${25 + Math.random() * 30}s`);

    /* =========================
           تأخیر
           ========================= */

    leaf.style.setProperty("--drift-delay", `${i * 1.2 + Math.random() * 4}s`);

    /* =========================
           اندازه
           ========================= */

    let scale;

    if (depthClass === "far") {
      scale = 0.5 + Math.random() * 0.3;
    } else if (depthClass === "mid") {
      scale = 0.7 + Math.random() * 0.3;
    } else {
      scale = 0.9 + Math.random() * 0.4;
    }

    leaf.style.setProperty("--leaf-scale", scale.toFixed(2));

    /* =========================
           شفافیت
           ========================= */

    leaf.style.setProperty("--leaf-opacity", opacity.toFixed(2));

    /* =========================
           چرخش
           ========================= */

    leaf.style.setProperty(
      "--start-rotation",
      `${Math.floor(Math.random() * 360)}deg`,
    );

    /* =========================
           موج عمودی
           ========================= */

    leaf.style.setProperty("--wave-1", `${-40 + Math.random() * 80}px`);
    leaf.style.setProperty("--wave-2", `${-50 + Math.random() * 100}px`);
    leaf.style.setProperty("--wave-3", `${-45 + Math.random() * 90}px`);
    leaf.style.setProperty("--wave-4", `${-35 + Math.random() * 70}px`);

    /* =========================
           ✅ مسیر افقی ثابت
           ========================= */

    leaf.style.setProperty("--path-1", "30vw");
    leaf.style.setProperty("--path-2", "60vw");
    leaf.style.setProperty("--path-3", "85vw");
    leaf.style.setProperty("--path-4", "125vw");

    container.appendChild(leaf);
  }

  console.log("🍂 تعداد برگ‌ها:", container.children.length);

  requestAnimationFrame(() => {
    setTimeout(() => {
      container.classList.add("ready");
    }, 600);
  });
}

/* =========================
   اجرا
   ========================= */

window.addEventListener("load", createLeaves);

let leavesResizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(leavesResizeTimer);

  leavesResizeTimer = setTimeout(() => {
    const container = document.getElementById("leaves");

    if (container) {
      container.classList.remove("ready");
    }

    createLeaves();
  }, 500);
});
