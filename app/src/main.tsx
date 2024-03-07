import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {BrowserRouter} from "react-router-dom";
import Navigation from "./Navigation.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  </React.StrictMode>,
)
