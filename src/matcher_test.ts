import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { isMatch } from "./matcher.ts";
import { parseSentence } from "./word-parser.ts";
import { initDictionary } from './test-utils_test.ts';

Deno.test({
  name: "isMatch | matches N*? correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one two three");
    const result = isMatch(sentence, "N*?");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V N");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N*? V N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N*? V N");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V N*? correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V N*?");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V*? N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V*? N");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N*? V*? N*? correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N*? V*? N*?");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N*? V N*? correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N*? V N*?");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V*? N*? correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V*? N*?");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N*? V*? N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N*? V*? N");
    
    assertEquals(result, true);
  }
});




Deno.test({
  name: "isMatch | matches N* correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one two three");

    const result = isMatch(sentence, "N*");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N* V N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N* V N");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V N* correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V N*");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V* N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V* N");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N* V* N* correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N* V* N*");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N* V N* correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N* V N*");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N V* N* correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V* N*");
    
    assertEquals(result, true);
  }
});

Deno.test({
  name: "isMatch | matches N* V* N correctly",
  fn: async () => {
    await initDictionary();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N* V* N");
    
    assertEquals(result, true);
  }
});
