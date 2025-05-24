"use client";

import { useState } from "react";
import Button from "../Button/Button";
import Hiragana from "@/data/alphabet";
import styles from "./Keyboard.module.css";
import hiraganaMap from "@/data/hiraganaMap";

export default function Keyboard() {
  const [hiragana, setHiragana] = useState<string>("");
  let [romaji, setRomaji] = useState<string>("");

  function getHiragana(event): void {
    const hiragana = event.target.textContent;
    setHiragana((prevHiragana) => prevHiragana + hiragana);
  }

  function clearInput(): void {
    setRomaji("");
    setHiragana("");
  }

  function convertHiragana(hiragana: string): void {
    let nextHiragana: string = "";
    let combinedHiragana: string = "";

    for (let i = 0; i < hiragana.length; i++) {
      let letter: string = hiragana[i];

      if (letter == "し" || letter == "ち") {
        nextHiragana = hiragana[i + 1];

        if (
          nextHiragana == "ゃ" ||
          nextHiragana == "ゅ" ||
          nextHiragana == "ょ"
        ) {
          combinedHiragana = letter += nextHiragana;
          continue;
        }
      }

      setRomaji((romaji += hiraganaMap[combinedHiragana || letter]));
    }
  }

  return (
    <>
      <div className={styles.inputBox}>
        <div className={styles.input}>{hiragana && hiragana}</div>
      </div>

      <div>
        {romaji && (
          <p className={styles.romaji}>The text in romaji is {romaji}</p>
        )}
      </div>

      <div className={styles.keyboard}>
        {Hiragana.map((item) => (
          <Button
            key={item}
            text={item}
            onClick={(event) => getHiragana(event)}
          />
        ))}
        <button className={styles.clear} onClick={() => clearInput()}>
          Clear
        </button>
        <button
          className={styles.convert}
          onClick={() => convertHiragana(hiragana)}
        >
          Convert to romaji
        </button>
      </div>
    </>
  );
}
