//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import App from './App.tsx'
import { MainContainer } from "@/forms/main-container"
import { SecondaryContainer } from "@/forms/secondary-container"
import "./App.css"
import './index.css'

//createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>,)

const root: HTMLElement | null = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/main-form" element={<MainContainer />} />
          <Route path="/second-form" element={<SecondaryContainer />} />
      </Routes>
  </BrowserRouter>,
);
