/* =========================
   FLOATING PARTICLES
   گرده / غبار رویایی
   ========================= */

function createParticles() {

    const container =
        document.getElementById("particles");

    if (!container) {
        return;
    }


    /* =========================
       تعداد بر اساس اندازه صفحه
       ========================= */

    const isMobile =
        window.matchMedia("(max-width: 600px)").matches;

    /* روی دسکتاپ ۱۸ تا، روی موبایل ۱۲ تا */
    const count =
        isMobile ? 15 : 20;


    /* =========================
       پاک کردن قبلی‌ها
       (برای resize امن)
       ========================= */

    container.innerHTML = "";


    /* =========================
       ساخت ذرات
       ========================= */

    for (let i = 0; i < count; i++) {

        const particle =
            document.createElement("span");

        particle.className = "particle";


        /* موقعیت اولیه رندوم در کل صفحه */
        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;


        /* مدت زمان انیمیشن: ۱۰ تا ۲۲ ثانیه */
        particle.style.setProperty(
            "--duration",
            `${10 + Math.random() * 12}s`
        );


        /* تأخیر شروع: ۰ تا ۱۵ ثانیه */
        particle.style.setProperty(
            "--delay",
            `${Math.random() * 15}s`
        );


        /* جهت شناوری: کم و ملایم */
        particle.style.setProperty(
            "--drift-x",
            `${-40 + Math.random() * 80}px`
        );

        particle.style.setProperty(
            "--drift-y",
            `${-60 - Math.random() * 60}px`
        );


        /* اوج شفافیت: بین ۰.۴ تا ۰.۸ */
        particle.style.setProperty(
            "--peak-opacity",
            (0.4 + Math.random() * 0.4).toFixed(2)
        );


        /* اندازه کمی متفاوت برای تنوع */
        const scale =
            0.8 + Math.random() * 0.8;

        particle.style.width =
            `${5 * scale}px`;
        particle.style.height =
            `${5 * scale}px`;


        container.appendChild(particle);
    }


    /* =========================
       نمایش آروم بعد از لود
       ========================= */

    requestAnimationFrame(() => {

        setTimeout(() => {
            container.classList.add("ready");
        }, 400);

    });
}


/* =========================
   اجرا در لود صفحه
   ========================= */

window.addEventListener(
    "load",
    createParticles
);


/* =========================
   بازسازی در تغییر اندازه / چرخش صفحه
   ========================= */

let particleResizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(particleResizeTimer);

        particleResizeTimer =
            setTimeout(() => {

                const container =
                    document.getElementById(
                        "particles"
                    );

                if (container) {
                    container.classList.remove(
                        "ready"
                    );
                }

                createParticles();

            }, 400);
    }
);