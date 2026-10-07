function setSkyState(state, progress = 0) {
  const world = document.getElementById("world");

  if (!world) {
    return;
  }

  world.dataset.time = state;

  world.style.setProperty("--time-progress", progress);
}
