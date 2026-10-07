/* =========================
   MAGIC PARTICLES
   ذرات طلایی هنگام باز شدن گل
   ========================= */

const MagicParticles = (() => {
  /* =========================
       پخش ذرات از یه نقطه
       ========================= */

  function burst(x, y) {
    /* =========================
           تنظیمات — ملایم برای شب
           ========================= */

    const count = 12;

    const colors = [
      "rgba(255, 235, 180, 0.9)" /* کرم روشن */,
      "rgba(255, 220, 150, 0.85)" /* طلایی ملایم */,
      "rgba(255, 245, 200, 0.9)" /* کرم خیلی روشن */,
      "rgba(255, 210, 140, 0.8)" /* طلایی گرم */,
    ];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "magic-particle";

      /* =========================
               موقعیت اولیه
               ========================= */

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      /* =========================
               اندازه (رندوم)
               ========================= */

      const size = 3 + Math.random() * 4; /* ۳ تا ۷ پیکسل */

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      /* =========================
               رنگ (رندوم از پالت)
               ========================= */

      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.background = `radial-gradient(circle, ${color} 0%, ${color.replace(/[\d.]+\)$/, "0)")} 70%)`;

      /* =========================
               مقصد پرواز (رندوم)
               ========================= */

      /* ذرات به سمت بالا پرواز می‌کنن، با پخش افقی کم */

      const dx = (Math.random() - 0.5) * 60; /* افقی: -۳۰ تا +۳۰ */
      const dy = -80 - Math.random() * 60; /* عمودی: بالا (منفی) */

      /* =========================
               مدت زمان
               ========================= */

      const duration = 1200 + Math.random() * 600; /* ۱.۲ تا ۱.۸ ثانیه */

      /* =========================
               تأخیر شروع (برای پخش‌شدگی)
               ========================= */

      const delay = Math.random() * 200; /* ۰ تا ۲۰۰ms */

      /* =========================
               انیمیشن
               ========================= */

      particle.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration}ms ease`;

      document.body.appendChild(particle);

      /* =========================
               شروع پرواز (بعد از delay)
               ========================= */

      setTimeout(() => {
        particle.style.transform = `translate(${dx}px, ${dy}px) scale(0.4)`;

        particle.style.opacity = "0";
      }, delay);

      /* =========================
               حذف بعد از پایان
               ========================= */

      setTimeout(
        () => {
          if (particle.parentNode) {
            particle.remove();
          }
        },
        duration + delay + 100,
      );
    }
  }

  /* =========================
       API عمومی
       ========================= */

  /* =========================
   FINAL BURST
   ذرات بیشتر برای آخرین گل
   ========================= */

  function finalBurst(x, y) {
    /* ✅ ۳۰ تا ذرات (به جای ۱۲) */

    const count = 30;

    const colors = [
      "rgba(255, 235, 180, 0.95)",
      "rgba(255, 220, 150, 0.9)",
      "rgba(255, 245, 200, 0.95)",
      "rgba(255, 210, 140, 0.85)",
      "rgba(255, 255, 220, 0.95)",
    ];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "magic-particle";

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      /* اندازه بزرگ‌تر برای آخرین گل */

      const size = 4 + Math.random() * 6;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.background = `radial-gradient(circle, ${color} 0%, ${color.replace(/[\d.]+\)$/, "0)")} 70%)`;

      /* پرواز بزرگ‌تر */

      const dx = (Math.random() - 0.5) * 120; /* افقی بیشتر */
      const dy = -120 - Math.random() * 100; /* عمودی بیشتر */

      const duration = 1600 + Math.random() * 800;
      const delay = Math.random() * 300;

      particle.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration}ms ease`;

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
        particle.style.opacity = "0";
      }, delay);

      setTimeout(
        () => {
          if (particle.parentNode) {
            particle.remove();
          }
        },
        duration + delay + 100,
      );
    }
  }

  /* =========================
   FINAL FLASH
   فلاش ملایم روی کل صفحه
   ========================= */

  function finalFlash() {
    /* جلوگیری از فلاش تکراری */

    if (document.querySelector(".final-flash")) {
      return;
    }

    const flash = document.createElement("div");
    flash.className = "final-flash";

    document.body.appendChild(flash);

    /* حذف بعد از پایان انیمیشن */

    setTimeout(() => {
      if (flash.parentNode) {
        flash.remove();
      }
    }, 2600);
  }

  return {
    burst,
    finalBurst,
    finalFlash,
  };
})();
