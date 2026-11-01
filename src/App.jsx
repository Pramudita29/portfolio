"use client";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";

// ─── DATA (unchanged) ───────────────────────────────────────────────────────
const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Contact"];

const SECTIONS = [
  { id: "hero", num: "00", label: "Intro" },
  { id: "about", num: "01", label: "About" },
  { id: "experience", num: "02", label: "Experience" },
  { id: "projects", num: "03", label: "Projects" },
  { id: "skills", num: "04", label: "Skills" },
  { id: "education", num: "05", label: "Education" },
  { id: "certifications", num: "06", label: "Certs" },
  { id: "interests", num: "07", label: "Interests" },
  { id: "contact", num: "08", label: "Contact" },
];

const STATS = [
  { value: "3", label: "Products shipped to production" },
  { value: "8mo", label: "Startup engineering at PortMi" },
  { value: "10+", label: "Technologies used across projects" },
  { value: "71.7%", label: "First Class Honours, Coventry" },
];

const EXPERIENCE = [
  {
    num: "01",
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
    num: "01",
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
      "Service tracking and homeowner-to-worker matching",
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
      "Interactive 3D solar system built with Three.js",
      "XP system, level gates, and a persistent learning path",
      "Quiz engine with scoring and instant feedback",
      "XP-based progression and quiz scoring",
      "Admin CMS for content creation and quiz management",
    ],
    bg: "var(--mint)",
  },
  {
    num: "04",
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
    bg: "var(--sky)",
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
    color: "var(--yellow)",
  },
  {
    degree: "+2 Management",
    institution: "GoldenGate International College",
    details: ["GPA: 3.27 / 4.00", "Completed: 2022"],
    color: "var(--mint)",
  },
];

const CERTIFICATIONS = [
  {
    title: "Data Science Essentials with Python",
    issuer: "Cisco Networking Academy",
    date: "July 2026",
    detail:
      "Verified certification covering Python-based data analysis, data wrangling, and core data science workflows.",
    color: "var(--sky)",
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

const TICKER_ITEMS = [
  "Software Developer · Full-Stack Developer",
  "3 Production Products Shipped at PortMi",
  "First Class Honours · 71.7%",
  "Open to International Opportunities",
  "React · Node.js · TypeScript · PostgreSQL",
  "Modaash MMS · Kumari Trust · StratBridge Partners",
];

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

// ─── NATIVE SCROLLING ────────────────────────────────────────────────────────
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
// FIX: the class added here is "revealed" and the stylesheet now targets it
// (the old stylesheet looked for ".is-visible", so every [data-reveal] stayed hidden).
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
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

// Retro window title bar, reused by every card
function WinBar({ title }) {
  return (
    <div className="win__bar" aria-hidden="true">
      <span className="win__title">{title}</span>
      <span className="win__btns">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const visibleRef = useRef(false);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(pointer: coarse)").matches,
  );
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    document.documentElement.classList.add("has-custom-cursor");
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const move = (e) => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const over = (e) => {
      if (e.target.closest("a, button, [data-cursor='hover']"))
        setHovering(true);
    };
    const out = (e) => {
      if (e.target.closest("a, button, [data-cursor='hover']"))
        setHovering(false);
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        className={`cursor-dot ${visible ? "cursor-dot--visible" : ""}`}
        ref={dotRef}
      />
      <div
        className={`cursor-ring ${visible ? "cursor-ring--visible" : ""} ${
          hovering ? "cursor-ring--hover" : ""
        }`}
        ref={ringRef}
      />
    </>
  );
}

// ─── MAGNETIC ────────────────────────────────────────────────────────────────
function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
    const move = (e) => {
      const b = el.getBoundingClientRect();
      xTo((e.clientX - (b.left + b.width / 2)) * strength);
      yTo((e.clientY - (b.top + b.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);
  return (
    <div ref={ref} className={`magnetic ${className}`} data-cursor="hover">
      {children}
    </div>
  );
}

// ─── SECTION ELEMENTS ────────────────────────────────────────────────────────
function ChapterNumber({ num }) {
  return (
    <span className="chapter-num" aria-hidden="true">
      {num}
    </span>
  );
}

function SectionTitle({ children, className = "" }) {
  return <h2 className={`sec-title ${className}`}>{children}</h2>;
}

function Recede({ children, as: Tag = "section", ...rest }) {
  return <Tag {...rest}>{children}</Tag>;
}

// ─── SPOTLIGHT ───────────────────────────────────────────────────────────────
function DarkSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!parent) return;
    const move = (e) => {
      const b = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - b.left}px`);
      el.style.setProperty("--my", `${e.clientY - b.top}px`);
      el.style.opacity = "1";
    };
    const leave = () => (el.style.opacity = "0");
    parent.addEventListener("mousemove", move);
    parent.addEventListener("mouseleave", leave);
    return () => {
      parent.removeEventListener("mousemove", move);
      parent.removeEventListener("mouseleave", leave);
    };
  }, []);
  return <div className="spotlight" ref={ref} aria-hidden="true" />;
}

// ─── SECTION DOTS ────────────────────────────────────────────────────────────
function SectionDots({ active }) {
  return (
    <nav className="section-dots" aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          className={`section-dots__item ${
            active === s.id ? "section-dots__item--active" : ""
          }`}
          onClick={() => scrollToId(s.id)}
          aria-label={`Go to ${s.label}`}
          data-cursor="hover"
        >
          <span className="section-dots__label">
            {s.num} {s.label}
          </span>
          <span className="section-dots__dot" />
        </button>
      ))}
    </nav>
  );
}

// ─── TEXT ─────────────────────────────────────────────────────────────────────
function TextReveal({ text, className = "", tag = "p" }) {
  const Tag = tag;
  return <Tag className={`text-reveal ${className}`}>{text}</Tag>;
}

// ─── PRELOADER ───────────────────────────────────────────────────────────────
function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const numRef = useRef(null);
  const fillRef = useRef(null);
  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: onDone,
    });
    tl.to(counter, {
      val: 100,
      duration: 1.2,
      onUpdate: () => {
        if (numRef.current)
          numRef.current.textContent = Math.round(counter.val);
      },
    })
      .to(fillRef.current, { width: "100%", duration: 1.2 }, "<")
      .to(
        rootRef.current,
        { yPercent: -100, duration: 0.75, ease: "power4.inOut" },
        "+=0.12",
      );
    return () => tl.kill();
  }, []);
  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader__inner win">
        <WinBar title="loading_portfolio.exe" />
        <div className="win__body">
          <span className="preloader__logo">
            PB<span className="preloader__dot">.</span>
          </span>
          <div className="preloader__bar">
            <div className="preloader__bar-fill" ref={fillRef} />
          </div>
          <span className="preloader__num">
            <span ref={numRef}>0</span>%
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  return (
    <article
      className="proj-card win"
      data-cursor="hover"
      style={{ "--card-bg": project.bg }}
    >
      <WinBar title={`${slug(project.title)}.app`} />
      <div className="win__body">
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
      </div>
    </article>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function ProjectsSection() {
  return (
    <section className="section section--projects" id="projects">
      <div className="sec-head sec-head--rail" data-reveal>
        <ChapterNumber num="03" />
        <span className="kicker">✦ Projects</span>
        <SectionTitle>
          Things I've
          <br />
          <em>built.</em>
        </SectionTitle>
      </div>
      <div className="proj-rail">
        <div className="proj-rail__track">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      </div>
    </section>
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
    <div className="cert-modal" onClick={onClose}>
      <div
        className="cert-modal__panel win"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={cert.title}
      >
        <WinBar title="certificate_viewer.exe" />
        <div className="win__body">
          <div className="cert-modal__head">
            <div>
              <span className="cert-badge">Verified</span>
              <h3 className="cert-modal__title">{cert.title}</h3>
              <p className="cert-modal__issuer">
                {cert.issuer} · {cert.date}
              </p>
            </div>
            <button
              className="cert-modal__close"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="cert-modal__images cert-modal__images--single">
            <figure className="cert-modal__figure">
              <img
                src={cert.image.src}
                alt={`${cert.title} — ${cert.image.label}`}
              />
              <figcaption>{cert.image.label}</figcaption>
            </figure>
          </div>
          <div className="cert-modal__footer">
            {cert.certId && (
              <span className="cert-modal__id">Cert ID: {cert.certId}</span>
            )}
            {cert.credlyUrl && (
              <a
                className="cert-modal__credly"
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
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="hero">
      <span className="sticker sticker--star" aria-hidden="true">
        ★
      </span>
      <span className="sticker sticker--spark" aria-hidden="true">
        ✦
      </span>
      <span className="sticker sticker--orb" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__badges">
          <span className="pill pill--outline">Portfolio · 2026</span>
          <span className="pill pill--lime">
            <span className="dot" /> Open to Opportunities
          </span>
        </div>

        <p className="hero__note">
          This isn’t just a list of projects. It’s a short record of the things
          I’ve actually shipped and how I think about building software that
          lasts past the first version.
        </p>

        <h1 className="hero__h1">
          Software developer building
          <br />
          <mark className="hero__mark">full-stack products.</mark> Hi, I'm
          Pramudita.
        </h1>

        <p className="hero__sub">
          Software Developer · Full-Stack Developer · Kathmandu, Nepal · Open to
          international opportunities
        </p>

        <div className="hero__collage">
          <div className="hcard win win--black hcard--tilt-l">
            <WinBar title="what_i_do.exe" />
            <div className="win__body">
              <p>
                Build and ship full stack web apps — React frontends, Node or
                FastAPI backends, PostgreSQL, auth, the whole thing.
              </p>
            </div>
          </div>
          <div className="hcard win win--yellow">
            <WinBar title="track_record.xls" />
            <div className="win__body">
              <p>8 months at PortMi · 3 production products shipped</p>
              <div className="hcard__stat">3 live</div>
            </div>
          </div>
          <div className="hcard win win--chrome hcard--tilt-r">
            <WinBar title="core_stack.dll" />
            <div className="win__body">
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
          </div>
          <div className="hcard win win--pink">
            <WinBar title="availability.txt" />
            <div className="win__body">
              <p>
                Interested in contributing to international engineering teams
                and growing across modern web technologies.
              </p>
              <span className="pill pill--black" style={{ marginTop: "auto" }}>
                Let's talk ↗
              </span>
            </div>
          </div>
        </div>

        <div className="hero__ctas">
          <Magnetic>
            <a
              href="#experience"
              className="btn btn--black"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("experience");
              }}
            >
              See the work ↓
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="btn btn--pink"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
            >
              Hire Me
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://github.com/Pramudita29"
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
            >
              GitHub ↗
            </a>
          </Magnetic>
        </div>

        <div className="hero__info-strip">
          {[
            ["Location", "Kathmandu, Nepal"],
            ["Degree", "BSc (Hons) Computing"],
            ["Result", "First Class · 71.7%"],
            ["Experience", "8 mo at PortMi · 3 Products Shipped"],
            ["Status", "Available Immediately"],
          ].map(([l, v]) => (
            <div className="hero__info-cell" key={l}>
              <span className="hero__info-label">{l}</span>
              <span className="hero__info-val">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <Ticker />
    </section>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [copyMsg, setCopyMsg] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeCert, setActiveCert] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const lastY = useRef(0);

  const closeCert = useCallback(() => setActiveCert(null), []);

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

  const toTop = (e) => {
    e.preventDefault();
    scrollToId("hero");
  };

  const navLinkClick = (item) => (e) => {
    e.preventDefault();
    setNavOpen(false);
    scrollToId(item.toLowerCase());
  };

  return (
    <div className="app">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <SectionDots active={activeSection} />

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
                onClick={navLinkClick(item)}
              >
                {item}
              </a>
            ))}
          </nav>
          <Magnetic strength={0.25} className="nav__cta-wrap">
            <a
              href="#contact"
              className="nav__cta btn btn--lime"
              onClick={navLinkClick("Contact")}
            >
              Hire Me
            </a>
          </Magnetic>
          <button
            className="nav__burger"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={navOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <Hero />

      {/* ── ABOUT ── */}
      <Recede className="section" id="about">
        <div className="sec-head" data-reveal>
          <ChapterNumber num="01" />
          <span className="kicker">✦ About</span>
          <SectionTitle>
            Software developer
            <br />
            <em>based in Kathmandu.</em>
          </SectionTitle>
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
                text: "Built REST APIs, authentication, real-time features, and role-based systems",
              },
              {
                icon: "🛠",
                text: "Comfortable with weekly release cycles and production systems",
              },
            ].map((f, i) => (
              <div className="about__feat win" key={i}>
                <WinBar title={`skill_0${i + 1}.exe`} />
                <div className="win__body">
                  <span className="about__feat-icon">{f.icon}</span>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="stats-grid win">
              <WinBar title="stats.sys" />
              <div className="stats-grid__cells">
                {STATS.map((s, i) => (
                  <div className="stat-cell" key={i}>
                    <span className="stat-val">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about__bio win">
              <WinBar title="about_me.txt" />
              <div className="win__body about__bio-body">
                <TextReveal text="I am a BSc (Hons) Computing graduate with hands-on experience building and deploying full-stack web applications across frontend, backend, APIs, authentication, databases, and real-time features." />
                <TextReveal text="At PortMi, I worked in a small agile team and helped ship three products for real organizations: Modaash MMS, Kumari Trust, and StratBridge Partners." />
                <TextReveal text="I am interested in contributing to international engineering teams and continuing to grow across modern web technologies." />
              </div>
            </div>
          </div>
        </div>
      </Recede>

      {/* ── EXPERIENCE ── */}
      <Recede className="section section--dark" id="experience">
        <DarkSpotlight />
        <div className="sec-head" data-reveal>
          <ChapterNumber num="02" />
          <span className="kicker kicker--dim">✦ Experience</span>
          <SectionTitle className="sec-title--light">
            Where I've
            <br />
            <em>shipped things.</em>
          </SectionTitle>
        </div>
        <div className="exp-list">
          {EXPERIENCE.map((exp, i) => (
            <div
              className="exp-item win win--dark"
              key={i}
              data-reveal
              style={{ "--delay": `${i * 0.1}s` }}
            >
              <WinBar title={`${slug(exp.company)}_experience.exe`} />
              <div className="win__body">
                <div className="exp-item__head">
                  <div className="exp-item__meta">
                    <span className="exp-badge">{exp.tag}</span>
                    <h3 className="exp-role">{exp.role}</h3>
                    <span className="exp-co">
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </span>
                  </div>
                  {exp.period && (
                    <span className="exp-period">{exp.period}</span>
                  )}
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
                          className="exp-work-card win"
                        >
                          <WinBar title={w.link} />
                          <div className="win__body">
                            <div className="exp-work-card__top">
                              <span className="exp-work-card__title">
                                {w.title}
                              </span>
                              <span className="exp-work-card__arrow">↗</span>
                            </div>
                            <span className="exp-work-card__stack">
                              {w.stack}
                            </span>
                            <p className="exp-work-card__story">{w.story}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Recede>

      {/* ── PROJECTS ── */}
      <ProjectsSection />

      {/* ── SKILLS ── */}
      <Recede className="section section--cream" id="skills">
        <div className="sec-head" data-reveal>
          <ChapterNumber num="04" />
          <span className="kicker">✦ Skills</span>
          <SectionTitle>
            My
            <br />
            <em>toolkit.</em>
          </SectionTitle>
        </div>
        <div className="skills-table win" data-reveal>
          <WinBar title="control_panel.cpl" />
          <div className="win__body">
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
        </div>
      </Recede>

      {/* ── EDUCATION ── */}
      <Recede className="section" id="education">
        <div className="sec-head" data-reveal>
          <ChapterNumber num="05" />
          <span className="kicker">✦ Education</span>
          <SectionTitle>
            Formally
            <br />
            <em>trained.</em>
          </SectionTitle>
        </div>
        <div className="edu-grid">
          {EDUCATION.map((e, i) => (
            <div
              className="edu-card win"
              key={i}
              data-reveal
              style={{ "--delay": `${i * 0.1}s`, "--edu-bg": e.color }}
            >
              <WinBar title={`education_0${i + 1}.edu`} />
              <div className="win__body">
                <h3 className="edu-degree">{e.degree}</h3>
                <p className="edu-inst">{e.institution}</p>
                <ul className="edu-details">
                  {e.details.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Recede>

      {/* ── CERTIFICATIONS ── */}
      <Recede className="section section--cream" id="certifications">
        <div className="sec-head" data-reveal>
          <ChapterNumber num="06" />
          <span className="kicker">✦ Certifications</span>
          <SectionTitle>
            Keeping the
            <br />
            <em>skills current.</em>
          </SectionTitle>
        </div>
        <div className="cert-grid" data-reveal>
          {CERTIFICATIONS.map((c, i) => (
            <button
              className="cert-card win"
              key={i}
              data-cursor="hover"
              style={{ "--cert-bg": c.color }}
              onClick={() => setActiveCert(c)}
            >
              <WinBar title="certificate.pdf" />
              <div className="win__body">
                <div className="cert-card__top">
                  <span className="cert-badge">Verified</span>
                  <span className="cert-date">{c.date}</span>
                </div>
                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-issuer">{c.issuer}</p>
                <p className="cert-detail">{c.detail}</p>
                <span className="cert-card__view">View certificate →</span>
              </div>
            </button>
          ))}
        </div>
      </Recede>

      <CertModal cert={activeCert} onClose={closeCert} />

      {/* ── INTERESTS ── */}
      <Recede className="section section--lime" id="interests">
        <div className="sec-head" data-reveal>
          <ChapterNumber num="07" />
          <span className="kicker">✦ Interests</span>
          <SectionTitle>
            What I
            <br />
            <em>care about.</em>
          </SectionTitle>
        </div>
        <div className="int-grid" data-reveal>
          {INTERESTS.map((item, i) => (
            <div className="int-card win" key={i}>
              <WinBar title={`note_0${i + 1}.txt`} />
              <div className="win__body">
                <h3 className="int-card__heading">{item.heading}</h3>
                <p className="int-card__body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Recede>

      {/* ── CONTACT ── */}
      <section className="section" id="contact">
        <div className="sec-head" data-reveal>
          <ChapterNumber num="08" />
          <span className="kicker">✦ Contact</span>
        </div>
        <div className="contact-grid">
          <div className="contact-intro" data-reveal>
            <h2 className="contact-title">
              Let's build
              <br />
              <mark className="contact-mark">something useful.</mark>
            </h2>
            <div className="contact-copy win">
              <WinBar title="a_quick_note.txt" />
              <div className="win__body">
                <TextReveal
                  className="contact-sub"
                  text="I'm interested in software development opportunities with teams building useful, reliable products. Based in Kathmandu, Nepal, and open to international opportunities."
                />
              </div>
            </div>
            <div className="contact-badges">
              <span className="pill pill--black">Worldwide</span>
              <span className="pill pill--outline">Remote OK</span>
              <span className="pill pill--lime">
                <span className="dot" /> Open to Opportunities
              </span>
            </div>
          </div>
          <div className="contact-links win" data-reveal>
            <WinBar title="contact_me.msg" />
            <div className="win__body">
              <button
                className="contact-link"
                onClick={copyEmail}
                data-cursor="hover"
              >
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
                href="https://linkedin.com/in/pramudita-bhattarai"
                target="_blank"
                rel="noreferrer"
              >
                <span className="cl-label">LinkedIn</span>
                <span className="cl-val">pramudita-bhattarai</span>
                <span className="cl-arr">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Pramudita Bhattarai</span>
        <button className="footer__top" onClick={toTop}>
          Back to Top ↑
        </button>
        <span>
          Software Developer · Kathmandu, Nepal · Open to International
          Opportunities
        </span>
      </footer>
    </div>
  );
}
