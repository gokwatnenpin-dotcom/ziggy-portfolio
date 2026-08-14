import { useEffect, useState } from "react";
import {
  ExternalLink,
  ChevronDown,
  Send,
  Plus,
  Trash2,
} from "lucide-react";
import { DEFAULT_SOCIALS } from "./socials";

// ─── Data ─────────────────────────────────────────────────────

const LEARNED = [
  ["HTML & CSS", "Frontend"],
  ["JavaScript (ES6+)", "Frontend"],
  ["React", "Frontend"],
  ["Tailwind CSS v4", "Frontend"],
  ["Vite", "Tooling"],
  ["Python", "Learning"],
  ["Telegram Bot API", "Backend"],
  ["REST APIs & Fetch API", "Backend"],
  ["Git & GitHub", "Tooling"],
  ["Linux / WSL2 / Bash", "System"],
  ["Node.js", "Runtime"],
  ["OOP & Async Patterns", "Concept"],
];

const LEARNING = [
  ["Hack The Box (HTB)", "Security"],
  ["Nmap", "Security"],
  ["Burp Suite", "Security"],
  ["SQLMap", "Security"],
  ["Hydra / John the Ripper", "Security"],
  ["Wireshark", "Security"],
  ["Pentesting Methodology", "Security"],
  ["Dirb / Gobuster", "Security"],
];

const DEFAULT_PROJECTS = [
  {
    id: "ziggy-telegram-bot",
    title: "Ziggy Telegram Bot",
    desc: "AI-powered Telegram bot built with Python and the Anthropic API. Features per-user conversation history, typing indicators, and slash commands.",
    tags: ["Python", "Anthropic API", "Telegram"],
    url: "https://t.me/ziggy_2958Bot",
  },
  {
    id: "dummyjson-admin-demo",
    title: "DummyJSON Admin Demo",
    desc: "Admin & cart UI — paginated product grids, category filtering, debounced search, optimistic updates, and localStorage bridges.",
    tags: ["JavaScript", "Tailwind CSS", "DummyJSON"],
    url: null,
  },
  {
    id: "tech-urban-conference",
    title: "Tech Urban Conference",
    desc: "Conference site with Vite + Tailwind CSS v4. Custom fonts, generative canvas backgrounds, and a full responsive hamburger menu.",
    tags: ["Vite", "Tailwind v4", "Canvas API"],
    url: null,
  },
  {
    id: "extacy-arts-gallery",
    title: "Extacy Arts Gallery",
    desc: "Gallery website for Kazizi Mall, Jos, Nigeria. Generative canvas art background and a vanilla JS hamburger navigation.",
    tags: ["HTML/CSS", "Vanilla JS", "Canvas"],
    url: null,
  },
  {
    id: "next-project-placeholder",
    title: "More projects coming soon",
    desc: "This portfolio section is intentionally ready to hold your next app, experiment, or client build. Add another card whenever you're ready.",
    tags: ["Next Idea", "Portfolio", "Build"],
    url: null,
    isPlaceholder: true,
  },
];

const SOCIALS_STORAGE_KEY = "ziggy-portfolio-social-links";

const readStoredSocialLinks = () => {
  if (typeof window === "undefined") {
    return DEFAULT_SOCIALS;
  }

  try {
    const saved = window.localStorage.getItem(SOCIALS_STORAGE_KEY);
    if (!saved) return DEFAULT_SOCIALS;

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_SOCIALS;

    return parsed.map((social) => ({
      ...DEFAULT_SOCIALS.find((defaultSocial) => defaultSocial.label === social.label),
      ...social,
    }));
  } catch (_error) {
    return DEFAULT_SOCIALS;
  }
};

// ─── Styles ──────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    scroll-behavior: smooth;
  }

  body {
    background: #0b0b0b;
    color: #f5f5f5;
  }

  .pf-root {
    font-family: 'Syne', sans-serif;
    background: #0b0b0b;
    color: #f5f5f5;
    min-height: 100vh;
  }

  /* Blinking cursor */
  .cur {
    display: inline-block;
    width: 0.07em;
    height: 0.83em;
    background: #fff;
    vertical-align: middle;
    margin-left: 0.04em;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: .9;
    }

    50% {
      opacity: .25;
    }
  }

  /* Nav */
  .nav-link:hover {
    color: #fff !important;
  }

  /* CTAs */
  .btn-solid:hover {
    background: #fff !important;
    color: #000 !important;
  }

  .btn-solid:hover svg {
    stroke: #000;
  }

  .btn-ghost:hover {
    border-color: #fff !important;
    color: #fff !important;
  }

  /* Skill rows */
  .sk-row:hover {
    background: #111 !important;
    border-left-color: #fff !important;
  }

  .sk-row:hover .sk-name {
    color: #fff !important;
  }

  /* Project cards */
  .pj-card:hover {
    background: #0d0d0d !important;
  }

  .pj-card:hover .pj-title {
    color: #fff !important;
  }

  .pj-card:hover .pj-icon {
    stroke: #666 !important;
  }

  /* Social rows */
  .soc-row:hover {
    background: #111 !important;
    border-left-color: #fff !important;
  }

  .soc-row:hover .soc-label {
    color: #fff !important;
  }

  .soc-row:hover svg {
    stroke: #fff !important;
  }

  @media (max-width: 700px) {
    .pf-root nav {
      padding: 16px 20px !important;
    }

    .pf-root section {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }

    .pf-root section[style*="gridTemplateColumns: 140px"] {
      grid-template-columns: 1fr !important;
      gap: 12px !important;
    }
  }
`;

// ─── Component ───────────────────────────────────────────────

const ADMIN_PASSWORD = "constancy22";

export default function Portfolio() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [socialLinks, setSocialLinks] = useState(() => readStoredSocialLinks());
  const [showForm, setShowForm] = useState(false);
  const [screen, setScreen] = useState("portfolio");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [projectForm, setProjectForm] = useState({
    title: "",
    desc: "",
    tags: "",
    url: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SOCIALS_STORAGE_KEY, JSON.stringify(socialLinks));
    }
  }, [socialLinks]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    return () => {
      try {
        document.head.removeChild(style);
      } catch (_) {}
    };
  }, []);

  const scrollTo = (id) => {
    if (typeof document === "undefined") return;

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const openProject = (url) => {
    if (!url || typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleProjectChange = (event) => {
    const { name, value } = event.target;
    setProjectForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAddProject = (event) => {
    event.preventDefault();

    const title = projectForm.title.trim();
    const desc = projectForm.desc.trim();
    if (!title || !desc) return;

    const nextProject = {
      id: `project-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title,
      desc,
      tags: projectForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 5) || ["New Project"],
      url: projectForm.url.trim() || null,
    };

    setProjects((current) => [nextProject, ...current]);
    setProjectForm({ title: "", desc: "", tags: "", url: "" });
    setShowForm(false);
  };

  const handleDeleteProject = (projectId) => {
    setProjects((current) => current.filter((project) => project.id !== projectId));
  };

  const handleSocialLinkChange = (index, field, value) => {
    setSocialLinks((current) =>
      current.map((social, socialIndex) =>
        socialIndex === index ? { ...social, [field]: value } : social
      )
    );
  };

  const handleAdminLogin = (event) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      setLoginError("");
      setScreen("admin");
      return;
    }

    setLoginError("Incorrect password.");
  };

  const handleAdminBack = () => {
    setPassword("");
    setLoginError("");
    setScreen("portfolio");
  };

  const handleCollabSubmit = (event) => {
    event.preventDefault();

    const email = newsletterEmail.trim();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setNewsletterStatus("Please enter a valid email address.");
      return;
    }

    const message = newsletterMessage.trim();
    const website = typeof window !== "undefined" ? window.location.href : "https://ziggy.dev";
    const subject = encodeURIComponent("New collaboration request");
    const body = encodeURIComponent(
      [
        "New collaboration request from website.",
        "",
        `Email: ${email}`,
        `Website: ${website}`,
        message ? `Project / collaboration idea: ${message}` : "Project / collaboration idea: None",
      ].join("\n")
    );

    setNewsletterEmail("");
    setNewsletterMessage("");

    if (typeof window !== "undefined") {
      window.location.href = `mailto:gokwatnenpin@gmail.com?subject=${subject}&body=${body}`;
    }

    setNewsletterStatus(
      message
        ? `Your email app should open with your collaboration request ready to send. Idea: "${message}"`
        : "Your email app should open with your collaboration request ready to send."
    );
  };

  const mono = {
    fontFamily: "'Space Mono', monospace",
  };

  const syne = {
    fontFamily: "'Syne', sans-serif",
  };

  const line = {
    borderBottom: "1px solid #111",
  };

  const eye = {
    ...mono,
    fontSize: "10px",
    color: "#444",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  };

  const H2 = {
    ...syne,
    fontSize: "clamp(30px,5vw,50px)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    margin: "12px 0 48px",
  };

  if (screen === "login") {
    return (
      <div className="pf-root" style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: "20px" }}>
        <div style={{ width: "100%", maxWidth: "440px", background: "#0d0d0d", border: "1px solid #1d1d1d", padding: "28px" }}>
          <p style={{ ...mono, fontSize: "10px", color: "#a7a7a7", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>
            Admin access
          </p>

          <h2 style={{ ...syne, fontSize: "28px", margin: "0 0 20px" }}>ziggy.dev</h2>

          <form onSubmit={handleAdminLogin} style={{ display: "grid", gap: "14px" }}>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              style={{
                background: "#111",
                color: "#f5f5f5",
                border: "1px solid #2b2b2b",
                padding: "12px 14px",
                fontSize: "14px",
              }}
            />

            {loginError && (
              <p style={{ ...mono, fontSize: "10px", color: "#ff8c8c", margin: 0 }}>{loginError}</p>
            )}

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="submit"
                style={{
                  ...mono,
                  background: "#f5f5f5",
                  color: "#111",
                  border: "none",
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Login
              </button>

              <button
                type="button"
                onClick={handleAdminBack}
                style={{
                  ...mono,
                  background: "transparent",
                  color: "#d0d0d0",
                  border: "1px solid #2a2a2a",
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (screen === "admin") {
    return (
      <div className="pf-root" style={{ minHeight: "100vh", padding: "80px 20px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
            <div>
              <p style={{ ...mono, fontSize: "10px", color: "#a7a7a7", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>
                Admin dashboard
              </p>
              <h2 style={{ ...syne, fontSize: "32px", margin: "8px 0 0" }}>ziggy.dev</h2>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a
                href="https://wa.me/2348026977877?text=Hello%20Ziggy"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...mono,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#25D366",
                  color: "#08150d",
                  border: "none",
                  padding: "10px 14px",
                  textDecoration: "none",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                WhatsApp
              </a>

              <button
                type="button"
                onClick={handleAdminBack}
                style={{
                  ...mono,
                  background: "transparent",
                  color: "#d0d0d0",
                  border: "1px solid #2a2a2a",
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Back to portfolio
              </button>
            </div>
          </div>

          <section style={{ padding: "24px 0" }}>
            <div style={{ marginBottom: "30px", border: "1px solid #1a1a1a", background: "#0d0d0d", padding: "18px" }}>
              <p style={{ ...mono, fontSize: "10px", color: "#a7a7a7", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px" }}>
                Update socials
              </p>

              <div style={{ display: "grid", gap: "14px" }}>
                {socialLinks.map((social, index) => (
                  <div key={social.label} style={{ display: "grid", gap: "8px", padding: "12px", border: "1px solid #1b1b1b", background: "#0a0a0a" }}>
                    <label style={{ ...mono, fontSize: "9px", color: "#8e8e8e", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      {social.label}
                    </label>

                    <input
                      value={social.handle}
                      onChange={(event) => handleSocialLinkChange(index, "handle", event.target.value)}
                      placeholder="Handle text"
                      style={{
                        background: "#111",
                        color: "#f2f2f2",
                        border: "1px solid #2b2b2b",
                        padding: "10px 12px",
                        fontSize: "14px",
                      }}
                    />

                    <input
                      value={social.url}
                      onChange={(event) => handleSocialLinkChange(index, "url", event.target.value)}
                      placeholder="https://example.com"
                      style={{
                        background: "#111",
                        color: "#f2f2f2",
                        border: "1px solid #2b2b2b",
                        padding: "10px 12px",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "18px" }}>
              <button
                type="button"
                onClick={() => setShowForm((value) => !value)}
                style={{
                  ...mono,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#111",
                  color: "#f5f5f5",
                  border: "1px solid #2a2a2a",
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                <Plus size={12} />
                Add project
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={handleAddProject}
                style={{
                  display: "grid",
                  gap: "12px",
                  padding: "18px",
                  marginBottom: "20px",
                  background: "#0c0c0c",
                  border: "1px solid #1a1a1a",
                }}
              >
                <input
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectChange}
                  placeholder="Project title"
                  style={{
                    background: "#111",
                    color: "#f2f2f2",
                    border: "1px solid #2b2b2b",
                    padding: "12px 14px",
                    fontSize: "14px",
                  }}
                />

                <textarea
                  name="desc"
                  value={projectForm.desc}
                  onChange={handleProjectChange}
                  placeholder="Short project description"
                  rows={3}
                  style={{
                    background: "#111",
                    color: "#f2f2f2",
                    border: "1px solid #2b2b2b",
                    padding: "12px 14px",
                    fontSize: "14px",
                    resize: "vertical",
                  }}
                />

                <input
                  name="tags"
                  value={projectForm.tags}
                  onChange={handleProjectChange}
                  placeholder="Tags, separated by commas"
                  style={{
                    background: "#111",
                    color: "#f2f2f2",
                    border: "1px solid #2b2b2b",
                    padding: "12px 14px",
                    fontSize: "14px",
                  }}
                />

                <input
                  name="url"
                  value={projectForm.url}
                  onChange={handleProjectChange}
                  placeholder="Project URL (optional)"
                  style={{
                    background: "#111",
                    color: "#f2f2f2",
                    border: "1px solid #2b2b2b",
                    padding: "12px 14px",
                    fontSize: "14px",
                  }}
                />

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    type="submit"
                    style={{
                      ...mono,
                      background: "#f5f5f5",
                      color: "#111",
                      border: "none",
                      padding: "10px 14px",
                      cursor: "pointer",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Save project
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    style={{
                      ...mono,
                      background: "transparent",
                      color: "#d0d0d0",
                      border: "1px solid #2a2a2a",
                      padding: "10px 14px",
                      cursor: "pointer",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1px", background: "#161616" }}>
              {projects.map((p, i) => (
                <div
                  key={p.id}
                  className="pj-card"
                  onClick={() => openProject(p.url)}
                  style={{
                    background: p.isPlaceholder ? "#0a0a0a" : "#000",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    transition: "background 0.18s",
                    cursor: p.url ? "pointer" : "default",
                    minHeight: "210px",
                    border: p.isPlaceholder ? "1px dashed #1b1b1b" : "1px solid #0f0f0f",
                    boxSizing: "border-box",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ ...mono, fontSize: "10px", color: "#1e1e1e" }}>{String(i + 1).padStart(2, "0")}</span>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {p.url && <ExternalLink size={12} className="pj-icon" style={{ stroke: "#2a2a2a", transition: "stroke 0.15s", flexShrink: 0 }} />}

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteProject(p.id);
                        }}
                        aria-label={`Delete ${p.title}`}
                        style={{
                          background: "transparent",
                          border: "1px solid #2a2a2a",
                          color: "#b0b0b0",
                          width: "22px",
                          height: "22px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  <h3 className="pj-title" style={{ ...syne, fontSize: "15px", fontWeight: 700, color: "#e6e6e6", margin: 0, transition: "color 0.18s" }}>{p.title}</h3>
                  <p style={{ fontSize: "12px", color: "#b8b8b8", lineHeight: 1.7, margin: 0, flex: 1 }}>{p.desc}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {p.tags.map((t) => (
                      <span key={`${p.id}-${t}`} style={{ ...mono, fontSize: "9px", border: "1px solid #181818", padding: "2px 6px", color: "#2d2d2d", letterSpacing: "0.04em" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="pf-root">

      {/* ── NAV ──────────────────────────────────────────── */}

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          background: "rgba(0,0,0,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #111",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
        }}
      >
        <button
          type="button"
          onClick={() => setScreen("login")}
          style={{
            ...mono,
            fontSize: "11px",
            color: "#333",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span style={{ color: "#555" }}>ziggy</span>.dev
        </button>

        <div
          style={{
            display: "flex",
            gap: "28px",
          }}
        >
          {["skills", "projects", "contact"].map((id) => (
            <button
              key={id}
              className="nav-link"
              onClick={() => scrollTo(id)}
              style={{
                ...mono,
                background: "none",
                border: "none",
                color: "#3a3a3a",
                cursor: "pointer",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "capitalize",
                transition: "color 0.2s",
                padding: 0,
              }}
            >
              {id}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "120px 40px 60px",
          ...line,
        }}
      >
        <p
          style={{
            ...eye,
            marginBottom: "20px",
          }}
        >
          Frontend Dev · Python Learner · Security Learner
        </p>

        <h1
          style={{
            ...syne,
            fontSize: "clamp(68px,15vw,180px)",
            fontWeight: 800,
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            margin: "0 0 44px",
          }}
        >
          ZIGGY<span className="cur" />
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <p
            style={{
              fontSize: "clamp(13px,1.5vw,17px)",
              color: "#cfcfcf",
              maxWidth: "400px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Building real things from Plateau State, Jos —
            <br />
            one commit at a time.
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://github.com/gokwatnenpin-dotcom"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid"
              style={{
                ...mono,
                display: "flex",
                alignItems: "center",
                gap: "7px",
                border: "1px solid #fff",
                padding: "11px 20px",
                fontSize: "11px",
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
                transition: "all 0.2s",
                letterSpacing: "0.06em",
              }}
            >
              <ExternalLink size={13} />
              GitHub
            </a>

            <button
              className="btn-ghost"
              onClick={() => scrollTo("projects")}
              style={{
                ...mono,
                display: "flex",
                alignItems: "center",
                gap: "7px",
                border: "1px solid #222",
                padding: "11px 20px",
                fontSize: "11px",
                fontWeight: 700,
                color: "#555",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.06em",
              }}
            >
              View Work
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "140px 1fr",
          gap: "40px",
          padding: "64px 40px",
          ...line,
          alignItems: "start",
        }}
      >
        <p style={eye}>About</p>

        <p
          style={{
            fontSize: "clamp(15px,1.8vw,20px)",
            fontWeight: 600,
            color: "#d1d1d1",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Self-directed developer from Nigeria. I learn by building — real
          projects, Hack The Box challenges, and late-night debugging sessions.
          Currently going deep on cybersecurity while keeping my frontend
          skills sharp and my problem-solving habits practical.
        </p>
      </section>

      {/* ── SKILLS ───────────────────────────────────────── */}

      <section
        id="skills"
        style={{
          padding: "64px 40px",
          ...line,
        }}
      >
        <p style={eye}>Skills</p>

        <h2 style={H2}>
          What I Know &
          <br />
          What I'm Learning
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
          }}
        >
          {/* Mastered */}

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#fff",
                  flexShrink: 0,
                }}
              />

              <span
                style={{
                  ...mono,
                  fontSize: "9px",
                  color: "#aaa",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Mastered
              </span>
            </div>

            {LEARNED.map(([name, cat]) => (
              <div
                key={name}
                className="sk-row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                  borderBottom: "1px solid #0f0f0f",
                  borderLeft: "2px solid transparent",
                  transition: "all 0.15s",
                  cursor: "default",
                }}
              >
                <span
                  className="sk-name"
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#d6d6d6",
                    transition: "color 0.15s",
                  }}
                >
                  {name}
                </span>

                <span
                  style={{
                    ...mono,
                    fontSize: "9px",
                    color: "#2a2a2a",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat}
                </span>
              </div>
            ))}
          </div>

          {/* Learning */}

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#333",
                  animation: "pulse 2s ease infinite",
                  flexShrink: 0,
                }}
              />

              <span
                style={{
                  ...mono,
                  fontSize: "9px",
                  color: "#3a3a3a",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                In Progress
              </span>
            </div>

            {LEARNING.map(([name, cat]) => (
              <div
                key={name}
                className="sk-row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                  borderBottom: "1px solid #0d0d0d",
                  borderLeft: "2px dashed transparent",
                  transition: "all 0.15s",
                  cursor: "default",
                }}
              >
                <span
                  className="sk-name"
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#bdbdbd",
                    transition: "color 0.15s",
                  }}
                >
                  {name}
                </span>

                <span
                  style={{
                    ...mono,
                    fontSize: "9px",
                    color: "#222",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────── */}

      <section
        id="projects"
        style={{
          padding: "64px 40px",
          ...line,
        }}
      >
        <p style={eye}>Projects</p>

        <h2 style={H2}>Things I've Built</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(270px, 1fr))",
            gap: "1px",
            background: "#161616",
          }}
        >
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="pj-card"
              onClick={() => openProject(p.url)}
              style={{
                background: p.isPlaceholder ? "#0a0a0a" : "#000",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                transition: "background 0.18s",
                cursor: p.url ? "pointer" : "default",
                minHeight: "210px",
                border: p.isPlaceholder ? "1px dashed #1b1b1b" : "1px solid #0f0f0f",
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    ...mono,
                    fontSize: "10px",
                    color: "#1e1e1e",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {p.url && (
                    <ExternalLink
                      size={12}
                      className="pj-icon"
                      style={{
                        stroke: "#2a2a2a",
                        transition: "stroke 0.15s",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              </div>

              <h3
                className="pj-title"
                style={{
                  ...syne,
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#e6e6e6",
                  margin: 0,
                  transition: "color 0.18s",
                }}
              >
                {p.title}
              </h3>

              <p
                style={{
                  fontSize: "12px",
                  color: "#b8b8b8",
                  lineHeight: 1.7,
                  margin: 0,
                  flex: 1,
                }}
              >
                {p.desc}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                }}
              >
                {p.tags.map((t) => (
                  <span
                    key={`${p.id}-${t}`}
                    style={{
                      ...mono,
                      fontSize: "9px",
                      border: "1px solid #181818",
                      padding: "2px 6px",
                      color: "#2d2d2d",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}

      <section
        id="contact"
        style={{
          padding: "64px 40px",
        }}
      >
        <p style={eye}>Contact</p>

        <h2 style={H2}>Let's Connect</h2>

        <p
          style={{
            fontSize: "15px",
            color: "#c8c8c8",
            lineHeight: 1.7,
            maxWidth: "360px",
            marginBottom: "32px",
          }}
        >
          If you want to collaborate, send your details below and I’ll get
          back to you.
        </p>

        <form
          onSubmit={handleCollabSubmit}
          style={{
            display: "grid",
            gap: "10px",
            maxWidth: "520px",
            marginBottom: "36px",
          }}
        >
          <input
            type="email"
            value={newsletterEmail}
            onChange={(event) => setNewsletterEmail(event.target.value)}
            placeholder="Your email address"
            style={{
              background: "#111",
              color: "#f5f5f5",
              border: "1px solid #2b2b2b",
              padding: "12px 14px",
              fontSize: "14px",
            }}
          />

          <textarea
            value={newsletterMessage}
            onChange={(event) => setNewsletterMessage(event.target.value)}
            placeholder="Tell me about your project or collaboration idea"
            rows={4}
            style={{
              background: "#111",
              color: "#f5f5f5",
              border: "1px solid #2b2b2b",
              padding: "12px 14px",
              fontSize: "14px",
              resize: "vertical",
            }}
          />

          <button
            type="submit"
            style={{
              ...mono,
              background: "#f5f5f5",
              color: "#111",
              border: "none",
              padding: "12px 18px",
              cursor: "pointer",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            Send Request
          </button>
        </form>

        {newsletterStatus && (
          <p
            style={{
              ...mono,
              fontSize: "10px",
              color: newsletterStatus.includes("Please") ? "#ffb3b3" : "#d6d6d6",
              margin: "0 0 28px",
            }}
          >
            {newsletterStatus}
          </p>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "440px",
            background: "#141414",
            gap: "1px",
          }}
        >
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="soc-row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 22px",
                background: "#000",
                textDecoration: "none",
                borderLeft: "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <s.Icon
                  size={16}
                  style={{
                    stroke: "#444",
                    transition: "stroke 0.15s",
                    flexShrink: 0,
                  }}
                />

                <div>
                  <p
                    className="soc-label"
                    style={{
                      ...syne,
                      margin: 0,
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "#e7e7e7",
                      transition: "color 0.15s",
                    }}
                  >
                    {s.label}
                  </p>

                  <p
                    style={{
                      ...mono,
                      margin: 0,
                      fontSize: "10px",
                      color: "#b0b0b0",
                      marginTop: "2px",
                    }}
                  >
                    {s.handle}
                  </p>
                </div>
              </div>

              <ExternalLink
                size={11}
                style={{
                  stroke: "#2a2a2a",
                  flexShrink: 0,
                }}
              />
            </a>
          ))}
        </div>

        {/* Footer */}

        <div
          style={{
            marginTop: "80px",
            paddingTop: "20px",
            borderTop: "1px solid #0d0d0d",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span
            style={{
              ...mono,
              fontSize: "10px",
              color: "#222",
            }}
          >
            © 2026 Ziggy — Built with React
          </span>

          <span
            style={{
              ...mono,
              fontSize: "10px",
              color: "#b6b6b6",
            }}
          >
            Plateau State, Jos 🇳🇬
          </span>
        </div>
      </section>
    </div>
  );
}
