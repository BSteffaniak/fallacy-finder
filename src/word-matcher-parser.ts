import { WordMatcher, WordType, OrWordMatcher, BasicWordMatcher, WordTypeClassifier, MaybeMultipleWordMatcher, MaybeMultipleNonGreedyWordMatcher } from "./types.ts";

function getEnumValueFromString<T>(enumType: {[key: string]: string}, expr: string): string | undefined {
  const entries: [string, string][] = Object.entries(enumType);

  const entry: [string, string] | undefined = entries.find(e => e[1] === expr);

  if (!entry) {
    return;
  }

  return enumType[entry[0]];
}

export function parseWordMatcher(expr: string): WordMatcher {
  const entry = getEnumValueFromString(WordType, expr) as WordType;

  if (!entry) {
    const orSplit = expr.split(/[|]/);

    if (orSplit.length > 1) {
      return new OrWordMatcher(...orSplit.map(w => parseWordMatcher(w)));
    }

    const classifierSplit = expr.split(/[:]/);

    if (classifierSplit.length === 2) {
      const wordMatcher = parseWordMatcher(classifierSplit[0]) as BasicWordMatcher;
      wordMatcher.classifier = getEnumValueFromString(WordTypeClassifier, classifierSplit[1]) as WordTypeClassifier;

      if (!wordMatcher.classifier) {
        throw new Error(`Invalid classifier '${classifierSplit[1]}'`);
      }

      return wordMatcher;
    }

    if (expr.endsWith('*')) {
      const innerWordMatcher = parseWordMatcher(expr.substr(0, expr.length - 1));
      const wordMatcher = new MaybeMultipleWordMatcher(innerWordMatcher);

      return wordMatcher;
    }

    if (expr.endsWith('*?')) {
      const innerWordMatcher = parseWordMatcher(expr.substr(0, expr.length - 2));
      const wordMatcher = new MaybeMultipleNonGreedyWordMatcher(innerWordMatcher);

      return wordMatcher;
    }

    throw new Error(`Invalid expression value '${expr}'`);
  }

  return new BasicWordMatcher(
    entry,
    undefined
  );
}
