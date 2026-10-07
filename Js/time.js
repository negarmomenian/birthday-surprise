const timeStates = {
  night: {
    name: "night",
    start: 0,
    end: 4.5,
  },

  dawn: {
    name: "dawn",
    start: 4.5,
    end: 6,
  },

  day: {
    name: "day",
    start: 6,
    end: 16,
  },

  golden: {
    name: "golden",
    start: 16,
    end: 18,
  },

  twilight: {
    name: "twilight",
    start: 18,
    end: 18.75,
  },

  nightAfter: {
    name: "night",
    start: 18.75,
    end: 24,
  },
};

function getCurrentHour() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return hours + minutes / 60 + seconds / 3600;
}

function getTimeProgress() {
  const hour = getCurrentHour();

  let state = "night";
  let progress = 0;

  /* =========================
       DAWN
       ========================= */

  if (hour >= 4.5 && hour < 6) {
    state = "dawn";

    progress = (hour - 4.5) / (6 - 4.5);
  } else if (hour >= 6 && hour < 16) {
    /* =========================
       DAY
       ========================= */
    state = "day";

    progress = (hour - 6) / (16 - 6);
  } else if (hour >= 16 && hour < 18) {
    /* =========================
       GOLDEN HOUR
       (حالا از ۱۶ تا ۱۸)
       ========================= */
    state = "golden";

    progress = (hour - 16) / (18 - 16);
  } else if (hour >= 18 && hour < 18.75) {
    /* =========================
       TWILIGHT
       ========================= */
    state = "twilight";

    progress = (hour - 18) / (18.75 - 18);
  } else {
    /* =========================
       NIGHT
       ========================= */
    state = "night";

    if (hour >= 18.75) {
      progress = (hour - 18.75) / (24 - 18.75);
    } else {
      progress = hour / 4.5;
    }
  }

  return {
    state: state,

    progress: Math.max(0, Math.min(1, progress)),

    hour: hour,
  };
}
