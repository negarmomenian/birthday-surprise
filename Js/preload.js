/* =========================
   PRELOAD ASSETS
   پیش‌بارگذاری عکس‌ها
   ========================= */

function preloadImages(urls) {

    if (!urls || !urls.length) {
        return;
    }

    urls.forEach((url) => {

        if (!url) {
            return;
        }

        const img = new Image();

        img.src = url;

        /* عمداً await نمی‌کنیم
           که لود صفحه رو معطل نکنه */

    });
}


function preloadAll() {

    /* =========================
       عکس خاطرات
       ========================= */

    if (
        typeof memories !== "undefined" &&
        Array.isArray(memories)
    ) {

        const memoryImages =
            memories
                .map((m) => m.image)
                .filter(Boolean);

        preloadImages(memoryImages);
    }


    /* =========================
       عکس گل باز
       ========================= */

    preloadImages([
        "assets/images/flowers/chamomile-open.png"
    ]);

}


/* =========================
   اجرا بعد از لود اولیه
   ========================= */

window.addEventListener("load", () => {

    /* یه کم تأخیر، که با انیمیشن‌های
       اولیه‌ی صفحه درگیر نشه */

    setTimeout(preloadAll, 1500);

});