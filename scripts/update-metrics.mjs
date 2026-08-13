import { readFile, writeFile } from 'node:fs/promises';

const metricsPath = new URL('../data/metrics.json', import.meta.url);
const today = new Date().toISOString().slice(0, 10);
const numberOrNull = (value) => Number.isFinite(Number(value)) ? Number(value) : null;

const readCurrentMetrics = async () => {
  try {
    return JSON.parse(await readFile(metricsPath, 'utf8'));
  } catch {
    return {};
  }
};

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Request failed: ${response.status} ${url}`);
  return response.json();
};

const getYouTubeMetrics = async () => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!apiKey || !channelId) return {};

  const params = new URLSearchParams({
    part: 'statistics',
    id: channelId,
    key: apiKey
  });
  const data = await fetchJson(`https://www.googleapis.com/youtube/v3/channels?${params}`);
  const stats = data.items?.[0]?.statistics;
  if (!stats) return {};

  return {
    youtubeSubscribers: stats.hiddenSubscriberCount ? null : numberOrNull(stats.subscriberCount),
    youtubeViews: numberOrNull(stats.viewCount),
    youtubeVideos: numberOrNull(stats.videoCount)
  };
};

const getGitHubMetrics = async () => {
  const username = process.env.GITHUB_USERNAME || 'cedricarts';
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };
  if (process.env.METRICS_GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.METRICS_GITHUB_TOKEN}`;

  const user = await fetchJson(`https://api.github.com/users/${username}`, { headers });
  const repos = await fetchJson(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, { headers });
  const publicRepos = numberOrNull(user.public_repos);
  const githubStars = Array.isArray(repos)
    ? repos.reduce((total, repo) => total + (Number(repo.stargazers_count) || 0), 0)
    : null;

  return {
    githubPublicRepositories: publicRepos,
    githubStars,
    githubFollowers: numberOrNull(user.followers)
  };
};

const main = async () => {
  const current = await readCurrentMetrics();
  const curated = current.curated || {};
  const dynamic = current.dynamic || {};

  const updates = await Promise.allSettled([getYouTubeMetrics(), getGitHubMetrics()]);
  for (const update of updates) {
    if (update.status === 'fulfilled') Object.assign(dynamic, update.value);
    else console.warn(update.reason?.message || update.reason);
  }

  if (process.env.STUDX_USERS) dynamic.studxUsers = numberOrNull(process.env.STUDX_USERS);

  const next = {
    schemaVersion: 1,
    lastUpdated: today,
    dynamic,
    curated,
    sources: current.sources || {
      youtube: 'YouTube Data API via GitHub Actions secret',
      github: 'GitHub public API',
      studx: 'Curated or secure server-side source only'
    }
  };

  await writeFile(metricsPath, `${JSON.stringify(next, null, 2)}\n`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
