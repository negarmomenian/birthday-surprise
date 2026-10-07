// Memory Data :
const memories = [
  {
    title: "چشم آهویی",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-01.png",
    text: "اون چشمای آهویی بی نظیرت، <br> امان امان! <br>  چشم های قهوه ای خوشگلت <br> جوری خاص و قشنگن که آدم دوس داره ساعتها بهشون خیره بشه و بگه: <br> فتبارک الله احسن الخالقین.🤌🏼 ",
  },
  {
    //ویدیو!
    title: " فرفری های دوست داشتنی",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-012.jpg",
    text: " موهات چه خوشگه چه فرفری چه لختش! <br> خدا دید نمیشه به این راحتی چشم از تو برداشت، گفت موهاشو هم فر کنیم <br> که دلمون توی موهای فرت گره بخوره و گیر کنه.👩🏻‍🦱",
  },
  {
    title: "ماه خانومی!",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-02.png",
    text: "   چشم بهم زدیم شدی ماه من، ماه شب چهارده <br> ماه اسمونم که شبای تیره و تارمو روشن میکنی <br> همه آدما ستاره باشن، تو در کنارشون ماهی!🌙 ",
  },
  {
    title: "خنده شیرینت",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-03.jpg",
    text: " یکی از صداها و صحنه هایی که هیچوقت از شنیدن و دیدنش خسته نمیشم، <br> خنده خوشگل و شیرینته <br> اون لبختد محوی که میزنی یه هلال ماه رو به بالا میشینه رو صورت نازت.🤌🏼",
  },
  {
    title: "دل نازک من",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-04.jpg",
    text: " پشت همه شیطنت ها و شوخی هات، یه دل نازک داری <br> شاید نشونش ندی، ولی من خوب میدونمش <br> باید بیشتر مراقبش باشم✨",
  },
  {
    title: "حواس جمع! ",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-05.jpg",
    text: " یه چیزایی رو میبینی که خیلیا اصلا متوجهش نمیشن <br> واقعا به آدم ها و اتفاق هایی که اطرافت میوفته توجه میکنی",
  },
  {
    title: "خود خودت",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-06.jpg",
    text: " توضیح خاصی ندارم، خود مهدیه بودن خودش خاص ترین چیزیه که آدم میتونه ببینه <br> من خود مهدیه هرطوری که هست رو خیلی دوسش دارم.❤️",
  },
  {
    title: "قد بلند رعنا",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-07.jpg",
    text: " یه دختر ۱۰/۱۰ چیه؟ <br> یه دختریه که قدش بلنده و خوش اندام :) <br> خدا فقط آدمای خاص رو قد بلند میکنه که یکیشم دختر خوشگل منه😌",
  },
  {
    //ویدیو!
    title: "وروجک دوست داشتنی",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-071.jpg",
    text: " یه وروجک کوچولو گوشه شخصیتت داره زندگی میکنه، نمیخوام هیچوقت بزرگ شه <br> چون میدونی <br> من این ورژن نینی کوچولوم رو خیلی دوس دارم.❤️",
  },
  {
    title: "چیزی که خودت نمیبینی!",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-08.jpg",
    text: " آخ آخ <br> قوی بود این نیست که هیچوقت خسته نشی یا نشکنی<br> اینه که با وجود همه اینا خودتو جمع کنی و ادامه بدی! <br> کاش میشد برای چند دقیقه خودت رو از چشم من ببینی، اون موقع خودت هم به خودت افتخار میکردی💛",
  },
  {
    title: "گوش میدی، نه که فقط بشنوی",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-09.jpg",
    text: " شنونده خوبی هستی برای اطرافیانت <br> کامل به حرفاشون گوش میدی <br>‌میشنوی ببینی کی به چی درگیره <br> این ویژگی خاص تورو خیلیا ندارن! <br> قدرشو بدون✨",
  },
  {
    title: "قلب احساساتی",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-10.jpg",
    text: " قربون قلب احساساتیت برم من، احساسات خوشگلتو جوری نشون میدی <br> جوری بروز میدی ادم دلش ضعف میره <br> مثل خوشحالیت، ناراحتیت، عصبانیتت، ذوق زدگیت <br> تک تک اینا خیلی خاص و قشنگن😉",
  },
  {
    title: "کیوت بامزه",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-111.jpg",
    text: " کیووووت، خدایا هرچی بامزگی و نمکی بوده ریخته تو این بشر <br> یجوری کیوتی ادم میگه بگیرم بچلونمش😭",
  },
  {
    title: "دریایی، دریا",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-11.jpg",
    text: " آرومی مثل دریا <br> آرامشی که تو چهره معصومت هست وایب اروم دریا رو میده <br> ادم وقتی کنارت ساکته انگار صدای موج های دریا کنار گوشش زمزمه میکنن.🌊",
  },
  {
    title: "راهی که اومدی",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-12.jpg",
    text: " میدونم مسیری که اومدی آسون نبوده، اما هنوز داری جلو میری  <br> شاید خودت متوجهش نباشی اما به عقب که نگاه میکنم، میبینم راه خیلی زیادی اومدی <br> بزرگ شدی، عوض شدی، خیلی چیزا یاد گرفتی <br> بهت افتخار میکنم جوجه کوچولوم🐥",
  },
  {
    title: "هستی، حتی از دور",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-13.jpg",
    text: " حتی اگه نزدیک هم نباشی، هستی <br> خدا تورو یه فرشته آفریده که حتی از دور هم میشه حست کرد🪽",
  },
  {
    title: "دل فهمی",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-14.jpg",
    text: " میدونی تو انگار میدونی کی داره چی رو حس میکنه، حسش میکنی و میفهمی <br> ناراحتی و خوشحالی اطرافیانت رو خوب تشخیص میدی و همدلی کردن رو خوب بلدی.🫀",
  },
  {
    title: "چشم قدرشناس",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-15.jpg",
    text: " قدرشناسی! <br> خوب بلدی قدر یه چیزیو بدونی <br> خوب بلدی از یه چیزی مراقبت کنی و نزاری بهش آسیب برسه <br> منم قدر خدارو میدونم با این نعمتی که تو زندگیم دارم💛",
  },
  {
    //ویدیو!
    title: "بخشنده و مهربون",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-151.jpg",
    text: " دل مهربون تو خیلی بزرگ و صافه، خیلی بخشنده تر از چیزی هستی که فکر میکنی <br> مرسی که وجود داری خوش قلب من🫀",
  },
  {
    title: "خونه امن",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-16.jpg",
    text: " خونه ینی چی؟ یعنی یه جای امن یعنی پناه <br> تو خونه امنی هستی که ادم میتونه بهت پناه بیاره و بگه آخیشششش!😌",
  },
  {
    title: "دنیای متفاوت تو",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-17.jpg",
    text: " دنیارو یه جور دیگه جذاب میبینی چشم آهویی، از همه آدمهایی که تاحالا دیدم خاص تری <br> انگار چشم آهویی قصه ما دنیارو با وجود قشنگش خاص تر میکنه👌🏼",
  },
  {
    title: "اراده محکم",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-18.jpg",
    text: " مهدیه قشنگ من، اراده ای که تو داری هیچکس نداره خوب بلدی کی مسمم بشی و تصمیمتو بگیری<br> تحسینت میکنم بابت اراده ای که داری پر قدرت ادامه بده ماه من👌🏼",
  },
  {
    title: "صدای قشنگت",
    date: "2026/10/08",
    image: "./assets/images/memories/trait-19.jpg",
    text: " یه صدایی شنیدم، درست مثل زمزمه و نوای بهشتی بود <br> اگه اشتباه نکنم صدای یه فرشته مهرماهی بود😭",
    voice: "assets/audio/mahdieh-voice.OGG",
  },
];
/* =========================
   OPEN MEMORY
   ========================= */

function openMemory(index) {
  const panel = document.getElementById("memory-panel");

  const memory = memories[index];

  if (!panel || !memory) {
    return;
  }

  /* =========================
       بخش پولاروید — فقط اگه عکس داره
       ========================= */

  const polaroidHTML = memory.image
    ? `
                <div class="polaroid">

                    <div class="polaroid-photo">

                        <img
                            src="${memory.image}"
                            alt=""
                        >

                    </div>


                    <div class="polaroid-caption">

                        <div class="polaroid-title">
                            ${memory.title}
                        </div>

                        <div class="polaroid-date">
                            ${memory.date}
                        </div>

                    </div>

                </div>
            `
    : `
                <div class="memory-no-photo">

                    <div class="polaroid-title">
                        ${memory.title}
                    </div>

                    <div class="polaroid-date">
                        ${memory.date}
                    </div>

                </div>
            `;

  panel.innerHTML = `

        <div class="memory-overlay">

            <div class="memory-card">

                <button
                    class="memory-close"
                    aria-label="Close memory"
                >
                    ×
                </button>


                ${polaroidHTML}


                <!-- MEMORY TEXT -->

                <div class="memory-story">

                    <p>
                        ${memory.text}
                    </p>

                </div>

            </div>

        </div>
    `;

  const overlay = panel.querySelector(".memory-overlay");

  const closeButton = panel.querySelector(".memory-close");

  /* =========================
       SHOW PANEL
       ========================= */

  requestAnimationFrame(() => {
    overlay.classList.add("visible");
  });
  /* ✅ اگه فایل صوتی داشت، پلی کن */

  if (memory.voice && typeof AudioSystem !== "undefined") {
    AudioSystem.duckAndPlay(memory.voice);
  }

  /* =========================
       CLOSE
       ========================= */

  closeButton.addEventListener("click", closeMemory);

  /* فعال‌سازی سوایپ برای بستن */

  enableSwipeToClose(overlay);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeMemory();
    }
  });
}

/* =========================
   CLOSE MEMORY
   ========================= */

function closeMemory() {
  const panel = document.getElementById("memory-panel");

  if (!panel) {
    return;
  }

  const overlay = panel.querySelector(".memory-overlay");

  if (!overlay) {
    return;
  }

  /* ✅ توقف صدای مهدیه */

  if (typeof AudioSystem !== "undefined" && AudioSystem.stopAllVoices) {
    AudioSystem.stopAllVoices();
  }

  overlay.classList.remove("visible");

  setTimeout(() => {
    panel.innerHTML = "";
  }, 700);
}
/* =========================
   SWIPE DOWN TO CLOSE
   سوایپ به پایین برای بستن
   ========================= */

function enableSwipeToClose(overlay) {
  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  const card = overlay.querySelector(".memory-card");

  if (!card) {
    return;
  }

  overlay.addEventListener(
    "touchstart",
    (event) => {
      startY = event.touches[0].clientY;
      currentY = startY;
      isDragging = true;

      card.style.transition = "none";
    },
    { passive: true },
  );

  overlay.addEventListener(
    "touchmove",
    (event) => {
      if (!isDragging) {
        return;
      }

      currentY = event.touches[0].clientY;

      const delta = currentY - startY;

      /* فقط سوایپ به پایین */

      if (delta > 0) {
        card.style.transform = `translateY(${delta}px)`;

        card.style.opacity = Math.max(0.3, 1 - delta / 400);
      }
    },
    { passive: true },
  );

  overlay.addEventListener("touchend", () => {
    if (!isDragging) {
      return;
    }

    isDragging = false;

    const delta = currentY - startY;

    card.style.transition = "";

    /* اگه بیشتر از ۱۰۰ پیکسل کشید، ببند */

    if (delta > 100) {
      card.style.transform = "";
      card.style.opacity = "";

      closeMemory();
    } else {
      /* برگرد به حالت اول */

      card.style.transform = "";
      card.style.opacity = "";
    }
  });
}

/* =========================
   ESCAPE TO CLOSE
   ========================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const panel = document.getElementById("memory-panel");

    if (panel && panel.querySelector(".memory-overlay.visible")) {
      closeMemory();
    }
  }
});
