/* ==========================================================================
   ProDev Labs — main.js
   Navbar con blur al hacer scroll, menú móvil, scroll suave, contador
   animado de estadísticas, inicialización de AOS y envío del formulario
   de contacto al backend Python (FastAPI).
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * Configuración
   * ------------------------------------------------------------------- */
  // URL del endpoint del backend. En desarrollo local, FastAPI corre en
  // otro puerto (uvicorn) que el frontend estático, por eso se usa una
  // URL absoluta. En producción, si el backend queda detrás del mismo
  // dominio (reverse proxy), cambia esto por: "/api/contacto".
  const API_CONTACT_URL =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:8000/api/contacto"
      : "/api/contacto";

  const TECH_STACK = [
    "HTML5", "CSS3", "TailwindCSS", "JavaScript", "Python", "React",
    "Flutter", "Node.js", "FastAPI", "PostgreSQL", "MongoDB", "AWS", "Docker", "Git",
  ];

  /* ---------------------------------------------------------------------
   * Inicialización de AOS (Animate On Scroll)
   * ------------------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }

  /* ---------------------------------------------------------------------
   * Navbar: efecto blur/sombra al hacer scroll
   * ------------------------------------------------------------------- */
  const navbar = document.getElementById("navbar");

  function updateNavbarOnScroll() {
    if (!navbar) return;
    if (window.scrollY > 24) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }
  updateNavbarOnScroll();
  window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });

  /* ---------------------------------------------------------------------
   * Menú hamburguesa (móvil)
   * ------------------------------------------------------------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconMenu = document.getElementById("icon-menu");
  const iconClose = document.getElementById("icon-close");

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("hidden");
    menuToggle.setAttribute("aria-expanded", "false");
    iconMenu.classList.remove("hidden");
    iconClose.classList.add("hidden");
  }

  function toggleMobileMenu() {
    const isOpen = !mobileMenu.classList.contains("hidden");
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove("hidden");
      menuToggle.setAttribute("aria-expanded", "true");
      iconMenu.classList.add("hidden");
      iconClose.classList.remove("hidden");
    }
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", toggleMobileMenu);

    // Cierra el menú al hacer clic en un enlace (scroll suave a la sección)
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Cierra el menú con la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileMenu();
    });
  }

  /* ---------------------------------------------------------------------
   * Contador animado de estadísticas (sección "About")
   * ------------------------------------------------------------------- */
  const counters = document.querySelectorAll(".counter");

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10) || 0;
    const duration = 1500; // ms
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutQuad para una desaceleración suave
      const eased = 1 - (1 - progress) * (1 - progress);
      const value = Math.round(eased * target);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    // Fallback sin animación
    counters.forEach((counter) => {
      counter.textContent = counter.getAttribute("data-target");
    });
  }

  /* ---------------------------------------------------------------------
   * Renderiza los badges de la sección "Tecnologías"
   * ------------------------------------------------------------------- */
  const stackContainer = document.querySelector("#stack .flex-wrap");
  if (stackContainer) {
    const fragment = document.createDocumentFragment();
    TECH_STACK.forEach((tech) => {
      const badge = document.createElement("span");
      badge.className = "tech-badge";
      badge.innerHTML = `<span class="tech-dot" aria-hidden="true"></span>${tech}`;
      fragment.appendChild(badge);
    });
    stackContainer.appendChild(fragment);
  }

  /* ---------------------------------------------------------------------
   * Formulario de contacto → POST /api/contacto (backend Python)
   * ------------------------------------------------------------------- */
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const submitText = document.getElementById("submit-text");
  const feedback = document.getElementById("form-feedback");

  function setFeedback(message, type) {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.classList.remove("text-teal-dark", "text-red-100", "text-white");
    feedback.style.color = type === "error" ? "#FCA5A5" : "#3ECFBF";
  }

  function validateForm(data) {
    if (!data.nombre || data.nombre.trim().length < 2) {
      return "Por favor ingresa tu nombre completo.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailPattern.test(data.email)) {
      return "Por favor ingresa un correo electrónico válido.";
    }
    if (!data.servicio) {
      return "Por favor selecciona un servicio de interés.";
    }
    if (!data.mensaje || data.mensaje.trim().length < 10) {
      return "Cuéntanos un poco más en el mensaje (mínimo 10 caracteres).";
    }
    return null;
  }

  // Marca cada campo como "tocado" al perder el foco, para que el estilo de
  // campo inválido (borde rojo) solo aparezca después de que el usuario
  // interactuó con él, nunca apenas carga la página.
  if (form) {
    form.querySelectorAll(".form-input").forEach((field) => {
      field.addEventListener("blur", () => field.classList.add("touched"));
    });
  }

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Validación nativa HTML5 primero
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const validationError = validateForm(data);
      if (validationError) {
        setFeedback(validationError, "error");
        return;
      }

      submitBtn.disabled = true;
      submitText.textContent = "Enviando...";
      setFeedback("", "info");

      try {
        const response = await fetch(API_CONTACT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        let result = {};
        try {
          result = await response.json();
        } catch (_) {
          /* respuesta sin cuerpo JSON */
        }

        if (response.ok) {
          setFeedback(
            result.message || "¡Gracias! Tu mensaje fue enviado. Te contactaremos pronto.",
            "success"
          );
          form.reset();
        } else {
          setFeedback(
            result.message || "Ocurrió un error al enviar tu mensaje. Intenta nuevamente.",
            "error"
          );
        }
      } catch (error) {
        setFeedback(
          "No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo.",
          "error"
        );
      } finally {
        submitBtn.disabled = false;
        submitText.textContent = "Enviar mensaje";
      }
    });
  }
})();
