import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import 'regenerator-runtime/runtime'
import { AuthProvider } from "./contexts/AuthContext"

const rootNode = document.querySelector('#root')

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  rootNode
);
