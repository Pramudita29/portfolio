"use client";
import { useEffect, useRef, useState } from "react";
import "./index.scss";

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Contact"];

const STATS = [
  { value: "3", label: "Products shipped to production" },
  { value: "8mo", label: "Startup engineering at PortMi" },
  { value: "10+", label: "Technologies used across projects" },
  { value: "71.7%", label: "First Class Honours, Coventry" },
];

const EXPERIENCE = [
  {
    num: "01",
    role: "Full Stack Developer",
    company: "PortMi",
    location: "Kathmandu, Nepal",
    period: "Aug 2025 – Apr 2026",
    tag: "Startup · End-to-End Ownership",
    desc: "Joined as a junior and grew into full ownership of features across the stack — frontend, backend, APIs, auth, and production systems. Shipped three live products used by real organisations.",
    bullets: [
      "Built Modaash MMS — multi-tenant workforce SaaS with real-time WebSocket messaging, role-based dashboards, and automated workflows; live in production",
      "Designed RBAC system with isolated tenant data, granular role permissions, and admin override controls",
      "Built real-time notification and chat layer over WebSockets for live system updates",
      "Developed REST APIs with JWT auth, middleware layering, and structured request validation",
      "Delivered Kumari Trust and StratBridge Partners frontends from Figma to production",
      "Worked in weekly agile release cycles with continuous delivery across live systems",
    ],
    works: [
      {
        title: "Modaash MMS",
        link: "modaash.com",
        stack: "Next.js · Node.js · MongoDB · WebSockets",
        story:
          "Multi-tenant workforce management SaaS with real-time messaging, automated workflows, and isolated role-based dashboards. Live in production.",
      },
      {
        title: "Kumari Trust",
        link: "kumaritrust.com",
        stack: "React · Tailwind CSS",
        story:
          "Production-grade institutional website with a fully responsive, accessible design system and reusable component library. Delivered in under 3 weeks.",
      },
      {
        title: "StratBridge Partners",
        link: "stratbpartners.com",
        stack: "React · Tailwind CSS",
        story:
          "Corporate website with modular component structure and reusable content system.",
      },
    ],
  },
  {
    num: "02",
    role: "Solo Engineer",
    company: "SmartWokil",
    period: "Apr 2026",
    tag: "Solo Project · Legal-Tech",
    desc: "Designed and built a legal-tech platform solo — dual-role dashboards for lawyers and clients, document workflows, and a FastAPI + PostgreSQL backend.",
    bullets: [
      "Google OAuth with session management and role-scoped access across two portal types",
      "Multi-role dashboard with task tracking, deadlines, and activity notifications",
      "FastAPI + PostgreSQL backend with normalised schema and structured API versioning",
      "Client portal with document upload and lawyer–client communication workflows",
      "React + TypeScript frontend with modular component architecture",
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    title: "Nepal Bhramad",
    type: "Full Stack Travel Platform",
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    desc: "Travel booking platform with search, booking, user accounts, admin operations, and a ratings system — built on Spring Boot and PostgreSQL.",
    features: [
      "Search, filter, and booking workflow with availability checks",
      "JWT-authenticated user accounts with booking history",
      "Admin dashboard for tour and package lifecycle management",
      "Star-rating and review system per completed booking",
      "Relational PostgreSQL schema with proper normalisation",
    ],
    bg: "var(--yellow)",
  },
  {
    num: "02",
    title: "HousePal",
    type: "Cross-Platform Service Marketplace",
    stack: ["React", "Node.js", "Express", "MongoDB", "Flutter"],
    desc: "Dual-sided marketplace connecting homeowners with skilled workers — web platform plus native mobile app, sharing one REST API backend.",
    features: [
      "Job posting, bidding, and hire workflow for homeowners",
      "Worker profiles with skills, ratings, and availability",
      "Shared Express REST API serving both React web and Flutter mobile",
      "Application and status management system",
      "End-to-end booking and payment workflow",
    ],
    bg: "var(--pink)",
  },
  {
    num: "03",
    title: "AstroQuest",
    type: "Gamified 3D Learning Platform",
    stack: ["React", "Three.js", "Node.js", "MongoDB"],
    desc: "Gamified astronomy platform with a 3D solar system, XP-based progression, quiz engine, and an admin CMS for content management.",
    features: [
      "Live 3D solar system built with Three.js and orbital physics",
      "XP system, level gates, and a persistent learning path",
      "Quiz engine with scoring and instant feedback",
      "Bookmark and progress tracking across sessions",
      "Admin CMS for content creation and quiz management",
    ],
    bg: "var(--mint)",
  },
  {
    num: "04",
    title: "Koshi Basin ML Analysis",
    type: "Geospatial ML Research Thesis",
    stack: ["Python", "TensorFlow", "Google Earth Engine", "QGIS"],
    desc: "University thesis: a multi-model ML pipeline for satellite-based environmental change detection in Nepal's Koshi River Basin — CNN, LSTM, and Random Forest combined.",
    features: [
      "Satellite image preprocessing pipeline via Google Earth Engine",
      "CNN model for land cover classification from multispectral imagery",
      "LSTM time-series model forecasting basin-level environmental change",
      "Random Forest analysis for feature importance across variables",
      "GIS visualisation and map output in QGIS",
    ],
    bg: "var(--sky)",
  },
];

const SKILLS = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express.js", "FastAPI", "Spring Boot"],
  Languages: ["JavaScript", "TypeScript", "Python", "Java", "Dart"],
  Databases: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"],
  Tools: ["Git", "GitHub", "Docker (Basic)", "Postman", "Figma", "PowerBI"],
  Engineering: [
    "REST API Design",
    "Multi-Tenant Architecture",
    "JWT / OAuth Authentication",
    "System Design Fundamentals",
    "Agile Delivery",
  ],
};

const EDUCATION = [
  {
    degree: "BSc (Hons) Computing",
    institution: "Coventry University (via Softwarica College)",
    details: [
      "First Class Honours — 71.7%",
      "Graduated January 2026",
      "Merit Scholarship: 25%",
    ],
    color: "var(--yellow)",
  },
  {
    degree: "+2 Management",
    institution: "GoldenGate International College",
    details: ["GPA: 3.27", "Completed: 2022"],
    color: "var(--mint)",
  },
];

const INTERESTS = [
  {
    heading: "Building things people actually use",
    body: "I care about both sides of it — the backend architecture that makes it reliable, and the frontend feel that makes it worth using. A product that works but feels rough bothers me as much as one that looks good but breaks.",
  },
  {
    heading: "Systems that scale past the first version",
    body: "I enjoy thinking about data models, API contracts, and auth flows before writing a line of code. Getting the architecture right early is the difference between a codebase you can build on and one you fight every sprint.",
  },
  {
    heading: "Good engineering culture over everything else",
    body: "Company stage, industry, stack — I'm flexible on all of it. What I care about is working with people who take their craft seriously, give honest feedback, and build things that matter to someone.",
  },
  {
    heading: "Films and music",
    body: "Outside of code I spend time watching films and listening to music. Both are about how you make someone feel something — which isn't that different from good UI, honestly.",
  },
];

const TICKER_ITEMS = [
  "Full Stack Developer · React · Node · FastAPI",
  "3 Products Shipped at PortMi",
  "First Class Honours — Coventry University",
  "Open to Worldwide Opportunities",
  "Available Immediately · Remote or On-site",
  "Modaash MMS · Kumari Trust · StratBridge Partners",
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        }),
      { threshold: 0.07 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const fn = () => {
      const t = document.body.scrollHeight - window.innerHeight;
      if (ref.current)
        ref.current.style.width =
          (t > 0 ? (window.scrollY / t) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-bar" ref={ref} />;
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {items.map((item, i) => (
          <span key={i} className="ticker__item">
            {item} <span className="ticker__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  return (
    <article
      className="proj-card"
      data-reveal
      style={{ "--delay": `${index * 0.08}s`, "--card-bg": project.bg }}
    >
      <div className="proj-card__top">
        <span className="proj-num">{project.num}</span>
        <span className="proj-type">{project.type}</span>
      </div>
      <h3 className="proj-title">{project.title}</h3>
      <p className="proj-desc">{project.desc}</p>
      <div className="proj-stack">
        {project.stack.map((s) => (
          <span key={s} className="proj-tag">
            {s}
          </span>
        ))}
      </div>
      <ul className="proj-features">
        {project.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <span className="proj-arrow">→</span>
    </article>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__inner">
        {/* pill badges */}
        <div className="hero__badges">
          <span className="pill pill--outline">Portfolio · 2026</span>
          <span className="pill pill--lime">
            <span className="dot" /> Available Now
          </span>
        </div>

        {/* big centered headline */}
        <h1 className="hero__h1">
          Full stack engineer who's
          <br />
          already shipped.{" "}
          <mark className="hero__mark">Hi, I'm Pramudita.</mark>
        </h1>
        <p className="hero__sub">
          React · Node.js · FastAPI · PostgreSQL · TypeScript · Kathmandu, Nepal
          · Open worldwide
        </p>

        {/* card collage row */}
        <div className="hero__collage">
          <div className="hcard hcard--black hcard--tilt-l">
            <div className="hcard__label">What I do</div>
            <p>
              Build and ship full stack web apps — React frontends, Node or
              FastAPI backends, PostgreSQL, auth, the whole thing.
            </p>
          </div>

          <div className="hcard hcard--yellow">
            <div className="hcard__label">Track record</div>
            <p>
              8 months at PortMi · 3 products in production · SmartWokil built
              solo
            </p>
            <div className="hcard__stat">3 live</div>
          </div>

          <div className="hcard hcard--white hcard--tilt-r">
            <div className="hcard__label">Core stack</div>
            <div className="hcard__pills">
              {[
                "React",
                "Next.js",
                "Node.js",
                "FastAPI",
                "PostgreSQL",
                "TypeScript",
              ].map((s) => (
                <span key={s} className="hcard__pill">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="hcard hcard--pink">
            <div className="hcard__label">Availability</div>
            <p>
              Full-time, contract, or remote — anywhere in the world. Ready to
              start immediately.
            </p>
            <span className="pill pill--black" style={{ marginTop: "auto" }}>
              Let's talk ↗
            </span>
          </div>
        </div>

        {/* info strip */}
        <div className="hero__info-strip">
          {[
            ["Location", "Kathmandu, Nepal"],
            ["Degree", "BSc (Hons) Computing"],
            ["Result", "First Class · 71.7%"],
            ["Experience", "8 mo Startup · 3 Live Products"],
            ["Status", "Available Immediately"],
          ].map(([l, v]) => (
            <div className="hero__info-cell" key={l}>
              <span className="hero__info-label">{l}</span>
              <span className="hero__info-val">{v}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero__ctas">
          <a href="#experience" className="btn btn--black">
            See My Work ↓
          </a>
          <a href="#contact" className="btn btn--outline">
            Hire Me
          </a>
          <a
            href="https://github.com/Pramudita29"
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <Ticker />
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [copyMsg, setCopyMsg] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lastY = useRef(0);

  useReveal();

  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          setScrolled(sy > 60);
          setNavHidden(sy > lastY.current && sy > 300);
          lastY.current = sy;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const secs = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { rootMargin: "-40% 0px -40% 0px" },
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("pbhattarai0129@gmail.com");
    setCopyMsg("Copied!");
    setTimeout(() => setCopyMsg(""), 2000);
  };

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="app">
      <ScrollProgress />

      {/* NAV */}
      <header
        className={`nav ${scrolled ? "nav--scrolled" : ""} ${navHidden ? "nav--hidden" : ""}`}
      >
        <div className="nav__inner">
          <a className="nav__logo" href="#hero" onClick={toTop}>
            PB<span className="nav__dot">.</span>
          </a>
          <nav className={`nav__links ${navOpen ? "nav__links--open" : ""}`}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav__link ${activeSection === item.toLowerCase() ? "nav__link--active" : ""}`}
                onClick={() => setNavOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          <a href="#contact" className="nav__cta btn btn--lime">
            Hire Me
          </a>
          <button
            className="nav__burger"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <Hero />

      {/* ── ABOUT ── */}
      <section className="section" id="about">
        <div className="sec-head" data-reveal>
          <span className="kicker">00 — About</span>
          <h2 className="sec-title">
            Full stack developer
            <br />
            <em>based in Kathmandu.</em>
          </h2>
        </div>

        <div className="about__cols" data-reveal>
          <div className="about__features">
            {[
              {
                icon: "⚡",
                text: "Shipped 3 products at PortMi — frontend, backend, and everything between",
              },
              {
                icon: "🔗",
                text: "Full stack: React, Node.js, FastAPI, PostgreSQL, auth, deployments",
              },
              {
                icon: "🧠",
                text: "Built a legal-tech platform solo from schema design to working UI",
              },
              {
                icon: "🛠",
                text: "Comfortable with weekly release cycles and production systems",
              },
            ].map((f, i) => (
              <div className="about__feat" key={i}>
                <span className="about__feat-icon">{f.icon}</span>
                <p>{f.text}</p>
              </div>
            ))}
          </div>

          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div className="stat-cell" key={i}>
                <span className="stat-val">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about__bio" data-reveal>
          <p>
            At PortMi I worked across the full stack on three products — Modaash
            MMS, Kumari Trust, and StratBridge Partners — each shipped and used
            by real organisations.
          </p>
          <p>
            After that I built SmartWokil on my own: a legal-tech platform
            covering OAuth, dual-role dashboards for lawyers and clients, a
            FastAPI + PostgreSQL backend, and a full document workflow.
          </p>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="section section--dark" id="experience">
        <div className="sec-head" data-reveal>
          <span className="kicker kicker--dim">01 — Experience</span>
          <h2 className="sec-title sec-title--light">
            Where I've
            <br />
            <em>shipped things.</em>
          </h2>
        </div>

        <div className="exp-list">
          {EXPERIENCE.map((exp, i) => (
            <div
              className="exp-item"
              key={i}
              data-reveal
              style={{ "--delay": `${i * 0.1}s` }}
            >
              <div className="exp-item__head">
                <div className="exp-item__meta">
                  <span className="exp-badge">{exp.tag}</span>
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-co">
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </span>
                </div>
                {exp.period && <span className="exp-period">{exp.period}</span>}
              </div>
              <p className="exp-desc">{exp.desc}</p>
              <ul className="exp-bullets">
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              {exp.works && (
                <>
                  <p className="exp-works-heading">✦ Projects Delivered</p>
                  <div className="exp-works">
                    {exp.works.map((w, idx) => (
                      <a
                        key={idx}
                        href={`https://${w.link}`}
                        target="_blank"
                        rel="noreferrer"
                        className="exp-work-card"
                      >
                        <div className="exp-work-card__top">
                          <span className="exp-work-card__title">
                            {w.title}
                          </span>
                          <span className="exp-work-card__arrow">↗</span>
                        </div>
                        <span className="exp-work-card__stack">{w.stack}</span>
                        <p className="exp-work-card__story">{w.story}</p>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="section" id="projects">
        <div className="sec-head" data-reveal>
          <span className="kicker">02 — Projects</span>
          <h2 className="sec-title">
            Things I've
            <br />
            <em>built.</em>
          </h2>
        </div>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="section section--cream" id="skills">
        <div className="sec-head" data-reveal>
          <span className="kicker">03 — Skills</span>
          <h2 className="sec-title">
            My
            <br />
            <em>toolkit.</em>
          </h2>
        </div>
        <div className="skills-table" data-reveal>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div className="skills-row" key={cat}>
              <span className="skills-cat">{cat}</span>
              <div className="skills-pills">
                {items.map((s) => (
                  <span className="skill-pill" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="section" id="education">
        <div className="sec-head" data-reveal>
          <span className="kicker">04 — Education</span>
          <h2 className="sec-title">
            Formally
            <br />
            <em>trained.</em>
          </h2>
        </div>
        <div className="edu-grid">
          {EDUCATION.map((e, i) => (
            <div
              className="edu-card"
              key={i}
              data-reveal
              style={{ "--delay": `${i * 0.1}s`, "--edu-bg": e.color }}
            >
              <h3 className="edu-degree">{e.degree}</h3>
              <p className="edu-inst">{e.institution}</p>
              <ul className="edu-details">
                {e.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTERESTS ── */}
      <section className="section section--lime" id="interests">
        <div className="sec-head" data-reveal>
          <span className="kicker">05 — Interests</span>
          <h2 className="sec-title">
            What I
            <br />
            <em>care about.</em>
          </h2>
        </div>
        <div className="int-grid" data-reveal>
          {INTERESTS.map((item, i) => (
            <div className="int-card" key={i}>
              <h3 className="int-card__heading">{item.heading}</h3>
              <p className="int-card__body">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section" id="contact">
        <div className="sec-head" data-reveal>
          <span className="kicker">06 — Contact</span>
        </div>
        <div className="contact-grid">
          <div data-reveal>
            <h2 className="contact-title">
              Ready to hire
              <br />
              <mark className="contact-mark">someone who ships?</mark>
            </h2>
            <p className="contact-sub">
              I'm available for full-time roles, contract work, and remote
              positions worldwide. I can start immediately.
            </p>
            <div className="contact-badges">
              <span className="pill pill--black">Worldwide</span>
              <span className="pill pill--outline">Remote OK</span>
              <span className="pill pill--lime">
                <span className="dot" /> Available Now
              </span>
            </div>
          </div>
          <div className="contact-links" data-reveal>
            <button className="contact-link" onClick={copyEmail}>
              <span className="cl-label">Email</span>
              <span className="cl-val">
                {copyMsg || "pbhattarai0129@gmail.com"}
              </span>
              <span className="cl-arr">→</span>
            </button>
            <a className="contact-link" href="tel:+9779823007520">
              <span className="cl-label">Phone</span>
              <span className="cl-val">+977 9823007520</span>
              <span className="cl-arr">→</span>
            </a>
            <a
              className="contact-link"
              href="https://github.com/Pramudita29"
              target="_blank"
              rel="noreferrer"
            >
              <span className="cl-label">GitHub</span>
              <span className="cl-val">github.com/Pramudita29</span>
              <span className="cl-arr">→</span>
            </a>
            <a
              className="contact-link"
              href="https://linkedin.com/in/pramudita-bhattarai-11957a2ab/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="cl-label">LinkedIn</span>
              <span className="cl-val">pramudita-bhattarai</span>
              <span className="cl-arr">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span>© 2026 Pramudita Bhattarai</span>
        <button className="footer__top" onClick={toTop}>
          Back to Top ↑
        </button>
        <span>Full Stack Developer · Kathmandu · Open Worldwide</span>
      </footer>
    </div>
  );
}
