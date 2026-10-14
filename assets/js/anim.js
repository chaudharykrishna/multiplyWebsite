/* motion layer via cdn libs. no libs or reduced-motion: file no-ops */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("anim");
  window.__animReady = true;

  var EASE = "power3.out";

  /* hero: headline comes in word by word */
  var heroTitle = document.querySelector("[data-split]");
  if (heroTitle) {
    if (window.SplitType) {
      var split = new SplitType(heroTitle, { types: "words" });
      gsap.from(split.words, {
        yPercent: 110, opacity: 0, rotate: 1.5,
        duration: 0.9, ease: EASE, stagger: 0.055, delay: 0.12,
        clearProps: "all"
      });
    } else {
      gsap.from(heroTitle, { y: 28, opacity: 0, duration: 0.9, ease: EASE, delay: 0.12, clearProps: "all" });
    }
    var heroFade = document.querySelectorAll(".hero .lead, .hero .hero-actions, .hero .hero-note, .hero .hero-eyebrow");
    if (heroFade.length) {
      gsap.from(heroFade, { y: 24, opacity: 0, duration: 0.8, ease: EASE, stagger: 0.09, delay: 0.38, clearProps: "all" });
    }
    var heroCard = document.querySelector(".hero .ss-screen");
    if (heroCard) {
      gsap.from(heroCard, { y: 44, opacity: 0, scale: 0.985, duration: 1.05, ease: EASE, delay: 0.3, clearProps: "transform,opacity" });
    }
  }

  /* little mouse tilt on the hero mock screen, desktop only */
  var tiltCard = document.querySelector("[data-tilt]");
  if (tiltCard && window.matchMedia("(pointer: fine)").matches) {
    var qx = gsap.quickTo(tiltCard, "rotationY", { duration: 0.6, ease: EASE });
    var qy = gsap.quickTo(tiltCard, "rotationX", { duration: 0.6, ease: EASE });
    var wrap = tiltCard.closest(".tilt-wrap") || tiltCard.parentElement;
    wrap.addEventListener("pointermove", function (e) {
      var r = tiltCard.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      qx(px * 4);
      qy(py * -3);
    });
    wrap.addEventListener("pointerleave", function () { qx(0); qy(0); });
  }

  /* scroll reveals, once each */
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 86%",
    once: true,
    onEnter: function (batch) {
      batch.forEach(function (el, i) {
        setTimeout(function () { el.classList.add("is-in"); }, i * 90);
      });
    }
  });

  ScrollTrigger.batch("[data-reveal-child]", {
    start: "top 86%",
    once: true,
    onEnter: function (batch) {
      batch.forEach(function (el) {
        Array.prototype.forEach.call(el.children, function (kid, i) {
          kid.style.transitionDelay = (i * 0.09) + "s";
        });
        el.classList.add("is-in");
      });
    }
  });

  /* image mask wipes */
  ScrollTrigger.batch("[data-wipe]", {
    start: "top 88%",
    once: true,
    onEnter: function (batch) { batch.forEach(function (el) { el.classList.add("is-in"); }); }
  });

  /* scrub motion is desktop-only: keeps phone scrolling light */
  var desktop = window.matchMedia("(pointer: fine) and (min-width: 900px)").matches;
  if (desktop) {
    /* gentle parallax */
    document.querySelectorAll("[data-parallax]").forEach(function (el) {
      var amt = parseFloat(el.getAttribute("data-parallax")) || 8;
      gsap.to(el, {
        yPercent: -amt,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 }
      });
    });
    /* action scene gets a slow camera drift while it scrolls */
    var scene = document.querySelector(".ss-scene .ss-scene-grid");
    if (scene) {
      gsap.fromTo(scene, { scale: 1.06, y: 10 }, {
        scale: 1, y: -10, ease: "none",
        scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: 0.8 }
      });
    }
  }
})();
