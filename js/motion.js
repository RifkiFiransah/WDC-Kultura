(function () {
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var selector = [
    ".hero-title > *",
    ".page-hero > *",
    ".section-head",
    ".destinasi-card",
    ".history-preview-item",
    ".history-facts",
    ".teaser-card",
    ".destination-card",
    ".card-kultura",
    ".timeline-item",
    ".map-preview",
    ".quote-box"
  ].join(", ");

  var items = Array.prototype.slice.call(document.querySelectorAll(selector));
  var groups = new Map();

  items.forEach(function (item) {
    var parent = item.parentElement;
    var order = groups.get(parent) || 0;
    groups.set(parent, order + 1);
    item.style.setProperty("--motion-delay", Math.min(order, 5) * 70 + "ms");
  });

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (item) {
      item.classList.add("motion-in");
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("motion-in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  if (reducedMotion.matches) return;

  document.querySelectorAll(".destination-card, .card-kultura, .teaser-card").forEach(function (card) {
    function reset() {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
      card.style.removeProperty("--card-lift");
    }

    card.addEventListener("pointermove", function (event) {
      if (event.pointerType !== "mouse") return;
      var bounds = card.getBoundingClientRect();
      var x = (event.clientX - bounds.left) / bounds.width - 0.5;
      var y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--tilt-x", (y * -3).toFixed(2) + "deg");
      card.style.setProperty("--tilt-y", (x * 3).toFixed(2) + "deg");
      card.style.setProperty("--card-lift", "-3px");
    });

    card.addEventListener("pointerleave", reset);
  });

  var hero = document.querySelector("#home .hero-img");
  if (!hero) return;

  var cards = Array.prototype.slice.call(hero.querySelectorAll(".hero-card"));
  var pointer = { x: 0, y: 0 };
  var frame = 0;

  function render() {
    frame = 0;
    var scroll = window.pageYOffset || 0;
    var bounds = hero.getBoundingClientRect();
    var visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
    var drift = visible ? Math.max(-12, Math.min(12, scroll * 0.03)) : 0;

    cards.forEach(function (card, index) {
      var depth = (index % 3 + 1) * 2;
      var x = pointer.x * depth;
      var y = pointer.y * depth + drift * (index % 2 ? 0.35 : 0.2);
      card.style.setProperty("--hero-x", x.toFixed(1) + "px");
      card.style.setProperty("--hero-y", y.toFixed(1) + "px");
    });
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  hero.addEventListener("pointermove", function (event) {
    if (event.pointerType !== "mouse") return;
    var bounds = hero.getBoundingClientRect();
    pointer.x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    pointer.y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    schedule();
  });

  hero.addEventListener("pointerleave", function () {
    pointer.x = 0;
    pointer.y = 0;
    schedule();
  });

  window.addEventListener("scroll", schedule, { passive: true });
})();
