
export enum SentenceType {
  DECLARATION, EXCLAMATION, QUESTION, SEMIDECLARATION
}

export enum WordType {
  NOUN = "N",
  VERB = "V",
  ADJECTIVE = "AD",
  ADVERB = "ADV"
}

export enum WordTypeClassifier {
  UNIVERSAL = "UNI",
  UNIVERSAL_NEGATIVE = "UNINEG"
}

export class WordMatcher {
  private prop?: string;

  constructor() {

  }
}

export class BasicWordMatcher extends WordMatcher {

  constructor(public type: WordType, public classifier?: WordTypeClassifier) {
    super();
  }
}

export class OrWordMatcher extends WordMatcher {
  matchers: WordMatcher[];

  constructor(...matchers: WordMatcher[]) {
    super();
    this.matchers = matchers;
  }
}

export class Sentence {
  words?: Word[];

  constructor(
    public readonly rawText: string,
    public readonly type: SentenceType
  ) {

  }
}

export class Word {
  type?: WordType;

  constructor(
    public readonly rawText: string
  ) {

  }


}