// src/hooks/useSkinsDB.js
import { useState, useEffect, useRef } from "react";
import { loadSkinState, saveSkinState } from "../db/storage";

export default function useSkinsDB(key, defaultValue) {
  const [val, setVal] = useState(defaultValue);
  const ready = useRef(false);

  // при монтировании — читаем из IndexedDB
  useEffect(() => {
    let cancelled = false;
    loadSkinState(key, defaultValue)
      .then(stored => {
        if (cancelled) return;
        setVal(stored);
        ready.current = true;
      })
      .catch(err => {
        console.error(`loadSkinState("${key}") error:`, err);
        ready.current = true;
      });
    return () => { cancelled = true; };
  }, [key, defaultValue]);

  // при изменении val — сохраняем (после первой загрузки)
  useEffect(() => {
    if (ready.current) {
      saveSkinState(key, val).catch(err =>
        console.error(`saveSkinState("${key}") error:`, err)
      );
    }
  }, [key, val]);

  return [val, setVal];
}
