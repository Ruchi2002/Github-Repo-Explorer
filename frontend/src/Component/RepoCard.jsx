import { useState } from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { formatCount, getLangColor } from "../utils/helpers";

export default function RepoCard({ repo }) {
  const [hovered, setHovered] = useState(false);
  const langColor = getLangColor(repo.language);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-200 cursor-pointer"
      style={{
        border: `1px solid ${hovered ? "#C8D1DA" : "#EFEFEF"}`,
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.1)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div className="flex-1 flex flex-col p-4 gap-2">
        {/* Name + fork badge */}
        <div className="flex items-start justify-between gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold text-[14px] text-[#262626] hover:text-[#0969DA] transition-colors leading-tight min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="truncate">{repo.name}</span>
            <ExternalLink
              size={11}
              className="shrink-0 transition-opacity text-[#0969DA]"
              style={{ opacity: hovered ? 1 : 0 }}
            />
          </a>
          {repo.fork && (
            <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#FFF8E1] text-[#8A6900] border border-[#FFE082]">
              fork
            </span>
          )}
        </div>

        {/* Description */}
        {repo.description ? (
          <p className="text-[12px] text-[#737373] leading-relaxed line-clamp-2 flex-1">
            {repo.description}
          </p>
        ) : (
          <p className="text-[12px] text-[#C0C0C0] italic flex-1">No description</p>
        )}

        {/* Stats footer */}
        <div className="flex items-center gap-3 pt-2.5 mt-auto border-t border-[#F5F5F5]">
          {repo.language && (
            <span className="flex items-center gap-1 text-[11px] text-[#737373] min-w-0 flex-1">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: langColor }}
              />
              <span className="truncate">{repo.language}</span>
            </span>
          )}
          <span className="flex items-center gap-1 text-[11px] text-[#737373] ml-auto font-mono">
            <Star size={11} />
            {formatCount(repo.stars)}
          </span>
          {repo.forks > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-[#737373] font-mono">
              <GitFork size={11} />
              {formatCount(repo.forks)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
