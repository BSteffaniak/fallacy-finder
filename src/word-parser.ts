import { universalNegatives, universals, verbs } from "./dictionary.ts";
import { Sentence, SentenceType, Word, WordType, WordTypeClassifier } from "./types.ts";

export function getPrevWord(word: Word, sentence: Sentence): Word | undefined {
  if (!sentence.words || word.index === 0) {
    return;
  }

  return sentence.words[word.index - 1];
}

export function getNextWord(word: Word, sentence: Sentence): Word | undefined {
  if (!sentence.words || word.index === sentence.words.length - 1) {
    return;
  }

  return sentence.words[word.index + 1];
}

export function parseSentence(input: string): Sentence {
  const sentence = new Sentence(input, SentenceType.DECLARATION);

  sentence.words = parseWords(sentence);
  parseWordTypes(sentence);

  return sentence;
}

export function parseWord(input: string, sentence: Sentence): Word {
  const word = new Word(input);

  parseWordType(word, sentence);
  parseWordClassifier(word, sentence);

  return word;
}

export function parseWords(sentence: Sentence): Word[] {
  return sentence.rawText.split(/ /g)
    .filter(w => w.length > 0)
    .map((text, i) => {
      const word = parseWord(text, sentence);
      word.index = i;

      return word;
    });
}

export function parseWordTypes(sentence: Sentence) {
  for (
    let i = 0;
    i < 5 && sentence.words.some(word => !parseWordType(word, sentence));
    i++
  );
}

export function parseWordType(word: Word, sentence: Sentence): boolean {
  if (word.type) {
    return true;
  }

  if (word.rawText.toLowerCase() in verbs) {
    word.type = WordType.VERB;
    return true;
  }

  if (sentence.words) {
    word.type = WordType.NOUN;
    return true;
  }

  return false;
}

export function parseWordClassifier(word: Word, _sentence: Sentence): boolean {
  if (word.classifier) {
    return true;
  }

  if (word.rawText.toLowerCase() in universals) {
      word.classifier = WordTypeClassifier.UNIVERSAL;
      return true;
  }
  if (word.rawText.toLowerCase() in universalNegatives) {
      word.classifier = WordTypeClassifier.UNIVERSAL_NEGATIVE
      return true;
  }

  return false;
}