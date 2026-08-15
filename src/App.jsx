import { useEffect, useState } from "react";
import { DEFAULT_SOCIALS } from "./socials";
import { PortfolioView } from "./components/PortfolioView";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminLogin } from "./components/AdminLogin";

const STORAGE_KEYS = {
  projects: "ziggy-portfolio-projects",
  socials: "ziggy-portfolio-socials",
};

const readStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

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
    url: "https://eccommerceweb-blond.vercel.app/",
  },
  {
    id: "tech-urban-conference",
    title: "Tech Urban Conference",
    desc: "Conference site with Vite + Tailwind CSS v4. Custom fonts, generative canvas backgrounds, and a full responsive hamburger menu.",
    tags: ["Vite", "Tailwind v4", "Canvas API"],
    url: "https://tech-urban-t53p.vercel.app/blog.html",
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

const DEFAULT_LINKS = DEFAULT_SOCIALS.map((social) => ({ ...social }));
const ADMIN_PASSWORD = "constancy22";

export default function App() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [socialLinks, setSocialLinks] = useState(DEFAULT_LINKS);
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
    const savedProjects = readStorage(STORAGE_KEYS.projects, DEFAULT_PROJECTS);
    const savedSocials = readStorage(STORAGE_KEYS.socials, DEFAULT_LINKS);
    setProjects(savedProjects);
    setSocialLinks(savedSocials);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEYS.socials, JSON.stringify(socialLinks));
    }
  }, [socialLinks]);

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
    setProjectForm((current) => ({ ...current, [name]: value }));
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

  if (screen === "login") {
    return (
      <AdminLogin
        password={password}
        setPassword={setPassword}
        loginError={loginError}
        handleAdminLogin={handleAdminLogin}
        handleAdminBack={handleAdminBack}
      />
    );
  }

  if (screen === "admin") {
    return (
      <AdminDashboard
        socialLinks={socialLinks}
        projects={projects}
        showForm={showForm}
        setShowForm={setShowForm}
        projectForm={projectForm}
        handleProjectChange={handleProjectChange}
        handleAddProject={handleAddProject}
        handleDeleteProject={handleDeleteProject}
        handleSocialLinkChange={handleSocialLinkChange}
        openProject={openProject}
        handleAdminBack={handleAdminBack}
      />
    );
  }

  return (
    <PortfolioView
      projects={projects}
      socialLinks={socialLinks}
      newsletterEmail={newsletterEmail}
      setNewsletterEmail={setNewsletterEmail}
      newsletterMessage={newsletterMessage}
      setNewsletterMessage={setNewsletterMessage}
      newsletterStatus={newsletterStatus}
      handleCollabSubmit={handleCollabSubmit}
      scrollTo={scrollTo}
      openProject={openProject}
      setScreen={setScreen}
    />
  );
}
