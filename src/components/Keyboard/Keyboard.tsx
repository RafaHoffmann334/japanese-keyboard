"use client";

import { useState } from "react";
import Button from "../Button/Button";
import Hiragana from "@/data/hiragana/hiragana";
import Katakana from "@/data/katakana/katakana";
import Dakuten from "@/data/dakuten/dakuten";
import styles from "./Keyboard.module.css";
import translator from "@/functions/translator";

export default function Keyboard() {
  let [romaji, setRomaji] = useState<string>("");
  let [kana, setKana] = useState<string>("");
  const [selectedKana, setSelectedKana] = useState<string>("hiragana");

  function changeKana(): void {
    setSelectedKana(selectedKana == "hiragana" ? "katakana" : "hiragana");
    setKana("");
    setRomaji("");
  }

  function clearInput(): void {
    setRomaji("");
    setKana("");
  }

  function dakuten(): void {
    const result: string = Dakuten[(kana += "“")];
    setKana("");
    setKana((prevHiragana) => prevHiragana + result);
  }

  function handakuten(): void {
    const regex = /[は, ひ, ふ, へ, ほ]/;
    const regexMatch = kana.match(regex);

    if (regexMatch) {
      const result: string = Dakuten[(regexMatch[0] += "˚")];
      setKana("");
      setKana((prevHiragana) => prevHiragana + kana.replace(regex, result));
    }
  }

  function getKana(event: any): void {
    const kana = event.target.textContent;
    setKana((prevHiragana) => prevHiragana + kana);
  }

  function getRomaji(): void {
    const result: string = translator({ romaji, kana, p: selectedKana });
    setRomaji(result);
  }

  return (
    <>
      <div className={styles.inputBox}>
        <div className={styles.input}>{kana && kana}</div>
      </div>

      <div>
        {romaji && (
          <p className={styles.romaji}>The text in romaji is {romaji}</p>
        )}
      </div>

      <div className={styles.keyboard}>
        {selectedKana == "hiragana"
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

        <button className={styles.clear} onClick={() => dakuten()}>
          “
        </button>

        <button className={styles.clear} onClick={() => handakuten()}>
          ˚
        </button>

        <button className={styles.clear} onClick={() => clearInput()}>
          Clear
        </button>

        <button className={styles.katakana} onClick={() => changeKana()}>
          {selectedKana}
        </button>

        <button className={styles.convert} onClick={() => getRomaji()}>
          Convert to romaji
        </button>
      </div>
    </>
  );
}
