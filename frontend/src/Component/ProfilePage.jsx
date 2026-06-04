import { useState, useMemo } from "react";
import { ArrowLeft, MapPin, Link2, ExternalLink, Search, Grid3X3 } from "lucide-react";
import { formatCount, memberSince } from "../utils/helpers";
import RepoCard from "./RepoCard";
import Navbar, { Brand } from "./ui/Navbar";

const SORT_OPTIONS = [
  { key: "stars", label: "Stars" },
  { key: "name", label: "A–Z" },
  { key: "updated", label: "Recent" },
];

export default function ProfilePage({ user, repos, onBack, onLoadMore, loadingMore }) {
  const [sortBy, setSortBy] = useState("stars");
  const [filter, setFilter] = useState("");

  const sortedRepos = useMemo(() => {
    let list = repos.filter((r) => {
      if (!filter) return true;
      const q = filter.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q)
      );
    });
    if (sortBy === "stars") return [...list].sort((a, b) => b.stars - a.stars);
    if (sortBy === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return [...list].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }, [repos, sortBy, filter]);

  const hasMore = repos.length < user.public_repos;

  return (
    <div className="min-h-screen font-sans pb-16" style={{ background: "#FAFAFA" }}>

      {/* Sticky navbar — back arrow + login on left, brand on right */}
      <Navbar
        sticky
        left={
          <>
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-[#262626] hover:text-[#0969DA] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              <ArrowLeft size={20} />
            </button>
            <span className="font-semibold text-[16px] text-[#262626] tracking-tight">
              {user.login}
            </span>
          </>
        }
        right={<Brand />}
      />

      <div className="max-w-[935px] mx-auto px-4 sm:px-8">

        {/* ── Profile header (Instagram layout) ── */}
        <section className="py-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-16 border-b border-[#DBDBDB]">

          {/* Avatar with gradient ring */}
          <div className="shrink-0">
            <div
              className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-full p-[3px]"
              style={{ background: "linear-gradient(135deg, #0969DA, #5851DB, #8250DF)" }}
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-full h-full rounded-full object-cover border-[3px] border-white"
              />
            </div>
          </div>

          {/* Info column */}
          <div className="flex flex-col gap-5 text-center sm:text-left flex-1">

            {/* Handle + external link */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4">
              <h1 className="text-[20px] font-light text-[#262626] tracking-tight">
                {user.login}
              </h1>
              <a
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[12px] font-medium text-[#737373] hover:text-[#0969DA] transition-colors px-3 py-1 rounded-lg border border-[#DBDBDB] hover:border-[#0969DA]"
              >
                <ExternalLink size={12} />
                View on GitHub
              </a>
            </div>

            {/* Stats row — Instagram style */}
            <div className="flex justify-center sm:justify-start gap-6 sm:gap-10">
              <ProfileStat value={formatCount(user.public_repos)} label="repositories" />
              <ProfileStat value={formatCount(user.followers)} label="followers" />
              <ProfileStat value={formatCount(user.following)} label="following" />
            </div>

            {/* Bio block */}
            <div className="flex flex-col gap-1.5">
              {user.name && (
                <p className="font-semibold text-[14px] text-[#262626]">{user.name}</p>
              )}
              {user.bio && (
                <p className="text-[14px] text-[#262626] leading-relaxed">{user.bio}</p>
              )}
              {user.location && (
                <p className="flex items-center justify-center sm:justify-start gap-1.5 text-[13px] text-[#737373]">
                  <MapPin size={13} />
                  {user.location}
                </p>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-1.5 text-[13px] text-[#0969DA] hover:underline"
                >
                  <Link2 size={13} />
                  {user.blog.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              )}
              <p className="text-[12px] text-[#AAAAAA]">
                Member since {memberSince(user.created_at)}
              </p>
            </div>
          </div>
        </section>

        {/* ── Repositories tab (Instagram tab bar style) ── */}
        <div className="flex justify-center sm:justify-start border-b border-[#DBDBDB]">
          <div
            className="flex items-center gap-2 px-6 py-3 border-t-[2px] text-[11px] font-semibold tracking-[1.5px] uppercase text-[#262626]"
            style={{ borderTopColor: "#262626" }}
          >
            <Grid3X3 size={13} />
            Repositories
            <span
              className="ml-0.5 text-[10px] font-bold text-white px-2 py-0.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #0969DA, #8250DF)" }}
            >
              {user.public_repos}
            </span>
          </div>
        </div>

        {/* ── Toolbar: filter input + sort buttons ── */}
        <div className="py-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white flex-1 transition-all duration-200"
            style={{ border: "1px solid #DBDBDB" }}
          >
            <Search size={14} className="text-[#AAAAAA] shrink-0" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter repositories..."
              className="flex-1 outline-none bg-transparent text-[13px] text-[#262626] placeholder:text-[#AAAAAA]"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {SORT_OPTIONS.map(({ key, label }) => {
              const active = sortBy === key;
              return (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className="px-3.5 py-2 rounded-xl text-[12px] font-medium transition-all duration-150 cursor-pointer border whitespace-nowrap"
                  style={{
                    background: active
                      ? "linear-gradient(135deg, #0969DA, #8250DF)"
                      : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#737373",
                    borderColor: active ? "transparent" : "#DBDBDB",
                    boxShadow: active ? "0 2px 8px rgba(9,105,218,0.2)" : "none",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Repo grid ── */}
        {sortedRepos.length === 0 ? (
          <EmptyRepos />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
            {sortedRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}

        {/* ── Load more ── */}
        {hasMore && (
          <div className="flex flex-col items-center gap-3 py-8 border-t border-[#EFEFEF]">
            <p className="text-[12px] text-[#AAAAAA]">
              Showing {repos.length} of {user.public_repos} repositories
            </p>
            <button
              onClick={onLoadMore}
              disabled={loadingMore}
              className="px-8 py-2.5 rounded-xl text-[13px] font-semibold border border-[#DBDBDB] text-[#262626] hover:bg-white hover:border-[#0969DA] hover:text-[#0969DA] transition-all duration-200 cursor-pointer disabled:opacity-50 bg-transparent"
            >
              {loadingMore ? "Loading..." : "Load more repositories"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileStat({ value, label }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5 text-center sm:text-left">
      <span className="font-bold text-[16px] text-[#262626]">{value}</span>
      <span className="text-[14px] text-[#262626]">{label}</span>
    </div>
  );
}

function EmptyRepos() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "#EFEFEF" }}
      >
        <Grid3X3 size={28} className="text-[#AAAAAA]" />
      </div>
      <p className="text-[16px] font-semibold text-[#262626]">No public repositories</p>
      <p className="text-[13px] text-[#737373]">
        This developer hasn't pushed anything public yet.
      </p>
    </div>
  );
}
