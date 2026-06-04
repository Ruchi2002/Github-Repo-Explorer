export function Brand() {
  return (
    <div className="flex items-center gap-2">
      <span
        className="font-mono font-bold text-lg"
        style={{
          background: "linear-gradient(135deg, #0969DA, #8250DF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {"{ }"}
      </span>
      <span className="font-mono font-bold text-[#1F2328] text-base">RepoExplorer</span>
    </div>
  );
}

export default function Navbar({ left, right, sticky = false, className = "" }) {
  return (
    <nav
      className={`${sticky ? "sticky top-0 z-20" : "relative z-10"} flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#D0D7DE] ${className}`}
      style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center gap-3">{left}</div>
      {right && <div className="flex items-center gap-3">{right}</div>}
    </nav>
  );
}
