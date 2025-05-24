import Keyboard from "@/components/Keyboard/Keyboard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Keyboard />
      </main>

    </div>
  );
}
