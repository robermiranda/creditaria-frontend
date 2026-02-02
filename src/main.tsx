import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { MainContainer } from "@/forms/main-container"
import { SecondaryContainer } from "@/forms/secondary-container"
import "./App.css"
import './index.css'

const root: HTMLElement | null = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/main-form" element={<MainContainer />} />
          <Route path="/second-form" element={<SecondaryContainer />} />
          <Route path="*" element={<MainContainer />} />
      </Routes>
  </BrowserRouter>,
);
