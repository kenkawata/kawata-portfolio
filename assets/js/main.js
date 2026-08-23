(() => {
  "use strict";

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  const revealTargets = document.querySelectorAll(
    ".section-kicker, .section-title, .section-lead, .about-text, .about-card, .skill-card, .project-card, .work-item, .timeline li, .contact-email"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  // Header: hide on scroll down, show on scroll up
  const header = document.querySelector(".site-header");
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const HIDE_THRESHOLD = 80;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      if (currentScrollY > HIDE_THRESHOLD && scrollingDown) {
        header.classList.add("is-hidden");
      } else {
        header.classList.remove("is-hidden");
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    });
  }

  // Back to top button: fixed, shown after scrolling down, hidden near the footer
  const backToTop = document.getElementById("backToTop");
  const siteFooter = document.getElementById("siteFooter");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const SHOW_THRESHOLD = 400;
    let pastThreshold = window.scrollY > SHOW_THRESHOLD;
    let footerVisible = false;

    const updateVisibility = () => {
      const shouldShow = pastThreshold && !footerVisible;
      backToTop.classList.toggle("is-visible", shouldShow);
    };

    window.addEventListener("scroll", () => {
      pastThreshold = window.scrollY > SHOW_THRESHOLD;
      updateVisibility();
    });

    if (siteFooter && "IntersectionObserver" in window) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          footerVisible = entries[0].isIntersecting;
          updateVisibility();
        },
        { rootMargin: "0px" }
      );
      footerObserver.observe(siteFooter);
    }

    updateVisibility();
  }
})();
