import { useState, useRef } from "react";
import styles from "../../styles/App.module.scss";

export default function CaseItemWithReel({ caze, credits, setCredits }) {
  const [busy, setBusy]     = useState(false);
  const [result, setResult] = useState(null);
  const [pointer, setPointer] = useState(0);
  const intervalRef         = useRef(null);

  const openCase = () => {
    if (busy || credits < caze.cost) return;
    setBusy(true);
    setResult(null);
    setCredits(c => c - caze.cost);

    const rewards = caze.rewards;
    const n       = rewards.length;
    // выбираем итоговый индекс
    const finalIdx = Math.floor(Math.random() * n);

    // запустить быструю смену pointer каждые 80мс
    intervalRef.current = setInterval(() => {
      setPointer(p => (p + 1) % n);
    }, 80);

    // через 6 сек останавливаем на finalIdx
    setTimeout(() => {
      clearInterval(intervalRef.current);
      setPointer(finalIdx);
      setResult(rewards[finalIdx]);
      setCredits(c => c + rewards[finalIdx]);
      setBusy(false);
    }, 6000);
  };

  // три окошка: предыдущий, текущий, следующий
  const rewards = caze.rewards;
  const n = rewards.length;
  const prev = rewards[(pointer - 1 + n) % n];
  const curr = rewards[pointer];
  const next = rewards[(pointer + 1) % n];

  return (
    <div className={styles.caseItem}>
      <div>
        <strong>{caze.name}</strong> — Cost: {caze.cost}
      </div>
      <button
        className={styles.button}
        onClick={openCase}
        disabled={busy || credits < caze.cost}
      >
        {busy ? "Opening…" : "Open"}
      </button>

      <div className={styles.simpleReelWrapper}>
        <div className={styles.simpleReel}>
          <div className={styles.simpleItem}>{`+${prev}`}</div>
          <div className={styles.simpleItemActive}>{`+${curr}`}</div>
          <div className={styles.simpleItem}>{`+${next}`}</div>
        </div>
      </div>

      {result !== null && (
        <p className={styles.message}>
          Вы выиграли +{result} кредитов!
        </p>
      )}
    </div>
  );
}
