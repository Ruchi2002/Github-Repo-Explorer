import { useState, useCallback } from "react";
import SearchPage from "./Component/SearchPage";
import ProfilePage from "./Component/ProfilePage";
import SkeletonLoader from "./Component/SkeletonLoader";
import ErrorState from "./Component/ErrorState";
import { useRecentSearches } from "./hooks/useRecentSearches";
import { getUser, getRepos } from "./utils/api";

export default function App() {
  const [view, setView] = useState({ screen: "search" });
  const [activeUsername, setActiveUsername] = useState("");
  const { recents, add: addRecent, remove: removeRecent } = useRecentSearches();

  const handleSearch = useCallback(
    async (username) => {
      const trimmed = username.trim();
      if (!trimmed) return;

      setActiveUsername(trimmed);
      setView({ screen: "loading" });

      const [userRes, reposRes] = await Promise.all([
        getUser(trimmed),
        getRepos(trimmed, 1),
      ]);

      if (userRes.error === "not_found") {
        setView({ screen: "error", type: "not_found" });
        return;
      }
      if (userRes.error === "rate_limited") {
        setView({ screen: "error", type: "rate_limited", rateLimitReset: userRes.rateLimitReset });
        return;
      }
      if (userRes.error || !userRes.user) {
        setView({ screen: "error", type: "generic" });
        return;
      }
      if (reposRes.error) {
        setView({ screen: "error", type: reposRes.error });
        return;
      }

      addRecent(trimmed);
      setView({
        screen: "profile",
        user: userRes.user,
        repos: reposRes.repos ?? [],
        page: 1,
        loadingMore: false,
      });
    },
    [addRecent]
  );

  const handleLoadMore = useCallback(async () => {
    if (view.screen !== "profile") return;

    setView((prev) =>
      prev.screen === "profile" ? { ...prev, loadingMore: true } : prev
    );

    const nextPage = view.page + 1;
    const result = await getRepos(activeUsername, nextPage);

    setView((prev) => {
      if (prev.screen !== "profile") return prev;
      if (!result.repos) return { ...prev, loadingMore: false };
      return {
        ...prev,
        repos: [...prev.repos, ...result.repos],
        page: nextPage,
        loadingMore: false,
      };
    });
  }, [view, activeUsername]);

  const handleBack = useCallback(() => {
    setView({ screen: "search" });
  }, []);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        body { background: #F6F8FA; }
      `}</style>

      {view.screen === "search" && (
        <SearchPage
          onSearch={handleSearch}
          recents={recents}
          onRemoveRecent={removeRecent}
        />
      )}
      {view.screen === "loading" && <SkeletonLoader />}
      {view.screen === "profile" && (
        <ProfilePage
          user={view.user}
          repos={view.repos}
          onBack={handleBack}
          onLoadMore={handleLoadMore}
          loadingMore={view.loadingMore}
        />
      )}
      {view.screen === "error" && (
        <ErrorState
          type={view.type}
          onBack={handleBack}
          rateLimitReset={view.rateLimitReset}
        />
      )}
    </>
  );
}