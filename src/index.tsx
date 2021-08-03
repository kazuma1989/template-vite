import React from "react"
import ReactDOM from "react-dom"
import { SWRConfig } from "swr"
import { Router } from "wouter"
import { App } from "./App"
import "./color.css"
import "./global.css"

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        dedupingInterval: 86400_000,
        suspense: true,
      }}
    >
      <Router base={import.meta.env.BASE_URL.replace(/\/+$/, "")}>
        <App />
      </Router>
    </SWRConfig>
  </React.StrictMode>,

  globalThis.document.getElementById("root")
)
