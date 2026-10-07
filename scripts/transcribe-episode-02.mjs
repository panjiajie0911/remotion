import path from 'node:path';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {installWhisperCpp, downloadWhisperModel, transcribe, toCaptions} from '@remotion/install-whisper-cpp';

const root = process.cwd();
const audio = path.join(root, 'src/assets/audio/2.m4a');
const wav = path.join(root, 'src/episodes/episode-02/assets/2-16k.wav');
const whisperPath = path.join(root, '.whisper');
const out = path.join(root, 'src/episodes/episode-02/script/captions.json');
fs.mkdirSync(path.dirname(wav), {recursive: true});
fs.mkdirSync(path.dirname(out), {recursive: true});
execFileSync('ffmpeg', ['-y','-i',audio,'-ar','16000','-ac','1',wav], {stdio:'inherit'});
await installWhisperCpp({to: whisperPath, version: '1.5.5', printOutput: true});
await downloadWhisperModel({model: 'small', folder: whisperPath, printOutput: true});
const result = await transcribe({inputPath: wav, whisperPath, whisperCppVersion: '1.5.5', model: 'small', language: 'zh', tokenLevelTimestamps: true, splitOnWord: true, printOutput: true});
const {captions} = toCaptions({whisperCppOutput: result});
fs.writeFileSync(out, JSON.stringify(captions, null, 2));
console.log(`Wrote ${captions.length} captions to ${out}`);
