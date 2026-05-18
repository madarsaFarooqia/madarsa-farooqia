#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  const regex = /((?:from\s+)?["'])@\/(.+?)(["'])/g;
  let changed = false;
  content = content.replace(regex, (m, p1, target, p3) => {
    const targetAbs = path.join(SRC, target);
    let rel = path.relative(dir, targetAbs);
    rel = toPosix(rel);
    if (!rel.startsWith('.')) rel = './' + rel;
    changed = true;
    return p1.replace("\"", "\"") + rel + p3; // keep quotes style
  });
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
}

const patterns = ['src/**/*.{js,jsx,ts,tsx}'];
let files = [];
patterns.forEach(p => files = files.concat(glob.sync(p, { nodir: true })));
files.forEach(processFile);
console.log('Done.');
