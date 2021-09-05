import { assertEquals, fail, AssertionError } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { Word, WordType } from "./types.ts";
import { parseWord, initVerbs } from "./word-parser.ts";
import { initDictionary } from './test-utils_test.ts';

Deno.test({
  name: "parseWord | parses basic noun correctly",
  fn: async () => {
    await initDictionary();

    const result = parseWord("hey");
    const expected = new Word("hey");
    expected.type = WordType.NOUN;
    
    assertEquals(result, expected);
  }
});
