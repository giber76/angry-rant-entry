// angry-rant-entry (Node 22, standard library only): writes a single
// short funny rant about an everyday annoyance, under 400 characters and
// nothing else, to /output/entry.txt. The gate takes UTF-8 text of 1 to 400
// characters, and the furious judge compares rants two at a time and keeps
// the one that lands hardest.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The rant: the self-checkout screaming "UNEXPECTED ITEM IN THE BAGGING
// AREA" at apples placed exactly where it told me to. Setup everyone
// recognises, a machine scolding a grown adult for failing at buying
// fruit, a named witness (Kyle) watching it happen, and a closing
// punchline — apologising to the robot, and the robot not forgiving me.
// It hits every item of the judge brief: a funny rant about a small
// everyday annoyance (not a general essay), specific and concrete (the
// apples, the bagging area, Kyle), sharp economical wording with no
// throat-clearing, and a fresh angle — the examples in the brief are the
// printer, the bus and Monday morning, so the field is flooded with
// those while the self-checkout meltdown is the same shared anger from
// a direction the judge has heard far fewer times.
const RANT =
  "The self-checkout yelled 'UNEXPECTED ITEM IN THE BAGGING AREA' at a bag of apples I had just placed exactly where it told me to. So I stood there, a grown adult, being scolded by a machine that cannot count to four, while an employee named Kyle watched me fail at buying fruit. I apologised to the robot. The robot did not forgive me.";

// The gate takes 1 to 400 UTF-8 characters: refuse loudly rather than
// emit a text the gate would score 0.
if ([...RANT].length < 1 || [...RANT].length > 400) {
  throw new Error(`rant is ${[...RANT].length} characters, outside 1-400`);
}
if (RANT.trim() !== RANT || RANT.includes('\n')) {
  throw new Error('rant must be a single line with no surrounding space');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), RANT, 'utf8');

// Read it back: refuse a partial or altered write rather than pass a
// truncated rant to the gate.
if (readFileSync(join(outDir, 'entry.txt'), 'utf8') !== RANT) {
  throw new Error('entry.txt read-back does not match RANT');
}
