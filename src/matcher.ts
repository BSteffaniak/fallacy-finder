import { BasicWordMatcher, MaybeMultipleNonGreedyWordMatcher, MaybeMultipleWordMatcher, OrWordMatcher, Sentence, Word, WordMatcher } from "./types.ts";
import { parseWordMatcher } from "./word-matcher-parser.ts";

export function isWordMatch(word: Word, matcher: WordMatcher): boolean {
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

class WordMatcherStateMachine {
  lastIndex = -1;

  constructor(
    private readonly wordMatchers: WordMatcher[],
    private readonly words: Word[]
  ) {

  }

  matchMaybeMultipleNonGreedyWordMatcher(
    matcher: WordMatcher,
    i: number
  ): boolean {
    const startIndex = this.lastIndex;
    const nextMatcher = this.wordMatchers[i + 1];

    this.words.forEach((word, wi) => {
      if (wi === this.lastIndex + 1 && isWordMatch(word, matcher)) {
        // if this word can be matched by next matcher and we already have matched
        // something with this current matcher, then stop because we are not greedy.
        if (this.lastIndex === startIndex || nextMatcher && !isWordMatch(word, nextMatcher)) {
          this.lastIndex = wi;
        }
      }
    });

    return startIndex !== this.lastIndex;
  }

  matchMaybeMultipleWordMatcher(
    matcher: WordMatcher
  ): boolean {
    const startIndex = this.lastIndex;

    this.words.forEach((word, wi) => {
      if (wi === this.lastIndex + 1 && isWordMatch(word, matcher)) {
        this.lastIndex = wi;
      }
    });

    return startIndex !== this.lastIndex;
  }

  matchBasicWordMatcher(
    matcher: WordMatcher
  ): boolean {
    const findIndex = this.words.findIndex((word, wi) => {
      return wi === this.lastIndex + 1 && isWordMatch(word, matcher);
    });

    if (findIndex === -1) {
      return false;
    }
    if (findIndex > this.lastIndex + 1) {
      return false;
    }

    this.lastIndex = findIndex;

    return true;
  }
}

export function wordMatchersMatchSequentially(wordMatchers: WordMatcher[], words: Word[]): boolean {
  const state = new WordMatcherStateMachine(wordMatchers, words);

  return wordMatchers.every((matcher, i) => {
    switch (matcher.constructor) {
      case MaybeMultipleNonGreedyWordMatcher:
        return state.matchMaybeMultipleNonGreedyWordMatcher(matcher, i);
      case MaybeMultipleWordMatcher:
        return state.matchMaybeMultipleWordMatcher(matcher);
      default:
        return state.matchBasicWordMatcher(matcher);
    }
  });
}

export function isMatch(sentence: Sentence, expression: string): boolean {
  if (!sentence.words) {
    throw new Error("Words are not initialized");
  }

  const matchers = expression.split(/\s+/g);

  const wordMatchers = matchers.map(m => parseWordMatcher(m));

  return wordMatchersMatchSequentially(wordMatchers, sentence.words);
}