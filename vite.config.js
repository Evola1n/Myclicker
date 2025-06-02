// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// замените "my-clicker-game" на ваше реальное имя репозитория
const repoName = "MYclicker";

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
  // закомментировали или удалили build.outDir:
  // build: {
  //   outDir: "docs"
  // }
});
