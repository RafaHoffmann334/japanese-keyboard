import hiraganaMap from "@/data/hiragana/hiraganaMap";
import katakanaMap from "@/data/katakana/katakanaMap";

interface ITranslator {
  kana: string;
  kanaSelected: string;
}

function translator({ kana, kanaSelected }: ITranslator): string {
  const smallHiragana = new Set(["ゃ", "ゅ", "ょ"]);
  const smallKatakana = new Set(["ャ", "ュ", "ョ"]);
  const kanaSet = new Set(["し", "ち", "じ", "ぢ", "シ", "チ", "ジ", "ヂ"]);

  let kanaMap;
  let smallKana: Set<string>;
  let nextKana: string = "";
  let romajiParts: string[] = [];

  if (kanaSelected == "hiragana") {
    kanaMap = hiraganaMap;
    smallKana = smallHiragana;
  } else {
    kanaMap = katakanaMap;
    smallKana = smallKatakana;
  }

  for (let i = 0; i < kana.length; i++) {
    let letter: string = kana[i];

    if (smallKana.has(letter)) continue;

    if (kanaSet.has(letter)) {
      nextKana = kana[i + 1];

      if (smallKana.has(nextKana)) {
        letter += nextKana;
      }
    }

    romajiParts.push(kanaMap[letter]);
  }
  return romajiParts.join("");
}

export default translator;
