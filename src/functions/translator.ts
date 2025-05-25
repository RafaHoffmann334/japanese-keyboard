import hiraganaMap from "@/data/hiragana/hiraganaMap";
import katakanaMap from "@/data/katakana/katakanaMap";

interface ITranslator {
  romaji: string;
  kana: string;
  p: string
}

function translator({ romaji, kana, p }: ITranslator): string {
  let nextHiragana: string = "";
  let combinedHiragana: string = "";
  let kanaSelected

  if (p == 'hiragana') {
    kanaSelected = hiraganaMap;
  } else {
    kanaSelected = katakanaMap
  }

  for (let i = 0; i < kana.length; i++) {
    let letter: string = kana[i];

    if (letter == "し" || letter == "ち") {
      nextHiragana = kana[i + 1];

      if (
        nextHiragana == "ゃ" ||
        nextHiragana == "ゅ" ||
        nextHiragana == "ょ"
      ) {
        combinedHiragana = letter += nextHiragana;
        continue;
      }
    }

    romaji += kanaSelected[combinedHiragana || letter];
  }
  return romaji;
}

export default translator;
