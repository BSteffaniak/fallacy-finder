import { BasicWordMatcher, MaybeMultipleNonGreedyWordMatcher, MaybeMultipleWordMatcher, OrWordMatcher, Sentence, SentenceType, Word, WordMatcher, WordType } from "./types.ts";
import { parseWordMatcher } from "./word-matcher-parser.ts";
import { parseWord } from "./word-parser.ts";

const input = Deno.args[0] || `The word "master" is always racist. Therefore, we must obliterate it.`;

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

function isWordMatch(word: Word, matcher: WordMatcher): boolean {
  switch (matcher.constructor) {
    case BasicWordMatcher: {
      const m = matcher as BasicWordMatcher;
      return word.type === m.type && (!m.classifier || m.classifier === word.classifier);
    }
    case MaybeMultipleNonGreedyWordMatcher: {
      const m = matcher as MaybeMultipleNonGreedyWordMatcher;
      return isWordMatch(word, m.matcher);
    }
    case MaybeMultipleWordMatcher: {
      const m = matcher as MaybeMultipleWordMatcher;
      return isWordMatch(word, m.matcher);
    }
    case OrWordMatcher: {
      const m = matcher as OrWordMatcher;
      return m.matchers.some(orMatch => isWordMatch(word, orMatch));
    }
    default:
      return false;
  }
}

function wordMatchersMatchSequentially(wordMatchers: WordMatcher[], words: Word[]): boolean {
  let lastIndex = -1;

  return wordMatchers.every((matcher, i, matchers) => {
    switch (matcher.constructor) {
      case MaybeMultipleNonGreedyWordMatcher: {
        const startIndex = lastIndex;
        const nextMatcher = matchers[i + 1];

        words.forEach((word, wi) => {
          if (wi === lastIndex + 1 && isWordMatch(word, matcher)) {
            // if this word can be matched by next matcher and we already have matched
            // something with this current matcher, then stop because we are not greedy.
            if (lastIndex === startIndex || !isWordMatch(word, nextMatcher)) {
              lastIndex = wi;
            }
          }
        });
    
        return startIndex !== lastIndex;
      }
      case MaybeMultipleWordMatcher: {
        const startIndex = lastIndex;

        words.forEach((word, wi) => {
          if (wi === lastIndex + 1 && isWordMatch(word, matcher)) {
            lastIndex = wi;
          }
        });
    
        return startIndex !== lastIndex;
      }
      default: {
        const findIndex = words.findIndex((word, wi) => {
          return wi === lastIndex + 1 && isWordMatch(word, matcher);
        });
    
        if (findIndex === -1) {
          return false;
        }
        if (findIndex > lastIndex + 1) {
          return false;
        }
    
        lastIndex = findIndex;
    
        return true;
      }
    }
  });
}

function isMatch(sentence: Sentence, expression: string): boolean {
  if (!sentence.words) {
    throw new Error("Words are not initialized");
  }

  const matchers = expression.split(/\s+/g);

  const wordMatchers = matchers.map(m => parseWordMatcher(m));

  return wordMatchersMatchSequentially(wordMatchers, sentence.words!);
}

console.log(sentences, isMatch(sentences[0], "N*? N:UNI|N:UNINEG N"));