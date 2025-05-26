import hiraganaMap from "@/data/hiragana/hiraganaMap";
import katakanaMap from "@/data/katakana/katakanaMap";

interface ITranslator {
  romaji: string;
  kana: string;
  p: string;
}

function translator({ romaji, kana, p }: ITranslator): string {
  let nextHiragana: string = "";
  let kanaSelected;

  if (p == "hiragana") {
    kanaSelected = hiraganaMap;
  } else {
    kanaSelected = katakanaMap;
  }

  for (let i = 0; i < kana.length; i++) {
    let letter: string = kana[i];

    if (letter == "ゃ" || letter == "ゅ" || letter == "ょ") continue;

    if (letter == "し" || letter == "ち" || letter == "じ" || letter == "ぢ") {
      nextHiragana = kana[i + 1];

      if (
        nextHiragana == "ゃ" ||
        nextHiragana == "ゅ" ||
        nextHiragana == "ょ"
      ) {
        letter += nextHiragana;
      }
    }

    romaji += kanaSelected[letter];
  }
  return romaji;
}

export default translator;
