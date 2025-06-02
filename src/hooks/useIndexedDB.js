// src/hooks/useIndexedDB.js
import { useState, useEffect, useRef } from "react";
import { loadState, saveState } from "../db/storage";

export default function useIndexedDB(key, defaultValue) {
  const [val, setVal] = useState(defaultValue);
  const ready = useRef(false);

  // при монтировании — читаем из IndexedDB
  useEffect(() => {
    let cancelled = false;
    loadState(key, defaultValue)
      .then(stored => {
        if (cancelled) return;
        setVal(stored);
        ready.current = true;
      })
      .catch(err => {
        console.error(`loadState("${key}") error:`, err);
        ready.current = true;
      });
    return () => { cancelled = true; };
  }, [key, defaultValue]);

  // при изменении val — сохраняем (после первой загрузки)
  useEffect(() => {
    if (ready.current) {
      saveState(key, val).catch(err =>
        console.error(`saveState("${key}") error:`, err)
      );
    }
  }, [key, val]);

  return [val, setVal];
}
