declare const process: {
  readonly env: {
    readonly [name: string]: string
  }
}

import react from "@vitejs/plugin-react"
import { UserConfig, UserConfigFn } from "vite"

const { BROWSER, HOST, PORT, BUILD_PATH } = process.env

const config: UserConfigFn = () => {
  const config: UserConfig = {
    plugins: [react()],

    server: {
      // localhost 以外で起動したい場合は指定する。
      host: HOST || "localhost",

      // Create React App のデフォルトのポートと同じにする。
      port: (PORT && parseInt(PORT)) || 3000,

      // 自動でブラウザーを開きたくないときは open=false を指定する。
      // もしくは CLI オプションで `--no-open` を渡す。
      // (e.g.) $ npm start -- --no-open
      open: BROWSER || true,
    },

    build: {
      // Create React App のデフォルトの出力先と同じにする。
      outDir: BUILD_PATH || "./build/",

      // デバッグのためソースマップを有効にしておく。
      sourcemap: true,
    },
  }

  return config
}

export default config
