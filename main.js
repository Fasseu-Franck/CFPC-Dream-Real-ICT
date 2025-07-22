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
    tabContents.forEach((content) => {
      content.classList.add("hidden");
    });
    document.getElementById(tab).classList.remove("hidden");
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
    mobileMenu.classList.toggle("hidden", !isMenuOpen);
    mobileMenu.style.maxHeight = isMenuOpen
      ? mobileMenu.scrollHeight + "px"
      : "0";

    // Toggle menu icon between bars and times
    if (isMenuOpen) {
      // Change to X icon
      menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12");
      menuIcon.setAttribute("stroke-linecap", "round");
      menuIcon.setAttribute("stroke-linejoin", "round");
      mobileMenuButton.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    } else {
      // Change to hamburger icon
      menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      menuIcon.setAttribute("stroke-linecap", "round");
      menuIcon.setAttribute("stroke-linejoin", "round");
      mobileMenuButton.setAttribute("aria-expanded", "false");
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
    mobileFormationsMenu.classList.toggle("hidden", !isSubmenuOpen);
    mobileFormationsMenu.style.maxHeight = isSubmenuOpen
      ? mobileFormationsMenu.scrollHeight + "px"
      : "0";
    mobileArrow.style.transform = isSubmenuOpen
      ? "rotate(180deg)"
      : "rotate(0)";
    mobileFormationsButton.setAttribute(
      "aria-expanded",
      isSubmenuOpen ? "true" : "false"
    );
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
        6,
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

  // Gestion du menu mobile (header)
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle("hidden", !isMenuOpen);
      mobileMenu.style.maxHeight = isMenuOpen
        ? mobileMenu.scrollHeight + "px"
        : "0";
      if (menuIcon) {
        if (isMenuOpen) {
          menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12");
          menuIcon.setAttribute("stroke-linecap", "round");
          menuIcon.setAttribute("stroke-linejoin", "round");
          mobileMenuButton.setAttribute("aria-expanded", "true");
          document.body.style.overflow = "hidden";
        } else {
          menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
          menuIcon.setAttribute("stroke-linecap", "round");
          menuIcon.setAttribute("stroke-linejoin", "round");
          mobileMenuButton.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      }
    });

    // Fermer le menu mobile en cliquant à l'extérieur
    document.addEventListener("click", function (e) {
      if (
        isMenuOpen &&
        mobileMenu &&
        !mobileMenu.contains(e.target) &&
        mobileMenuButton &&
        !mobileMenuButton.contains(e.target)
      ) {
        mobileMenuButton.click();
      }
    });
  }

  // Reset menu mobile sur resize
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && mobileMenu) {
      mobileMenu.classList.add("hidden");
      mobileMenu.style.maxHeight = "";
      isMenuOpen = false;
      document.body.style.overflow = "";
    }
  });

  // Smooth scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "#!") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // Shadow sur la navbar au scroll
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
  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll();

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
      autoplay: { delay: 5000 },
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
});
