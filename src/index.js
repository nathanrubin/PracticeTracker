import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import 'regenerator-runtime/runtime'

const rootNode = document.querySelector('#root')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootNode
);
