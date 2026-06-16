"use client";
import { useEffect, useRef, useState } from "react";
import "./index.scss";

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Contact"];

const STATS = [
  { value: "8 mo", label: "Startup Engineering Experience" },
  { value: "4+", label: "Production Systems Delivered" },
  { value: "10+", label: "Technologies Used in Real Projects" },
  { value: "First Class", label: "Honours (Coventry University)" },
];

const EXPERIENCE = [
  {
    num: "01",
    role: "Full Stack Developer",
    company: "PortMi",
    location: "Kathmandu, Nepal",
    period: "Aug 2025 – Apr 2026",
    tag: "Startup · Full Stack Ownership",
    desc: "Worked as a full stack engineer in a small startup environment, owning end-to-end feature delivery across frontend, backend, APIs, and production systems used by real users.",
    bullets: [
      "Designed and implemented multi-tenant RBAC system with isolated dashboards and role-based access control",
      "Built real-time chat and notification system using WebSockets for live system updates",
      "Developed REST APIs with JWT authentication, middleware layering, and structured validation",
      "Built reusable frontend component system to improve development speed and consistency across features",
      "Deployed and maintained production features across live systems with iterative releases",
      "Worked in fast-paced agile environment with continuous delivery cycles and tight deadlines",
    ],
    works: [
      {
        title: "Kumari Trust",
        link: "kumaritrust.com",
        stack: "React · Tailwind CSS",
        story:
          "Built production-ready frontend system with reusable UI architecture and fully responsive design system.",
      },
      {
        title: "StratBridge Partners",
        link: "stratbpartners.com",
        stack: "React · Tailwind CSS",
        story:
          "Developed scalable corporate website with modular frontend structure and structured component reuse.",
      },
      {
        title: "Modaash MMS",
        link: "modaash.com",
        stack: "Next.js · Node.js · MongoDB",
        story:
          "Built multi-tenant workforce management platform with real-time messaging, dashboards, and workflow automation.",
      },
    ],
  },
  {
    num: "02",
    role: "Full Stack Developer",
    company: "SmartWokil",
    period: "Apr 2026 – Present",
    tag: "Solo Engineer · Legal Tech Platform",
    desc: "Independently designed and built a full stack legal-tech platform from architecture to deployment, handling authentication, backend systems, and frontend delivery.",
    bullets: [
      "Implemented Google OAuth authentication with secure session management and token handling",
      "Built multi-role dashboard system with real-time communication layer",
      "Designed FastAPI + PostgreSQL backend with normalized schema architecture",
      "Developed React + TypeScript frontend with modular, reusable component structure",
      "Built task tracking, deadlines, and activity notification system for workflow management",
      "Implemented client portal with document management and structured workflow processing",
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    title: "Nepal Bhramad",
    type: "Full Stack Travel Platform",
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    desc: "End-to-end travel booking platform with complete user workflow, admin system, and scalable backend architecture.",
    features: [
      "Search and booking workflow system",
      "User authentication and role management",
      "Admin dashboard for operations",
      "Tour and package management system",
      "Ratings and review system",
    ],
    bg: "var(--yellow)",
  },
  {
    num: "02",
    title: "HousePal",
    type: "Cross-Platform Marketplace",
    stack: ["React", "Node.js", "Express", "MongoDB", "Flutter"],
    desc: "Multi-platform marketplace connecting users with service providers and job seekers across web and mobile.",
    features: [
      "Job posting and application system",
      "Service provider profile system",
      "Cross-platform mobile and web integration",
      "REST API backend architecture",
      "End-to-end workflow automation system",
    ],
    bg: "var(--pink)",
  },
  {
    num: "03",
    title: "AstroQuest",
    type: "Interactive Learning Platform",
    stack: ["React", "Three.js", "Node.js", "MongoDB"],
    desc: "Gamified astronomy learning platform with 3D visualization and structured learning progression system.",
    features: [
      "3D solar system simulation",
      "Interactive quiz and scoring system",
      "XP-based learning progression",
      "Bookmarking and progress tracking",
      "Admin CMS for content management",
    ],
    bg: "var(--mint)",
  },
  {
    num: "04",
    title: "Thesis AI Analysis",
    type: "Geospatial ML Research",
    stack: ["Python", "TensorFlow", "Google Earth Engine", "QGIS"],
    desc: "Machine learning pipeline for satellite-based environmental analysis of Koshi River Basin using multi-model approach.",
    features: [
      "Satellite image preprocessing pipeline",
      "CNN-based land classification model",
      "Random Forest feature importance analysis",
      "LSTM time-series forecasting model",
      "GIS visualization using QGIS",
    ],
    bg: "var(--sky)",
  },
];

const SKILLS = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "FastAPI", "Spring Boot"],
  Languages: ["JavaScript", "TypeScript", "Python", "Java", "Dart"],
  Databases: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"],
  Tools: ["Git", "GitHub", "Docker (Basic)", "Postman", "Figma"],
  Engineering: [
    "System Design Fundamentals",
    "REST API Architecture",
    "Authentication (JWT/OAuth)",
    "MVC Pattern",
    "Agile Development Workflow",
  ],
};

const EDUCATION = [
  {
    degree: "BSc (Hons) Computing",
    institution: "Coventry University (via Softwarica College)",
    details: [
      "First Class Honours (71.7%)",
      "Graduated: Jan 2026",
      "Scholarship: 25%",
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

const ACHIEVEMENTS = [
  "IoA Student Member",
  "8 Months Professional Startup Experience",
  "Multiple Production Deployments",
  "First Class Honours Graduate",
];

const INTERESTS = [
  "Full Stack Engineering",
  "Scalable Web Systems",
  "AI Applications",
  "UI/UX Engineering",
  "Distributed Systems Thinking",
  "Open Source Contribution",
];

const TICKER_ITEMS = [
  "Full Stack Engineer",
  "React · Next.js · Node.js",
  "FastAPI · PostgreSQL",
  "Kathmandu, Nepal",
  "Open to Full-Time Roles",
  "BSc Computing · Coventry University",
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
// bg is set as inline style — never overridden on hover, so content never disappears
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
            <span className="dot" /> Open to Work
          </span>
        </div>

        {/* big centered headline */}
        <h1 className="hero__h1">
          Give your team a dev
          <br />
          who ships. <mark className="hero__mark">Meet Pramudita.</mark>
        </h1>
        <p className="hero__sub">
          Full stack developer · Kathmandu, Nepal · BSc Computing (First Class,
          Coventry)
        </p>

        {/* card collage row */}
        <div className="hero__collage">
          <div className="hcard hcard--black hcard--tilt-l">
            <div className="hcard__label">What I do</div>
            <p>
              Build production-ready web apps from idea to deployment — React,
              Node, FastAPI, databases, the whole stack.
            </p>
          </div>

          <div className="hcard hcard--yellow">
            <div className="hcard__label">Experience</div>
            <p>
              8 months at PortMi startup · Shipped 3 live products · Now
              building SmartWokil
            </p>
            <div className="hcard__stat">8mo</div>
          </div>

          <div className="hcard hcard--white hcard--tilt-r">
            <div className="hcard__label">Core Stack</div>
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
            <div className="hcard__label">Status</div>
            <p>
              Available for full-time, freelance & collaborations worldwide.
            </p>
            <span className="pill pill--black" style={{ marginTop: "auto" }}>
              Hire me ↗
            </span>
          </div>
        </div>

        {/* info strip */}
        <div className="hero__info-strip">
          {[
            ["Location", "Kathmandu, Nepal"],
            ["Degree", "BSc (Hons) Computing"],
            ["University", "Coventry · 2025"],
            ["Honours", "First Class · 71.7%"],
            ["Experience", "8 months Startup"],
          ].map(([l, v]) => (
            <div className="hero__info-cell" key={l}>
              <span className="hero__info-label">{l}</span>
              <span className="hero__info-val">{v}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero__ctas">
          <a href="#projects" className="btn btn--black">
            View Projects ↓
          </a>
          <a href="#contact" className="btn btn--outline">
            Contact Me
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
            Let's Talk
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
            Transform scattered ideas
            <br />
            <em>into shipped products.</em>
          </h2>
        </div>

        <div className="about__cols" data-reveal>
          <div className="about__features">
            {[
              {
                icon: "⚡",
                text: "Ship features fast inside a real startup — not just side projects",
              },
              {
                icon: "🔗",
                text: "Own the full stack — frontend, backend, APIs, databases, deployments",
              },
              {
                icon: "🧠",
                text: "Turn scattered requirements into clean, scalable architecture",
              },
              {
                icon: "🛠",
                text: "Write code that real users actually depend on in production",
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
            I'm a Full Stack Developer who learned the most by working inside a
            real startup — not as a founder, but as a developer on a small team.
            That experience taught me to ship fast, collaborate under pressure,
            and take full ownership across the codebase.
          </p>
          <p>
            At PortMi, I started as an intern and grew into a full stack role. I
            wasn't just writing code — I was helping build a product that real
            people used. That's where I truly understood what "production-ready"
            means. Since then I've built my own legal-tech platform from
            scratch.
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

      {/* ── ACHIEVEMENTS + INTERESTS ── */}
      <section className="section section--split section--lime">
        <div className="split-col" data-reveal>
          <div className="sec-head">
            <span className="kicker">05 — Achievements</span>
            <h2 className="sec-title">
              Proud
              <br />
              <em>moments.</em>
            </h2>
          </div>
          <ul className="ach-list">
            {ACHIEVEMENTS.map((a, i) => (
              <li key={i} className="ach-item">
                <span className="ach-n">0{i + 1}</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="split-col" data-reveal>
          <div className="sec-head">
            <span className="kicker">06 — Interests</span>
            <h2 className="sec-title">
              What I<br />
              <em>care about.</em>
            </h2>
          </div>
          <div className="int-grid">
            {INTERESTS.map((item, i) => (
              <span className="int-chip" key={i}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section" id="contact">
        <div className="sec-head" data-reveal>
          <span className="kicker">07 — Contact</span>
        </div>
        <div className="contact-grid">
          <div data-reveal>
            <h2 className="contact-title">
              Let's work
              <br />
              <mark className="contact-mark">together.</mark>
            </h2>
            <p className="contact-sub">
              Open to internships, collaborations, and full-time opportunities
              in full stack or frontend development.
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
        <span>Full Stack Developer · Kathmandu</span>
      </footer>
    </div>
  );
}
