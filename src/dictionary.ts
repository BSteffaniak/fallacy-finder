import { initVerbs } from './word-parser.ts';

let jsonVerbs: {[verb: string]: boolean};

export async function initDictionaryFromJson() {
  jsonVerbs = jsonVerbs || JSON.parse(await Deno.readTextFile('./res/verbs.json'));

  initVerbs(jsonVerbs);
}