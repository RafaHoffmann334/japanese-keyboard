import styles from "./Button.module.css";

type onClick = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface IButtonProps {
  text: string;
  onClick: onClick;
}

export default function Button({ text, onClick }: IButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
}
