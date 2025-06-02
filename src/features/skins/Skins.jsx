// src/features/skins/Skins.jsx
import React, { useEffect, useState } from "react";
import useSkinsDB from "../../hooks/useSkinsDB";
import { SKINS } from "./skinsConfig";
import styles from "../../styles/App.module.scss";

export default function Skins({
  credits,
  setCredits,
  selectedSkin,      // приходит из App.jsx
  setSelectedSkin,   // приходит из App.jsx
}) {
  // Список купленных скинов (мы по-прежнему храним его в IndexedDB)
  const [unlockedSkins, setUnlockedSkins] = useSkinsDB("unlockedSkins", ["default"]);
  const [message, setMessage]             = useState("");

  // При первом рендере, если вдруг unlockedSkins пуст, добавляем "default"
  useEffect(() => {
    if (!unlockedSkins || unlockedSkins.length === 0) {
      setUnlockedSkins(["default"]);
      setSelectedSkin("default");
    }
  }, [unlockedSkins, setUnlockedSkins, setSelectedSkin]);

  const buySkin = skinKey => {
    const skin = SKINS.find(s => s.key === skinKey);
    if (!skin) return;
    const isUnlocked = unlockedSkins.includes(skinKey);

    if (isUnlocked) {
      // Уже куплен → просто «надеть»
      setSelectedSkin(skinKey);
      setMessage(`Скин "${skin.name}" применён.`);
      return;
    }

    if (credits < skin.cost) {
      setMessage(`Не хватает ${skin.cost - credits} кредитов для "${skin.name}".`);
      return;
    }

    // Покупка впервые
    setCredits(c => c - skin.cost);
    setUnlockedSkins(prev => [...prev, skinKey]);
    setSelectedSkin(skinKey);
    setMessage(`Вы купили и применили скин "${skin.name}".`);
  };

  return (
    <div className={styles.skinsSection}>
      <h3>🎨 Skins</h3>

      {SKINS.map(skin => {
        const isUnlocked = unlockedSkins.includes(skin.key);
        const isSelected = selectedSkin === skin.key; // СРАВНИВАЕМ с пришедшим пропсом

        return (
          <div key={skin.key} className={styles.skinItem}>
            <div className={styles.skinInfo}>
              <strong>{skin.name}</strong>
              {skin.cost > 0 && (
                <span className={styles.skinCost}>(Cost: {skin.cost})</span>
              )}
            </div>
            <button
              className={styles.button}
              onClick={() => buySkin(skin.key)}
              disabled={!isUnlocked && credits < skin.cost}
            >
              {isUnlocked
                ? isSelected
                  ? "Equipped"
                  : "Equip"
                : `Buy`}
            </button>
          </div>
        );
      })}

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
