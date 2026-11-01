"use client";
import { useCallback, useEffect, useState } from "react";
import "./index.scss";

// ─── DATA (unchanged) ───────────────────────────────────────────────────────
const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Contact"];

const STATS = [
  { value: "3", label: "Products shipped to production" },
  { value: "8mo", label: "Startup engineering at PortMi" },
  { value: "10+", label: "Technologies used across projects" },
  { value: "71.7%", label: "First Class Honours, Coventry" },
];

const EXPERIENCE = [
  {
    role: "Software Developer",
    company: "PortMi",
    location: "Kathmandu, Nepal",
    period: "Aug 2025 – Apr 2026",
    tag: "Startup · Full-Stack Development",
    desc: "Joined as a junior and grew into full ownership of features across the stack — frontend, backend, APIs, auth, and production systems. Shipped three live products used by real organisations.",
    bullets: [
      "Built Modaash MMS — multi-tenant workforce SaaS with real-time WebSocket messaging, role-based dashboards, and automated workflows; live in production",
      "Developed role-based dashboards and access control for a multi-tenant workforce management system",
      "Built real-time notification and chat layer over WebSockets for live system updates",
      "Developed REST APIs with JWT auth, middleware layering, and structured request validation",
      "Built responsive frontend applications for Kumari Trust and StratBridge Partners, translating designs into production interfaces",
      "Worked in weekly agile release cycles with continuous delivery across live systems",
    ],
    works: [
      {
        title: "Modaash MMS",
        link: "modaash.com",
        stack: "Next.js · Node.js · MongoDB · WebSockets",
        story:
          "Multi-tenant workforce management SaaS with role-based dashboards, real-time messaging, and automated workflows. Live in production.",
      },
      {
        title: "Kumari Trust",
        link: "kumaritrust.com",
        stack: "React · Tailwind CSS",
        story:
          "Responsive institutional website built with React and Tailwind CSS and deployed to production.",
      },
      {
        title: "StratBridge Partners",
        link: "stratbpartners.com",
        stack: "React · Tailwind CSS",
        story:
          "Responsive corporate website built with React and Tailwind CSS and deployed to production.",
      },
    ],
  },
];

const PROJECTS = [
  {
    title: "Nepal Bhramad",
    type: "Full Stack Travel Platform",
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    desc: "Travel booking platform featuring search and filtering, availability checks, booking workflows, JWT-authenticated accounts, and a rating system.",
    features: [
      "Search, filter, and booking workflow with availability checks",
      "JWT-authenticated user accounts with booking history",
      "Booking workflows supported by a normalized PostgreSQL database",
      "Star-rating and review system per completed booking",
      "Relational PostgreSQL schema with normalized data structures",
    ],
  },
  {
    title: "HousePal",
    type: "Cross-Platform Service Marketplace",
    stack: ["React", "Node.js", "Express", "MongoDB", "Flutter"],
    desc: "Dual-sided marketplace connecting homeowners with skilled workers — web platform plus native mobile app, sharing one REST API backend.",
    features: [
      "Job posting, bidding, and hire workflow for homeowners",
      "Worker profiles with skills, ratings, and availability",
      "Shared Express REST API serving both React web and Flutter mobile",
      "Application and status management system",
      "Service tracking and homeowner-to-worker matching",
    ],
  },
  {
    title: "AstroQuest",
    type: "Gamified 3D Learning Platform",
    stack: ["React", "Three.js", "Node.js", "MongoDB"],
    desc: "Gamified astronomy platform with a 3D solar system, XP-based progression, quiz engine, and an admin CMS for content management.",
    features: [
      "Interactive 3D solar system built with Three.js",
      "XP system, level gates, and a persistent learning path",
      "Quiz engine with scoring and instant feedback",
      "XP-based progression and quiz scoring",
      "Admin CMS for content creation and quiz management",
    ],
  },
  {
    title: "Koshi Basin ML Analysis",
    type: "Research Project · Geospatial ML Thesis",
    stack: ["Python", "TensorFlow", "Google Earth Engine", "QGIS"],
    desc: "Research using satellite imagery and machine learning for land-cover classification and environmental forecasting in the Koshi Basin.",
    features: [
      "Used satellite imagery and geospatial datasets for environmental analysis",
      "Applied machine learning techniques to land-cover classification",
      "Explored environmental forecasting using research datasets",
      "Presented findings through visual maps and technical documentation",
    ],
  },
];

const SKILLS = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express.js", "FastAPI", "Spring Boot"],
  Programming: ["JavaScript", "TypeScript", "Python", "Java", "Dart"],
  Databases: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"],
  Tools: ["Git", "GitHub", "Docker (Basic)", "Postman"],
  "Spoken Languages": [
    "English · Fluent",
    "Nepali · Native",
    "Spanish · Basic",
  ],
  Engineering: [
    "REST API Design",
    "Multi-Tenant Architecture",
    "JWT / OAuth Authentication",
    "Role-Based Access Control",
    "System Design Fundamentals",
    "Agile Development",
  ],
};

const EDUCATION = [
  {
    degree: "BSc (Hons) Computing",
    institution:
      "Coventry University (via Softwarica College of IT and e-commerce)",
    details: [
      "First Class Honours — 71.7%",
      "Graduated December 2025",
      "Merit Scholarship: 25%",
    ],
  },
  {
    degree: "+2 Management",
    institution: "GoldenGate International College",
    details: ["GPA: 3.27 / 4.00", "Completed: 2022"],
  },
];

const CERTIFICATIONS = [
  {
    title: "Data Science Essentials with Python",
    issuer: "Cisco Networking Academy",
    date: "July 2026",
    detail:
      "Verified certification covering Python-based data analysis, data wrangling, and core data science workflows.",
    certId: "bd5e8204-003f-4d00-8a60-e17b9011f7ab",
    credlyUrl:
      "https://www.credly.com/badges/8f420355-a676-4040-80e7-76dcc8aca926/public_url",
    image: {
      src: "/certificates/data-science-certificate.jpg",
      label: "Certificate",
    },
  },
];

const INTERESTS = [
  {
    heading: "Building things people actually use",
    body: "I enjoy working across frontend and backend development, from responsive interfaces to APIs, authentication, and database-backed features.",
  },
  {
    heading: "Systems that scale past the first version",
    body: "I am interested in how data models, API design, authentication, and role-based systems fit together to support reliable applications.",
  },
  {
    heading: "Good engineering culture over everything else",
    body: "I value collaboration, clear communication, and iterative delivery. Working in a small agile team taught me how planning, implementation, testing, and regular releases come together.",
  },
  {
    heading: "Films and music",
    body: "Outside of code I spend time watching films and listening to music. Both are about how you make someone feel something — which isn't that different from good UI, honestly.",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

// Layout shell: sticky title on the left, content on the right
function Shell({ id, title, note, alt, children }) {
  return (
    <section className={`section ${alt ? "section--alt" : ""}`} id={id}>
      <div className="wrap shell">
        <header className="shell__head">
          <h2 className="shell__title">{title}</h2>
          {note && <p className="shell__note">{note}</p>}
        </header>
        <div className="shell__body">{children}</div>
      </div>
    </section>
  );
}

// ─── SYSTEM DIAGRAM (hero) ───────────────────────────────────────────────────
const NODES = [
  { id: "client", x: 20, y: 20, title: "Client", sub: "React · Next.js · TS" },
  { id: "api", x: 360, y: 20, title: "API", sub: "Node · FastAPI · Spring" },
  { id: "realtime", x: 20, y: 165, title: "Realtime", sub: "WebSockets" },
  { id: "auth", x: 360, y: 165, title: "Auth", sub: "JWT · role-based" },
  { id: "db", x: 190, y: 310, title: "Database", sub: "PostgreSQL · MongoDB" },
];

const EDGES = [
  { d: "M240 55 H358", dur: 2.2, begin: 0 },
  { d: "M470 90 V163", dur: 1.8, begin: 0.6 },
  { d: "M470 235 V272 H370 V308", dur: 2.4, begin: 1.1 },
  { d: "M130 90 V163", dur: 1.8, begin: 0.3 },
  { d: "M130 235 V272 H230 V308", dur: 2.4, begin: 1.6 },
];

function SystemDiagram() {
  const reduced = usePrefersReducedMotion();
  return (
    <figure className="diagram">
      <svg
        viewBox="0 0 600 400"
        role="img"
        aria-label="Architecture diagram: client, API, realtime layer, auth and database connected by request paths"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M0 0L10 5L0 10z" className="dg-arrow" />
          </marker>
        </defs>
        {EDGES.map((e) => (
          <path key={e.d} d={e.d} className="dg-edge" markerEnd="url(#arrow)" />
        ))}
        {NODES.map((n) => (
          <g
            key={n.id}
            className="dg-node"
            transform={`translate(${n.x} ${n.y})`}
          >
            <rect width="220" height="70" rx="10" />
            <text x="18" y="31" className="dg-title">
              {n.title}
            </text>
            <text x="18" y="53" className="dg-sub">
              {n.sub}
            </text>
          </g>
        ))}
        {!reduced &&
          EDGES.map((e) => (
            <circle key={`p-${e.d}`} r="5" className="dg-packet">
              <animateMotion
                dur={`${e.dur}s`}
                begin={`${e.begin}s`}
                repeatCount="indefinite"
                path={e.d}
              />
            </circle>
          ))}
      </svg>
      <figcaption className="diagram__cap">
        The request path behind the products I've shipped.
      </figcaption>
    </figure>
  );
}

// ─── CERT MODAL ──────────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cert, onClose]);
  if (!cert) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={cert.title}
      >
        <div className="modal__head">
          <div>
            <h3 className="modal__title">{cert.title}</h3>
            <p className="modal__issuer">
              {cert.issuer} · {cert.date}
            </p>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <figure className="modal__figure">
          <img
            src={cert.image.src}
            alt={`${cert.title} — ${cert.image.label}`}
          />
        </figure>
        <div className="modal__footer">
          {cert.certId && (
            <span className="modal__id">Cert ID: {cert.certId}</span>
          )}
          {cert.credlyUrl && (
            <a
              className="text-link"
              href={cert.credlyUrl}
              target="_blank"
              rel="noreferrer"
            >
              View on Credly ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [copyMsg, setCopyMsg] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeCert, setActiveCert] = useState(null);

  const closeCert = useCallback(() => setActiveCert(null), []);

  useEffect(() => {
    const secs = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("pbhattarai0129@gmail.com");
    setCopyMsg("Copied to clipboard");
    setTimeout(() => setCopyMsg(""), 2000);
  };

  const goTo = (id) => (e) => {
    e.preventDefault();
    setNavOpen(false);
    scrollToId(id);
  };

  return (
    <div className="app">
      <header className="nav">
        <div className="nav__inner">
          <a className="nav__logo" href="#hero" onClick={goTo("hero")}>
            Pramudita Bhattarai
          </a>
          <nav className={`nav__links ${navOpen ? "nav__links--open" : ""}`}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav__link ${
                  activeSection === item.toLowerCase()
                    ? "nav__link--active"
                    : ""
                }`}
                onClick={goTo(item.toLowerCase())}
              >
                {item}
              </a>
            ))}
          </nav>
          <span className="nav__status">
            <span className="dot" /> Available
          </span>
          <button
            className="nav__burger"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={navOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section className="hero" id="hero">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <p className="hero__eyebrow">
                Pramudita Bhattarai · Software developer · Kathmandu
              </p>
              <h1 className="hero__h1">
                I build the whole system, not just the screen.
              </h1>
              <p className="hero__sub">
                Full-stack developer who ships React frontends, APIs, auth,
                databases and real-time features. Three live products delivered
                in eight months at PortMi, and now looking for an international
                team to join.
              </p>
              <div className="hero__ctas">
                <a
                  href="#experience"
                  className="btn btn--primary"
                  onClick={goTo("experience")}
                >
                  See what I've shipped
                </a>
                <a href="#contact" className="btn" onClick={goTo("contact")}>
                  Get in touch
                </a>
                <a
                  href="https://github.com/Pramudita29"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--text"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
            <SystemDiagram />
          </div>
        </section>

        {/* ── ABOUT ── */}
        <Shell id="about" title="About" note="Based in Kathmandu, Nepal.">
          <div className="prose">
            <p className="prose__lead">
              I am a BSc (Hons) Computing graduate with hands-on experience
              building and deploying full-stack web applications across
              frontend, backend, APIs, authentication, databases, and real-time
              features.
            </p>
            <p>
              At PortMi, I worked in a small agile team and helped ship three
              products for real organizations: Modaash MMS, Kumari Trust, and
              StratBridge Partners.
            </p>
            <p>
              I am interested in contributing to international engineering teams
              and continuing to grow across modern web technologies.
            </p>
          </div>
          <dl className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <dt className="stat__val">{s.value}</dt>
                <dd className="stat__label">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Shell>

        {/* ── EXPERIENCE ── */}
        <Shell
          id="experience"
          alt
          title="Experience"
          note="Where I've shipped things."
        >
          {EXPERIENCE.map((exp) => (
            <article className="exp" key={exp.company}>
              <div className="exp__top">
                <div>
                  <h3 className="exp__role">{exp.role}</h3>
                  <p className="exp__co">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <div className="exp__side">
                  <span className="exp__period">{exp.period}</span>
                  <span className="exp__tag">{exp.tag}</span>
                </div>
              </div>
              <p className="exp__desc">{exp.desc}</p>
              <ul className="list">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <h4 className="exp__sub">Deployed to production</h4>
              <ul className="works">
                {exp.works.map((w) => (
                  <li key={w.link}>
                    <a
                      href={`https://${w.link}`}
                      target="_blank"
                      rel="noreferrer"
                      className="work"
                    >
                      <span className="work__main">
                        <span className="work__title">{w.title}</span>
                        <span className="work__stack">{w.stack}</span>
                        <span className="work__story">{w.story}</span>
                      </span>
                      <span className="work__link">
                        <span className="dot" /> {w.link} ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Shell>

        {/* ── PROJECTS ── */}
        <Shell
          id="projects"
          title="Projects"
          note="Things I've built. Open any project for the feature list."
        >
          <div className="projects">
            {PROJECTS.map((p) => (
              <details className="project" key={p.title}>
                <summary className="project__sum">
                  <span className="project__head">
                    <span className="project__title">{p.title}</span>
                    <span className="project__type">{p.type}</span>
                  </span>
                  <span className="project__toggle" aria-hidden="true" />
                </summary>
                <div className="project__body">
                  <p>{p.desc}</p>
                  <div className="tags">
                    {p.stack.map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </div>
                  <ul className="list list--sm">
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </Shell>

        {/* ── SKILLS ── */}
        <Shell id="skills" alt title="Skills" note="My toolkit.">
          <div className="skills">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div className="skills__col" key={cat}>
                <h3 className="skills__cat">{cat}</h3>
                <ul>
                  {items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Shell>

        {/* ── EDUCATION ── */}
        <Shell id="education" title="Education" note="Formally trained.">
          <div className="edu">
            {EDUCATION.map((e) => (
              <article className="edu__item" key={e.degree}>
                <h3 className="edu__degree">{e.degree}</h3>
                <p className="edu__inst">{e.institution}</p>
                <ul className="edu__details">
                  {e.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Shell>

        {/* ── CERTIFICATIONS ── */}
        <Shell
          id="certifications"
          alt
          title="Certifications"
          note="Keeping the skills current."
        >
          {CERTIFICATIONS.map((c) => (
            <button
              className="cert"
              key={c.title}
              onClick={() => setActiveCert(c)}
            >
              <span className="cert__date">{c.date}</span>
              <span className="cert__main">
                <span className="cert__title">{c.title}</span>
                <span className="cert__issuer">{c.issuer}</span>
                <span className="cert__detail">{c.detail}</span>
              </span>
              <span className="cert__view">View certificate</span>
            </button>
          ))}
        </Shell>

        <CertModal cert={activeCert} onClose={closeCert} />

        {/* ── INTERESTS ── */}
        <Shell id="interests" title="Interests" note="What I care about.">
          <div className="interests">
            {INTERESTS.map((item) => (
              <div className="interest" key={item.heading}>
                <h3 className="interest__heading">{item.heading}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </Shell>

        {/* ── CONTACT ── */}
        <section className="contact" id="contact">
          <div className="wrap">
            <p className="contact__eyebrow">
              Open to international and remote opportunities
            </p>
            <h2 className="contact__title">Let's build something useful.</h2>
            <button className="contact__email" onClick={copyEmail}>
              {copyMsg || "pbhattarai0129@gmail.com"}
            </button>
            <p className="contact__text">
              I'm interested in software development opportunities with teams
              building useful, reliable products. Click the address to copy it.
            </p>
            <ul className="contact__links">
              <li>
                <a href="tel:+9779823007520">+977 9823007520</a>
              </li>
              <li>
                <a
                  href="https://github.com/Pramudita29"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/Pramudita29 ↗
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/pramudita-bhattarai"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/pramudita-bhattarai ↗
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__inner">
          <span>© 2026 Pramudita Bhattarai</span>
          <span>Software Developer · Kathmandu, Nepal</span>
          <a href="#hero" onClick={goTo("hero")}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
