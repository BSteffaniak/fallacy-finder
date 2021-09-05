import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { initDictionaryFromJson } from "./dictionary.ts";
import { isMatch } from "./matcher.ts";
import { parseSentence } from "./word-parser.ts";

Deno.test({
  name: `isMatch | matches "N*?" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one two three");
    const result = isMatch(sentence, "N*?");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N V N" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V N");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N*? V N" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N*? V N");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N V N*?" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V N*?");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N V*? N" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V*? N");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N*? V*? N*?" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N*? V*? N*?");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N*? V N*?" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N*? V N*?");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N V*? N*?" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V*? N*?");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N*? V*? N" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N*? V*? N");

    assertEquals(result, true);
  }
});




Deno.test({
  name: `isMatch | matches "N*" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one two three");

    const result = isMatch(sentence, "N*");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N* V N" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N* V N");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N V N*" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V N*");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N V* N" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V* N");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N* V* N*" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N* V* N*");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N* V N*" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N* V N*");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N V* N*" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N V* N*");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N* V* N" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence("one goes three");
    const result = isMatch(sentence, "N* V* N");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N*? N:UNI|N:UNINEG N" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence(`The word "master" is always racist.`);
    const result = isMatch(sentence, "N*? N:UNI|N:UNINEG N");

    assertEquals(result, true);
  }
});

Deno.test({
  name: `isMatch | matches "N*? V" correctly`,
  fn: async () => {
    await initDictionaryFromJson();

    const sentence = parseSentence(`Therefore, we must obliterate it.`);
    const result = isMatch(sentence, "N*? V");

    assertEquals(result, true);
  }
});
