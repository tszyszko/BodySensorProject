import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Main from "./components/Main"
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
  <Main />
</Provider>, app);
