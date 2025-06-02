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
      // Вес суммарно = 100, математическое ожидание ≈ 25.4 (≈ 85 % от 30)
      { value: 5,   weight: 10 }, // 10 %
      { value: 10,  weight: 15 }, // 15 %
      { value: 15,  weight: 20 }, // 20 %
      { value: 20,  weight: 20 }, // 20 %
      { value: 30,  weight: 15 }, // 15 %
      { value: 40,  weight: 10 }, // 10 %
      { value: 50,  weight: 5  }, // 5 %
      { value: 60,  weight: 3  }, // 3 %
      { value: 80,  weight: 1  }, // 1 %
      { value: 150, weight: 1  }, // 1 %
    ],
  },
  {
    id: "silver",
    name: "Silver Case",
    cost: 60,
    rewards: [
      // Вес суммарно = 100, математическое ожидание ≈ 49.5 (≈ 82.5 % от 60)
      { value: 10,  weight: 10 }, // 10 %
      { value: 20,  weight: 15 }, // 15 %
      { value: 30,  weight: 20 }, // 20 %
      { value: 40,  weight: 20 }, // 20 %
      { value: 60,  weight: 15 }, // 15 %
      { value: 80,  weight: 10 }, // 10 %
      { value: 100, weight: 5  }, // 5 %
      { value: 150, weight: 3  }, // 3 %
      { value: 200, weight: 1  }, // 1 %
      { value: 300, weight: 1  }, // 1 %
    ],
  },
  {
    id: "gold",
    name: "Gold Case",
    cost: 120,
    rewards: [
      // Вес суммарно = 100, математическое ожидание ≈ 115 (≈ 95.8 % от 120)
      { value: 20,   weight: 15 }, // 15 %
      { value: 40,   weight: 20 }, // 20 %
      { value: 60,   weight: 25 }, // 25 %
      { value: 80,   weight: 15 }, // 15 %
      { value: 120,  weight: 10 }, // 10 %
      { value: 200,  weight: 5  }, // 5 %
      { value: 300,  weight: 4  }, // 4 %
      { value: 500,  weight: 3  }, // 3 %
      { value: 800,  weight: 2  }, // 2 %
      { value: 1200, weight: 1  }, // 1 %
    ],
  },
  {
    id: "platinum",
    name: "Platinum Case",
    cost: 250,
    rewards: [
      // Вес суммарно = 100, математическое ожидание ≈ 245.5 (≈ 98.2 % от 250)
      { value: 50,   weight: 18 }, // 18 %
      { value: 100,  weight: 22 }, // 22 %
      { value: 150,  weight: 25 }, // 25 %
      { value: 200,  weight: 15 }, // 15 %
      { value: 300,  weight: 8  }, // 8 %
      { value: 500,  weight: 5  }, // 5 %
      { value: 800,  weight: 3  }, // 3 %
      { value: 1200, weight: 2  }, // 2 %
      { value: 2000, weight: 1  }, // 1 %
      { value: 3000, weight: 1  }, // 1 %
    ],
  },
  {
    id: "diamond",
    name: "Diamond Case",
    cost: 500,
    rewards: [
      // Вес суммарно = 100, математическое ожидание ≈ 363 (≈ 72.6 % от 500)
      { value: 100,  weight: 25 }, // 25 %
      { value: 200,  weight: 25 }, // 25 %
      { value: 300,  weight: 19 }, // 19 %
      { value: 400,  weight: 15 }, // 15 %
      { value: 600,  weight: 6  }, // 6 %
      { value: 1000, weight: 4  }, // 4 %
      { value: 1500, weight: 3  }, // 3 %
      { value: 2000, weight: 2  }, // 2 %
      { value: 3000, weight: 0.5 }, // 0.5 %
      { value: 5000, weight: 0.5 }, // 0.5 %
    ],
  },
  {
    id: "legendary",
    name: "Legendary Case",
    cost: 1000,
    rewards: [
      // Вес суммарно = 100, математическое ожидание ≈ 640 (≈ 64 % от 1000)
      { value: 50,    weight: 20 }, // 20 %
      { value: 100,   weight: 20 }, // 20 %
      { value: 200,   weight: 20 }, // 20 %
      { value: 400,   weight: 15 }, // 15 %
      { value: 800,   weight: 10 }, // 10 %
      { value: 1200,  weight: 5  }, // 5 %
      { value: 2000,  weight: 4  }, // 4 %
      { value: 3000,  weight: 3  }, // 3 %
      { value: 5000,  weight: 2  }, // 2 %
      { value: 10000, weight: 1  }, // 1 %
    ],
  },
  {
    id: "mythic",
    name: "Mythic Case",
    cost: 5000,
    rewards: [
      // Вес суммарно = 100, математическое ожидание ≈ 1705 (≈ 85.25 % от 2000)
      { value: 400,   weight: 25 }, // 25 %
      { value: 300,   weight: 25 }, // 25 %
      { value: 500,   weight: 20 }, // 20 %
      { value: 1000,  weight: 10 }, // 10 %
      { value: 2000,  weight: 10 }, // 10 %
      { value: 5000,  weight: 5  }, // 5 %
      { value: 8000,  weight: 2  }, // 2 %
      { value: 12000, weight: 1  }, // 1 %
      { value: 20000, weight: 1  }, // 1 %
      { value: 25000, weight: 1  }, // 1 %
    ],
  },
  {  
    id: "ultimate",
    name: "Ultimate Case",
    cost: 10000,
    rewards: [
      // Вес суммарно = 100, математическое ожидание ≈ 1705 (≈ 85.25 % от 2000)
      { value: 4000,   weight: 25 }, // 25 %
      { value: 3000,   weight: 25 }, // 25 %
      { value: 5000,   weight: 20 }, // 20 %
      { value: 10000,  weight: 10 }, // 10 %
      { value: 12000,  weight: 10 }, // 10 %
      { value: 15000,  weight: 5  }, // 5 %
      { value: 18000,  weight: 2  }, // 2 %
      { value: 22000, weight: 1  }, // 1 %
      { value: 20000, weight: 1  }, // 1 %
      { value: 45000, weight: 1  }, // 1 %
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
