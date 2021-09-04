import { Word, WordType, WordTypeClassifier } from "./types.ts";

export function parseWord(input: string): Word {
  const word = new Word(input);

  word.type = WordType.NOUN;
  
  switch (input.toLowerCase()) {
    case 'always':
      word.classifier = WordTypeClassifier.UNIVERSAL
      break;
    case 'never':
      word.classifier = WordTypeClassifier.UNIVERSAL_NEGATIVE
      break;
  }

  return word;
}