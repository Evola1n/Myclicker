// src/features/cases/CasesMenuWithReels.jsx
import React, { useState, useRef } from "react";
import styles from "../../styles/App.module.scss";

// Пересчитанная конфигурация всех кейсов
const DEFAULT_CASES = [
  // ------------------ 1. BRONZE CASE ------------------
  {
    id: "bronze",
    name: "Bronze Case",
    cost: 30,
    rewards: [
      // Итого вес = 100
      // 60 %: чистый убыток (reward < cost)
      { value: 5,   weight: 22 }, // −25 кредитов  (–83 %)
      { value: 10,  weight: 20 }, // −20 кредитов  (–66 %)
      { value: 20,  weight: 20 }, // −10 кредитов  (–33 %)
      // 30 %: небольшой профит (+10–20 %)
      { value: 33,  weight: 15 }, // +3 кредита   (+10 %)
      { value: 36,  weight: 15 }, // +6 кредитов  (+20 %)
      // 7 %: средний выигрыш (~×1.6 от cost)
      { value: 50,  weight: 7  }, // +20 кредитов  (+66 %)
      // 3 %: джекпот (×3)
      { value: 100, weight: 1  }, // +70 кредитов  (+233 %)
    ],
  },

  // ------------------ 2. SILVER CASE ------------------
  {
    id: "silver",
    name: "Silver Case",
    cost: 60,
    rewards: [
      // Итого вес = 100
      // 60 %: чистый убыток
      { value: 20,  weight: 22 }, // −40 кредитов  (–66 %)
      { value: 40,  weight: 20 }, // −20 кредитов  (–33 %)
      { value: 50,  weight: 20 }, // −10 кредитов  (–17 %)
      // 30 %: небольшой профит (+10–20 %)
      { value: 66,  weight: 15 }, // +6 кредитов   (+10 %)
      { value: 72,  weight: 15 }, // +12 кредитов  (+20 %)
      // 7 %: средний выигрыш (~×1.6 от cost)
      { value: 100, weight: 7  }, // +40 кредитов  (+66 %)
      // 3 %: джекпот (×2.5)
      { value: 150, weight: 1  }, // +90 кредитов  (+150 %)
    ],
  },

  // ------------------ 3. GOLD CASE ------------------
  {
    id: "gold",
    name: "Gold Case",
    cost: 120,
    rewards: [
      // Итого вес = 100
      // 60 %: чистый убыток
      { value: 40,   weight: 22 }, // −80 кредитов   (–66 %)
      { value: 80,   weight: 20 }, // −40 кредитов   (–33 %)
      { value: 100,  weight: 20 }, // −20 кредитов   (–17 %)
      // 30 %: небольшой профит (+10–20 %)
      { value: 132,  weight: 15 }, // +12 кредитов   (+10 %)
      { value: 144,  weight: 15 }, // +24 кредитов   (+20 %)
      // 7 %: средний выигрыш (~×1.6 от cost)
      { value: 200,  weight: 7  }, // +80 кредитов   (+66 %)
      // 3 %: джекпот (×3.3)
      { value: 400,  weight: 1  }, // +280 кредитов  (+233 %)
    ],
  },

  // ------------------ 4. PLATINUM CASE ------------------
  {
    id: "platinum",
    name: "Platinum Case",
    cost: 250,
    rewards: [
      // Итого вес = 100
      // 60 %: чистый убыток
      { value: 75,   weight: 22 }, // −175 кредитов  (–70 %)
      { value: 125,  weight: 20 }, // −125 кредитов  (–50 %)
      { value: 150,  weight: 20 }, // −100 кредитов  (–40 %)
      // 30 %: небольшой профит (+10–20 %)
      { value: 275,  weight: 15 }, // +25 кредитов   (+10 %)
      { value: 300,  weight: 15 }, // +50 кредитов   (+20 %)
      // 7 %: средний выигрыш (~×1.6 от cost)
      { value: 400,  weight: 7  }, // +150 кредитов  (+60 %)
      // 3 %: джекпот (×4)
      { value: 1000, weight: 1  }, // +750 кредитов  (+300 %)
    ],
  },

  // ------------------ 5. DIAMOND CASE ------------------
  {
    id: "diamond",
    name: "Diamond Case",
    cost: 500,
    rewards: [
      // Итого вес = 100
      // 60 %: чистый убыток
      { value: 150,  weight: 22 }, // −350 кредитов  (–70 %)
      { value: 250,  weight: 20 }, // −250 кредитов  (–50 %)
      { value: 300,  weight: 20 }, // −200 кредитов  (–40 %)
      // 30 %: небольшой профит (+10–20 %)
      { value: 550,  weight: 15 }, // +50 кредитов   (+10 %)
      { value: 600,  weight: 15 }, // +100 кредитов  (+20 %)
      // 7 %: средний выигрыш (~×1.6 от cost)
      { value: 800,  weight: 7  }, // +300 кредитов  (+60 %)
      // 3 %: джекпот (×4)
      { value: 2000, weight: 1  }, // +1500 кредитов (+300 %)
    ],
  },

  // ------------------ 6. LEGENDARY CASE ------------------
  {
    id: "legendary",
    name: "Legendary Case",
    cost: 1000,
    rewards: [
      // Итого вес = 100
      // 60 %: чистый убыток
      { value: 300,   weight: 22 }, // −700 кредитов   (–70 %)
      { value: 500,   weight: 20 }, // −500 кредитов   (–50 %)
      { value: 700,   weight: 20 }, // −300 кредитов   (–30 %)
      // 30 %: небольшой профит (+10–20 %)
      { value: 1100,  weight: 15 }, // +100 кредитов   (+10 %)
      { value: 1200,  weight: 15 }, // +200 кредитов   (+20 %)
      // 7 %: средний выигрыш (~×1.5–1.6)
      { value: 2000,  weight: 7  }, // +1000 кредитов  (+100 %)
      // 3 %: джекпот (×5)
      { value: 5000,  weight: 1  }, // +4000 кредитов  (+400 %)
    ],
  },

  // ------------------ 7. MYTHIC CASE ------------------
  {
    id: "mythic",
    name: "Mythic Case",
    cost: 5000,
    rewards: [
      // Итого вес = 100
      // 60 %: чистый убыток
      { value: 1500,  weight: 22 }, // −3500 кредитов  (–70 %)
      { value: 2500,  weight: 20 }, // −2500 кредитов  (–50 %)
      { value: 3500,  weight: 20 }, // −1500 кредитов  (–30 %)
      // 30 %: небольшой профит (+10–20 %)
      { value: 5500,  weight: 15 }, // +500 кредитов   (+10 %)
      { value: 6000,  weight: 15 }, // +1000 кредитов  (+20 %)
      // 7 %: средний выигрыш (~×1.6)
      { value: 8000,  weight: 7  }, // +3000 кредитов  (+60 %)
      // 3 %: джекпот (×4)
      { value: 20000, weight: 1  }, // +15000 кредитов (+300 %)
    ],
  },

  // ------------------ 8. ULTIMATE CASE ------------------
  {
    id: "ultimate",
    name: "Ultimate Case",
    cost: 10000,
    rewards: [
      // Итого вес = 100
      // 60 %: чистый убыток
      { value: 3000,   weight: 22 }, // −7000 кредитов   (–70 %)
      { value: 5000,   weight: 20 }, // −5000 кредитов   (–50 %)
      { value: 7000,   weight: 20 }, // −3000 кредитов   (–30 %)
      // 30 %: небольшой профит (+10–20 %)
      { value: 11000,  weight: 15 }, // +1000 кредитов   (+10 %)
      { value: 12000,  weight: 15 }, // +2000 кредитов   (+20 %)
      // 7 %: средний выигрыш (~×1.6)
      { value: 20000,  weight: 7  }, // +10000 кредитов  (+100 %)
      // 3 %: джекпот (×5)
      { value: 50000,  weight: 1  }, // +40000 кредитов  (+400 %)
    ],
  },
];

// Хелпер для случайного выбора награды по весам
function getRandomReward(rewards) {
  const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
  let rnd = Math.random() * totalWeight;
  for (const r of rewards) {
    if (rnd < r.weight) return r.value;
    rnd -= r.weight;
  }
  return rewards[rewards.length - 1].value;
}

// Компонент CaseItem и CasesMenuWithReels остаются без изменений:
function CaseItem({ caze, credits, setCredits }) {
  const [busy, setBusy]       = useState(false);
  const [pointer, setPointer] = useState(0);
  const [message, setMessage] = useState("");
  const intervalRef           = useRef(null);

  const handleOpen = () => {
    if (busy) return;
    if (credits < caze.cost) {
      setMessage(`Не вистачає ${caze.cost - credits} кредитів для ${caze.name}.`);
      return;
    }
    setBusy(true);
    setMessage("");
    setCredits(prev => prev - caze.cost);

    const n = caze.rewards.length;
    const finalIdx = Math.floor(Math.random() * n);

    intervalRef.current = setInterval(() => {
      setPointer(p => (p + 1) % n);
    }, 80);

    setTimeout(() => {
      clearInterval(intervalRef.current);
      setPointer(finalIdx);
      const reward = caze.rewards[finalIdx].value;
      setCredits(prev => prev + reward);
      setMessage(`Ви вийграли +${reward} кредитів!`);
      setBusy(false);
    }, 6000);
  };

  const n = caze.rewards.length;
  const prev = caze.rewards[(pointer - 1 + n) % n].value;
  const curr = caze.rewards[pointer].value;
  const next = caze.rewards[(pointer + 1) % n].value;

  return (
    <div className={styles.caseItem}>
      <div>
        <strong>{caze.name}</strong> — Cost: {caze.cost}
      </div>

      <button
        className={styles.button}
        onClick={handleOpen}
        disabled={busy || credits < caze.cost}
      >
        Open
      </button>

      <div className={styles.simpleReelWrapper}>
        <div className={styles.simpleReel} style={{ transform: `translateY(-50px)` }}>
          <div className={styles.simpleItem}>+{prev}</div>
          <div className={styles.simpleItemActive}>+{curr}</div>
          <div className={styles.simpleItem}>+{next}</div>
        </div>
      </div>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default function CasesMenuWithReels({ credits, setCredits }) {
  return (
    <div className={styles.casesMenu}>
      {DEFAULT_CASES.map(caze => (
        <CaseItem
          key={caze.id}
          caze={caze}
          credits={credits}
          setCredits={setCredits}
        />
      ))}
    </div>
  );
}
