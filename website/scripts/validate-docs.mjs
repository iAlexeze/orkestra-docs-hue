#!/usr/bin/env node
/**
 * Validate that every markdown file under ../docs has a title.
 * Either via frontmatter `title:` or a top-level `# Heading`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS = path.resolve(__dirname, '../../docs');

let errors = 0;

function check(file) {
  const src = fs.readFileSync(file, 'utf8');
  const fm = src.match(/^---\n([\s\S]*?)\n---/);
  const hasFmTitle = fm && /^title:\s*\S/m.test(fm[1]);
  const hasH1 = /^#\s+\S/m.test(src);
  if (!hasFmTitle && !hasH1) {
    console.error(`✗ ${path.relative(process.cwd(), file)} — missing title (frontmatter or # H1)`);
    errors++;
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.mdx?$/.test(name)) check(full);
  }
}

walk(DOCS);
if (errors > 0) {
  console.error(`\n${errors} file(s) failed validation.`);
  process.exit(1);
}
console.log('All docs validated.');
