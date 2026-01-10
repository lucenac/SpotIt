import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Header.css";

export default function Header() {
  const { dark, setDark } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="header">
      <Link to="/" className="logo">
        🔍 SpotIt
      </Link>

      <nav className="nav">
        <Link to="/explorer">Explorar</Link>
        <Link to="/my-items">Meus Itens</Link>
      </nav>

      <div className="actions">
        {/* TEMA */}
        <button
          onClick={() => setDark(!dark)}
          className="theme-btn"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {/* REPORTAR */}
        <Link to="/form" className="report-btn">
          📦 Reportar
        </Link>

        {/* ENTRAR */}
        {isHome && (
          <Link to="/login" className="login-btn">
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
