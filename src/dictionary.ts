let jsonVerbs: {[verb: string]: boolean};
let jsonUniversals: {[verb: string]: boolean};
let jsonUniversalNegatives: {[verb: string]: boolean};

export const verbs: {[verb: string]: boolean} = {};
export const universals: {[verb: string]: boolean} = {};
export const universalNegatives: {[verb: string]: boolean} = {};

export function initVerbs(_verbs: {[verb: string]: boolean}) {
  Object.assign(verbs, _verbs);
}

export function initUniversals(_universals: {[verb: string]: boolean}) {
  Object.assign(universals, _universals);
}

export function initUniversalNegatives(_universalNegatives: {[verb: string]: boolean}) {
  Object.assign(universalNegatives, _universalNegatives);
}

export async function initDictionaryFromJson() {
  jsonVerbs = jsonVerbs || JSON.parse(await Deno.readTextFile('./res/verbs.json'));
  jsonUniversals = jsonUniversals || JSON.parse(await Deno.readTextFile('./res/universals.json'));
  jsonUniversalNegatives = jsonUniversalNegatives || JSON.parse(await Deno.readTextFile('./res/universal-negatives.json'));

  initVerbs(jsonVerbs);
  initUniversals(jsonUniversals);
  initUniversalNegatives(jsonUniversalNegatives);
}