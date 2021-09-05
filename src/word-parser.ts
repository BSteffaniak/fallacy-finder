import { Word, WordType, WordTypeClassifier } from "./types.ts";

let verbs: {[verb: string]: boolean};

export function initVerbs(_verbs: {[verb: string]: boolean}) {
  verbs = _verbs;
}

export function parseWord(input: string): Word {
  const word = new Word(input);

  word.type = WordType.NOUN;
  
  if (input.toLowerCase() in verbs) {
    word.type = WordType.VERB;
  }
  
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