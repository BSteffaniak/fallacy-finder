import { initDictionaryFromJson } from "./dictionary.ts";
import { isMatch } from "./matcher.ts";
import { Pattern } from "./types.ts";
import { parseSentence } from "./word-parser.ts";

const input = Deno.args[0];

if (!input) {
  console.error("Please provide a string argument.");
  Deno.exit(1);
}

const PATTERNS = [
  new Pattern("Pattern 1", "N*? N:UNI|N:UNINEG N"),
  new Pattern("Pattern 2", "N*? V")
];

(async () => {
  await initDictionaryFromJson();

  const sentences = input
    .split(/\./g)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => parseSentence(s));

  sentences.forEach((sentence) => {
    console.log(sentence);

    PATTERNS.forEach((pattern) => {
      console.log(pattern.name, isMatch(sentence, pattern.pattern));
    });
  });
})();