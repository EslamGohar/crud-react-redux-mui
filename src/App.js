import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Company from "./components/Company";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Company />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right"></ToastContainer>
    </>
  );
}

export default App;
