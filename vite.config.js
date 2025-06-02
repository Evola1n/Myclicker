import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Замените "my-repo-name" на точное имя вашего репозитория на GitHub
const repoName = "my-clicker-game";

export default defineConfig({
  base: `/${repoName}/`, // очень важно
  plugins: [react()],
  build: {
    outDir: "docs" // вариант, когда собираем сразу в папку docs
  }
});
