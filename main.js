// Onglets dynamiques
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) =>
      b.classList.remove("text-[#1b6086]", "border-[#1b6086]")
    );
    tabBtns.forEach((b) =>
      b.classList.add("text-gray-600", "border-transparent")
    );
    btn.classList.add("text-[#1b6086]", "border-[#1b6086]");
    btn.classList.remove("text-gray-600", "border-transparent");
    const tab = btn.getAttribute("data-tab");
    const targetElement = document.getElementById(tab);
    if (targetElement) {
      tabContents.forEach((content) => {
        content.classList.add("hidden");
      });
      targetElement.classList.remove("hidden");
    }
  });
});

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu elements
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const mobileFormationsButton = document.getElementById(
    "mobile-formations-button"
  );
  const mobileFormationsMenu = document.getElementById(
    "mobile-formations-menu"
  );
  const mobileArrow = document.getElementById("mobile-arrow");
  let isMenuOpen = false;
  let isSubmenuOpen = false;

  // Toggle main mobile menu
  function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle("hidden", !isMenuOpen);
    mobileMenu.style.maxHeight = isMenuOpen
      ? mobileMenu.scrollHeight + "px"
      : "0";

    // Toggle menu icon between bars and times
    if (isMenuOpen) {
      // Change to X icon
      if (menuIcon) {
        menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12");
        menuIcon.setAttribute("stroke-linecap", "round");
        menuIcon.setAttribute("stroke-linejoin", "round");
      }
      if (mobileMenuButton) {
        mobileMenuButton.setAttribute("aria-expanded", "true");
      }
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    } else {
      // Change to hamburger icon
      if (menuIcon) {
        menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
        menuIcon.setAttribute("stroke-linecap", "round");
        menuIcon.setAttribute("stroke-linejoin", "round");
      }
      if (mobileMenuButton) {
        mobileMenuButton.setAttribute("aria-expanded", "false");
      }
      document.body.style.overflow = ""; // Re-enable scrolling

      // Close submenu when closing main menu
      if (isSubmenuOpen) {
        toggleFormationsMenu();
      }
    }
  }

  // Toggle formations submenu
  function toggleFormationsMenu() {
    isSubmenuOpen = !isSubmenuOpen;
    if (mobileFormationsMenu) {
      mobileFormationsMenu.classList.toggle("hidden", !isSubmenuOpen);
      mobileFormationsMenu.style.maxHeight = isSubmenuOpen
        ? mobileFormationsMenu.scrollHeight + "px"
        : "0";
    }
    if (mobileArrow) {
      mobileArrow.style.transform = isSubmenuOpen
        ? "rotate(180deg)"
        : "rotate(0)";
    }
    if (mobileFormationsButton) {
      mobileFormationsButton.setAttribute(
        "aria-expanded",
        isSubmenuOpen ? "true" : "false"
      );
    }
  }

  // Event listeners
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (mobileFormationsButton) {
    mobileFormationsButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleFormationsMenu();
    });
  }

  // Close mobile menu when clicking on a link
  if (mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll("a[href]");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        if (this.getAttribute("href") !== "#") {
          toggleMobileMenu();
        }
      });
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      isMenuOpen &&
      mobileMenu &&
      !mobileMenu.contains(e.target) &&
      mobileMenuButton &&
      !mobileMenuButton.contains(e.target)
    ) {
      toggleMobileMenu();
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      // Reset mobile menu state on desktop
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        mobileMenu.style.maxHeight = "";
      }
      if (menuIcon) {
        menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      }
      isMenuOpen = false;
      isSubmenuOpen = false;
      document.body.style.overflow = "";
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "#!") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for fixed header
          behavior: "smooth",
        });
      }
    });
  });

  // Add shadow to navbar on scroll
  function handleNavbarScroll() {
    const navbar = document.getElementById("mainNav");
    if (navbar) {
      if (window.scrollY > 10) {
        navbar.classList.add("shadow-lg");
        navbar.classList.add("bg-white/95");
        navbar.classList.add("backdrop-blur-sm");
      } else {
        navbar.classList.remove("shadow-lg");
        navbar.classList.remove("bg-white/95");
        navbar.classList.remove("backdrop-blur-sm");
      }
    }
  }

  // Gestion dynamique des formations pour inscription.html
  if (
    document.getElementById("type_formation") &&
    document.getElementById("formation_specifique")
  ) {
    const typeFormation = document.getElementById("type_formation");
    const formationSpecifique = document.getElementById("formation_specifique");

    const formations = {
      diplomante: [
        "Graphisme de production",
        "Webmestre",
        "Montage audio visuel",
        "Sécurité électronique",
        "Marketing digital",
        "Développement d'application",
        "Secrétariat bureautique",
        "Secrétariat comptable",
        "Assistante de direction",
        "Comptabilité informatisée et gestion",
      ],
      qualifiante: [
        "Introduction à l'Intelligence Artificielle et IA générative",
        "Développement React",
        "Initiation à la Cybersécurité et protection des données",
        "Développement Web avec WordPress (site vitrine + e-commerce)",
        "Marketing digital et gestion des réseaux sociaux (Meta, WhatsApp Business)",
        "Bureautique avancée : Word, Excel, PowerPoint pro + certification",
        "Langage de programmation spécifique",
      ],
      continue: [
        "Suite MS Office",
        "Infographie",
        "Développement Web",
        "Gestion informatisée",
        "Développement Mobiles et Androids",
        "Prise de vue",
        "Montage vidéo",
        "Mixage audio / Sound design",
        "Motion design et effets spéciaux",
      ],
    };

    typeFormation.addEventListener("change", function () {
      const selectedType = this.value;
      formationSpecifique.innerHTML =
        '<option value="">Sélectionnez une formation</option>';
      if (selectedType && formations[selectedType]) {
        formations[selectedType].forEach((formation) => {
          const option = document.createElement("option");
          option.value = formation.toLowerCase().replace(/\s+/g, "_");
          option.textContent = formation;
          formationSpecifique.appendChild(option);
        });
      }
    });
  }

  // Initialisation AOS (pour toutes les pages)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  // Accordéon FAQ (pour a-propos.html)
  const faqToggles = document.querySelectorAll(".faq-toggle");
  faqToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.parentElement.querySelector(".faq-content");
      if (content.classList.contains("hidden")) {
        document
          .querySelectorAll(".faq-content")
          .forEach((c) => c.classList.add("hidden"));
        document
          .querySelectorAll(".faq-toggle span.text-xl")
          .forEach((s) => (s.textContent = "+"));
        content.classList.remove("hidden");
        btn.querySelector("span.text-xl").textContent = "-";
      } else {
        content.classList.add("hidden");
        btn.querySelector("span.text-xl").textContent = "+";
      }
    });
  });

  // Swiper pour les témoignages (a-propos.html)
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".testimonials-swiper")
  ) {
    new Swiper(".testimonials-swiper", {
      loop: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: { delay: 7000 },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  // Swiper (pour les partenaires sur index.html)
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".partenaires-swiper")
  ) {
    new Swiper(".partenaires-swiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: { delay: 1800, disableOnInteraction: false },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      allowTouchMove: true,
      centeredSlides: true,
      pagination: false,
      navigation: false,
    });
  }

  // Compteur animé pour la section Nos Chiffres Clés
  function animateCounter(counter, target) {
    let start = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / target), 30);
    const increment = Math.ceil(target / (duration / stepTime));
    function update() {
      start += increment;
      if (start >= target) {
        counter.textContent = "+" + target;
      } else {
        counter.textContent = "+" + start;
        setTimeout(update, stepTime);
      }
    }
    update();
  }
  function handleCounters(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        if (!counter.classList.contains("counted")) {
          counter.classList.add("counted");
          const target = parseInt(counter.getAttribute("data-target"));
          animateCounter(counter, target);
        }
      }
    });
  }
  const counters = document.querySelectorAll(".counter");
  const observer = new window.IntersectionObserver(handleCounters, {
    threshold: 0.6,
  });
  counters.forEach((counter) => {
    observer.observe(counter);
  });

  // Bouton "Retour en haut" pour les pages de formations
  (function setupBackToTopOnFormationPages() {
    const formationPages = new Set([
      "comp_infor_gestion.html",
      "developpement-application.html",
      "graphisme-production.html",
      "marketing-digital.html",
      "montage-audiovisuel.html",
      "securite-electronique.html",
      "secretariat-bureautique.html",
      "secretariat-comptable.html",
      "secretariat-direction.html",
      "webmestre.html",
      "formations.html",
    ]);

    const currentPage = (
      window.location.pathname.split("/").pop() || ""
    ).toLowerCase();
    if (!formationPages.has(currentPage)) return;

    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.type = "button";
    btn.setAttribute("aria-label", "Retour en haut");
    btn.className = [
      "fixed",
      "bottom-6",
      "right-5",
      "md:bottom-8",
      "md:right-8",
      "z-50",
      "w-10",
      "h-10",
      "rounded-full",
      "bg-[#56b94c]/10",
      "text-gray-700",
      "shadow-md",
      "ring-1",
      "ring-black/5",
      "backdrop-blur-sm",
      "flex",
      "items-center",
      "justify-center",
      "opacity-0",
      "translate-y-2",
      "pointer-events-none",
      "transition-all",
      "duration-300",
      "ease-out",
      "hover:bg-[#56b94c]/10",
      "hover:shadow-[#56b94c]/20",
      "hover:-translate-y-0.5",
      "active:scale-95",
      "focus:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-[#1b6086]/40",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-transparent",
    ].join(" ");

    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M12 6.5a1 1 0 01.7.29l5 5a1 1 0 01-1.4 1.42L13 10.33V18a1 1 0 11-2 0v-7.67l-3.3 2.88a1 1 0 11-1.3-1.52l5-4.36A1 1 0 0112 6.5z"/></svg>';

    document.body.appendChild(btn);

    function showBackToTop(show) {
      if (show) {
        btn.classList.remove(
          "opacity-0",
          "translate-y-2",
          "pointer-events-none"
        );
        btn.classList.add(
          "opacity-100",
          "translate-y-0",
          "pointer-events-auto"
        );
      } else {
        btn.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
        btn.classList.remove(
          "opacity-100",
          "translate-y-0",
          "pointer-events-auto"
        );
      }
    }

    function handleBackToTopVisibility() {
      showBackToTop(window.scrollY > 400);
    }

    btn.addEventListener("click", () => {
      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });

    window.addEventListener("scroll", handleBackToTopVisibility, {
      passive: true,
    });
    handleBackToTopVisibility();
  })();

  // Bouton "Retour" (top-left) pour les pages de formations
  (function setupBackButtonOnFormationPages() {
    const formationPages = new Set([
      "comp_infor_gestion.html",
      "developpement-application.html",
      "graphisme-production.html",
      "marketing-digital.html",
      "montage-audiovisuel.html",
      "securite-electronique.html",
      "secretariat-bureautique.html",
      "secretariat-comptable.html",
      "secretariat-direction.html",
      "webmestre.html",
      "formations.html",
    ]);

    const currentPage = (
      window.location.pathname.split("/").pop() || ""
    ).toLowerCase();
    if (!formationPages.has(currentPage)) return;

    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.id = "backButton";
    backBtn.setAttribute("aria-label", "Retour");
    backBtn.className = [
      "fixed",
      "left-3",
      "md:left-8",
      "z-50",
      "rounded-lg",
      "px-3.5",
      "py-2",
      "bg-white/70",
      "backdrop-blur-md",
      "ring-1",
      "ring-black/5",
      "text-gray-700",
      "shadow",
      "flex",
      "items-center",
      "gap-2",
      "transition-all",
      "duration-200",
      "ease-out",
      "hover:-translate-y-0.5",
      "hover:shadow-lg",
      "hover:bg-[#1b6086]",
      "hover:text-white",
      "active:scale-95",
      "focus:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-[#1b6086]/40",
      "focus-visible:ring-offset-2",
    ].join(" ");

    backBtn.innerHTML = [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">',
      '<path d="M10.828 12l4.95-4.95a1 1 0 10-1.414-1.414l-6.364 6.364a1 1 0 000 1.414l6.364 6.364a1 1 0 001.414-1.414L10.828 12z"/>',
      "</svg>",
      '<span class="text-sm font-medium">Retour</span>',
    ].join("");

    // Positionner sous la barre de navigation sticky
    function positionBackBtn() {
      const nav = document.getElementById("mainNav");
      const offset = (nav && nav.offsetHeight ? nav.offsetHeight : 72) + 50; // px
      backBtn.style.top = offset + "px";
    }
    positionBackBtn();
    window.addEventListener("resize", positionBackBtn);

    // Apparition douce au chargement
    backBtn.style.opacity = "0";
    backBtn.style.transform = "translateY(4px)";

    backBtn.addEventListener("click", () => {
      const sameOrigin =
        document.referrer &&
        new URL(document.referrer).origin === window.location.origin;
      if (sameOrigin && window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "formations.html";
      }
    });

    document.body.appendChild(backBtn);
    requestAnimationFrame(() => {
      backBtn.style.transition = "opacity 200ms ease, transform 200ms ease";
      backBtn.style.opacity = "1";
      backBtn.style.transform = "translateY(0)";
    });
  })();

  // Event listeners pour le scroll et l'initialisation
  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();
});
