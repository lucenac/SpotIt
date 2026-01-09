import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <Login onToggle={() => navigate("/register")} />
  );
}
