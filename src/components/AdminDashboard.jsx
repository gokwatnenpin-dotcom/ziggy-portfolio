import { ExternalLink, Plus, Trash2 } from "lucide-react";

export function AdminDashboard({
  socialLinks,
  projects,
  showForm,
  setShowForm,
  projectForm,
  handleProjectChange,
  handleAddProject,
  handleDeleteProject,
  handleSocialLinkChange,
  openProject,
  handleAdminBack,
}) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] px-5 py-20 text-white">
      <div className="mx-auto max-w-275">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7a7a7]">
              Admin dashboard
            </p>
            <h2 className="font-syne mt-2 text-3xl text-white">ziggy.dev</h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="https://wa.me/2348026977877?text=Hello%20Ziggy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono inline-flex items-center justify-center bg-[#25D366] px-3.5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-[#08150d]"
            >
              WhatsApp
            </a>

            <button
              type="button"
              onClick={handleAdminBack}
              className="font-mono border border-[#2a2a2a] bg-transparent px-3.5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-[#d0d0d0] hover:border-white hover:text-white"
            >
              Back to portfolio
            </button>
          </div>
        </div>

        <section className="py-6">
          <div className="mb-8 border border-[#1a1a1a] bg-[#0d0d0d] p-4.5">
            <p className="font-mono mb-4 text-[10px] uppercase tracking-[0.18em] text-[#a7a7a7]">
              Update socials
            </p>

            <div className="grid gap-3.5">
              {socialLinks.map((social, index) => (
                <div key={social.label} className="grid gap-2 border border-[#1b1b1b] bg-[#0a0a0a] p-3">
                  <label className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#8e8e8e]">
                    {social.label}
                  </label>

                  <input
                    value={social.handle}
                    onChange={(event) => handleSocialLinkChange(index, "handle", event.target.value)}
                    placeholder="Handle text"
                    className="border border-[#2b2b2b] bg-[#111] px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#7a7a7a]"
                  />

                  <input
                    value={social.url}
                    onChange={(event) => handleSocialLinkChange(index, "url", event.target.value)}
                    placeholder="https://example.com"
                    className="border border-[#2b2b2b] bg-[#111] px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#7a7a7a]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => setShowForm((value) => !value)}
              className="font-mono inline-flex items-center gap-2 border border-[#2a2a2a] bg-[#111] px-3.5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-[#f5f5f5] hover:border-white"
            >
              <Plus size={12} />
              Add project
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAddProject} className="mb-5 grid gap-3 border border-[#1a1a1a] bg-[#0c0c0c] p-4.5">
              <input
                name="title"
                value={projectForm.title}
                onChange={handleProjectChange}
                placeholder="Project title"
                className="border border-[#2b2b2b] bg-[#111] px-3.5 py-3 text-sm text-white outline-none placeholder:text-[#7a7a7a]"
              />

              <textarea
                name="desc"
                value={projectForm.desc}
                onChange={handleProjectChange}
                placeholder="Short project description"
                rows={3}
                className="resize-y border border-[#2b2b2b] bg-[#111] px-3.5 py-3 text-sm text-white outline-none placeholder:text-[#7a7a7a]"
              />

              <input
                name="tags"
                value={projectForm.tags}
                onChange={handleProjectChange}
                placeholder="Tags, separated by commas"
                className="border border-[#2b2b2b] bg-[#111] px-3.5 py-3 text-sm text-white outline-none placeholder:text-[#7a7a7a]"
              />

              <input
                name="url"
                value={projectForm.url}
                onChange={handleProjectChange}
                placeholder="Project URL (optional)"
                className="border border-[#2b2b2b] bg-[#111] px-3.5 py-3 text-sm text-white outline-none placeholder:text-[#7a7a7a]"
              />

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="submit"
                  className="font-mono border border-[#f5f5f5] bg-[#f5f5f5] px-3.5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-[#111]"
                >
                  Save project
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="font-mono border border-[#2a2a2a] bg-transparent px-3.5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-[#d0d0d0]"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-px bg-[#161616]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))" }}>
            {projects.map((p, i) => (
              <div
                key={p.id}
                onClick={() => openProject(p.url)}
                className={`relative flex min-h-52.5 cursor-pointer flex-col gap-2.5 border p-7 transition-colors duration-200 ${
                  p.isPlaceholder ? "border-dashed border-[#1b1b1b] bg-[#0a0a0a]" : "border-[#0f0f0f] bg-black"
                } hover:bg-[#0d0d0d]`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] text-[#1e1e1e]">{String(i + 1).padStart(2, "0")}</span>

                  <div className="flex items-center gap-2">
                    {p.url && <ExternalLink size={12} className="stroke-[#2a2a2a] transition-colors hover:stroke-[#666]" />}

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteProject(p.id);
                      }}
                      aria-label={`Delete ${p.title}`}
                      className="inline-flex h-5.5 w-5.5 items-center justify-center border border-[#2a2a2a] bg-transparent p-0 text-[#b0b0b0]"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                <h3 className="font-syne text-[15px] font-bold text-[#e6e6e6] transition-colors hover:text-white">
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
        </section>
      </div>
    </div>
  );
}
