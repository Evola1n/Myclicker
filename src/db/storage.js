// src/db/storage.js
import db from "./dexie";

// ===== Работа с общей таблицей kv =====
export async function loadState(key, defaultValue) {
  try {
    const row = await db.kv.get(key);
    return row ? row.value : defaultValue;
  } catch (err) {
    console.error("loadState error:", err);
    return defaultValue;
  }
}

export async function saveState(key, value) {
  try {
    await db.kv.put({ key, value });
  } catch (err) {
    console.error("saveState error:", err);
  }
}

// ===== Работа с таблицей storeSkins =====
export async function loadSkinState(key, defaultValue) {
  try {
    const row = await db.storeSkins.get(key);
    return row ? row.value : defaultValue;
  } catch (err) {
    console.error("loadSkinState error:", err);
    return defaultValue;
  }
}

export async function saveSkinState(key, value) {
  try {
    await db.storeSkins.put({ key, value });
  } catch (err) {
    console.error("saveSkinState error:", err);
  }
}
