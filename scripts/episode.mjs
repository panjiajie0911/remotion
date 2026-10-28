import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {root,check} from './media.mjs';
const [mode,episode='episode-03',...extra] = process.argv.slice(2);
const ids = {'episode-01':'MyComp','episode-02':'Episode02','episode-03':'Episode03EatingHabits','episode-04':'Episode04RedScarf'};
if (!ids[episode] || !['preview','render','bundle'].includes(mode)) throw new Error('Usage: preview|render|bundle episode-01|episode-02|episode-03|episode-04');
const missingAssets = check(episode, false);
if (missingAssets.length) {
  const message = `Archive assets missing (${missingAssets.length}). Restore if needed: npm run media -- restore ${episode}`;
  // Studio must remain available while authoring scenes that do not use archived media.
  if (mode === 'preview') console.warn(message);
  else throw new Error(message);
}
const publicDir = path.join(root,'.media',episode,'public');
fs.mkdirSync(publicDir,{recursive:true});
const avatarSource = path.join(root,'src/assets/img/avatar.png');
if (fs.existsSync(avatarSource)) {
  const sharedDir = path.join(publicDir,'shared');
  fs.mkdirSync(sharedDir,{recursive:true});
  fs.copyFileSync(avatarSource,path.join(sharedDir,'avatar.png'));
}
const require = createRequire(import.meta.url);
const cliPackage = require.resolve('@remotion/cli/package.json');
const pkg = JSON.parse(fs.readFileSync(cliPackage,'utf8'));
const cli = path.resolve(path.dirname(cliPackage),typeof pkg.bin === 'string' ? pkg.bin : pkg.bin.remotion);
const args = [mode==='preview' ? 'studio' : mode,`src/entries/${episode}.tsx`];
if (mode==='render') args.push(ids[episode],`out/${episode}.mp4`,'--codec=h264','--crf=18','--pixel-format=yuv420p','--concurrency=2');
if (mode==='bundle') args.push(`--out-dir=build/${episode}`);
args.push(`--public-dir=${publicDir}`,...extra);
const result = spawnSync(process.execPath,[cli,...args],{cwd:root,stdio:'inherit'});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
