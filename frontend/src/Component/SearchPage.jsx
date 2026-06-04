import { useState, useRef } from "react";
import { Search, ArrowRight, X, GitBranch, BarChart2, Clock } from "lucide-react";
import GradientButton from "./ui/GradientButton";

export default function SearchPage({ onSearch, recents, onRemoveRecent }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: "#FAFAFA" }}>

      {/* Subtle dot-grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #D8DCE2 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      />

      {/* Blue glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(9,105,218,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Navbar */}
      <nav
        className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-[#EBEBEB]"
        style={{ background: "rgba(250,250,250,0.85)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0969DA, #8250DF)" }}
          >
            <span className="font-mono font-bold text-white text-[10px]">{"{ }"}</span>
          </div>
          <span className="font-bold text-[15px] text-[#262626] tracking-tight">RepoExplorer</span>
        </div>
        <span className="text-[12px] text-[#AAAAAA] hidden sm:block">
          Powered by GitHub API
        </span>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-[580px] flex flex-col items-center gap-8">

          {/* Feature badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#0969DA]"
            style={{
              background: "linear-gradient(135deg, rgba(9,105,218,0.08), rgba(130,80,223,0.08))",
              border: "1px solid rgba(9,105,218,0.2)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #0969DA, #8250DF)" }}
            />
            Explore GitHub Profiles
          </div>

          {/* Headline */}
          <div className="text-center flex flex-col gap-1">
            <h1 className="text-[clamp(32px,6vw,52px)] font-bold text-[#262626] leading-[1.15] tracking-tight">
              Discover any GitHub
            </h1>
            <h1
              className="text-[clamp(32px,6vw,52px)] font-bold leading-[1.15] tracking-tight"
              style={{
                background: "linear-gradient(135deg, #0969DA 0%, #8250DF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Developer's Universe
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-center text-[#737373] text-[15px] leading-relaxed max-w-[420px]">
            Search any GitHub profile, browse repositories in a beautiful grid,
            and explore open-source contributions at a glance.
          </p>

          {/* Search form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white transition-all duration-200"
              style={{
                border: `1.5px solid ${focused ? "#0969DA" : "#DBDBDB"}`,
                boxShadow: focused
                  ? "0 0 0 4px rgba(9,105,218,0.1), 0 4px 20px rgba(0,0,0,0.08)"
                  : "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <Search size={18} className="text-[#AAAAAA] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter a GitHub username..."
                className="flex-1 bg-transparent outline-none text-[15px] text-[#262626] placeholder:text-[#BBBBBB]"
              />
              <GradientButton type="submit" className="shrink-0 px-5 py-2 text-[13px]">
                Search
                <ArrowRight size={14} />
              </GradientButton>
            </div>
          </form>

          {/* Recent searches */}
          {recents.length > 0 && (
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-widest">
                  Recent searches
                </span>
                <button
                  onClick={() => recents.forEach((u) => onRemoveRecent(u))}
                  className="text-[11px] font-semibold text-[#0969DA] hover:text-[#8250DF] cursor-pointer bg-transparent border-none transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div
                className="bg-white rounded-2xl overflow-hidden"
                style={{ border: "1px solid #EBEBEB", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
              >
                {recents.map((u) => (
                  <RecentItem
                    key={u}
                    username={u}
                    onClick={() => onSearch(u)}
                    onRemove={() => onRemoveRecent(u)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Feature highlights */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            {FEATURES.map(({ icon, title, desc }) => (
              <FeatureCard key={title} icon={icon} title={title} desc={desc} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-[#EBEBEB] py-4 flex items-center justify-center gap-2">
        <GitBranch size={12} className="text-[#CCCCCC]" />
        <span className="text-[11px] text-[#CCCCCC]">
          RepoExplorer · Built with React + GitHub API
        </span>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: <GitBranch size={16} />,
    title: "Repository Grid",
    desc: "Browse repos in a clean Instagram-style grid layout",
  },
  {
    icon: <BarChart2 size={16} />,
    title: "Profile Stats",
    desc: "Followers, following, and public repo counts at a glance",
  },
  {
    icon: <Clock size={16} />,
    title: "Search History",
    desc: "Quick access to recently searched profiles",
  },
];

function FeatureCard({ icon, title, desc }) {
  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-xl bg-white"
      style={{ border: "1px solid #EBEBEB", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0969DA]"
        style={{ background: "rgba(9,105,218,0.08)" }}
      >
        {icon}
      </div>
      <p className="text-[13px] font-semibold text-[#262626]">{title}</p>
      <p className="text-[12px] text-[#737373] leading-relaxed">{desc}</p>
    </div>
  );
}

function RecentItem({ username, onClick, onRemove }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors border-b border-[#F5F5F5] last:border-0 cursor-pointer">
      <img
        src={`https://github.com/${username}.png?size=80`}
        alt={username}
        className="w-9 h-9 rounded-full object-cover"
        onClick={onClick}
      />
      <div className="flex-1" onClick={onClick}>
        <p className="text-[13px] font-medium text-[#262626]">{username}</p>
        <p className="text-[11px] text-[#AAAAAA]">github.com/{username}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="text-[#CCCCCC] hover:text-[#737373] transition-colors bg-transparent border-none cursor-pointer p-1 rounded-full hover:bg-[#F0F0F0]"
      >
        <X size={13} />
      </button>
    </div>
  );
}
