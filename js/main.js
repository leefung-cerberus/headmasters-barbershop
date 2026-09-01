/* Headmasters Beauty & Barbershop — interactions */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky header state ---- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (window.scrollY > 24) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  var setNav = function (open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", function () {
    setNav(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setNav(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });

  /* ---- Highlight today's hours ---- */
  var today = new Date().getDay();
  var todayItem = document.querySelector('#hoursList li[data-day="' + today + '"]');
  if (todayItem) todayItem.classList.add("is-today");

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Lightbox ---- */
  var grid = document.getElementById("galleryGrid");
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var triggers = Array.prototype.slice.call(grid.querySelectorAll("button"));
  var current = -1;
  var lastFocused = null;

  var show = function (i) {
    current = (i + triggers.length) % triggers.length;
    var btn = triggers[current];
    lbImg.src = btn.getAttribute("data-full");
    lbImg.alt = btn.querySelector("img").alt;
  };
  var open = function (i) {
    lastFocused = document.activeElement;
    show(i);
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  };
  var close = function () {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    lbImg.src = "";
    if (lastFocused) lastFocused.focus();
  };

  triggers.forEach(function (btn, i) {
    btn.addEventListener("click", function () { open(i); });
  });
  lbClose.addEventListener("click", close);
  lbPrev.addEventListener("click", function () { show(current - 1); });
  lbNext.addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "Tab") {
      // simple focus trap across the 4 controls
      var f = [lbClose, lbPrev, lbNext];
      var idx = f.indexOf(document.activeElement);
      e.preventDefault();
      var dir = e.shiftKey ? -1 : 1;
      f[(idx + dir + f.length) % f.length].focus();
    }
  });
})();
