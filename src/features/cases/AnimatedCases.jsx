// src/features/cases/AnimatedCases.jsx

import { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import styles from "../../styles/App.module.scss";

const REWARDS = [5, 10, 15, 20, 25, 50];

export default function AnimatedCases({ credits, setCredits }) {
  const [busy, setBusy]    = useState(false);
  const [result, setResult] = useState(null);
  const controls          = useAnimation();

  const openCase = () => {
    if (busy || credits < 50) return;
    setBusy(true);
    setResult(null);
    setCredits(c => c - 50);

    const idx       = Math.floor(Math.random() * REWARDS.length);
    const loops     = 5;
    const stopShift = -((idx / REWARDS.length) * 100);
    const phase1End = -loops * 100;

    // Фаза 1: быстрые loops прокруток
    controls
      .start({
        x: [`0%`, `${phase1End}%`],
        transition: {
          duration: 4,
          ease: "linear",
        },
      })
      .then(() => {
        // Фаза 2: плавная посадка
        controls
          .start({
            x: [`${phase1End}%`, `${phase1End + stopShift}%`],
            transition: {
              duration: 1.5,
              ease: "easeOut",
            },
          })
          .then(() => {
            setResult(REWARDS[idx]);
            setCredits(c => c + REWARDS[idx]);
            setBusy(false);
          });
      });
  };

  return (
    <div className={styles.cases}>
      <h3>🎁 Animated Case</h3>
      <button
        className={styles.button}
        onClick={openCase}
        disabled={busy || credits < 50}
      >
        {busy ? "Spinning…" : "Open Case (50)"}
      </button>

      <div className={styles.reelWrapper}>
        <motion.div
          className={styles.reel}
          initial={{ x: 0 }}
          animate={controls}
        >
          {/* Дублируем для бесшовности */}
          {[...REWARDS, ...REWARDS].map((val, i) => (
            <div key={i} className={styles.reelItem}>
              +{val}
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {result !== null && (
          <motion.p
            className={styles.message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Вы выиграли +{result} кредитов!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
