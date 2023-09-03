import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.0.100", // Substitua pelo seu endereço IP local
    port: 5173,
  },
});
