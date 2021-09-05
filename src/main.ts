import { isMatch } from "./matcher.ts";
import { Sentence, SentenceType } from "./types.ts";
import { parseWord, initVerbs } from "./word-parser.ts";

const input = Deno.args[0] || `The word "master" is always racist. Therefore, we must obliterate it.`;

(async () => {
  initVerbs(JSON.parse(await Deno.readTextFile('./res/verbs.json')));

  const sentences = input
    .split(/\./g)
    .filter(s => s.length > 0)
    .map(s => new Sentence(s.trim(), SentenceType.DECLARATION));

  sentences.forEach(sentence => {
    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));
  });

  console.log(sentences, isMatch(sentences[0], "N*? N:UNI|N:UNINEG N"));
})();