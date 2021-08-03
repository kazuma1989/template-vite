declare const process: {
  readonly env: {
    readonly [name: string]: string
  }
}

import reactRefresh from "@vitejs/plugin-react-refresh"
import { UserConfig, UserConfigFn } from "vite"

const { BROWSER, HOST, PORT, BUILD_PATH } = process.env

const config: UserConfigFn = async () => {
  const config: UserConfig = {
    plugins: [
      // "Fast Refresh" を有効にする。
      // 書き換えた React モジュールだけがブラウザーに再読み込みされるようになる。
      reactRefresh(),
    ],

    esbuild: {
      // react-jsx 形式の JSX 変換が扱えないビルドツールで擬似的に react-jsx 形式を実現するためのハック。
      // 擬似的というのは、import React をしないでいいというソースコード観点しか満たせず、JSX 変換後の動作効率の点は満たせないということ。
      jsxFactory: "_implicit_React.createElement",
      jsxFragment: "_implicit_React.Fragment",
      jsxInject: 'import _implicit_React from "react"',
    },

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
