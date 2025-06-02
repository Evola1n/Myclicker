// src/features/upgrades/Upgrades.jsx
import styles from "../../styles/App.module.scss";

export default function Upgrades({
  credits,
  setCredits,
  clickValue,
  setClickValue,
  level,
  setLevel,
}) {
  const MAX_LEVEL = 10;
  const BASE_COST = 10;
  const cost = Math.floor(BASE_COST * Math.pow(1.5, level));

  const buyUpgrade = () => {
    if (level >= MAX_LEVEL || credits < cost) return;
    setCredits(c => c - cost);
    setClickValue(c => c + 1);
    setLevel(l => l + 1);
  };

  return (
    <div className={styles.upgrades}>
      <h3>💹 Upgrades</h3>
      <button
        className={styles.button}
        onClick={buyUpgrade}
        disabled={level >= MAX_LEVEL || credits < cost}
      >
        +1 Click Power (Lv. {level}/{MAX_LEVEL})
        {level < MAX_LEVEL && ` — Cost: ${cost}`}
        {level >= MAX_LEVEL && " — MAX"}
      </button>
    </div>
  );
}
