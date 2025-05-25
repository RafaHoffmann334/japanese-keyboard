"use client";

import { useState } from "react";
import Button from "../Button/Button";
import Hiragana from "@/data/hiragana/hiragana";
import Katakana from "@/data/katakana/katakana";
import styles from "./Keyboard.module.css";
import translator from "@/functions/translator";

export default function Keyboard() {
  let [romaji, setRomaji] = useState<string>("");
  const [kana, setKana] = useState<string>("");
  const [selectedKana, setSelectedKana] = useState<string>('hiragana');

  function changeKana(): void {
    setSelectedKana(selectedKana == 'hiragana' ? 'katakana' : 'hiragana');
  }

  function clearInput(): void {
    setRomaji("");
    setKana("");
  }

  function getKana(event): void {
    const kana = event.target.textContent;
    setKana((prevHiragana) => prevHiragana + kana);
  }

  function getRomaji(): void {
    const result: string = translator({romaji, kana, p: selectedKana})
    setRomaji(result)
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
        {selectedKana == 'hiragana'
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

        <button className={styles.clear} onClick={() => clearInput()}>
          Clear
        </button>

        <button className={styles.katakana} onClick={() => changeKana()}>
          Katakana
        </button>

        <button
          className={styles.convert}
          onClick={() => getRomaji()}
        >
          Convert to romaji
        </button>
      </div>
    </>
  );
}
