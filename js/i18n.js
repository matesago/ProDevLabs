/* ==========================================================================
   ProDev Labs — i18n.js
   Selector de idioma Español / English. El HTML está escrito en español;
   este script traduce los textos al inglés comparando el texto original
   (clave) contra el diccionario EN. Guarda la preferencia en localStorage.
   Para añadir/ajustar una traducción, edita los diccionarios de abajo.
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "prodevlabs-lang";

  /* Texto (español, con espacios colapsados) → inglés. Aplica a nodos de
     texto y a los atributos placeholder, aria-label, alt y title. */
  const EN = {
    "Saltar al contenido principal": "Skip to main content",
    "Navegación principal": "Main navigation",
    "ProDev Labs, ir al inicio": "ProDev Labs, go to home",
    "Servicios": "Services",
    "Soluciones": "Solutions",
    "Nosotros": "About us",
    "Por qué elegirnos": "Why choose us",
    "Proceso": "Process",
    "Contacto": "Contact",
    "Hablemos": "Let's talk",
    "Abrir menú de navegación": "Open navigation menu",
    "Cambiar idioma": "Change language",

    "Profesional de Desarrollo en Laboratorio": "Professional Development in the Lab",
    "Somos una empresa de desarrollo de software a medida: diseñamos y construimos aplicaciones web, móviles e inteligentes que hacen crecer tu empresa.":
      "We are a custom software development company: we design and build web, mobile and intelligent applications that grow your business.",
    "Hablemos de tu proyecto": "Let's talk about your project",
    "Ver servicios": "View services",
    "Software a medida": "Custom software",
    "Web, ERP, CRM y APIs": "Web, ERP, CRM and APIs",
    "Apps móviles": "Mobile apps",
    "iOS y Android": "iOS and Android",
    "IA y Machine Learning": "AI and Machine Learning",
    "Modelos y chatbots": "Models and chatbots",

    "ProDev Labs en cifras": "ProDev Labs in numbers",
    "Proyectos completados": "Completed projects",
    "Clientes satisfechos": "Satisfied clients",
    "Años de experiencia": "Years of experience",
    "Especialidades": "Specialties",

    "Capacidades que crean valor real para tu negocio": "Capabilities that create real value for your business",
    "Soluciones tecnológicas integrales, diseñadas para resolver retos reales, de la idea al soporte.":
      "End-to-end technology solutions, designed to solve real challenges, from idea to support.",
    "Software": "Software",
    "Desarrollo de Software a Medida": "Custom Software Development",
    "Software web personalizado, sistemas ERP/CRM/SCM, APIs a medida y automatización de procesos de negocio.":
      "Custom web software, ERP/CRM/SCM systems, tailor-made APIs and business process automation.",
    "Móvil": "Mobile",
    "Apps Móviles": "Mobile Apps",
    "Desarrollo nativo e híbrido para iOS y Android, con integración fluida a tus sistemas y plataformas existentes.":
      "Native and hybrid development for iOS and Android, with seamless integration into your existing systems and platforms.",
    "Web": "Web",
    "Diseño y Desarrollo Web": "Web Design and Development",
    "E-commerce, UI/UX responsivo, optimización SEO y soporte continuo para tu presencia digital.":
      "E-commerce, responsive UI/UX, SEO optimization and ongoing support for your digital presence.",
    "IA": "AI",
    "Inteligencia Artificial y Machine Learning": "Artificial Intelligence and Machine Learning",
    "Modelos de IA a medida, Big Data, chatbots inteligentes y automatización avanzada.":
      "Custom AI models, Big Data, smart chatbots and advanced automation.",
    "Estrategia": "Strategy",
    "Consultoría Tecnológica": "Technology Consulting",
    "Transformación digital, estrategia tecnológica y formación especializada en TI para tu equipo.":
      "Digital transformation, technology strategy and specialized IT training for your team.",

    "Lo que construimos para impulsar tu negocio": "What we build to boost your business",
    "Productos digitales listos para escalar, desarrollados con las mejores prácticas de ingeniería.":
      "Digital products ready to scale, built with engineering best practices.",
    "Dashboards y analítica": "Dashboards and analytics",
    "Datos en tiempo real para decidir mejor": "Real-time data to make better decisions",
    "E-commerce": "E-commerce",
    "Tiendas y pasarelas de pago": "Online stores and payment gateways",
    "Automatización": "Automation",
    "Procesos que se hacen solos": "Processes that run by themselves",
    "Apps a medida": "Custom apps",
    "Experiencias móviles y web": "Mobile and web experiences",

    "Equipo de trabajo colaborando en una oficina": "Team collaborating in an office",
    "Nuestra historia": "Our story",
    "Un laboratorio para el talento que busca su primera oportunidad":
      "A lab for talent looking for their first opportunity",
    "\"Pro\" de profesional, \"Dev\" de desarrollo, \"Labs\" de laboratorio: investigación e innovación constante.":
      "\"Pro\" for professional, \"Dev\" for development, \"Labs\" for laboratory: constant research and innovation.",
    "ProDev Labs nace de una barrera muy conocida en el mundo tech: desarrolladores con gran potencial que no consiguen su primera oportunidad por falta de experiencia. Sin experiencia no hay trabajo, y sin trabajo no hay experiencia. Decidimos romper ese círculo.":
      "ProDev Labs was born from a well-known barrier in the tech world: developers with great potential who can't get their first opportunity for lack of experience. Without experience there is no job, and without a job there is no experience. We decided to break that circle.",
    "Conoce cómo trabajamos": "See how we work",

    "La diferencia ProDev Labs": "The ProDev Labs difference",
    "Talento joven, mentoría experta y un enfoque obsesionado con tus resultados.":
      "Young talent, expert mentoring and a focus obsessed with your results.",
    "Equipo experto": "Expert team",
    "Profesionales certificados con experiencia en múltiples industrias.":
      "Certified professionals with experience across multiple industries.",
    "Acompañamiento integral": "End-to-end support",
    "Te acompañamos en cada etapa, desde la idea hasta el soporte post-entrega.":
      "We support you at every stage, from the idea to post-delivery support.",
    "Soluciones a medida": "Tailored solutions",
    "Cada proyecto se diseña según tus necesidades reales, sin plantillas genéricas.":
      "Every project is designed around your real needs, with no generic templates.",
    "Innovación constante": "Constant innovation",
    "Aplicamos las últimas tecnologías para mantenerte a la vanguardia de tu sector.":
      "We apply the latest technologies to keep you at the forefront of your industry.",

    "Nuestro proceso": "Our process",
    "Cómo trabajamos contigo": "How we work with you",
    "Cuatro pasos claros, entregas incrementales y comunicación constante.":
      "Four clear steps, incremental deliveries and constant communication.",
    "Consulta": "Consultation",
    "Analizamos tus necesidades y objetivos de negocio.": "We analyze your needs and business goals.",
    "Diseño": "Design",
    "Diseñamos la arquitectura y experiencia de usuario ideal.": "We design the ideal architecture and user experience.",
    "Desarrollo ágil": "Agile development",
    "Construimos tu solución con metodologías ágiles y entregas incrementales.":
      "We build your solution with agile methodologies and incremental deliveries.",
    "Entrega y soporte": "Delivery and support",
    "Lanzamos tu proyecto y brindamos soporte continuo.": "We launch your project and provide ongoing support.",

    "Tecnologías": "Technologies",
    "Con qué construimos tu producto": "What we build your product with",

    "Para desarrolladores": "For developers",
    "Construye tu futuro con proyectos reales": "Build your future with real projects",
    "La falta de experiencia no debería ser un obstáculo para demostrar tu talento. Súmate a la comunidad ProDev Labs.":
      "Lack of experience shouldn't be an obstacle to showing your talent. Join the ProDev Labs community.",
    "Únete al equipo": "Join the team",

    "Transformemos juntos tu visión en tecnología": "Let's turn your vision into technology together",
    "Cuéntanos sobre tu proyecto y te contactaremos en menos de 24 horas hábiles.":
      "Tell us about your project and we'll get back to you within 24 business hours.",
    "Escríbenos por WhatsApp al +57 316 3152408": "Message us on WhatsApp at +57 316 3152408",
    "Escríbenos al correo info@prodevlabs.net": "Email us at info@prodevlabs.net",
    "Síguenos en Instagram, arroba prodevlabs": "Follow us on Instagram, at prodevlabs",
    "Nombre completo": "Full name",
    "Tu nombre": "Your name",
    "Correo electrónico": "Email",
    "tucorreo@ejemplo.com": "youremail@example.com",
    "Servicio de interés": "Service of interest",
    "Selecciona un servicio": "Select a service",
    "Otro": "Other",
    "Mensaje": "Message",
    "Cuéntanos sobre tu proyecto...": "Tell us about your project...",
    "Enviar mensaje": "Send message",

    "Innovación y tecnología a su alcance. Desarrollo de software a medida para empresas que quieren crecer.":
      "Innovation and technology within your reach. Custom software development for companies that want to grow.",
    "Navegación del pie de página": "Footer navigation",
    "Navegación": "Navigation",
    "Síguenos": "Follow us",
    "© 2025 ProDev Labs. Todos los derechos reservados.": "© 2025 ProDev Labs. All rights reserved.",
    "Hecho con": "Made with",
    "por el equipo de ProDev Labs": "by the ProDev Labs team",
    "Chatea con nosotros por WhatsApp": "Chat with us on WhatsApp"
  };

  /* Elementos con marcado interno: se reemplaza el innerHTML completo. */
  const EN_HTML = {
    hero: 'The technology is our how.<br /><em>Your business is our why.</em>',
    story2:
      'We offer emerging developers real projects and mentoring from experienced professionals, while we build innovative, high-quality solutions for our clients. Under the leadership of <strong style="color:var(--color-dark)">María Salcedo</strong>, CEO of ProDev Labs, we keep building a community ready for the toughest development challenges.'
  };

  /* Metadatos del <head>. */
  const META = {
    es: null, // se captura del HTML original
    en: {
      title: "ProDev Labs | Custom Software Development",
      description:
        "ProDev Labs is a custom software development company: web and mobile apps, AI and Machine Learning, e-commerce and technology consulting. Innovation and technology within your reach.",
      keywords:
        "software development, mobile apps, artificial intelligence, technology consulting, web development, ProDev Labs",
      ogTitle: "ProDev Labs | Innovation and technology within your reach",
      ogDescription:
        "Custom software development, mobile apps, AI/ML, web design and technology consulting. Let's turn your vision into technology together.",
      twDescription: "Custom software development, mobile apps, AI/ML, web design and technology consulting.",
      locale: "en_US"
    }
  };

  /* Mensajes dinámicos usados por main.js (formulario). */
  const MSG = {
    es: {
      name: "Por favor ingresa tu nombre completo.",
      email: "Por favor ingresa un correo electrónico válido.",
      service: "Por favor selecciona un servicio de interés.",
      message: "Cuéntanos un poco más en el mensaje (mínimo 10 caracteres).",
      sending: "Enviando...",
      send: "Enviar mensaje",
      ok: "¡Gracias! Tu mensaje fue enviado. Te contactaremos pronto.",
      fail: "Ocurrió un error al enviar tu mensaje. Intenta nuevamente.",
      network: "No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo."
    },
    en: {
      name: "Please enter your full name.",
      email: "Please enter a valid email address.",
      service: "Please select a service of interest.",
      message: "Tell us a bit more in the message (minimum 10 characters).",
      sending: "Sending...",
      send: "Send message",
      ok: "Thank you! Your message was sent. We'll get back to you soon.",
      fail: "An error occurred while sending your message. Please try again.",
      network: "We couldn't reach the server. Check your connection and try again."
    }
  };

  const ATTRS = ["placeholder", "aria-label", "alt", "title"];
  const norm = (s) => s.replace(/\s+/g, " ").trim();

  const originalText = new WeakMap(); // nodo de texto → texto original
  const originalAttr = new WeakMap(); // elemento → { attr: valor original }
  const originalHtml = new WeakMap(); // elemento → innerHTML original
  let esMeta = null;
  let current = "es";

  function setMeta(selector, attr, value) {
    const el = document.head.querySelector(selector);
    if (el && value != null) el.setAttribute(attr, value);
  }

  function captureMeta() {
    const g = (sel, attr) => {
      const el = document.head.querySelector(sel);
      return el ? el.getAttribute(attr) : null;
    };
    esMeta = {
      title: document.title,
      description: g('meta[name="description"]', "content"),
      keywords: g('meta[name="keywords"]', "content"),
      ogTitle: g('meta[property="og:title"]', "content"),
      ogDescription: g('meta[property="og:description"]', "content"),
      twDescription: g('meta[name="twitter:description"]', "content"),
      locale: g('meta[property="og:locale"]', "content")
    };
  }

  function applyMeta(lang) {
    const m = lang === "en" ? META.en : esMeta;
    if (!m) return;
    document.title = m.title;
    setMeta('meta[name="description"]', "content", m.description);
    setMeta('meta[name="keywords"]', "content", m.keywords);
    setMeta('meta[property="og:title"]', "content", m.ogTitle);
    setMeta('meta[name="twitter:title"]', "content", m.ogTitle);
    setMeta('meta[property="og:description"]', "content", m.ogDescription);
    setMeta('meta[name="twitter:description"]', "content", m.twDescription);
    setMeta('meta[property="og:locale"]', "content", m.locale);
  }

  function translateTextNodes(lang) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentNode;
        if (!p || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest("[data-i18n-html]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      if (!originalText.has(node)) {
        const key = norm(node.nodeValue);
        if (!key || !Object.prototype.hasOwnProperty.call(EN, key)) return;
        originalText.set(node, node.nodeValue);
      }
      const orig = originalText.get(node);
      if (orig === undefined) return;
      if (lang === "es") {
        node.nodeValue = orig;
      } else {
        const lead = (orig.match(/^\s*/) || [""])[0];
        const trail = (orig.match(/\s*$/) || [""])[0];
        node.nodeValue = lead + EN[norm(orig)] + trail;
      }
    });
  }

  function translateAttrs(lang) {
    const sel = ATTRS.map((a) => "[" + a + "]").join(",");
    document.body.querySelectorAll(sel).forEach((el) => {
      let store = originalAttr.get(el);
      ATTRS.forEach((attr) => {
        if (!el.hasAttribute(attr)) return;
        if (!store || !(attr in store)) {
          const key = norm(el.getAttribute(attr));
          if (!Object.prototype.hasOwnProperty.call(EN, key)) return;
          store = store || {};
          store[attr] = el.getAttribute(attr);
          originalAttr.set(el, store);
        }
        const orig = store[attr];
        el.setAttribute(attr, lang === "es" ? orig : EN[norm(orig)]);
      });
    });
  }

  function translateHtml(lang) {
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      if (!originalHtml.has(el)) originalHtml.set(el, el.innerHTML);
      const key = el.getAttribute("data-i18n-html");
      el.innerHTML = lang === "es" ? originalHtml.get(el) : EN_HTML[key] || originalHtml.get(el);
    });
  }

  function updateSwitchers(lang) {
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setLang(lang, persist) {
    if (lang !== "es" && lang !== "en") lang = "es";
    current = lang;
    document.documentElement.lang = lang;
    translateHtml(lang);
    translateTextNodes(lang);
    translateAttrs(lang);
    applyMeta(lang);
    updateSwitchers(lang);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* sin almacenamiento */ }
    }
    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
  }

  function initialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") return saved;
    } catch (_) { /* ignorar */ }
    // Por defecto siempre español; el visitante puede cambiar a inglés con el selector.
    return "es";
  }

  window.I18N = {
    get lang() { return current; },
    t(key) { return (MSG[current] && MSG[current][key]) || MSG.es[key] || key; },
    setLang
  };

  captureMeta();
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang"), true));
  });
  const start = initialLang();
  if (start === "en") setLang("en", false);
  else updateSwitchers("es");
})();
