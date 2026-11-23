(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function sync() {
    var isDark = root.dataset.theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Gunakan tema terang" : "Gunakan tema gelap");
  }

  toggle.addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;

    try {
      localStorage.setItem("kultura-theme", next);
    } catch (error) {}

    sync();
  });

  function onPreferenceChange(event) {
    try {
      if (localStorage.getItem("kultura-theme")) return;
    } catch (error) {}

    root.dataset.theme = event.matches ? "dark" : "light";
    sync();
  }

  if (media.addEventListener) {
    media.addEventListener("change", onPreferenceChange);
  } else {
    media.addListener(onPreferenceChange);
  }

  sync();
})();
