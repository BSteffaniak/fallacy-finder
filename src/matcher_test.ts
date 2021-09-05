import { assertEquals, fail, AssertionError } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { Sentence, SentenceType, Word, WordType } from "./types.ts";
import { isMatch } from "./matcher.ts";
import { parseWord } from "./word-parser.ts";
import { initDictionary } from './test-utils_test.ts';

Deno.test({
  name: "isMatch | matches N*? correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one two three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N*?");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N V N");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N*? V N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N*? V N");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V N*? correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N V N*?");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V*? N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N V*? N");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N*? V*? N*? correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N*? V*? N*?");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N*? V N*? correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N*? V N*?");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V*? N*? correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N V*? N*?");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N*? V*? N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N*? V*? N");
    
    assertEquals(result, true);
  }
});




Deno.test({
  name: "isMatch | matches N* correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one two three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N*");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N* V N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N* V N");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V N* correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N V N*");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V* N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N V* N");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N* V* N* correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N* V* N*");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N* V N* correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N* V N*");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V* N* correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N V* N*");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N* V* N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = new Sentence("one goes three", SentenceType.DECLARATION);

    sentence.words = sentence.rawText
      .split(/ /g)
      .filter(w => w.length > 0)
      .map(text => parseWord(text));

    const result = isMatch(sentence, "N* V* N");
    
    assertEquals(result, true);
  }
});
