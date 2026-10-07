/* =========================
   AUDIO SYSTEM
   سیستم صدا
   ========================= */

const AudioSystem = (() => {
  /* =========================
       المان‌های صوتی
       ========================= */

  const ambient = new Audio("assets/audio/Chand-Mera-Dil.m4a");

  /* =========================
       تنظیمات
       ========================= */

  ambient.loop = false;

  ambient.addEventListener("ended", () => {
    /* اگه کاربر صدا رو قطع کرده، دوباره پخش نکن */

    if (isMuted) {
      return;
    }

    setTimeout(() => {
      if (isMuted) return;

      ambient.currentTime = 0;
      ambient.play().catch(() => {});
    }, 3000);
  });

  ambient.volume = 0.15; /* صدای پس‌زمینه ملایم */

  /* =========================
       وضعیت
       ========================= */

  let isMuted = false;

  let isStarted = false;

  let fadeInterval = null;
  let activeVoices = [];

  /* =========================
       شروع آروم موسیقی (fade in)
       ========================= */

  function fadeIn(audio, targetVolume, duration = 3000) {
    clearInterval(fadeInterval);

    audio.volume = 0;

    audio.play().catch(() => {});

    const stepTime = 50;

    const steps = duration / stepTime;

    const volumeStep = targetVolume / steps;

    fadeInterval = setInterval(() => {
      if (audio.volume + volumeStep >= targetVolume) {
        audio.volume = targetVolume;

        clearInterval(fadeInterval);
      } else {
        audio.volume += volumeStep;
      }
    }, stepTime);
  }

  /* =========================
       شروع موسیقی پس‌زمینه
       (فقط با اولین تعامل کاربر)
       ========================= */

  function startAmbient() {
    if (isStarted || isMuted) {
      return;
    }

    isStarted = true;

    /* ✅ fade in سریع‌تر — ۱.۵ ثانیه به جای ۳ ثانیه */

    fadeIn(ambient, 0.15, 1500);
  }

  /* =========================
       لرزش خفیف موبایل
       ========================= */

  function vibrateLight() {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      /* ۱۵ میلی‌ثانیه — خیلی ملایم */
      navigator.vibrate(15);
    }
  }

  /* =========================
       قطع / وصل کردن صدا
       ========================= */

  function toggleMute() {
    isMuted = !isMuted;

    if (isMuted) {
      ambient.pause();
    } else {
      if (!isStarted) {
        startAmbient();
      } else {
        ambient.play().catch(() => {});
      }
    }

    return isMuted;
  }

  /* =========================
       API عمومی
       ========================= */

  /* =========================
   DUCK AND PLAY
   کم کردن آهنگ + پلی صدای مهدیه
   ========================= */

  let duckedVolume = null;

  function duckAndPlay(audioSrc) {
    if (!audioSrc || isMuted) return;

    /* ✅ ۱. توقف صداهای قبلی */

    stopAllVoices();

    /* ✅ ۲. آهنگ رو کم کن */

    if (!duckedVolume) {
      duckedVolume = ambient.volume;
    }

    const targetVolume = duckedVolume * 0.2;

    const duckInterval = setInterval(() => {
      if (ambient.volume <= targetVolume) {
        clearInterval(duckInterval);
        return;
      }
      ambient.volume -= 0.01;
    }, 30);

    /* ✅ ۳. صدای مهدیه رو پلی کن */

    const voice = new Audio(audioSrc);
    voice.volume = 0.9;

    /* ذخیره کن */

    activeVoices.push(voice);

    voice.play().catch(() => {});

    /* ✅ ۴. بعد از تموم شدن، آهنگ برگرده */

    voice.addEventListener("ended", () => {
      /* حذف از لیست */

      const idx = activeVoices.indexOf(voice);
      if (idx > -1) {
        activeVoices.splice(idx, 1);
      }

      /* برگردوندن آهنگ */

      if (activeVoices.length === 0) {
        const restoreInterval = setInterval(() => {
          if (ambient.volume >= duckedVolume) {
            ambient.volume = duckedVolume;
            clearInterval(restoreInterval);
            return;
          }
          ambient.volume += 0.01;
        }, 30);
      }
    });

    return voice;
  }

  /* ✅ توقف همه‌ی صداها */

  function stopAllVoices() {
    activeVoices.forEach((voice) => {
      voice.pause();
      voice.currentTime = 0;
    });

    activeVoices = [];

    /* برگردوندن آهنگ */

    if (duckedVolume) {
      const restoreInterval = setInterval(() => {
        if (ambient.volume >= duckedVolume) {
          ambient.volume = duckedVolume;
          clearInterval(restoreInterval);
          return;
        }
        ambient.volume += 0.01;
      }, 30);
    }
  }

  return {
    startAmbient,
    vibrateLight,
    toggleMute,
    duckAndPlay,
    stopAllVoices,

    get muted() {
      return isMuted;
    },
  };
})();

/* =========================
   ساخت دکمه‌ی صدا
   ========================= */

function createAudioToggle() {
  const world = document.getElementById("world");

  if (!world) {
    return;
  }

  const button = document.createElement("button");

  button.className = "audio-toggle";

  button.setAttribute("aria-label", "Toggle sound");

  button.innerHTML = `
        <svg class="icon-on" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 12C17.004 13.3308 16.4774 14.6024 15.54 15.54" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <svg class="icon-off" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 9L16 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 9L22 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
     `;

  world.appendChild(button);

  /* نمایش آروم */

  setTimeout(() => {
    button.classList.add("visible");
  }, 1200);

  /* کلیک روی دکمه */

  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const muted = AudioSystem.toggleMute();

    button.classList.toggle("muted", muted);
  });
}

/* =========================
   اتصال افکت‌ها به رویدادها
   ========================= */

function connectAudioEvents() {
  /* =========================
       کلیک روی گل:
       لرزش خفیف — بدون صدا
       ========================= */

  document.addEventListener("click", (event) => {
    if (event.target.closest(".flower")) {
      AudioSystem.vibrateLight();
    }
  });
}

/* =========================
   اجرا در لود صفحه
   ========================= */

function initAudio() {
  createAudioToggle();

  connectAudioEvents();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAudio);
} else {
  initAudio();
}
