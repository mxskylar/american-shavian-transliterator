import {phonesForWord} from 'pronouncing/build/pronouncing-browser.js';

type MapOfStrings = {
  [key: string]: string;
};

// These words are conventionally spelled with one letter in Shavian: https://www.shavian.info/spelling/
const DEFAULT_WORD_OVERRIDES: MapOfStrings = {
  the: '𐑞',
  of: '𐑝',
  and: '𐑯',
  to: '𐑑',
}

const APRABET_TO_SHAVIAN: MapOfStrings = {
  AA: '𐑪',
  AE: '𐑨',
  AH: '𐑳',
  AO: '𐑷',
  AW: '𐑬',
  AY: '𐑲',
  B: '𐑚',
  CH: '𐑗',
  D: '𐑛',
  DH: '𐑞',
  EH: '𐑧',
  ER: '𐑻',
  EY: '𐑱',
  F: '𐑓',
  G: '𐑜',
  HH: '𐑣',
  IH: '𐑦',
  IY: '𐑰',
  JH: '𐑡',
  K: '𐑒',
  L: '𐑤',
  M: '𐑥',
  N: '𐑯',
  NG: '𐑙',
  OW: '𐑴',
  OY: '𐑶',
  P: '𐑐',
  R: '𐑮',
  S: '𐑕',
  SH: '𐑖',
  T: '𐑑',
  TH: '𐑔',
  UH: '𐑫',
  UW: '𐑵',
  V: '𐑝',
  W: '𐑢',
  Y: '𐑘',
  Z: '𐑟',
  ZH: '𐑠',
};

// Not including 𐑻 because it matches directly with ER in the arpabet
const SHAVIAN_COMPOUND_LETTERS: MapOfStrings = {
  𐑰𐑮: '𐑽',
  𐑳𐑮: '𐑼',
  𐑧𐑮: '𐑺',
  𐑰𐑳: '𐑾',
  𐑘𐑵: '𐑿',
  𐑪𐑮: '𐑸',
  𐑷𐑮: '𐑹',
};

function splitOnSpace(text: string): string[] {
  // Remove duplicate spaces & spaces at the beginning & end of the string, then split
  return text.replace(/\s+/g, " ").trim().split(' ');
}

function getArpabetLetters(arpabetSpelling: string): string[] {
  const lettersWithSymbols: string[] = splitOnSpace(arpabetSpelling);
  const lettersWithoutSymbols: string[] = [];
  lettersWithSymbols.forEach(letter => {
    // Remove stress & auxilory symbols: https://en.wikipedia.org/wiki/ARPABET
    lettersWithoutSymbols.push(/([A-Z]+)/.exec(letter)[0]);
  });
  return lettersWithoutSymbols;
}

function convertArpabetToShavian(arpabetLetters: string): string {
  let shavianWord = "";
  arpabetLetters.forEach(arpabetLetter => {
    // Fall back on arpabet letter if no equivalent Shavian letter can be found
    const letter = APRABET_TO_SHAVIAN[arpabetLetter] ? APRABET_TO_SHAVIAN[arpabetLetter] : arpabetLetter;
    shavianWord += letter;
  });
  // Replace letter combinations with compound Shavian letters, if possible: https://www.shavian.info/alphabet/
  for (const [key, value] of Object.entries(SHAVIAN_COMPOUND_LETTERS)) {
    const regExp = new RegExp(key, 'g');
    shavianWord = shavianWord.replace(regExp, value);
  }
  return shavianWord;
}

function getShavianWord(punctuatedWord: string): string {
  // Strip out all punctuation except apostrophes when looking up arpabet spelling
  const nonPunctuatedWord: string = /(\w|')+/.exec(punctuatedWord)[0].toLowerCase();
  const arpabetSpellings: string[] = phonesForWord(nonPunctuatedWord);
  // Default to original spelling of word if equivalent arpabet spelling cannot be found
  if (!arpabetSpellings || !arpabetSpellings.length > 0) {
    return punctuatedWord;
  }
  // Use the first arpabet spelling returned. Additional spellings tend to only differ in their stress & auxilery marks.
  const arpabetLetters: string[] = getArpabetLetters(arpabetSpellings[0]);
  const shavianWord = convertArpabetToShavian(arpabetLetters);
  // Insert Shavian word back into original punctuation surrounding or following the Latin word
  return punctuatedWord.replace(/(\w|')+/g, shavianWord);
}

export default function toShavian(text: string, customWordOverrides: MapOfStrings = {}): string {
  const wordOverrides: MapOfStrings = {...DEFAULT_WORD_OVERRIDES, ...customWordOverrides};
  const latinWords: string[] = splitOnSpace(text);
  let shavianWords: string = "";
  latinWords.forEach(latinWord => {
    const wordOverride: string  = wordOverrides[latinWord.toLowerCase()];
    shavianWords += wordOverride ? `${wordOverride} ` : `${getShavianWord(latinWord)} `
  });
  return shavianWords.trim();
}

console.log(toShavian("The adverse helicopter hovers and flies over my mom's house. The jury was sure. That was awesome, and I told them: \"thank you!\""));