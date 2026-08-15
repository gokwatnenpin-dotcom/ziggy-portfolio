import { ChevronDown, ExternalLink } from "lucide-react";

const eyeClass = "font-mono text-[10px] uppercase tracking-[0.18em] text-[#444]";
const H2Class = "font-syne mt-3 mb-12 text-[clamp(30px,5vw,50px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white";

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

export function PortfolioView({
  projects,
  socialLinks,
  newsletterEmail,
  setNewsletterEmail,
  newsletterMessage,
  setNewsletterMessage,
  newsletterStatus,
  handleCollabSubmit,
  scrollTo,
  openProject,
  setScreen,
}) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-[#111] bg-black/90 px-10 py-4 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setScreen("login")}
          className="font-mono cursor-pointer border-none bg-transparent p-0 text-[11px] text-[#333] hover:text-[#555]"
        >
          <span className="text-[#555]">ziggy</span>.dev
        </button>

        <div className="flex gap-7">
          {["skills", "projects", "contact"].map((id) => (
            <button
              key={id}
              className="nav-link font-mono cursor-pointer border-none bg-transparent p-0 text-[11px] uppercase tracking-[0.08em] text-[#3a3a3a] transition-colors hover:text-white"
              onClick={() => scrollTo(id)}
            >
              {id}
            </button>
          ))}
        </div>
      </nav>

      <section className="flex min-h-screen flex-col justify-end border-b border-[#111] px-10 pb-16 pt-[120px]">
        <p className="font-mono mb-5 text-[10px] uppercase tracking-[0.18em] text-[#444]">
          Frontend Dev · Python Learner · Security Learner
        </p>

        <h1 className="font-syne mb-11 text-[clamp(68px,15vw,180px)] font-bold leading-[0.88] tracking-[-0.04em] text-white">
          ZIGGY<span className="cursor-blink ml-1 inline-block h-[0.83em] w-[0.07em] align-middle bg-white" />
        </h1>

        <h1 className="font-syne mb-11 text-[clamp(68px,15vw,180px)] font-semiblod leading-[0.88] tracking-[-0.04em] text-white">
          Gokwat Nenpin Isaac<span className="cursor-blink ml-1 inline-block h-[0.83em] w-[0.07em] align-middle bg-white" />
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-5">
          <p className="m-0 max-w-[400px] text-[clamp(13px,1.5vw,17px)] leading-7 text-[#cfcfcf]">
            Building real things from Plateau State, Jos —
            <br />
            one commit at a time.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="https://github.com/gokwatnenpin-dotcom"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid font-mono inline-flex items-center gap-2 border border-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white hover:text-black"
            >
              <ExternalLink size={13} />
              GitHub
            </a>

            <button
              onClick={() => scrollTo("projects")}
              className="btn-ghost font-mono inline-flex cursor-pointer items-center gap-2 border border-[#222] bg-transparent px-5 py-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] transition hover:border-white hover:text-white"
            >
              View Work
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[140px_1fr] gap-10 border-b border-[#111] px-10 py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#444]">About</p>

        <p className="m-0 text-[clamp(15px,1.8vw,20px)] font-semibold leading-[1.65] text-[#d1d1d1]">
          Self-directed developer from Nigeria. I learn by building — real
          projects, Hack The Box challenges, and late-night debugging sessions.
          Currently going deep on cybersecurity while keeping my frontend
          skills sharp and my problem-solving habits practical.
        </p>
      </section>

      <section id="skills" className="border-b border-[#111] px-10 py-16">
        <p className={eyeClass}>Skills</p>

        <h2 className={H2Class}>
          What I Know &
          <br />
          What I'm Learning
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#aaa]">Mastered</span>
            </div>

            {LEARNED.map(([name, cat]) => (
              <div
                key={name}
                className="sk-row flex items-center justify-between border-b border-[#0f0f0f] border-l-2 border-l-transparent px-3.5 py-3 transition-colors hover:border-l-white"
              >
                <span className="sk-name text-[13px] font-semibold text-[#d6d6d6] transition-colors">
                  {name}
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#2a2a2a]">
                  {cat}
                </span>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-5 flex items-center gap-2">
              <div className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#333]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#3a3a3a]">In Progress</span>
            </div>

            {LEARNING.map(([name, cat]) => (
              <div
                key={name}
                className="sk-row flex items-center justify-between border-b border-[#0d0d0d] border-l-2 border-l-transparent px-3.5 py-3 transition-colors hover:border-l-white"
              >
                <span className="sk-name text-[13px] font-semibold text-[#bdbdbd] transition-colors">
                  {name}
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#222]">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative overflow-hidden border-b border-[#111] px-10 py-16">
        <div className="pointer-events-none absolute inset-x-0 top-8 hidden text-center md:block">
          <span className="font-syne text-[clamp(10rem,26vw,34rem)] leading-none tracking-[-0.07em] text-[#111111] opacity-80">
            P
          </span>
        </div>

        <div className="relative z-10">
          <p className={eyeClass}>Projects</p>

          <h2 className={H2Class}>Things I've Built</h2>

          <div className="grid gap-px bg-[#161616]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))" }}>
            {projects.map((p, i) => (
              <div
                key={p.id}
                onClick={() => openProject(p.url)}
                className={`pj-card relative flex min-h-52.5 cursor-pointer flex-col gap-2.5 border p-7 transition-colors duration-200 ${
                  p.isPlaceholder ? "border-dashed border-[#1b1b1b] bg-[#0a0a0a]" : "border-[#0f0f0f] bg-black"
                } hover:bg-[#0d0d0d]`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] text-[#1e1e1e]">{String(i + 1).padStart(2, "0")}</span>
                  {p.url && <ExternalLink size={12} className="pj-icon stroke-[#2a2a2a] transition-colors duration-200 hover:stroke-[#666]" />}
                </div>

                <h3 className="pj-title font-syne text-[15px] font-bold text-[#e6e6e6] transition-colors duration-200 hover:text-white">
                  {p.title}
                </h3>

                <p className="flex-1 text-[12px] leading-7 text-[#b8b8b8]">{p.desc}</p>

                <div className="flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span key={`${p.id}-${t}`} className="font-mono border border-[#181818] px-1.5 py-0.5 text-[9px] tracking-[0.04em] text-[#2d2d2d]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-10 py-16">
        <p className={eyeClass}>Contact</p>

        <h2 className={H2Class}>Let's Connect</h2>

        <p className="mb-8 max-w-[360px] text-[15px] leading-7 text-[#c8c8c8]">
          If you want to collaborate, send your details below and I’ll get
          back to you.
        </p>

        <form onSubmit={handleCollabSubmit} className="mb-9 grid max-w-[520px] gap-2.5">
          <input
            type="email"
            value={newsletterEmail}
            onChange={(event) => setNewsletterEmail(event.target.value)}
            placeholder="Your email address"
            className="border border-[#2b2b2b] bg-[#111] px-3.5 py-3 text-sm text-[#f5f5f5] placeholder:text-[#6d6d6d] outline-none transition focus:border-white"
          />

          <textarea
            value={newsletterMessage}
            onChange={(event) => setNewsletterMessage(event.target.value)}
            placeholder="Tell me about your project or collaboration idea"
            rows={4}
            className="resize-y border border-[#2b2b2b] bg-[#111] px-3.5 py-3 text-sm text-[#f5f5f5] placeholder:text-[#6d6d6d] outline-none transition focus:border-white"
          />

          <button
            type="submit"
            className="font-mono w-fit border border-[#f5f5f5] bg-[#f5f5f5] px-4.5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#111] transition hover:bg-white hover:text-black"
          >
            Send Request
          </button>
        </form>

        {newsletterStatus && (
          <p className={`mb-7 font-mono text-[10px] ${newsletterStatus.includes("Please") ? "text-[#ffb3b3]" : "text-[#d6d6d6]"}`}>
            {newsletterStatus}
          </p>
        )}

        <div className="flex max-w-[440px] flex-col gap-px bg-[#141414]">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="soc-row group flex items-center justify-between border-l-2 border-transparent bg-black px-5 py-5 transition-colors hover:border-l-white hover:bg-[#111]"
            >
              <div className="flex items-center gap-3.5">
                <s.Icon size={16} className="stroke-[#444] transition-colors duration-200 group-hover:stroke-white" />

                <div>
                  <p className="soc-label font-syne m-0 text-[13px] font-bold text-[#e7e7e7] transition-colors duration-200">
                    {s.label}
                  </p>

                  <p className="font-mono mt-0.5 text-[10px] text-[#b0b0b0]">{s.handle}</p>
                </div>
              </div>

              <ExternalLink size={11} className="stroke-[#2a2a2a]" />
            </a>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-2 border-t border-[#0d0d0d] pt-5">
          <span className="font-mono text-[10px] text-[#222]">© 2026 Ziggy — Built with React</span>
          <span className="font-mono text-[10px] text-[#b6b6b6]">Plateau State, Jos 🇳🇬</span>
        </div>
      </section>
    </div>
  );
}
