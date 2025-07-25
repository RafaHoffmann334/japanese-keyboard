"use client";

import { useState } from "react";
import Button from "../Button/Button";
import Hiragana from "@/data/hiragana/hiragana";
import Katakana from "@/data/katakana/katakana";
import styles from "./Keyboard.module.css";
import translator from "@/functions/translator";
import DakutenKatakana from "@/data/katakana/dakuten";
import DakutenHiragana from "@/data/hiragana/dakuten";

export default function Keyboard() {
  const [romaji, setRomaji] = useState<string>("");
  const [kana, setKana] = useState<string>("");
  const [kanaSelected, setKanaSelected] = useState<string>("hiragana");

  function changeKana(): void {
    setKanaSelected(kanaSelected == "hiragana" ? "katakana" : "hiragana");
    setKana("");
    setRomaji("");
  }

  function clearInput(): void {
    setRomaji("");
    setKana("");
  }

  function dakuten(event: React.MouseEvent<HTMLButtonElement>): void {
    let kanaMatch;
    let dakutenMap;
    const symbol = event.currentTarget.textContent;

    const regexHiragana = /[かきくけこさしすせそたちつてとはひふへほ]/;
    const regexKatakana = /[カキクケコサシスセソタチツテトハヒフヘホ]/;

    if (kanaSelected == "hiragana") {
      kanaMatch = kana.match(regexHiragana);
      dakutenMap = DakutenHiragana;
    } else {
      kanaMatch = kana.match(regexKatakana);
      dakutenMap = DakutenKatakana;
    }

    if (kanaMatch) {
      let lastCharacter = kanaMatch.input?.substring(kana.length - 1);
      const result: string =
        dakutenMap[(lastCharacter += symbol == "“" ? "“" : "˚")];
      setKana("");
      setKana((prevHiragana) => prevHiragana + kana.replace(/.$/, result));
    }
  }

  function getKana(event: React.MouseEvent<HTMLButtonElement>): void {
    const kana = event.currentTarget.textContent;
    setKana((prevHiragana) => prevHiragana + kana);
  }

  function getRomaji(): void {
    const result: string = translator({ kana, kanaSelected });
    setRomaji(result);
  }

  return (
    <>
      <div className={styles.inputBox}>
        <textarea
          defaultValue={kana && kana}
          className={styles.input}
        ></textarea>
      </div>

      <div>
        {romaji && (
          <p className={styles.romaji}>The text in romaji is {romaji}</p>
        )}
      </div>

      <div className={styles.keyboard}>
        {kanaSelected == "hiragana"
          ? Hiragana.map((item) => (
              <Button
                text={item}
                key={item}
                onClick={(event) => getKana(event)}
              />
            ))
          : Katakana.map((item) => (
              <Button
                text={item}
                key={item}
                onClick={(event) => getKana(event)}
              />
            ))}

        <button className={styles.btn} onClick={(event) => dakuten(event)}>
          “
        </button>

        <button className={styles.btn} onClick={(event) => dakuten(event)}>
          ˚
        </button>

        <button className={styles.btn} onClick={() => clearInput()}>
          Clear
        </button>

        <button className={styles.btn} onClick={() => changeKana()}>
          {kanaSelected}
        </button>

        <button className={styles.btn} onClick={() => getRomaji()}>
          Convert to romaji
        </button>
      </div>
    </>
  );
}
