import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    host: true,
    strictPort: true,
    port: 5173,
    hmr: {
      // Detect the client's protocol, host, and port for WebSocket connection
      clientPort: 'auto',
      // Use the host from the client's request or the server host
      host: 'auto',
      // Use secure WebSockets when the page is loaded over HTTPS
      protocol: 'auto',
      // Increase timeout for connection attempts
      timeout: 5000
    }
  }
})