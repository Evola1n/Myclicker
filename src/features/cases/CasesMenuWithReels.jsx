// src/features/cases/CasesMenuWithReels.jsx
import React, { useState, useRef } from "react";
import styles from "../../styles/App.module.scss";

// Массив с конфигурацией кейсов (можно вынести в отдельный файл, но пока оставим здесь)
const DEFAULT_CASES = [
  {
    id: "bronze",
    name: "Bronze Case",
    cost: 30,
    rewards: [
      { value: 5, weight: 50 },
      { value: 10, weight: 30 },
      { value: 20, weight: 20 },
    ],
  },
  {
    id: "silver",
    name: "Silver Case",
    cost: 60,
    rewards: [
      { value: 15, weight: 50 },
      { value: 30, weight: 30 },
      { value: 60, weight: 20 },
    ],
  },
  {
    id: "gold",
    name: "Gold Case",
    cost: 120,
    rewards: [
      { value: 50,    weight: 50 },
      { value: 80,    weight: 40 },
      { value: 120,   weight: 30 },
      { value: 180,   weight: 10 },
      { value: 250,   weight: 20 },
      { value: 400,   weight: 20 },
      { value: 600,   weight: 15 },
      { value: 800,   weight: 8  },
      { value: 1000,  weight: 5  },
      { value: 1500,  weight: 3  },
      { value: 2500,  weight: 2  },
      { value: 5000,  weight: 1  }

    ],
  },
  {
    id: "Elite",
    name: "Elite Case",
    cost: 1000,
    rewards: [
      { value: 300, weight: 30 },
      { value: 1500, weight: 10 },
      { value: 700, weight: 15 },
      { value: 600, weight: 20 },
      { value: 800, weight: 15 },
      { value: 1100, weight: 10 },
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
  // На всякий случай вернём последнее значение
  return rewards[rewards.length - 1].value;
}

// Отдельный компонент, отвечающий за рендер и логику одного кейса
function CaseItem({ caze, credits, setCredits }) {
  const [busy, setBusy]       = useState(false);
  const [pointer, setPointer] = useState(0);
  const [message, setMessage] = useState("");
  const intervalRef           = useRef(null);

  // При клике «Open» запускаем анимацию именно этого кейса
  const handleOpen = () => {
    if (busy) return; // если уже крутится — ничего не делать
    if (credits < caze.cost) {
      setMessage(`Не хватает ${caze.cost - credits} кредитов для ${caze.name}.`);
      return;
    }
    setBusy(true);
    setMessage("");
    setCredits(prev => prev - caze.cost);

    const n = caze.rewards.length;
    // выбираем индекс финальной награды заранее
    const finalIdx = Math.floor(Math.random() * n);

    // запустить быструю смену pointer каждые 80 мс
    intervalRef.current = setInterval(() => {
      setPointer(p => (p + 1) % n);
    }, 80);

    // через 6 сек останавливаемся на finalIdx
    setTimeout(() => {
      clearInterval(intervalRef.current);
      setPointer(finalIdx);
      const reward = caze.rewards[finalIdx].value;
      setCredits(prev => prev + reward);
      setMessage(`Вы выиграли +${reward} кредитов!`);
      setBusy(false);
    }, 6000);
  };

  // Чтобы отразить три выведенных значения (prev, curr, next) на экране
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
          {/* Здесь всегда отображаем три «ячейки»: предыдущую, текущую (active) и следующую */}
          <div className={styles.simpleItem}>+{prev}</div>
          <div className={styles.simpleItemActive}>+{curr}</div>
          <div className={styles.simpleItem}>+{next}</div>
        </div>
      </div>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

// Основной компонент, который пробегается по DEFAULT_CASES и выводит каждому свой <CaseItem>
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
