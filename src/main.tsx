import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { TimerProvider } from "@/contexts/timer-context.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TimerProvider>
          <App />
        </TimerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
