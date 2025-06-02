// src/db/dexie.js
import Dexie from "dexie";

const db = new Dexie("ClickerGameDB");

// Две таблицы: kv для общих ключ–значение, storeSkins для скинов
db.version(1).stores({
  kv: "&key,value",
  storeSkins: "&key,value"
});

export default db;
