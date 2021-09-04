import { assertEquals, fail, AssertionError } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { Word, WordType } from "./types.ts";
import { parseWord } from "./word-parser.ts";

Deno.test({
  name: "parseWord | parses basic noun correctly",
  fn: () => {
    const result = parseWord("hey");
    const expected = new Word("hey");
    expected.type = WordType.NOUN;
    
    assertEquals(result, expected);
  }
});
