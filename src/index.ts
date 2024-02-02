import {phonesForWord} from 'pronouncing/build/pronouncing-browser.js';

type MapOfStrings = {
  [key: string]: string;
};

const APRABET_TO_SHAVIAN: MapOfStrings = {
  AA: '𐑪',
  AE: '',
  AH: '',
  AO: '',
  AW: '',
  AY: '',
  B: '',
  CH: '',
  D: '',
  DH: '',
  EH: '',
  ER: '𐑻',
  EY: '',
  F: '',
  G: '',
  HH: '',
  IH: '',
  IY: '',
  JH: '',
  K: '',
  L: '',
  M: '',
  N: '',
  NG: '',
  OW: '',
  OY: '',
  P: '',
  R: '',
  S: '',
  SH: '',
  T: '',
  TH: '',
  UH: '',
  UW: '',
  V: '',
  W: '',
  Y: '',
  Z: '',
  ZH: '',
};

// Use map to ensure order of keys: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// That way, in the case that:
//  (a) A compound letter is a subsuet
//  (b) of a parent compound letter,
// b comes before a, and will always take precendent
const SHAVIAN_COMPOUND_LETTERS: MapOfStrings = new Map();
// "Parent" compound letters
SHAVIAN_COMPOUND_LETTERS.set('𐑧𐑩𐑮', '𐑺')
SHAVIAN_COMPOUND_LETTERS.set('𐑦𐑩𐑮', '𐑽');
// "Subset" compound letters
SHAVIAN_COMPOUND_LETTERS.set('𐑩𐑮', '𐑼');
SHAVIAN_COMPOUND_LETTERS.set('𐑦𐑩', '𐑾');
// Other compound letters
SHAVIAN_COMPOUND_LETTERS.set('𐑡𐑵', '𐑿');
SHAVIAN_COMPOUND_LETTERS.set('𐑭𐑮', '𐑸');
SHAVIAN_COMPOUND_LETTERS.set('𐑷𐑮', '𐑹');
// Not including 𐑻 because it matches directly with ER in the arpabet

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
  // Strip out punctuation when looking up arpabet spelling
  const nonPunctuatedWord: string = /(\w+)/.exec(punctuatedWord)[0];
  const arpabetSpellings: string[] = phonesForWord(nonPunctuatedWord);
  // Default to original spelling of word if equivalent arpabet spelling cannot be found
  if (!arpabetSpellings || !arpabetSpellings.length > 0) {
    return punctuatedWord;
  }
  // Use the first arpabet spelling returned. Additional spellings tend to only differ in their stress & auxilery marks.
  const arpabetLetters: string[] = getArpabetLetters(arpabetSpellings[0]);
  const shavianWord = convertArpabetToShavian(arpabetLetters);
  // Insert Shavian word back into original punctuation surrounding or following the Roman word
  return punctuatedWord.replace(/\w+/g, shavianWord);
}

export default function toShavian(text: string): string {
  const romanWords: string[] = splitOnSpace(text);
  let shavianWords = "";
  romanWords.forEach(romanWord => {
    shavianWords += `${getShavianWord(romanWord)} `
  });
  return shavianWords.trim();
}

console.log(toShavian("adverse helicopter"));
const m = new Map();
m.set('foo', 'bar');
console.log(m);