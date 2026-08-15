export function AdminLogin({
  password,
  setPassword,
  loginError,
  handleAdminLogin,
  handleAdminBack,
}) {
  return (
    <div className="grid min-h-screen place-items-center bg-[#0b0b0b] p-5 text-white">
      <div className="w-full max-w-[440px] border border-[#1d1d1d] bg-[#0d0d0d] p-7">
        <p className="font-mono mb-3 text-[10px] uppercase tracking-[0.18em] text-[#a7a7a7]">
          Admin access
        </p>

        <h2 className="font-syne mb-5 text-3xl text-white">ziggy.dev</h2>

        <form onSubmit={handleAdminLogin} className="grid gap-3.5">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="border border-[#2b2b2b] bg-[#111] px-3.5 py-3 text-sm text-white outline-none placeholder:text-[#7a7a7a] focus:border-white"
          />

          {loginError && (
            <p className="font-mono text-[10px] text-[#ff8c8c]">{loginError}</p>
          )}

          <div className="flex flex-wrap gap-2.5">
            <button
              type="submit"
              className="font-mono border border-[#f5f5f5] bg-[#f5f5f5] px-3.5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-[#111] transition hover:bg-white"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleAdminBack}
              className="font-mono border border-[#2a2a2a] bg-transparent px-3.5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-[#d0d0d0] transition hover:border-white hover:text-white"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
