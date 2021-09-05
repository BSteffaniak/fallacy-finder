import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { initDictionaryFromJson } from "./dictionary.ts";
import { Sentence, SentenceType, Word, WordType } from "./types.ts";
import { parseWord, parseWordType } from "./word-parser.ts";

Deno.test({
  name: "parseWord | parses basic noun correctly",
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = new Sentence("hey.", SentenceType.DECLARATION);
    const result = parseWord("hey", sentence);
    sentence.words = [result];
    const expected = new Word("hey");

    assertEquals(result, expected);

    // Second pass on word type parsing now that we have initialized the sentence
    parseWordType(result, sentence);
    expected.type = WordType.NOUN;

    assertEquals(result, expected);
  }
});
