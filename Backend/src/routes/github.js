import express from "express";
import {
  fetchGitHubUser,
  fetchGitHubRepos,
} from "../services/githubService.js";
import { getCache, setCache } from "../cache/inMemoryCache.js";

const router = express.Router();

// GET /api/user/:username
router.get("/user/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const cacheKey = `user:${username}`;
    const cached = getCache(cacheKey);
    if (cached) return res.json({ ...cached, fromCache: true });

    const { status, data } = await fetchGitHubUser(username);

    if (status === 404)
      return res.status(404).json({ error: "User not found" });
    if (status === 403 || status === 429) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        rateLimitReset: data.message,
      });
    }
    if (status !== 200)
      return res.status(status).json({ error: "GitHub API error" });

    setCache(cacheKey, data);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/user/:username/repos?page=1
router.get("/user/:username/repos", async (req, res, next) => {
  try {
    const { username } = req.params;
    const page = parseInt(req.query.page) || 1;

    const cacheKey = `repos:${username}:page${page}`;
    const cached = getCache(cacheKey);

    if (cached) {
      return res.json({ repos: cached, fromCache: true });
    }

    const { status, data } = await fetchGitHubRepos(username, page);

    if (status === 403 || status === 429) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }

    if (status !== 200) {
      return res.status(status).json({ error: "GitHub API error" });
    }

    const repos = data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || null,
      html_url: repo.html_url,
      updated_at: repo.updated_at,
      clone_url: repo.clone_url,
      default_branch: repo.default_branch,
      open_issues_count: repo.open_issues_count,
      license: repo.license,
      fork: repo.fork,
    }));

    setCache(cacheKey, repos);

    res.json({ repos });
  } catch (err) {
    next(err);
  }
});

export default router;
