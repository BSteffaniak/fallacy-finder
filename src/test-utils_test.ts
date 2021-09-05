import { initVerbs } from './word-parser.ts';

export async function initDictionary() {
  initVerbs(JSON.parse(await Deno.readTextFile('./res/verbs.json')));
}