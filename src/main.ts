import { initDictionaryFromJson } from "./dictionary.ts";
import { isMatch } from "./matcher.ts";
import { parseSentence } from "./word-parser.ts";

const input = Deno.args[0] || `The word "master" is always racist. Therefore, we must obliterate it.`;

(async () => {
  await initDictionaryFromJson();

  const sentences = input
    .split(/\./g)
    .filter(s => s.length > 0)
    .map(s => s.trim())
    .map(s => parseSentence(s));

  console.log(sentences, isMatch(sentences[0], "N*? N:UNI|N:UNINEG N"));
})();