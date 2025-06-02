// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ЗДЕСЬ замените "Myclicker" на точно то имя,
// под которым у вас будет доступен сайт.
// Например, если вы деплоите на: 
//   https://username.github.io/Myclicker/ 
//    ↑ тогда repoName = "Myclicker" (УЧТИТЕ РЕГИСТР!). 
// Если вы используете собственный корневой домен (например, 
//   https://mycustomdomain.com ), и ваш билд должен лежать прямо 
//   в корне без дополнительного «/Myclicker/» — можно прописать base: "/".
const repoName = "Myclicker";

export default defineConfig({
  // 1) КАКОЙ «base» (префикс) вы хотите в <link> и <script> внутри итогового HTML.
  //    Если сайт будет лежать по адресу https://username.github.io/Myclicker/,
  //    base нужно указывать как `"/Myclicker/"`. 
  //    Если сайт будет доступен прямо с https://mycustomdomain.com/, то base = "/".
  base: `/${repoName}/`, 

  plugins: [react()],

  build: {
    // 2) В какую папку складывать собранный результат?
    //    По умолчанию Vite кладёт в `dist/`. Если вы удалите или закомментируете
    //    этот блок — сборка пойдёт в `dist/`. Если же вы укажете `outDir: "dist"`,
    //    то всё по-умолчанию (необязательно указывать). 
    //
    //    Но если вы раньше заставляли Vite собирать в `docs/`, а потом передумывали —
    //    убедитесь, что этот блок ЛИБО вообще закомментирован, ЛИБО стоит `outDir: "dist"`.
    outDir: "dist"
  }
});
