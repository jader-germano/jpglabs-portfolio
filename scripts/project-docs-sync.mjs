import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { generateLatestReleaseNotes } from './generate-release-notes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) {
      continue;
    }
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith('--')) {
      result[key] = 'true';
      continue;
    }
    result[key] = next;
    index += 1;
  }
  return result;
}

function runGit(command) {
  try {
    return execSync(command, {
      cwd: repoRoot,
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    }).trim();
  } catch {
    return '';
  }
}

function toList(value) {
  return (value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderList(title, items) {
  if (!items.length) {
    return '';
  }
  return `\n${title}\n${items.map((item) => `- ${item}`).join('\n')}\n`;
}

function appendEntry(targetFile, entry) {
  const absoluteTarget = path.resolve(repoRoot, targetFile);
  mkdirSync(path.dirname(absoluteTarget), { recursive: true });
  if (!existsSync(absoluteTarget)) {
    throw new Error(`Target file does not exist: ${targetFile}`);
  }
  appendFileSync(absoluteTarget, `\n\n---\n\n${entry}\n`, 'utf8');
}

const args = parseArgs(process.argv.slice(2));
const mode = args.mode || 'start';
const isPublish = mode === 'publish';
const now = new Date().toISOString();
const branch = runGit('git branch --show-current') || 'unknown';
const commit = runGit('git rev-parse --short HEAD') || 'no-commit';
const remote = runGit('git remote get-url origin') || 'unknown';
const gitUser = runGit('git config user.name') || 'unknown';
const gitEmail = runGit('git config user.email') || 'unknown';
const worktree = runGit('git status --short');
const title = args.title || (isPublish ? 'Project publication update' : 'Implementation session started');
const summary = args.summary || (isPublish ? 'Publication update recorded.' : 'Implementation tracking session opened.');
const status = args.status || (isPublish ? 'draft' : 'in-progress');
const files = toList(args.files);
const tests = toList(args.tests);
const links = toList(args.links);

const entry = [
  `## ${title}`,
  '',
  `- Timestamp: ${now}`,
  `- Status: ${status}`,
  `- Repository: ${remote}`,
  `- Git user: ${gitUser}`,
  `- Git email: ${gitEmail}`,
  `- Branch: ${branch}`,
  `- Commit: ${commit}`,
  '',
  '### Summary',
  summary,
  renderList('### Files', files).trimEnd(),
  renderList('### Tests', tests).trimEnd(),
  renderList('### Links', links).trimEnd(),
  worktree ? `### Worktree Snapshot\n${worktree.split('\n').map((line) => `- ${line}`).join('\n')}` : '',
].filter(Boolean).join('\n');

appendEntry(
  isPublish ? 'public/docs/project-publication-log.md' : 'public/docs/implementation-journal.md',
  entry,
);

if (isPublish) {
  generateLatestReleaseNotes();
}

console.log(`Documentation entry appended to ${isPublish ? 'public/docs/project-publication-log.md' : 'public/docs/implementation-journal.md'}`);
