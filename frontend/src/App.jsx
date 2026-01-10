import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExplorerPage from "./pages/ExplorerPage";
import MyItemsPage from "./pages/MyItemsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FormPage from "./pages/FormPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explorer" element={<ExplorerPage />} />
      <Route path="/my-items" element={<MyItemsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
}
