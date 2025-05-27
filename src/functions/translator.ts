import hiraganaMap from "@/data/hiragana/hiraganaMap";
import katakanaMap from "@/data/katakana/katakanaMap";

interface ITranslator {
  romaji: string;
  kana: string;
  kanaSelected: string;
}

function translator({ romaji, kana, kanaSelected }: ITranslator): string {
  const smallHiragana = { ゃ: "ゃ", ゅ: "ゅ", ょ: "ょ" };
  const smallKatakana = { ャ: "ャ", ュ: "ュ", ョ: "ョ" };

  let smallKana;
  let kanaMap;
  let nextKana: string = "";

  if (kanaSelected == "hiragana") {
    kanaMap = hiraganaMap;
    smallKana = smallHiragana;
  } else {
    kanaMap = katakanaMap;
    smallKana = smallKatakana;
  }

  for (let i = 0; i < kana.length; i++) {
    let letter: string = kana[i];

    if (Object.values(smallKana).includes(letter)) continue;

    if (
      letter == "し" ||
      letter == "ち" ||
      letter == "じ" ||
      letter == "ぢ" ||
      letter == "シ" ||
      letter == "チ" ||
      letter == "ジ" ||
      letter == "ヂ"
    ) {
      nextKana = kana[i + 1];

      if (
        nextKana == "ゃ" ||
        nextKana == "ゅ" ||
        nextKana == "ょ" ||
        nextKana == "ャ" ||
        nextKana == "ュ" ||
        nextKana == "ョ"
      ) {
        letter += nextKana;
      }
    }

    romaji += kanaMap[letter];
  }
  return romaji;
}

export default translator;
