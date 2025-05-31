import hiraganaMap from "@/data/hiragana/hiraganaMap";
import katakanaMap from "@/data/katakana/katakanaMap";

interface ITranslator {
  kana: string;
  kanaSelected: string;
}

function translator({ kana, kanaSelected }: ITranslator): string {
  const smallHiragana: Set<string> = new Set(["ゃ", "ゅ", "ょ"]);
  const smallKatakana: Set<string> = new Set(["ャ", "ュ", "ョ"]);
  const smallTsuHiragana: string = "っ";
  const smallTsuKatakana: string = 'ッ'

  const hiraganaSet: Set<string> = new Set([
    "し",
    "ち",
    "き",
    "り",
    "み",
    "に",
    "ひ",
    "ぎ",
    "び",
    "ぴ",
    "じ",
    "ぢ",
  ]);
  const katakanaSet: Set<string> = new Set([
    "シ",
    "チ",
    "キ",
    "リ",
    "ミ",
    "ニ",
    "ヒ",
    "ギ",
    "ヂ",
    "ジ",
    "ビ",
    "ピ",
  ]);

  let kanaMap;
  let kanaSet: Set<string>;
  let smallKana: Set<string>;
  let nextKana: string = "";
  let romajiParts: string[] = [];

  if (kanaSelected == "hiragana") {
    kanaMap = hiraganaMap;
    kanaSet = hiraganaSet;
    smallKana = smallHiragana;
  } else {
    kanaMap = katakanaMap;
    kanaSet = katakanaSet;
    smallKana = smallKatakana;
  }

  for (let i = 0; i < kana.length; i++) {
    let letter: string = kana[i];

    if (smallKana.has(letter)) i++;

    if (letter == smallTsuHiragana || letter == smallTsuKatakana) {
      nextKana = kana[i + 1];
      letter += nextKana;
      i++;
    }

    if (kanaSet.has(letter)) {
      nextKana = kana[i + 1];

      if (smallKana.has(nextKana)) {
        letter += nextKana;
        i++;
      }
    }
    romajiParts.push(kanaMap[letter]);
  }

  return romajiParts.join("");
}

export default translator;
