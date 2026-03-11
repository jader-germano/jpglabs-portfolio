import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

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

function readPublicationEntries(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const matches = [...content.matchAll(/(?:^|\n)## ([^\n]+)\n([\s\S]*?)(?=\n---\n\n## |\s*$)/g)];

  return matches
    .map((match) => ({
      title: match[1].trim(),
      body: match[2].trim(),
    }))
    .filter((entry) => !['Project Identity', 'Logging Rule', 'Entries'].includes(entry.title));
}

function pickLine(body, prefix) {
  return body
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.startsWith(prefix));
}

export function generateLatestReleaseNotes({ output, count = 3 } = {}) {
  const source = path.resolve(repoRoot, 'public/docs/project-publication-log.md');
  const target = path.resolve(repoRoot, output || 'public/docs/latest-release-notes.md');
  const entries = readPublicationEntries(source).slice(-count).reverse();
  const branch = runGit('git branch --show-current') || 'unknown';
  const commit = runGit('git rev-parse --short HEAD') || 'no-commit';
  const remote = runGit('git remote get-url origin') || 'unknown';
  const now = new Date().toISOString();

  const lines = [
    '# Latest Release Notes',
    '',
    'This file is generated from `public/docs/project-publication-log.md` and summarizes the latest project publication records.',
    '',
    `- Generated at: ${now}`,
    `- Repository: ${remote}`,
    `- Branch: ${branch}`,
    `- Commit: ${commit}`,
  ];

  if (!entries.length) {
    lines.push('', 'No publication entries were found yet.');
    writeFileSync(target, `${lines.join('\n')}\n`, 'utf8');
    return target;
  }

  const [latest, ...older] = entries;

  lines.push('', '## Current Publication');
  lines.push(`### ${latest.title}`);
  lines.push('');
  lines.push(latest.body);

  if (older.length) {
    lines.push('', '## Recent Publication History');
    older.forEach((entry) => {
      const timestamp = pickLine(entry.body, '- Timestamp:') || '- Timestamp: unknown';
      const status = pickLine(entry.body, '- Status:') || '- Status: unknown';
      lines.push(`- ${entry.title} (${status.replace('- Status: ', '')}, ${timestamp.replace('- Timestamp: ', '')})`);
    });
  }

  writeFileSync(target, `${lines.join('\n')}\n`, 'utf8');
  return target;
}

if (process.argv[1] === __filename) {
  const args = parseArgs(process.argv.slice(2));
  const output = generateLatestReleaseNotes({
    output: args.output,
    count: Number(args.count || '3'),
  });

  console.log(`Release notes generated at ${path.relative(repoRoot, output)}`);
}
