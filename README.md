# GitHub Repo Explorer

GitHub Repo Explorer is a full-stack web application that lets you search any GitHub username and instantly view their public profile and repositories. Enter a username to see the user's avatar, bio, location, website, follower and repository counts, then browse their repos in a responsive grid with real-time filtering by name or description, sorting by stars, alphabetical order, or last update date, and load-more pagination — all backed by a Node.js proxy server that caches GitHub API responses to reduce latency and avoid rate-limit exhaustion.

---

## Live Demo

| | URL |
|---|---|
| Frontend | https://github-repo-explorer-ruchi.vercel.app/ |
| Backend API | https://github-repo-explorer-zxqj.onrender.com/ |
| GitHub Repo | https://github.com/Ruchi2002/Github-Repo-Explorer |

---

## Features

- Search any GitHub username with client-side input validation
- Recent searches list — last 8 searches, persisted via `localStorage`, individually removable or clear-all
- User profile card: avatar, display name, bio, location, website link, member-since year, and formatted counts for public repos, followers, and following
- Repository grid — responsive 1 / 2 / 3 column layout, 12 repos per page
- Sort repositories by stars (descending), name (A→Z), or last updated date
- Filter repositories by typing a keyword that matches name or description (case-insensitive)
- Load-more pagination with a live counter showing loaded vs total public repos
- Language badges with color coding for 18+ languages
- Rate-limit error screen with a live countdown timer until the GitHub API quota resets
- Shimmer skeleton loading state while the profile and repo data fetch
- Server-side in-memory cache with a 60-second TTL — repeated requests for the same username/page are served instantly without hitting the GitHub API

---

## Tech Stack

| Layer | Library / Tool | Purpose |
|---|---|---|
| Frontend | React 19 | UI component framework |
| Frontend | Vite 8 | Dev server and production build |
| Frontend | Tailwind CSS 4 | Utility-first styling |
| Frontend | lucide-react | Icon set |
| Backend | Express 5 | HTTP server framework |
| Backend | cors | Cross-origin request middleware |
| Backend | dotenv | Environment variable loading |
| Backend | nodemon | Dev-mode auto-restart |

---
 ## Architecture



User
 →
React Application
 →
Express Backend API
 →
GitHub REST API

The frontend never communicates directly with GitHub.

Benefits:

GitHub token remains secure
Server-side caching reduces API calls
Centralized error handling
Better rate-limit management

## Project Structure

```
Github-Repo-Explorer/
├── frontend/                           # React + Vite client
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx                    # React DOM entry point
│       ├── App.jsx                     # Root state: search, profile, loading, errors
│       ├── App.css
│       ├── Component/
│       │   ├── SearchPage.jsx          # Landing page — search bar and recent searches
│       │   ├── ProfilePage.jsx         # Profile card + repo grid with sort/filter/paginate
│       │   ├── RepoCard.jsx            # Single repository card (name, language, stars, forks)
│       │   ├── SkeletonLoader.jsx      # Shimmer skeleton shown while data loads
│       │   ├── ErrorState.jsx          # Error UI for 404, 429 (with countdown), and generic errors
│       │   └── ui/
│       │       ├── Navbar.jsx          # Sticky navigation bar
│       │       ├── GradientButton.jsx  # Blue-to-purple gradient button
│       │       ├── Card.jsx            # Reusable white card container
│       │       └── Shimmer.jsx         # Animated shimmer effect primitive
│       ├── hooks/
│       │   └── useRecentSearches.js    # localStorage-backed recent searches (max 8)
│       └── utils/
│           ├── api.js                  # getUser / getRepos fetch calls to the backend
│           └── helpers.js              # formatCount (k notation), timeAgo, memberSince, language colors
│
└── Backend/                            # Express proxy + cache server
    ├── package.json
    └── src/
        ├── index.js                    # Server bootstrap: CORS, JSON middleware, route mounting, /health
        ├── routes/
        │   └── github.js               # Route handlers for /api/user/:username and /api/user/:username/repos
        ├── services/
        │   └── githubService.js        # fetch() calls to api.github.com with Bearer token auth
        ├── cache/
        │   └── inMemoryCache.js        # Map-based TTL cache (60 s), get/set helpers
        └── middleware/
            └── errorHandler.js         # Global Express error handler — 500 + stack trace to console
```

---

## API Documentation

Base URL (production): `https://github-repo-explorer-zxqj.onrender.com`

### GET /health

Health check. Returns immediately with no external calls.

**Response 200**
```json
{ "status": "ok" }
```

---

### GET /api/user/:username

Fetches a GitHub user's public profile. Cached per username for 60 seconds.

**Path parameter**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `username` | string | Yes | GitHub username |

**Response 200**
```json
{
  "login": "torvalds",
  "id": 1024025,
  "avatar_url": "https://avatars.githubusercontent.com/u/1024025?v=4",
  "type": "User",
  "name": "Linus Torvalds",
  "company": "Linux Foundation",
  "blog": "https://www.kernel.org",
  "location": "Portland, OR",
  "email": null,
  "bio": null,
  "twitter_username": null,
  "public_repos": 7,
  "followers": 240000,
  "following": 0,
  "fromCache": false
}
```

**Error 404**
```json
{ "error": "User not found" }
```

**Error 429**
```json
{
  "error": "Rate limit exceeded",
  "rateLimitReset": "API rate limit exceeded for ..."
}
```

---

### GET /api/user/:username/repos

Fetches a page of the user's public repositories, sorted by last-updated date, 12 per page. Cached per username + page for 60 seconds.

**Path parameter**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `username` | string | Yes | GitHub username |

**Query parameter**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `page` | integer | No | 1 | Page number |

**Response 200**
```json
{
  "repos": [
    {
      "id": 1296269,
      "name": "Hello-World",
      "description": "My first repository on GitHub!",
      "stars": 2100,
      "forks": 1800,
      "language": "JavaScript",
      "html_url": "https://github.com/octocat/Hello-World",
      "updated_at": "2024-11-15T10:32:00Z",
      "clone_url": "https://github.com/octocat/Hello-World.git",
      "default_branch": "main",
      "open_issues_count": 3,
      "license": {
        "key": "mit",
        "name": "MIT License",
        "url": "https://api.github.com/licenses/mit",
        "spdx_id": "MIT"
      },
      "fork": false
    }
  ],
  "fromCache": false
}
```

**Error 429**
```json
{ "error": "Rate limit exceeded" }
```

---

## How to Run Locally

**Prerequisites:** Node.js 18+

### 1. Clone the repository

```bash
git clone https://github.com/Ruchi2002/Github-Repo-Explorer.git
cd Github-Repo-Explorer
```

### 2. Set up the backend

```bash
cd Backend
```

Create a `.env` file:

```env
PORT=5000
GITHUB_TOKEN=your_github_personal_access_token
CLIENT_URL=http://localhost:5173
```

> Generate a GitHub personal access token at https://github.com/settings/tokens — no scopes needed for public API access. Without a token the server still works but falls back to the unauthenticated GitHub API rate limit (60 req/hour).

```bash
npm install
npm run dev
```

The backend starts on `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Caching

The backend uses a simple in-memory cache (`Backend/src/cache/inMemoryCache.js`) built on a JavaScript `Map`.
 Each entry is stored with a timestamp and expires after **60 seconds**.

Cache keys follow these patterns:

| Request | Cache key |
|---|---|
| User profile | `user:{username}` |
| Repo page | `repos:{username}:page{n}` |

When a response is served from cache, the API adds `"fromCache": true` to the response body.
 Expired entries are pruned automatically on read. 
 The cache lives in process memory and clears on every server restart.

---

## Known Limitations & Next Steps

- **No persistent cache.** The in-memory cache is wiped on every server restart. A Redis layer would survive deploys and scale across multiple instances.
- **`axios` is installed but unused.** The backend uses the native `fetch()` API for GitHub requests; `axios` is a leftover dependency that can be removed.
- **No tests.** There are no unit or integration tests for either the frontend or the backend.
- **Rate limit countdown is approximate.** The client calculates the reset time from the error message string; it may drift slightly from the actual GitHub API reset time.
- **Single GitHub token.** The server uses one token for all users. Under heavy traffic, rate limit exhaustion is possible. Per-user OAuth would distribute the quota.
- **No dark mode.** The UI uses a fixed light gradient theme with no toggle.

---

## AI Tool Usage

Claude (claude-sonnet-4-6 via Claude Code) was used to:

- Read and analyse every file in the `/frontend/src` and `/Backend/src` directories
-Tailwind CSS v4 setup guidance
-Debugging a CSS specificity issue
- Document API endpoints using the real request/response shapes from `githubService.js` and `routes/github.js`
- Produce the folder tree from the actual filesystem
- List only libraries present in the actual `package.json` files

The application architecture, backend implementation, API integration, caching logic, React state management, and overall UI implementation were written and integrated by me.
