import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import 'regenerator-runtime/runtime'
import "bootstrap/dist/css/bootstrap.min.css"

const rootNode = document.querySelector('#root')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootNode
);
