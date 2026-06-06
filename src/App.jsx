"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";

// ─── DATA ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Contact"];

const STATS = [
  { value: "8mo", label: "Startup Dev" },
  { value: "4+", label: "Projects" },
  { value: "5+", label: "Technologies" },
  { value: "Always", label: "Building" },
];

const EXPERIENCE = [
  {
    num: "01",
    role: "Full Stack Developer",
    company: "PortMi",
    location: "Kathmandu, Nepal",
    period: "Aug 2025 – Apr 2026",
    tag: "Intern → Full Stack",
    desc: "I joined PortMi as an intern in a startup team of 3 and gradually grew into a Full Stack Developer role. Working inside a small startup meant taking ownership across the whole product lifecycle — frontend systems, backend logic, APIs, databases, and production deployments.",
    bullets: [
      "Multi-tenant RBAC system with isolated admin/employee workspaces",
      "Real-time WebSocket chat and notification pipelines",
      "REST APIs with structured JWT authentication",
      "Reusable component libraries reducing layout dev effort",
      "Production deployments across multiple live systems",
      "Fast-moving agile startup environment",
    ],
    works: [
      {
        title: "Kumari Trust",
        link: "kumaritrust.com",
        stack: "React · Tailwind CSS",
        story: "Built complete frontend interfaces, reusable components, layouts, and responsiveness.",
      },
      {
        title: "StratBridge Partners",
        link: "stratbpartners.com",
        stack: "React · Tailwind CSS",
        story: "Corporate production website with reusable frontend architecture and backend integrations.",
      },
      {
        title: "Modaash · MMS",
        link: "modaash.com",
        stack: "Next.js · Node.js · MongoDB",
        story: "Multi-tenant manpower system with WebSocket chat, real-time notifications, and role-based dashboards.",
      },
    ],
  },
  {
    num: "02",
    role: "Full Stack Developer & Founder",
    company: "SmartWokil",
    period: "Apr 2026 – Present",
    tag: "Solo · Legal Tech",
    desc: "Built an end-to-end legal technology platform independently — from architecture planning to database schemas to client portals — integrating Google OAuth, multi-role dashboards, and real-time messaging.",
    bullets: [
      "Google OAuth + token-based authentication flow",
      "Multi-role dashboards with real-time messaging",
      "FastAPI + PostgreSQL backend architecture",
      "React + TypeScript frontend",
      "Deadline tracking and activity alert systems",
      "Client portal and document management",
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    title: "Nepal Bhramad",
    type: "Travel Booking Platform",
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    desc: "Full stack travel and tour booking system with admin panel and complete user booking flow.",
    features: ["Tour browsing", "Booking system", "User auth", "Admin dashboard", "Ratings"],
  },
  {
    num: "02",
    title: "HousePal",
    type: "Job & Helper Platform",
    stack: ["React", "Node.js", "Express", "MongoDB", "Flutter"],
    desc: "Web + Mobile + Backend cross-platform job and helper platform.",
    features: ["Job posting", "Helper profiles", "Application workflow", "Mobile app", "REST API"],
  },
  {
    num: "03",
    title: "AstroQuest",
    type: "Astronomy Learning Platform",
    stack: ["React", "Three.js", "Node.js", "MongoDB"],
    desc: "Interactive astronomy learning platform with 3D solar system and gamified XP progression.",
    features: ["3D solar system", "Quiz + scoring", "XP gamification", "Bookmarking", "Admin CMS"],
  },
  {
    num: "04",
    title: "Thesis AI Analysis",
    type: "Satellite Data Research",
    stack: ["Python", "TensorFlow", "Google Earth Engine", "QGIS"],
    desc: "Analyzed environmental changes in Koshi River Basin using CNN, Random Forest, and LSTM models.",
    features: ["Satellite imagery", "CNN classification", "Random Forest", "LSTM time-series", "QGIS viz"],
  },
];

const SKILLS = {
  Frontend: ["React", "Next.js", "Tailwind CSS", "Material UI"],
  Backend: ["Node.js", "Express.js", "FastAPI", "Spring Boot"],
  Languages: ["JavaScript", "TypeScript", "Python", "Java", "Dart"],
  Databases: ["MongoDB", "PostgreSQL", "MySQL", "Supabase"],
  Tools: ["Git & GitHub", "Postman", "Figma", "Docker (Basic)"],
  Concepts: ["REST APIs", "JWT Auth", "MVC", "State Management", "Agile"],
};

const EDUCATION = [
  {
    degree: "BSc (Hons) Computing",
    institution: "Softwarica College · Coventry University",
    details: [
      "First Class Honours · 71.7%",
      "Awarded: Dec 2025",
      "Graduation: Jan 30, 2026",
      "Scholarship: 25% · 4 semesters",
    ],
  },
  {
    degree: "+2 Management",
    institution: "GoldenGate International College",
    details: ["GPA: 3.27", "Completed: 2022"],
  },
];

const ACHIEVEMENTS = [
  "IoA Student Member",
  "8 Months Startup Experience",
  "Production Deployments Completed",
];

const INTERESTS = [
  "Full Stack Development",
  "UI/UX Design",
  "AI Systems",
  "Astronomy Tech",
  "Scalable Real-World Apps",
];

const TICKER_ITEMS = [
  "Full Stack Developer",
  "React · Next.js · Node.js",
  "FastAPI · PostgreSQL",
  "Kathmandu, Nepal",
  "Open to Opportunities",
  "BSc Computing · Coventry",
];

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const lerp = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(lerp);
    };

    const onEnter = () => {
      dotRef.current?.classList.add("cursor--hover");
      ringRef.current?.classList.add("cursor-ring--hover");
    };
    const onLeave = () => {
      dotRef.current?.classList.remove("cursor--hover");
      ringRef.current?.classList.remove("cursor-ring--hover");
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, .proj-card, .stat-cell, .skill-pill, .int-chip, .exp-work-card").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    rafRef.current = requestAnimationFrame(lerp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

// ─── PARTICLE CANVAS ──────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], raf;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.18 + 0.05;
        this.growing = true;
        this.growSpeed = Math.random() * 0.004 + 0.001;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.growing) {
          this.opacity += this.growSpeed;
          if (this.opacity >= this.maxOpacity) this.growing = false;
        } else {
          this.opacity -= this.growSpeed * 0.5;
          if (this.opacity <= 0) this.reset();
        }
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,13,13,${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => { p.update(); p.draw(); });
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

// ─── SCROLL PROGRESS ──────────────────────────────────────────────────────
function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = pct + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div className="scroll-progress" ref={barRef} />;
}

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────
function MagneticWrap({ children, strength = 0.3 }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    el.style.transform = `translate(${(e.clientX - cx) * strength}px, ${(e.clientY - cy) * strength}px)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: "inline-block", transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
      {children}
    </div>
  );
}

// ─── TICKER ──────────────────────────────────────────────────────────────
function Ticker() {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="ticker-item">
            {item} <span className="ticker-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── SCRAMBLE TEXT ────────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";
function useScramble(text, trigger) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const total = text.length * 3;
    cancelAnimationFrame(rafRef.current);
    const step = () => {
      setDisplay(
        text.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < iteration / 3) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      iteration++;
      if (iteration < total) rafRef.current = requestAnimationFrame(step);
    };
    step();
  }, [text]);

  useEffect(() => { if (trigger) scramble(); }, [trigger, scramble]);
  return { display, scramble };
}

// ─── PARALLAX SECTION WRAPPER ────────────────────────────────────────────
function ParallaxSection({ children, speed = 0.06, className = "", id = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.setProperty("--parallax-y", `${center * speed}px`);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [speed]);

  return (
    <section ref={ref} className={`section ${className}`} id={id}>
      {children}
    </section>
  );
}

// ─── REVEAL HOOK ─────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.07 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const { display, scramble } = useScramble(project.title.toUpperCase(), hovered);

  return (
    <article
      className="proj-card"
      data-reveal
      style={{ "--delay": `${index * 0.07}s` }}
      onMouseEnter={() => { setHovered(true); scramble(); }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="proj-card__header">
        <span className="proj-num">{project.num}</span>
        <span className="proj-type">{project.type}</span>
      </div>
      <h3 className="proj-title">{display}</h3>
      <p className="proj-desc">{project.desc}</p>
      <div className="proj-stack">
        {project.stack.map((s) => <span key={s} className="proj-tag">{s}</span>)}
      </div>
      <ul className="proj-features">
        {project.features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <div className="proj-card__arrow">→</div>
    </article>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────
function Hero() {
  const gridRef = useRef(null);
  const bigNumRef = useRef(null);
  const rightRef = useRef(null);
  const nameRef = useRef(null);

  // Hero internal parallax layers
  useEffect(() => {
    const update = () => {
      const sy = window.scrollY;
      if (gridRef.current) gridRef.current.style.transform = `translateY(${sy * 0.35}px) scale(1.08)`;
      if (bigNumRef.current) bigNumRef.current.style.transform = `translateY(${sy * 0.18}px)`;
      if (rightRef.current) rightRef.current.style.transform = `translateY(${sy * 0.1}px)`;
      if (nameRef.current) nameRef.current.style.transform = `translateY(${sy * 0.05}px)`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Parallax grid background */}
      <div className="hero__grid-bg" ref={gridRef} />

      {/* Floating accent shapes */}
      <div className="hero__accent-1" />
      <div className="hero__accent-2" />

      <div className="hero__container">
        <p className="hero__eyebrow">Portfolio · 2026</p>
        <h1 className="hero__name" ref={nameRef}>
          <span className="hero__first">PRAMUDITA</span>
          <span className="hero__last">BHATTARAI</span>
        </h1>
        <div className="hero__rule" />
        <div className="hero__bottom">
          <div className="hero__left">
            <p className="hero__title">FULL STACK DEVELOPER</p>
            <p className="hero__tagline">
              I build full stack web applications that solve real-world problems from idea to deployment.
            </p>
            <div className="hero__ctas">
              <MagneticWrap>
                <a href="#projects" className="btn btn--primary">VIEW PROJECTS</a>
              </MagneticWrap>
              <MagneticWrap>
                <a href="#contact" className="btn btn--outline">CONTACT ME</a>
              </MagneticWrap>
              <MagneticWrap>
                <a href="https://github.com/Pramudita29" target="_blank" rel="noreferrer" className="btn btn--ghost">GITHUB ↗</a>
              </MagneticWrap>
            </div>
          </div>
          <div className="hero__right" ref={rightRef}>
            <div className="hero__info-block">
              {[
                ["LOCATION", "Kathmandu, Nepal"],
                ["DEGREE", "BSc (Hons) Computing"],
                ["UNIVERSITY", "Coventry · 2025"],
                ["EXPERIENCE", "8 mo Startup"],
              ].map(([label, val]) => (
                <div className="hero__info-row" key={label}>
                  <span className="info-label">{label}</span>
                  <span className="info-val">{val}</span>
                </div>
              ))}
              <div className="hero__info-row">
                <span className="info-label">STATUS</span>
                <span className="info-val"><span className="status-dot" /> Open to Work</span>
              </div>
            </div>
            <div className="hero__big-num" ref={bigNumRef}>26</div>
          </div>
        </div>
      </div>
      <Ticker />
    </section>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────
export default function App() {
  const [copyMsg, setCopyMsg] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useReveal();

  // Scroll-aware nav (hide on scroll down, show on scroll up)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          setScrolled(sy > 60);
          setNavHidden(sy > lastScrollY.current && sy > 300);
          lastScrollY.current = sy;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("pbhattarai0129@gmail.com");
    setCopyMsg("COPIED!");
    setTimeout(() => setCopyMsg(""), 2000);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="app">
      <CustomCursor />
      <ParticleCanvas />
      <ScrollProgress />

      {/* ── NAV ── */}
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${navHidden ? "site-header--hidden" : ""}`}>
        <div className="site-header__inner">
          <a className="site-logo" href="#hero" onClick={scrollToTop}>
            PB<span className="site-logo__dot">.</span>
          </a>
          <nav className={`site-nav ${navOpen ? "site-nav--open" : ""}`}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`site-nav__link ${activeSection === item.toLowerCase() ? "site-nav__link--active" : ""}`}
                onClick={() => setNavOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          <button className="hamburger" onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <Hero />

      {/* ── ABOUT ── */}
      <ParallaxSection id="about" speed={0.04}>
        <div className="section__head" data-reveal>
          <span className="section__num">00</span>
          <h2 className="section__title">ABOUT</h2>
        </div>
        <div className="about__grid">
          <div className="about__text" data-reveal>
            <p>I'm a Full Stack Developer who learned the most by working inside a real startup — not as a founder, but as a developer on a small team. That experience taught me how to ship features fast, collaborate under pressure, and take ownership of both frontend and backend code.</p>
            <p>At PortMi, I started as an intern and grew into a full stack role. I wasn't just writing code — I was helping build a product that real people used. That's where I truly understood what "production-ready" means.</p>
            <p>Since then, I've done freelance frontend work for corporate clients and built my own legal-tech platform from scratch. I'm looking for a team where I can keep growing, solve meaningful problems, and write code that matters.</p>
          </div>
          <div className="stats-grid" data-reveal>
            {STATS.map((s, i) => (
              <div className="stat-cell" key={i} style={{ "--delay": `${i * 0.06}s` }}>
                <span className="stat-val">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ── EXPERIENCE ── */}
      <ParallaxSection id="experience" speed={0.03}>
        <div className="section__head" data-reveal>
          <span className="section__num">01</span>
          <h2 className="section__title">EXPERIENCE</h2>
        </div>
        <div className="exp-list">
          {EXPERIENCE.map((exp, i) => (
            <div className="exp-item" key={i} data-reveal style={{ "--delay": `${i * 0.07}s` }}>
              <div className="exp-item__top">
                <span className="exp-item__num">{exp.num}</span>
                <div className="exp-item__meta">
                  <h3 className="exp-role">{exp.role}</h3>
                  <div className="exp-company">{exp.company}{exp.location && <span> · {exp.location}</span>}</div>
                </div>
                <div className="exp-item__right">
                  {exp.period && <span className="exp-period">{exp.period}</span>}
                  <span className="exp-tag">{exp.tag}</span>
                </div>
              </div>
              <p className="exp-desc">{exp.desc}</p>
              <ul className="exp-bullets">
                {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              {exp.works && (
                <>
                  <h4 className="exp-work-heading">PROJECTS DELIVERED</h4>
                  <div className="exp-works">
                    {exp.works.map((work, idx) => (
                      <a key={idx} href={`https://${work.link}`} target="_blank" rel="noreferrer" className="exp-work-card">
                        <div className="exp-work-top">
                          <span className="exp-work-title">{work.title}</span>
                          <span>↗</span>
                        </div>
                        <span className="exp-work-stack">{work.stack}</span>
                        <p className="exp-work-story">{work.story}</p>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </ParallaxSection>

      {/* ── PROJECTS ── */}
      <ParallaxSection id="projects" speed={0.05}>
        <div className="section__head" data-reveal>
          <span className="section__num">02</span>
          <h2 className="section__title">PROJECTS</h2>
        </div>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>
      </ParallaxSection>

      {/* ── SKILLS ── */}
      <ParallaxSection id="skills" speed={0.03}>
        <div className="section__head" data-reveal>
          <span className="section__num">03</span>
          <h2 className="section__title">SKILLS</h2>
        </div>
        <div className="skills-table" data-reveal>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div className="skills-row" key={cat}>
              <span className="skills-cat">{cat}</span>
              <div className="skills-pills">
                {items.map((s) => <span className="skill-pill" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </ParallaxSection>

      {/* ── EDUCATION ── */}
      <ParallaxSection id="education" speed={0.04}>
        <div className="section__head" data-reveal>
          <span className="section__num">04</span>
          <h2 className="section__title">EDUCATION</h2>
        </div>
        <div className="edu-grid">
          {EDUCATION.map((e, i) => (
            <div className="edu-card" key={i} data-reveal style={{ "--delay": `${i * 0.1}s` }}>
              <h3 className="edu-degree">{e.degree}</h3>
              <p className="edu-inst">{e.institution}</p>
              <ul className="edu-details">
                {e.details.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </ParallaxSection>

      {/* ── ACHIEVEMENTS + INTERESTS ── */}
      <section className="section section--split">
        <div className="split-col" data-reveal>
          <div className="section__head section__head--inline">
            <span className="section__num">05</span>
            <h2 className="section__title">ACHIEVEMENTS</h2>
          </div>
          <ul className="ach-list">
            {ACHIEVEMENTS.map((a, i) => (
              <li key={i} className="ach-item" style={{ "--delay": `${i * 0.05}s` }}>
                <span className="ach-arrow">◆</span> {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="split-col" data-reveal>
          <div className="section__head section__head--inline">
            <span className="section__num">06</span>
            <h2 className="section__title">INTERESTS</h2>
          </div>
          <div className="int-grid">
            {INTERESTS.map((item, i) => (
              <span className="int-chip" key={i} style={{ "--delay": `${i * 0.05}s` }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <ParallaxSection id="contact" speed={0.04} className="contact-section">
        <div className="section__head" data-reveal>
          <span className="section__num">07</span>
          <h2 className="section__title">CONTACT</h2>
        </div>
        <div className="contact__grid">
          <div className="contact__left" data-reveal>
            <p className="contact__heading">LET'S WORK<br /><em>TOGETHER.</em></p>
            <p className="contact__sub">I'm open to internships, collaborations, and full-time opportunities in full stack or frontend development.</p>
          </div>
          <div className="contact__right" data-reveal>
            <div className="contact-links">
              <button className="contact-link contact-link--copy" onClick={copyEmail}>
                <span className="cl-label">EMAIL</span>
                <span className="cl-val">{copyMsg || "pbhattarai0129@gmail.com"}</span>
                <span className="cl-arrow">→</span>
              </button>
              <a className="contact-link" href="tel:+9779823007520">
                <span className="cl-label">PHONE</span>
                <span className="cl-val">+977 9823007520</span>
                <span className="cl-arrow">→</span>
              </a>
              <a className="contact-link" href="https://github.com/Pramudita29" target="_blank" rel="noreferrer">
                <span className="cl-label">GITHUB</span>
                <span className="cl-val">github.com/Pramudita29</span>
                <span className="cl-arrow">→</span>
              </a>
              <a className="contact-link" href="https://linkedin.com/in/pramudita-bhattarai-11957a2ab/" target="_blank" rel="noreferrer">
                <span className="cl-label">LINKEDIN</span>
                <span className="cl-val">pramudita-bhattarai</span>
                <span className="cl-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <span>© 2026 PRAMUDITA BHATTARAI</span>
        <button className="footer-top" onClick={scrollToTop}>BACK TO TOP ↑</button>
        <span>FULL STACK DEVELOPER · KATHMANDU</span>
      </footer>
    </div>
  );
}