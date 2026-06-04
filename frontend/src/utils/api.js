const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export async function getUser(username) {
  try {
    const res = await fetch(`${API_BASE}/user/${username}`);
    if (res.status === 404) return { error: "not_found" };
    if (res.status === 429) {
      const body = await res.json().catch(() => ({}));
      return { error: "rate_limited", rateLimitReset: body.rateLimitReset };
    }
    if (!res.ok) return { error: "generic" };
    const user = await res.json();
    return { user };
  } catch {
    return { error: "generic" };
  }
}

export async function getRepos(username, page) {
  try {
    const res = await fetch(`${API_BASE}/user/${username}/repos?page=${page}`);
    if (res.status === 429) return { error: "rate_limited" };
    if (!res.ok) return { error: "generic" };
    const body = await res.json();
    return { repos: body.repos };
  } catch {
    return { error: "generic" };
  }
}