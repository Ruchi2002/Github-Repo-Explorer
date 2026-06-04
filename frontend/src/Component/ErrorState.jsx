import { useState, useEffect } from "react";
import GradientButton from "./ui/GradientButton";

export default function ErrorState({ type, onBack, rateLimitReset }) {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (type !== "rate_limited") return;
    if (rateLimitReset) {
      const calc = () =>
        Math.max(0, Math.ceil((rateLimitReset * 1000 - Date.now()) / 1000));
      setCountdown(calc());
      const t = setInterval(() => setCountdown(calc()), 1000);
      return () => clearInterval(t);
    } else {
      setCountdown(60);
      const t = setInterval(
        () => setCountdown((c) => Math.max(0, c - 1)),
        1000
      );
      return () => clearInterval(t);
    }
  }, [type, rateLimitReset]);

  const messages = {
    not_found: {
      icon: <GhostIllustration />,
      title: "User not found",
      desc: "We couldn't find a GitHub user with that username. Double-check the spelling and try again.",
    },
    rate_limited: {
      icon: <RateLimitIllustration />,
      title: "Slow down a bit",
      desc: "GitHub API rate limit reached. Please wait a moment before searching again.",
    },
    generic: {
      icon: <RateLimitIllustration />,
      title: "Something went wrong",
      desc: "An unexpected error occurred while fetching data. Please try again.",
    },
  };

  const { icon, title, desc } = messages[type] ?? messages.generic;

  return (
    <div
      className="min-h-screen font-sans flex flex-col items-center justify-center px-4"
      style={{ background: "#FAFAFA" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-[400px] bg-white rounded-2xl p-8 flex flex-col items-center gap-6 text-center"
        style={{ border: "1px solid #DBDBDB", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
      >
        {icon}

        <div className="flex flex-col gap-2">
          <h2 className="text-[18px] font-bold text-[#262626]">{title}</h2>
          <p className="text-[13px] text-[#737373] leading-relaxed">{desc}</p>
        </div>

        {type === "rate_limited" && (
          <CountdownRing seconds={countdown} max={60} />
        )}

        <GradientButton onClick={onBack} className="w-full py-3 text-[14px]">
          Try Again
        </GradientButton>
      </div>

      {/* Brand mark */}
      <p className="mt-6 text-[11px] text-[#AAAAAA]">RepoExplorer · Powered by GitHub API</p>
    </div>
  );
}

function GhostIllustration() {
  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #EAF2FF, #F0EAFF)" }}
    >
      <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
        <path
          d="M22 36 Q22 80 22 85 Q29 78 36 85 Q43 78 50 85 Q57 78 64 85 Q71 78 78 85 Q78 80 78 36 Q78 8 50 8 Q22 8 22 36Z"
          fill="#D0D7DE"
        />
        <ellipse cx="40" cy="36" rx="5" ry="6" fill="#9198A1" />
        <ellipse cx="60" cy="36" rx="5" ry="6" fill="#9198A1" />
        <ellipse cx="40" cy="37" rx="2.5" ry="3" fill="#fff" />
        <ellipse cx="60" cy="37" rx="2.5" ry="3" fill="#fff" />
        <path d="M42 50 Q46 54 50 50 Q54 54 58 50" stroke="#9198A1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function RateLimitIllustration() {
  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #FFF3E0, #FFEBEE)" }}
    >
      <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
        <polygon
          points="40,10 70,65 10,65"
          fill="#FFF3CD"
          stroke="#E6A817"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <rect x="37" y="28" width="6" height="20" rx="3" fill="#E6A817" />
        <circle cx="40" cy="55" r="3.5" fill="#E6A817" />
      </svg>
    </div>
  );
}

function CountdownRing({ seconds, max }) {
  const r = 26;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - (max > 0 ? seconds / max : 0));

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#EFEFEF" strokeWidth="4" />
          <circle
            cx="36" cy="36" r={r}
            fill="none"
            stroke="#E6A817"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 36 36)"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-mono text-[16px] font-bold text-[#262626]">{seconds}s</span>
        </div>
      </div>
      <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest">wait</p>
    </div>
  );
}
