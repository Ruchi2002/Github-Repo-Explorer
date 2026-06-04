const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  Accept: 'application/vnd.github+json',
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
};

export async function fetchGitHubUser(username) {
  const res = await fetch(`${GITHUB_API}/users/${username}`, { headers });
  return { status: res.status, data: await res.json() };
}

export async function fetchGitHubRepos(username, page = 1, perPage = 12) {
  const url = `${GITHUB_API}/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`;
  const res = await fetch(url, { headers });
  return { status: res.status, data: await res.json() };
}