// src/App.jsx
import React, { useState } from "react";
import useIndexedDB from "./hooks/useIndexedDB";
import useSkinsDB from "./hooks/useSkinsDB";

// Ваши три компонента
import Upgrades from "./features/upgrades/upgrades";
import CasesMenuWithReels from "./features/cases/CasesMenuWithReels";
import Skins from "./features/skins/Skins";



import styles from "./styles/App.module.scss";

export default function App() {
  // === 1. Состояния, хранящие данные игры:
  const [credits, setCredits]           = useIndexedDB("credits", 0);
  const [clickValue, setClickValue]     = useIndexedDB("clickValue", 1);
  const [upgradeLevel, setUpgradeLevel] = useIndexedDB("upgradeLevel", 0);
  const [selectedSkin, setSelectedSkin] = useSkinsDB("selectedSkin", "default");

  // === 2. Локальное состояние «какая вкладка активна»
  //    Допустимые значения: "upgrades", "skins", "cases", "leaders"
  const [activeTab, setActiveTab] = useState("upgrades");

  // === 3. Обработчик клика по основной кнопке клика:
  const handleClick = () => {
    setCredits((c) => c + clickValue);
  };

  return (
    // Корневой div — теперь full-width, 
    // в зависимости от выбранного скина добавляем класс skin_default, skin_neon и т.п.
    <div className={`${styles.container} ${styles[`skin_${selectedSkin}`]}`}>
      {/* -------------------------------------- */}
      {/*  A. Шапка (Title + основной click-блок) */}
      {/* -------------------------------------- */}
      <h1 className={styles.title}>🖱 Clicker Game</h1>
      <h2 className={styles.counter}>Credits: {credits}</h2>
      <button className={styles.button} onClick={handleClick}>
        Click me! (+{clickValue})
      </button>

      {/* -------------------------------------- */}
      {/*  B. Навигационные табы (UPGRADES / SKINS / CASES / LEADERS) */}
      {/* -------------------------------------- */}
      <div className={styles.navbar}>
        {/* Каждая кнопка просто меняет состояние activeTab */}
        <button
          className={`${styles.navButton} ${activeTab === "upgrades" ? styles.active : ""}`}
          onClick={() => setActiveTab("upgrades")}
        >
          UPGRADES
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "skins" ? styles.active : ""}`}
          onClick={() => setActiveTab("skins")}
        >
          SKINS
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "cases" ? styles.active : ""}`}
          onClick={() => setActiveTab("cases")}
        >
          CASES
        </button>

      </div>

      {/* -------------------------------------- */}
      {/*  C. Условный рендеринг контента вкладок */}
      {/* -------------------------------------- */}
      {activeTab === "upgrades" && (
        <div className={styles.upgradesSection}>
          <Upgrades
            credits={credits}
            setCredits={setCredits}
            clickValue={clickValue}
            setClickValue={setClickValue}
            level={upgradeLevel}
            setLevel={setUpgradeLevel}
          />
        </div>
      )}

      {activeTab === "skins" && (
        <div className={styles.skinsSection}>
          <Skins
            credits={credits}
            setCredits={setCredits}
            selectedSkin={selectedSkin}
            setSelectedSkin={setSelectedSkin}
          />
        </div>
      )}

      {activeTab === "cases" && (
        <div className={styles.casesSection}>
          <CasesMenuWithReels credits={credits} setCredits={setCredits} />
        </div>
      )}


    </div>
  );
}
