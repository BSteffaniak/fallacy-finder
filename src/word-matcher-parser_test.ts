import { assertEquals, fail, AssertionError } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { BasicWordMatcher, WordType, WordTypeClassifier, OrWordMatcher } from "./types.ts";
import { parseWordMatcher } from "./word-matcher-parser.ts";

Deno.test({
  name: "parseWordMatcher | parses basic noun correctly",
  fn: () => {
    const result = parseWordMatcher("N");
    const expected = new BasicWordMatcher(WordType.NOUN);

    assertEquals(result, expected);
  }
});

Deno.test({
  name: "parseWordMatcher | parses basic adjective correctly",
  fn: () => {
    const result = parseWordMatcher("AD");
    const expected = new BasicWordMatcher(WordType.ADJECTIVE);

    assertEquals(result, expected);
  }
});

Deno.test({
  name: "parseWordMatcher | parses basic adverb correctly",
  fn: () => {
    const result = parseWordMatcher("ADV");
    const expected = new BasicWordMatcher(WordType.ADVERB);

    assertEquals(result, expected);
  }
});

Deno.test({
  name: "parseWordMatcher | parses basic verb correctly",
  fn: () => {
    const result = parseWordMatcher("V");
    const expected = new BasicWordMatcher(WordType.VERB);

    assertEquals(result, expected);
  }
});

Deno.test({
  name: "parseWordMatcher | parses noun with universal classifier correctly",
  fn: () => {
    const result = parseWordMatcher("N:UNI")
    const expected = new BasicWordMatcher(WordType.NOUN, WordTypeClassifier.UNIVERSAL);

    assertEquals(result, expected);
  }
});

Deno.test({
  name: "parseWordMatcher | parses noun with universal negative classifier correctly",
  fn: () => {
    const result = parseWordMatcher("N:UNINEG");
    const expected = new BasicWordMatcher(WordType.NOUN, WordTypeClassifier.UNIVERSAL_NEGATIVE);

    assertEquals(result, expected);
  }
});

Deno.test({
  name: "parseWordMatcher | parses basic 'or' condition correctly",
  fn: () => {
    const result = parseWordMatcher("N|V");
    const expected = new OrWordMatcher(new BasicWordMatcher(WordType.NOUN), new BasicWordMatcher(WordType.VERB));

    assertEquals(result, expected);
  }
});

Deno.test({
  name: "parseWordMatcher | parses 'or' condition with first matcher containing a classifier correctly",
  fn: () => {
    const result = parseWordMatcher("N:UNI|V");
    const expected = new OrWordMatcher(new BasicWordMatcher(WordType.NOUN, WordTypeClassifier.UNIVERSAL), new BasicWordMatcher(WordType.VERB));

    assertEquals(result, expected);
  }
});

Deno.test({
  name: "parseWordMatcher | parses 'or' condition with second matcher containing a classifier correctly",
  fn: () => {
    const result = parseWordMatcher("V|N:UNI");
    const expected = new OrWordMatcher(new BasicWordMatcher(WordType.VERB), new BasicWordMatcher(WordType.NOUN, WordTypeClassifier.UNIVERSAL));

    assertEquals(result, expected);
  }
});

Deno.test({
  name: "parseWordMatcher | parses 'or' condition with both matchers containing a classifier correctly",
  fn: () => {
    const result = parseWordMatcher("N:UNINEG|N:UNI");
    const expected = new OrWordMatcher(new BasicWordMatcher(WordType.NOUN, WordTypeClassifier.UNIVERSAL_NEGATIVE), new BasicWordMatcher(WordType.NOUN, WordTypeClassifier.UNIVERSAL));

    assertEquals(result, expected);
  }
});

Deno.test({
  name: "parseWordMatcher | throws an Error if spaces between left side of 'or' symbol",
  fn: () => {
    try {
      parseWordMatcher("N:UNINEG |N:UNI");
      fail("Didn't thow an error.");
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      } else {
        assertEquals(error.message, "Invalid classifier 'UNINEG '");
      }
    }
  }
});

Deno.test({
  name: "parseWordMatcher | throws an Error if spaces between right side of 'or' symbol",
  fn: () => {
    try {
      parseWordMatcher("N:UNINEG| N:UNI");
      fail("Didn't thow an error.");
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      } else {
        assertEquals(error.message, "Invalid expression value ' N'");
      }
    }
  }
});

Deno.test({
  name: "parseWordMatcher | throws an Error if spaces between both sides of 'or' symbol",
  fn: () => {
    try {
      parseWordMatcher("N:UNINEG | N:UNI");
      fail("Didn't thow an error.");
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      } else {
        assertEquals(error.message, "Invalid classifier 'UNINEG '");
      }
    }
  }
});