// src/App.jsx
import React from "react";
import useIndexedDB from "./hooks/useIndexedDB";
import useSkinsDB from "./hooks/useSkinsDB";
import Upgrades from "./features/upgrades/upgrades";
import CasesMenuWithReels from "./features/cases/CasesMenuWithReels";
import Skins from "./features/skins/Skins";
import styles from "./styles/App.module.scss";

export default function App() {
  const [credits, setCredits]           = useIndexedDB("credits", 0);
  const [clickValue, setClickValue]     = useIndexedDB("clickValue", 1);
  const [upgradeLevel, setUpgradeLevel] = useIndexedDB("upgradeLevel", 0);
  const [selectedSkin, setSelectedSkin] = useSkinsDB("selectedSkin", "default");

  const handleClick = () => {
    setCredits(c => c + clickValue);
  };

  return (
    <div className={`${styles.container} ${styles[`skin_${selectedSkin}`]}`}>
      <h1 className={styles.title}>🖱 Clicker Game</h1>
      <h2 className={styles.counter}>Credits: {credits}</h2>
      <button className={styles.button} onClick={handleClick}>
        Click me! (+{clickValue})
      </button>

      <div className={styles.upgrades}>
        <Upgrades
          credits={credits}
          setCredits={setCredits}
          clickValue={clickValue}
          setClickValue={setClickValue}
          level={upgradeLevel}
          setLevel={setUpgradeLevel}
        />
      </div>

      <div className={styles.casesSection}>
        <CasesMenuWithReels credits={credits} setCredits={setCredits} />
      </div>

      <div className={styles.skinsContainer}>
        <Skins
          credits={credits}
          setCredits={setCredits}
          selectedSkin={selectedSkin}
          setSelectedSkin={setSelectedSkin}
        />
      </div>
    </div>
  );
}
