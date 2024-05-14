import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation.tsx";
import HistoryHandler from "./HistoryHandler.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HistoryHandler />
      <Navigation />
    </BrowserRouter>
  </React.StrictMode>,
)
