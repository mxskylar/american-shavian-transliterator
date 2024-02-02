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
  ER: '',
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

SHAVIAN_COMPOUND_LETTERS = {
  𐑭𐑮: '𐑸',
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