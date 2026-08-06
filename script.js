/* ============================================================
   ABBASS MOKASHAR | PORTFOLIO v2
   Animations & interactions: Lenis, GSAP, Three.js 3D character
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ================= PORTFOLIO DATA ================= */
  // Add "featured: true" to any project below to show it in the horizontal
  // "Selected projects" section at the top of the Work area. Order = array order.
  const projects = [
    { title: "Abbass Digital Systems", cat: "framer", img: "img/softwares.webp", url: "https://abbass-systems.framer.website/", tag: "Framer Development · SaaS Landing Page", desc: "A dedicated SaaS showcase landing page presenting ready-to-sell café/POS and clinic management software, built entirely with Framer for a fast, polished experience." },
    { title: "Ehsas Store · Candle Lotion", cat: "framer", img: "img/ehsasstore.webp", url: "https://ehsas.framer.website/candle-lotion", tag: "Framer Development · Landing Page", desc: "A leading product landing page for Ehsas Store's candle lotion, a candle that melts into warm massage oil. Elegant, ritual-driven shopping experience." },
    { title: "Mindset Cafe", featured: true, cat: "saas", img: "img/mindset.webp", url: null, tag: "Software Development", desc: "Windows-based Node.js POS and café management system: order taking, gaming station management, inventory, accounting, and reporting, powered by a React frontend and SQLite backend." },
    { title: "Doctor Clinic", featured: true, cat: "saas", img: "img/doctor.webp", url: null, tag: "Software Development", desc: "Full-stack JavaScript clinic management system (Node.js/Express + React + PostgreSQL): patients, doctors, appointments, records, prescriptions, invoicing, and WhatsApp reminders." },
    { title: "Oreo Cafe", cat: "ecommerce", img: "img/oreo.webp", url: "https://techmindsetlb.github.io/cue-corner/", tag: "Web Development · Online Menu & Backend", desc: "Online menu site for Oreo Cafe with a custom backend — menu items, categories, and pricing are managed through a dashboard and served to customers in real time." },
    { title: "Yummy Dolce", cat: "ecommerce", img: "img/yummy.webp", url: "https://techmindsetlb.github.io/yummy-dolce/", tag: "Web Development · Online Menu & Backend", desc: "Digital menu for Yummy Dolce with a full backend, so the shop can update dishes, prices, and availability instantly while customers browse on any device." },
    { title: "Ehsas Store", featured: true, cat: "ecommerce", img: "img/ehsas.webp", url: "https://ehsas.store/", tag: "Web Development · Web Maintenance", desc: "Luxury wellness brand specializing in handcrafted candle lotions, blending soothing scents with premium skincare for a refined self-care experience." },
    { title: "Forge & Furnish", cat: "shopify", img: "img/forge.webp", url: "https://forgeandfurnish.co/", tag: "Web Development · Web Maintenance", desc: "Premium Lebanese furniture brand crafting customizable modern pieces that combine durable metal and wood with timeless design." },
    { title: "Basbous Gifts", featured: true, cat: "ecommerce", img: "img/basbous.webp", url: "https://basbousgifts.com/", tag: "Web Development · Web Maintenance", desc: "One of the region's largest quick-flip e-commerce stores, processing ~2,000+ orders per day with custom checkout, automatic order export, barcode scanning, and full WooCommerce optimization." },
    { title: "Edubolt", featured: true, cat: "elearning", img: "img/edubolt.webp", url: "https://edubolt.meraky.dev/", tag: "Web Development · Web Maintenance", desc: "LMS platform for online educational and university-preparation courses, with custom tutor registration, course view restriction, Whish payment, and certificate issuance." },
    { title: "Edu Meraky", featured: true, cat: "elearning", img: "img/edumeraky.webp", url: "https://edu.meraky.dev/", tag: "Web Development · Web Maintenance", desc: "LMS for teaching online tech courses (web development, mobile development, and more) with custom tutor forms, Whish payment, and trusted certificate generation." },
    { title: "GL Atelier", cat: "ecommerce", img: "img/gl.webp", url: "https://glatelier.meraky.dev/", tag: "Web Development · Web Maintenance", desc: "E-commerce store for clothing and shoes with custom design, advanced animations, scrolling effects, and a smooth shopping experience on WooCommerce." },
    { title: "Job Me Now", cat: "corporate", img: "img/jobmenow.webp", url: "https://jobmenow.io/", tag: "Web Development · Web Maintenance", desc: "Custom jobs portal with a map-based interface, advanced listing system, and Whish payment integration, helping users discover local opportunities quickly." },
    { title: "MysteryBox", cat: "ecommerce", img: "img/mystery.webp", url: "https://mysterybox4u.com/", tag: "Web Development · Web Maintenance", desc: "E-commerce platform for curated mystery boxes with credit card payment, Whish payment, and Wakilni shipping, delivering a seamless surprise shopping experience." },
    { title: "Nihako", cat: "corporate", img: "img/nihako.webp", url: "https://nihako.com/", tag: "Web Development", desc: "Premium interior design website with custom design, multi-page service showcase, and live Instagram feed integration." },
    { title: "LIS Beirut", cat: "shopify", img: "img/lis.webp", url: "https://lisbeirutco.com/", tag: "Shopify · Web Development", desc: "Custom-designed Shopify e-commerce store for baby and newborn supplies with scalable product management." },
    { title: "Solaadmin", cat: "custom", img: "img/sola.webp", url: "https://solaadmin.nl/", tag: "Custom Coded · Web Development", desc: "Fully custom-coded website with advanced animations and scrolling effects, presenting Solaadmin's business profile and services." },
    { title: "Johnny & Lea", cat: "corporate", img: "img/johnnyandlea.webp", url: "https://johnnyandlea.com/", tag: "Web Development", desc: "Elegant wedding website sharing the couple's story, event details, and RSVP collection in a seamless one-page experience." },
    { title: "The Random House", featured: true, cat: "ecommerce", img: "img/random.webp", url: "https://the-random-house.com/home/", tag: "Web Development", desc: "Custom-designed e-commerce store for a well-known furniture and home accessories retailer operating in Lebanon and the UAE." },
    { title: "Anat", cat: "corporate", img: "img/anat.webp", url: "https://anat.co", tag: "Web Development", desc: "Clean landing page for a Lebanese business development firm specializing in branding, lead generation, and growth strategies." },
    { title: "Don Services", cat: "corporate", img: "img/don.webp", url: "https://don-services.com", tag: "Web Development · Web Maintenance", desc: "Custom-designed interactive multipage services showcase for a premium home maintenance company in Lebanon." },
    { title: "Diana Ghandour", cat: "corporate", img: "img/dianaghandour.webp", url: "https://dianaghandourstudio.com", tag: "Web Development · Web Maintenance", desc: "Custom business portfolio and services website for a Beirut-based interior design studio, blending modern elegance with an artful aesthetic." },
    { title: "Clelaa", cat: "ecommerce", img: "img/clelaa.webp", url: "https://clelaa.com", tag: "Web Development · Web Maintenance", desc: "Custom-designed e-commerce clothing shop with advanced animations and scrolling effects for a Lebanese women's fashion brand." },
    { title: "Smart Guide Agency", cat: "corporate", img: "img/sgsal.webp", url: "https://sgsal.com", tag: "Web Development · Web Maintenance", desc: "Services and portfolio website for Smart Guide Agency, showcasing custom web development capabilities and an ongoing client portfolio." },
    { title: "Johnny C. Taylor Jr.", featured: true, cat: "corporate", img: "img/johnnyctaylor.webp", url: null, tag: "Web Development · Web Maintenance", desc: "Custom personal website for the CEO of SHRM, one of the world's largest HR societies, featuring leadership insights and speaking engagements." },
    { title: "Plastilab", cat: "corporate", img: "img/plastilab.webp", url: null, tag: "Web Development · Web Maintenance", desc: "Custom-designed 30+ page website with a full product catalog for an innovative plastics solutions company." },
    { title: "HKP Seattle", featured: true, cat: "corporate", img: "img/hkp.webp", url: null, tag: "Web Development · Web Maintenance", desc: "Custom-designed 30+ page website with advanced animations for a Seattle-based architectural firm." },
    { title: "Trackify Daily", cat: "corporate", img: "img/trackify.webp", url: null, tag: "Web Development", desc: "Custom service introduction page with advanced animations and scrolling effects for Trackify Daily's tracking solutions." },
    { title: "Research & Professional Services", cat: "elearning", img: "img/rps.webp", url: "https://rpsmena.com", tag: "Web Maintenance · Web Development", desc: "RPS MENA provides expert consulting and project management services, driving sustainable development across the MENA region." },
    { title: "Booming Agency", cat: "corporate", img: "img/booming.webp", url: "https://booming-agency.com", tag: "Web Development · Web Maintenance", desc: "Multilingual business profile and services website for a digital marketing agency, built for Arabic and English-speaking markets." },
    { title: "Maverik", featured: true, cat: "ecommerce", img: "img/maverik.webp", url: "https://wearemaverik.com", tag: "Web Development", desc: "E-commerce clothing shop for a creative marketing brand, with a clean product catalog and smooth shopping experience." },
    { title: "Rhythm Dynamic", cat: "ecommerce", img: "img/rhythymdynamic.webp", url: "https://rhythmdynamic.com/", tag: "Web Development", desc: "E-commerce clothing shop with credit card payment gateway, designed with a modern, conversion-focused layout." },
    { title: "Consolidated Consultancy Group", cat: "corporate", img: "img/ccg.webp", url: "https://ccg-lb.com", tag: "Web Development · Web Maintenance", desc: "Business profile and services website for CCG Lebanon, presenting consulting expertise in a clear, professional format." },
    { title: "KnowledgeBox", cat: "elearning", img: "img/knowledgebox.webp", url: "https://knowledgebox.me", tag: "Web Development · Web Maintenance", desc: "LMS platform with online learning features and credit card payment gateway for structured e-learning tools and resources." },
    { title: "Ejjeh Lebanon", cat: "ecommerce", img: "img/ejjeh-lb.webp", url: "https://ejjeh.com.lb", tag: "Web Development · Web Maintenance", desc: "E-commerce clothing shop for a Lebanese men's fashion retailer, with credit card payment and Aramex shipping integration." },
    { title: "Ejjeh UAE", cat: "ecommerce", img: "img/ejjeh-ae.webp", url: "https://ejjeh.ae", tag: "Web Development · Web Maintenance", desc: "E-commerce clothing shop for a UAE-based men's fashion retailer with credit card payment and a conversion-optimized storefront." },
    { title: "Stro'berry Advertising", cat: "corporate", img: "img/stroberry.webp", url: "https://stroberry-adv.com", tag: "Web Development · Web Maintenance", desc: "Services and portfolio website for a Lebanese creative advertising agency, showcasing branding, digital media, PR, and marketing work." },
    { title: "METS Energy", cat: "corporate", img: "img/mets.webp", url: "https://metsenergy.com", tag: "Web Development · Web Maintenance", desc: "A 20+ page business profile and product catalog website for a Lebanese energy company covering diesel, solar, hydro, and hybrid power." },
    { title: "RLX", cat: "corporate", img: "img/rlx.webp", url: "https://rlx.com.lb", tag: "Web Development", desc: "Informative services website for RLX Logistics: freight forwarding, warehousing, customs clearance, and supply chain management." },
    { title: "Wahdatouna Khalasouna", cat: "corporate", img: "img/wahdatouna.webp", url: "https://wahdatouna.org", tag: "Web Development · Web Maintenance", desc: "Multilingual website for a Lebanese civil society organization supporting civil peace, human rights, and community dialogue." },
    { title: "Rainmakers", cat: "corporate", img: "img/rainmakers.webp", url: "https://rainmakersemea.com", tag: "Web Development", desc: "One-page scrolling informative website for Rainmakers EMEA, presenting digital growth and performance services." },
    { title: "Alyafi IP Group", cat: "corporate", img: "img/alyafi.webp", url: "https://alyafi-ip.com", tag: "Web Development · Web Maintenance", desc: "A 30+ page business profile and services website for an intellectual property firm covering trademarks, patents, and legal consultation." },
    { title: "Cedra Tech", cat: "corporate", img: "img/cedra.webp", url: "https://cedra.tech", tag: "Web Development", desc: "Informative services website for Cedra Tech presenting custom software development, IT consulting, and digital transformation." },
    { title: "Kite Studio", cat: "corporate", img: null, url: null, tag: "Web Development · Web Maintenance", desc: "A creative Lebanese studio offering design services and showcasing a curated portfolio of work." },
    { title: "SG Academy", cat: "elearning", img: null, url: null, tag: "Web Development · Web Maintenance", desc: "LMS platform offering online graphic design courses across the MENA region with structured learning paths." },
    { title: "Stateless MENA", cat: "corporate", img: "img/stateless.webp", url: null, tag: "Web Renovation · Web Maintenance", desc: "A comprehensive online hub launched by the AUB Issam Fares Institute on citizenship and statelessness in the Arab world." },
    { title: "Forced Displacement Program · AUB", cat: "corporate", img: "img/fdp.webp", url: null, tag: "Web Development", desc: "AUB's research and policy hub focused on refugees and internally displaced persons in Lebanon and the region." },
    { title: "AUB Catalogs", cat: "corporate", img: "img/aub.webp", url: null, tag: "Web Development", desc: "Large-scale academic catalog websites for the American University of Beirut, structured, responsive, and SEO-friendly." }
  ];

  // (Featured selection lives in the projects array above via "featured: true" flags)

  /* ================= HELPERS ================= */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const arrowSvg =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';
  const lockSvg =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  const imageSvg =
    '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>';

  /* ================= RENDER FEATURED WORK ================= */
  function renderFeatured() {
    const track = $("#hscrollTrack");
    if (!track) return;
    // Display the selected projects in the order below
    const featuredOrder = [
      "Basbous Gifts",
      "Ehsas Store",
      "Edubolt",
      "Edu Meraky",
      "The Random House",
      "Johnny C. Taylor Jr.",
      "HKP Seattle",
      "Maverik",
      "Mindset Cafe",
      "Doctor Clinic"
    ];
    const feats = projects
      .filter((p) => p.featured && p.img)
      .sort((a, b) => featuredOrder.indexOf(a.title) - featuredOrder.indexOf(b.title));

    feats.forEach((p) => {
      const card = document.createElement("a");
      card.className = "featured-card";
      card.href = p.url || "#work";
      card.target = p.url ? "_blank" : "_self";
      card.rel = p.url ? "noopener" : "";
      card.innerHTML =
        '<img src="' + p.img + '" alt="' + p.title + '" loading="lazy" />' +
        '<div class="featured-card-info">' +
        '<span class="featured-card-tag">' + p.tag + "</span>" +
        "<h3>" + p.title + "</h3>" +
        '<span class="featured-card-link">View project ' + arrowSvg + "</span>" +
        "</div>";
      track.appendChild(card);
    });
  }

  /* ================= RENDER PROJECT GRID ================= */
  const grid = $("#projectsGrid");
  const loadMoreBtn = $("#loadMoreBtn");
  const FILTER_ALL = "all";
  const PAGE_SIZE = 6;
  let visibleCount = 9;
  let activeFilter = FILTER_ALL;

  function cardHTML(p) {
    const media = p.img
      ? '<img src="' + p.img + '" alt="' + p.title + '" loading="lazy" />'
      : '<div class="project-media-placeholder">' + imageSvg + "<span>Image Coming Soon</span></div>";

    let overlay = "";
    if (p.url) {
      overlay = '<div class="project-overlay"><span class="see-link">See Website ' + arrowSvg + "</span></div>";
    } else {
      overlay = '<div class="project-overlay"><span class="private-badge">' + lockSvg + " Private Project</span></div>";
    }

    // Use a div (not a link) for private projects so nothing is clickable/focusable
    const mediaWrap =
      p.url
        ? '<a href="' + p.url + '" target="_blank" rel="noopener">' + media + overlay + "</a>"
        : "<div>" + media + overlay + "</div>";
    return (
      '<article class="project-card" data-cat="' + p.cat + '">' +
      '<div class="project-media">' + mediaWrap + "</div>" +
      '<div class="project-body">' +
      "<h3>" + p.title + "</h3>" +
      '<span class="project-tag">' + p.tag + "</span>" +
      '<p class="project-desc">' + p.desc + "</p>" +
      "</div>" +
      "</article>"
    );
  }

  function filteredProjects() {
    if (activeFilter === FILTER_ALL) return projects;
    return projects.filter((p) => p.cat === activeFilter);
  }

  function renderGrid(reset) {
    if (reset) visibleCount = 9;
    const list = filteredProjects();
    const slice = list.slice(0, visibleCount);
    grid.innerHTML = slice.map(cardHTML).join("");

    const remaining = list.length - visibleCount;
    if (loadMoreBtn) {
      loadMoreBtn.style.display = remaining > 0 ? "inline-flex" : "none";
    }

    // Animate in
    if (window.gsap && window.ScrollTrigger && !prefersReduced) {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          overwrite: true,
          scrollTrigger: { trigger: grid, start: "top 85%" }
        }
      );
    } else {
      $$(".project-card", grid).forEach((c) => (c.style.opacity = "1"));
    }
  }

  // Filters
  const filterBtns = $$(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      renderGrid(true);
      // smooth scroll the grid into view
      if (grid && lenis) {
        const rect = grid.getBoundingClientRect();
        lenis.scrollTo(window.scrollY + rect.top - 120, { duration: 0.9 });
      }
    });
  });

  // Load more
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += PAGE_SIZE;
      renderGrid(false);
    });
  }

  /* ================= SMOOTH SCROLL (Lenis) ================= */
  let lenis = null;
  if (typeof Lenis !== "undefined" && !prefersReduced) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    if (window.gsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Anchor links: use Lenis when available
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -60, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Close mobile menu
      const links = $("#navLinks");
      const burger = $("#navBurger");
      if (links && links.classList.contains("open")) {
        links.classList.remove("open");
        burger.classList.remove("open");
      }
    });
  });

  /* ================= PRELOADER ================= */
  function runPreloader() {
    const preloader = $("#preloader");
    const fill = $("#preloaderFill");
    const countEl = $("#preloaderCount");
    if (!preloader) return;

    const reduced = prefersReduced;
    const duration = reduced ? 0 : 1400;
    let start = null;

    function frame(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const pct = Math.round(eased * 100);
      if (fill) fill.style.width = pct + "%";
      if (countEl) countEl.textContent = pct + "%";
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        hidePreloader();
      }
    }

    function hidePreloader() {
      if (typeof gsap !== "undefined") {
        // Kick off the hero timeline first so content animates in as the
        // preloader slides up, avoiding a visible flash of static content.
        startHero();
        gsap.to(preloader, {
          yPercent: -100,
          duration: reduced ? 0 : 0.9,
          ease: "power4.inOut",
          onComplete: () => {
            preloader.style.display = "none";
          }
        });
      } else {
        // No GSAP (CDN blocked): fall back to plain CSS hide so the page is never stuck.
        preloader.style.transition = "transform 0.6s ease";
        preloader.style.transform = "translateY(-100%)";
        setTimeout(() => (preloader.style.display = "none"), 650);
        startHero();
      }
    }

    if (reduced) {
      preloader.style.display = "none";
      startHero();
    } else {
      requestAnimationFrame(frame);
      // Safety: never block longer than 3.5s
      setTimeout(() => {
        if (preloader.style.display !== "none") hidePreloader();
      }, 3500);
    }
  }

  /* ================= HERO ANIMATIONS ================= */
  function startHero() {
    if (!window.gsap || prefersReduced) {
      $$(".reveal").forEach((el) => el.classList.add("in"));
      $$(".hero-title .word").forEach((w) => (w.style.opacity = "1"));
      const el = $("#rolesType");
      if (el) el.textContent = "Custom Websites, SaaS, E-commerce & LMS";
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(
        ".hero-title .word",
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
        "-=0.3"
      )
      .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .to(".hero-roles", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
      .to(".hero-cta", { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
      .to(".hero-socials", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to(".stats-bar", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
      .to(".scroll-hint", { opacity: 1, duration: 0.6 }, "-=0.3");

    startTypewriter();
  }

  /* ================= TYPEWRITER ================= */
  function startTypewriter() {
    const el = $("#rolesType");
    if (!el) return;
    const roles = [
      "Custom Websites",
      "SaaS & POS Systems",
      "Clinic Management",
      "LMS Platforms",
      "E-commerce Stores",
      "Framer & Shopify"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        el.innerHTML = current.slice(0, charIndex) + '<span class="roles-caret">|</span>';
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
        setTimeout(tick, 60);
      } else {
        charIndex--;
        el.innerHTML = current.slice(0, charIndex) + '<span class="roles-caret">|</span>';
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, 30);
      }
    }
    tick();
  }

  /* ================= SCROLL REVEALS ================= */
  function initReveals() {
    if (window.gsap && window.ScrollTrigger && !prefersReduced) {
      gsap.utils.toArray(".section-head, .about-text p, .about-chips, .service-card, .saas-inner, .footer-cta, .footer-grid, .maintenance-callout").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 46 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" }
          }
        );
      });
    } else {
      $$(".reveal, .section-head, .about-text p, .about-chips, .service-card, .saas-inner, .footer-cta, .footer-grid, .maintenance-callout").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }
  }

  /* ================= HORIZONTAL SCROLL (Featured) ================= */
  function initHScroll() {
    const track = $("#hscrollTrack");
    const wrap = $("#hscrollWrap");
    const section = $(".featured");
    if (!track || !wrap) return;

    const canPin = window.gsap && window.ScrollTrigger && !prefersReduced;
    if (!canPin) {
      // Pinned scroll is off (reduced motion or CDN blocked): swipe instead.
      wrap.classList.add("no-pin");
      return;
    }

    const getAmount = () => track.scrollWidth - window.innerWidth;
    const matchMedia = window.matchMedia("(min-width: 861px)");
    let trigger = null;
    let setupQueued = false;

    function setup() {
      if (trigger) {
        trigger.kill();
        trigger = null;
      }
      gsap.set(track, { x: 0, clearProps: "transform" });
      if (!matchMedia.matches) return;
      const amount = getAmount();
      if (amount <= 0) return;

      // Pin the whole section (title + cards) so the heading stays on screen
      // while the cards slide horizontally below it.
      trigger = gsap.to(track, {
        x: -amount,
        ease: "none",
        scrollTrigger: {
          trigger: section || wrap,
          start: "top top",
          end: "+=" + amount,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }

    ScrollTrigger.addEventListener("refreshInit", () => {
      // Reset the track position but keep the trigger alive; invalidateOnRefresh
      // recalculates start/end on the next refresh.
      gsap.set(track, { x: 0 });
    });

    setup();
    window.addEventListener("resize", () => {
      if (setupQueued) return;
      setupQueued = true;
      setTimeout(() => {
        setupQueued = false;
        setup();
      }, 200);
    });
  }

  /* ================= STATS COUNT-UP ================= */
  function initCounters() {
    const counters = $$(".stat-number[data-count]");
    if (!counters.length) return;
    if (window.gsap && window.ScrollTrigger && !prefersReduced) {
      counters.forEach((el) => {
        const end = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          }
        });
      });
    } else {
      counters.forEach((el) => (el.textContent = el.dataset.count + (el.dataset.suffix || "")));
    }
  }

  /* ================= NAVBAR ================= */
  function initNav() {
    const navbar = $("#navbar");
    const burger = $("#navBurger");
    const links = $("#navLinks");

    window.addEventListener("scroll", () => {
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
    });

    if (burger && links) {
      burger.addEventListener("click", () => {
        burger.classList.toggle("open");
        links.classList.toggle("open");
      });
    }

    // Active link on scroll
    if (window.gsap && window.ScrollTrigger) {
      const sections = ["about", "work", "portfolio", "services", "saas-products", "contact"];
      sections.forEach((id) => {
        const sec = document.getElementById(id);
        if (!sec) return;
        ScrollTrigger.create({
          trigger: sec,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) {
              $$(".nav-link").forEach((l) => l.classList.remove("active"));
              const match = $('.nav-link[href="#' + id + '"]');
              if (match) match.classList.add("active");
            }
          }
        });
      });
    }
  }

  /* ================= THEME TOGGLE ================= */
  function initTheme() {
    const toggle = $("#themeToggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const root = document.documentElement;
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* ignore */
      }
    });
  }

  /* ================= CUSTOM CURSOR ================= */
  function initCursor() {
    if (!hasFinePointer) return;
    const dot = $("#cursorDot");
    const ring = $("#cursorRing");
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = "translate(" + (mx - 4) + "px," + (my - 4) + "px)";
    });

    (function followRing() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = "translate(" + (rx - 18) + "px," + (ry - 18) + "px)";
      requestAnimationFrame(followRing);
    })();

    const hoverTargets = "a, button, .filter-btn, .project-card, .featured-card, .service-link, .chip";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.remove("is-hover");
    });
  }

  /* ================= SCROLL PROGRESS + GO TOP ================= */
  function initProgress() {
    const bar = $("#scrollProgress");
    const goTop = $("#goToTopBtn");

    function update() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (bar) bar.style.width = pct + "%";
      if (goTop) goTop.style.opacity = window.scrollY > 600 ? "1" : "0";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();

    if (goTop) {
      goTop.addEventListener("click", () => {
        if (lenis) lenis.scrollTo(0, { duration: 1.2 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ================= INIT ================= */
  /* ================= PHOTO PIXEL HOVER ================= */
  // The portraits are transparent PNGs, so the visible figure doesn't fill the
  // wrapper rectangle. This makes the hover effect fire only when the cursor is
  // actually over the person (it samples the source photo's alpha channel),
  // never over the empty transparent background around them.
  function initPhotoHover() {
    const wrappers = [$("#heroPhoto"), $("#aboutPhoto")].filter(Boolean);
    if (!wrappers.length) return;
    const imgEl = wrappers[0].querySelector("img");
    if (!imgEl) return;

    const srcImg = new Image();
    let pxData = null; // decoded source photo pixels (RGBA)
    let iw = 0,
      ih = 0,
      pixelMode = false,
      ready = false;

    srcImg.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = srcImg.naturalWidth;
        c.height = srcImg.naturalHeight;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(srcImg, 0, 0);
          pxData = ctx.getImageData(0, 0, c.width, c.height).data;
          iw = c.width;
          ih = c.height;
          pixelMode = true;
        }
      } catch (e) {
        /* decode failed → rectangle fallback below */
      }
      ready = true;
    };
    srcImg.onerror = () => {
      ready = true; // image unavailable → rectangle fallback
    };
    srcImg.src = imgEl.getAttribute("src") || "img/portrait.webp";

    // Maps a cursor position inside a wrapper to the source photo and returns
    // true if that pixel belongs to the visible figure (opaque on transparent).
    function isOnFigure(rect, cx, cy) {
      if (!ready) return false; // ignore moves before the photo is decoded
      if (!pixelMode) return true; // decode failed → whole wrapper counts
      const w = rect.width,
        h = rect.height;
      if (!w || !h) return false;
      const scale = Math.min(w / iw, h / ih); // object-fit: contain
      const rw = iw * scale,
        rh = ih * scale;
      const ox = (w - rw) / 2,
        oy = (h - rh) / 2; // object-position: center
      const sx = ((cx - ox) / rw) * iw;
      const sy = ((cy - oy) / rh) * ih;
      if (sx < 0 || sy < 0 || sx >= iw || sy >= ih) return false;
      const i = (Math.floor(sy) * iw + Math.floor(sx)) * 4;
      // The photo has a transparent background — the figure is the opaque part
      return pxData[i + 3] > 60;
    }

    wrappers.forEach((wrap) => {
      // Cache the layout box and refresh on scroll/resize instead of forcing
      // layout on every mousemove (the page animates with GSAP/Lenis).
      let rect = null;
      const measure = () => {
        rect = wrap.getBoundingClientRect();
      };
      measure();
      window.addEventListener("resize", measure);
      window.addEventListener("scroll", measure, { passive: true });
      wrap.addEventListener("mousemove", (e) => {
        if (!rect) measure();
        if (isOnFigure(rect, e.clientX - rect.left, e.clientY - rect.top)) {
          wrap.classList.add("hover-on");
        } else {
          wrap.classList.remove("hover-on");
        }
      });
      wrap.addEventListener("mouseleave", () => wrap.classList.remove("hover-on"));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Tag body when GSAP will drive animations so CSS transitions don't fight it
    if (window.gsap) document.body.classList.add("js-anim");

    renderFeatured();
    renderGrid(true);
    initNav();
    initTheme();
    initCursor();
    initProgress();
    initReveals();
    initCounters();
    initHScroll();
    initPhotoHover();
    runPreloader();
  });
})();
