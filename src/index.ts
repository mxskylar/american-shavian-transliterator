import {phonesForWord} from 'pronouncing/build/pronouncing-browser.js';

type MapOfStrings = {
  [key: string]: string;
};

const APRABET_TO_SHAVIAN: MapOfStrings = {
  AA: '',
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

export default function toShavian(text: string): string {
  const words = text.replace(/\s+/g, " ").trim().split(' ');
  let shavian = "";
  words.forEach(word => {
    const arphabetWords = phonesForWord(word);
    // Fall back on original word spelled in Roman alphabet if phonetic spelling is not available in CMU Dictionary
    if (!arphabetWords || !arphabetWords.length > 0) {
      shavian += word + " ";
      continue;
    }
    const arpabetLetters = [0].split(' ');
    arpabetLetters.forEach(complexArpabetLetter => {
      // Strip out stress & auxilory symbols: https://en.wikipedia.org/wiki/ARPABET
      const simpleArpabetLetter = /([A-Z]+)/.exec(complexArpabetLetter)[0];
      const shavianLetter = ARPABET_TO_SHAVIAN[simpleArpabetLetter];
      // Fall back on arpabet letter if equivalent Shavian letter is not known
      if (!shavianLetter) {
        shavian += simpleArpabetLetter;
        continue;
      }
      shavian += shavianLetter;
    });
    shavian += " "
  });
  // TODO: Replace any shavian letter combinations that compound letters can take the place of
  return shavian.trim();
}

console.log(toShavian("adverse helicopter"));