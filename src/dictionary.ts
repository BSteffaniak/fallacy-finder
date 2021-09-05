import { initVerbs } from './word-parser.ts';

export async function initDictionaryFromJson() {
  initVerbs(JSON.parse(await Deno.readTextFile('./res/verbs.json')));
}