import { useState, useCallback } from "react";

const STORAGE_KEY = "repoexplorer_recent";
const MAX_RECENT = 8;

export function useRecentSearches() {
  const [recents, setRecents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const add = useCallback((username) => {
    setRecents((prev) => {
      const filtered = prev.filter(
        (u) => u.toLowerCase() !== username.toLowerCase()
      );
      const updated = [username, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const remove = useCallback((username) => {
    setRecents((prev) => {
      const updated = prev.filter(
        (u) => u.toLowerCase() !== username.toLowerCase()
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  return { recents, add, remove };
}