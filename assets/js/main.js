/* site behaviour. everything here is optional, pages work with js off */
(function () {
  "use strict";

  /* values still owed by the team. empty slots render nothing until set */
  var CONFIG = {
    gameUrl: "https://spotsafe360final.onrender.com/login.html",
    email: "hello@multiply.com",
    whatsapp: "",                  // e.g. "+97798…" turns the call/whatsapp card on
    socials: {
      linkedin: "",                // e.g. "https://www.linkedin.com/company/multiply"
      youtube: "",
      instagram: "",
      tiktok: "",
      facebook: ""
    }
  };

  var doc = document;
  doc.documentElement.classList.add("js");

  var motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* try buttons all point at the live game */
  doc.querySelectorAll("[data-game-url]").forEach(function (el) {
    el.setAttribute("href", CONFIG.gameUrl);
    if (el.tagName === "A") { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
  });
  doc.querySelectorAll("[data-email]").forEach(function (el) {
    el.setAttribute("href", "mailto:" + CONFIG.email);
    if (el.hasAttribute("data-email-text") || el.classList.contains("card-value")) el.textContent = CONFIG.email;
  });

  /* footer socials: only render icons that have a url */
  var SOCIAL_ICONS = {
    linkedin: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z",
    youtube: "M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.55 12 4.55 12 4.55s-7.5 0-9.4.55A3 3 0 0 0 .5 7.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.55 9.4.55 9.4.55s7.5 0 9.4-.55a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-4.8zM9.6 15.6V8.4L15.8 12z",
    instagram: "M12 2.2c3.2 0 3.6 0 4.9.07 3.25.15 4.77 1.7 4.92 4.92.07 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.15 3.23-1.66 4.77-4.92 4.92-1.3.07-1.7.07-4.9.07s-3.6 0-4.86-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86C2.42 3.9 3.93 2.42 7.19 2.27 8.4 2.2 8.8 2.2 12 2.2zm0 3.7a6.1 6.1 0 1 0 0 12.2 6.1 6.1 0 0 0 0-12.2zm0 10.06a3.96 3.96 0 1 1 0-7.92 3.96 3.96 0 0 1 0 7.92zm6.35-11.74a1.43 1.43 0 1 0 2.86 0 1.43 1.43 0 0 0-2.86 0z",
    tiktok: "M19.6 6.3a4.8 4.8 0 0 1-3.4-4.3V1h-3.5v14.1a2.9 2.9 0 1 1-2.9-2.8v-3.6a6.4 6.4 0 1 0 6.4 6.4V8.6a8.2 8.2 0 0 0 4.8 1.5V6.7c-.4 0-.9-.1-1.4-.4z",
    facebook: "M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.23 2.7.23v3h-1.5c-1.5 0-2 .93-2 1.9V12h3.3l-.53 3.5h-2.78v8.4A12 12 0 0 0 24 12z"
  };
  document.querySelectorAll("[data-socials]").forEach(function (row) {
    Object.keys(CONFIG.socials).forEach(function (net) {
      var url = CONFIG.socials[net];
      if (!url) return;
      var a = document.createElement("a");
      a.href = url; a.target = "_blank"; a.rel = "noopener";
      a.setAttribute("aria-label", "Multiply on " + net.charAt(0).toUpperCase() + net.slice(1));
      var ns = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(ns, "svg");
      svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("fill", "currentColor"); svg.setAttribute("aria-hidden", "true");
      var path = document.createElementNS(ns, "path");
      path.setAttribute("d", SOCIAL_ICONS[net]);
      svg.appendChild(path); a.appendChild(svg); row.appendChild(a);
    });
    if (!row.children.length) row.remove();
  });

  /* whatsapp card stays hidden until a number exists */
  var waCard = document.querySelector("[data-whatsapp-card]");
  if (waCard) {
    if (CONFIG.whatsapp) {
      waCard.removeAttribute("hidden");
      var waLink = waCard.querySelector("[data-wa-link]");
      var num = CONFIG.whatsapp.replace(/[^\d+]/g, "");
      if (waLink) { waLink.setAttribute("href", "https://wa.me/" + num.replace("+", "")); waLink.setAttribute("target", "_blank"); waLink.setAttribute("rel", "noopener"); waLink.textContent = CONFIG.whatsapp; }
    } else {
      waCard.remove();
    }
  }

  /* header gets a hairline once you scroll */
  var head = doc.querySelector(".site-head");
  if (head) {
    var onScrollHead = function () { head.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScrollHead();
    window.addEventListener("scroll", onScrollHead, { passive: true });
  }

  /* mobile drawer */
  var toggle = doc.querySelector(".nav-toggle");
  var drawer = doc.querySelector(".nav-drawer");
  if (toggle && drawer) {
    var setDrawer = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      drawer.classList.toggle("is-open", open);
      doc.body.style.overflow = open && drawer.scrollHeight > window.innerHeight ? "hidden" : "";
      if (open) {
        var first = drawer.querySelector("a");
        if (first) first.focus();
      } else {
        toggle.focus();
      }
    };
    toggle.addEventListener("click", function () {
      setDrawer(toggle.getAttribute("aria-expanded") !== "true");
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setDrawer(false);
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setDrawer(false); });
    });
    /* keep tab inside the drawer while it's open */
    drawer.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var items = drawer.querySelectorAll("a, button");
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* sticky try bar on phones: shows after scroll, hides near form and footer */
  var mBar = doc.querySelector(".mobile-cta");
  if (mBar) {
    var footer = doc.querySelector(".site-footer");
    var onScrollBar = function () {
      var past = window.scrollY > 480;
      var typing = doc.activeElement && /INPUT|TEXTAREA/.test(doc.activeElement.tagName);
      var nearFooter = footer && footer.getBoundingClientRect().top < window.innerHeight;
      mBar.classList.toggle("is-visible", past && !typing && !nearFooter);
    };
    window.addEventListener("scroll", onScrollBar, { passive: true });
    window.addEventListener("focusin", onScrollBar);
    window.addEventListener("focusout", onScrollBar);
  }

  /* marquee needs the track doubled to loop cleanly */
  var track = doc.querySelector(".marquee-track");
  if (track) {
    track.innerHTML += track.innerHTML;
    track.setAttribute("aria-hidden", "true");
  }

  /* count up on first view. counter span's first child stays plain text */
  var counters = doc.querySelectorAll("[data-count]");
  var runCount = function (el) {
    var end = parseFloat(el.getAttribute("data-count"));
    if (!motionOK) { el.firstChild.nodeValue = String(end); return; }
    var dur = 1100, t0 = null;
    var step = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.firstChild.nodeValue = String(Math.round(end * eased));
      if (p < 1) requestAnimationFrame(step);
      else el.firstChild.nodeValue = String(end);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCount(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  } else {
    counters.forEach(function (c) { c.firstChild.nodeValue = c.getAttribute("data-count"); });
  }

  /* reveal fallback for when gsap didn't load (offline, blocked cdn, etc.) */
  if (!window.__animReady) {
    var reveal = doc.querySelectorAll("[data-reveal], [data-reveal-child], [data-wipe]");
    if (reveal.length && "IntersectionObserver" in window && motionOK) {
      var st = doc.createElement("style");
      st.textContent =
        ".js [data-reveal].reveal-io{opacity:0;transform:translateY(26px)}" +
        ".js [data-reveal].reveal-io.is-in{opacity:1;transform:none;transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}" +
        ".js [data-reveal-child].reveal-io>*{opacity:0;transform:translateY(22px)}" +
        ".js [data-reveal-child].reveal-io.is-in>*{opacity:1;transform:none;transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}" +
        ".js [data-wipe].reveal-io{clip-path:inset(0 0 100% 0)}" +
        ".js [data-wipe].reveal-io.is-in{clip-path:inset(0 0 0 0);transition:clip-path 1s cubic-bezier(.22,1,.36,1)}";
      doc.head.appendChild(st);
      reveal.forEach(function (el) { el.classList.add("reveal-io"); });
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io2.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      reveal.forEach(function (el) { io2.observe(el); });
    }
  }

  /* contact form: basic checks, then open the visitor's mail app prefilled */
  var form = doc.querySelector("#contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var fields = {
      name: form.querySelector("#f-name"),
      email: form.querySelector("#f-email"),
      company: form.querySelector("#f-company"),
      message: form.querySelector("#f-message")
    };
    var setErr = function (input, msg) {
      var wrap = input.closest(".form-field");
      wrap.classList.toggle("has-error", !!msg);
      var err = wrap.querySelector(".field-error");
      if (err) err.textContent = msg || "";
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    };
    Object.keys(fields).forEach(function (k) {
      fields[k].addEventListener("input", function () { setErr(fields[k], ""); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      if (!fields.name.value.trim()) { setErr(fields.name, "Tell us your name."); firstBad = firstBad || fields.name; }
      var em = fields.email.value.trim();
      if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) { setErr(fields.email, "Enter a valid email address so we can reply."); firstBad = firstBad || fields.email; }
      if (!fields.message.value.trim() || fields.message.value.trim().length < 10) { setErr(fields.message, "Add a sentence or two about what you need."); firstBad = firstBad || fields.message; }
      if (firstBad) { firstBad.focus(); return; }

      var subject = "SpotSafe 360 enquiry from " + fields.name.value.trim();
      var body =
        "Name: " + fields.name.value.trim() + "\n" +
        "Company: " + (fields.company.value.trim() || "n/a") + "\n" +
        "Email: " + em + "\n\n" + fields.message.value.trim();
      window.location.href = "mailto:" + (form.getAttribute("data-email") || CONFIG.email) +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      if (status) status.innerHTML = "<strong>Opening your email app…</strong> Your message is pre-filled, just press send. Or write to <a href='mailto:" + CONFIG.email + "'>" + CONFIG.email + "</a> directly.";
    });
  }

  /* footer year */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
