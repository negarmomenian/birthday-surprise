/* =========================
   WELCOME OVERLAY
   پیام ورودی
   ========================= */

function initWelcome() {
  const world = document.getElementById("world");

  if (!world) return;

  /* =========================
       ساخت المان
       ========================= */

  const overlay = document.createElement("div");
  overlay.className = "welcome-overlay";

  overlay.innerHTML = `
        <div class="welcome-card">

            <div class="welcome-icon">🌼</div>

            <h1 class="welcome-title" dir="rtl">
             سلااااااام خانوم تولدیانی🥳
            </h1>

            <p class="welcome-message" dir="rtl">
                ۲۳ تا گل بابونه کاشته شده که کشفش کنی.<br>
                هر کدوم یه چیز خاص از توئه.<br>
                کافیه روشون لمس کنی...
            </p>

            <button class="welcome-button" dir="rtl">
               بزن بریم👩🏻‍🦯
            </button>

        </div>
    `;

  document.body.appendChild(overlay);

  /* =========================
       نمایش آروم
       ========================= */

  setTimeout(() => {
    overlay.classList.add("visible");
  }, 400);

  /* =========================
       کلیک روی دکمه
       ========================= */

  const button = overlay.querySelector(".welcome-button");

  button.addEventListener("click", () => {
    /* شروع آهنگ (اجازه‌ی کاربر) */

    if (typeof AudioSystem !== "undefined") {
      AudioSystem.startAmbient();
    }

    /* ✅ شروع پارالاکس ژیروسکوپ */

    if (typeof Parallax !== "undefined") {
      Parallax.start();
    }

    /* محو کردن پیام */

    overlay.classList.add("hidden");

    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
    }, 1300);
  });
}

/* =========================
   اجرا
   ========================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWelcome);
} else {
  initWelcome();
}
