import { Sentence, SentenceType, Word, WordType } from "./types.ts";
import { parseWordMatcher } from "./word-parser.ts";

const input = Deno.args[0] || `The word "master" is always racist. Therefore, we must obliterate it.`;

const sentences = input
  .split(/\./g)
  .filter(s => s.length > 0)
  .map(s => new Sentence(s.trim(), SentenceType.DECLARATION));

sentences.forEach(sentence => {
  sentence.words = sentence.rawText
    .split(/ /g)
    .filter(w => w.length > 0)
    .map(text => new Word(text));
});

sentences.forEach(sentence => {
  sentence.words!.forEach((word, i, words) => {
    word.type = WordType.NOUN;
  });
});

function isMatch(sentence: Sentence, expression: string): boolean {
  if (!sentence.words) {
    throw new Error("Words are not initialized");
  }

  const matchers = expression.split(/\s+/g);

  const wordTypes = matchers.map(m => parseWordMatcher(m));

  console.log(wordTypes);

  return true;
}

console.log("hey world", sentences, isMatch(sentences[0], "N N N:UNI|N:UNINEG ADV"));