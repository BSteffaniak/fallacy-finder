import { initDictionaryFromJson } from "./dictionary.ts";
import { isMatch } from "./matcher.ts";
import { parseSentence } from "./word-parser.ts";

const input = Deno.args[0];

if (!input) {
  console.error("Please provide a string argument.");
  Deno.exit(1);
}

const PATTERNS = [
  "N*? N:UNI|N:UNINEG N",
  "N*? V"
];

(async () => {
  await initDictionaryFromJson();

  const sentences = input
    .split(/\./g)
    .filter(s => s.length > 0)
    .map(s => s.trim())
    .map(s => parseSentence(s));

  sentences.forEach((sentence) => {
    console.log(sentence);

    PATTERNS.forEach((pattern) => {
      console.log(pattern, isMatch(sentence, pattern));
    });
  });
})();