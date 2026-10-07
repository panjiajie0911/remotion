import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const manifest = JSON.parse(fs.readFileSync(path.join(root,'media-manifest.json'),'utf8'));
export function check(episode, verifyHash = true) {
  const entries = manifest.entries.filter(e => e.group === 'shared' || e.group === episode);
  return entries.filter(e => !fs.existsSync(path.join(root,e.target)) || (verifyHash && digest(fs.readFileSync(path.join(root,e.target))) !== e.sha256));
}
const digest = b => crypto.createHash('sha256').update(b).digest('hex');
export function restore(episode, location) {
  if (!['episode-01','episode-02','episode-03','all'].includes(episode)) throw new Error('Choose episode-01, episode-02, episode-03 or all');
  const archive = path.resolve(location || process.env.REMOTION_MEDIA_ARCHIVE || path.join(root,'../material-archive'));
  const entries = manifest.entries.filter(e => episode === 'all' || e.group === 'shared' || e.group === episode);
  // Validate the entire selection before copying; never overwrite local edits.
  for (const e of entries) {
    const object = path.join(archive,'objects',e.sha256);
    if (!fs.existsSync(object) || digest(fs.readFileSync(object)) !== e.sha256) throw new Error(`Missing or damaged archive asset: ${e.source}`);
    const target = path.join(root,e.target);
    if (fs.existsSync(target) && digest(fs.readFileSync(target)) !== e.sha256) throw new Error(`Local asset changed; preserve it before restoring: ${e.target}`);
  }
  for (const e of entries) {
    const target = path.join(root,e.target);
    fs.mkdirSync(path.dirname(target),{recursive:true});
    if (!fs.existsSync(target)) fs.copyFileSync(path.join(archive,'objects',e.sha256),target);
  }
  console.log(`Restored ${entries.length} assets for ${episode}`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [command, episode='episode-03',location] = process.argv.slice(2);
  if (command === 'restore') restore(episode,location);
  else if (command === 'check') {
    const missing = check(episode);
    if (missing.length) {console.error(missing.map(e=>e.target).join('\n'));process.exitCode=1;}
    else console.log(`All assets verified: ${episode}`);
  } else throw new Error('Usage: npm run media -- restore|check episode-03 [archive-path]');
}
