import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <Register onToggle={() => navigate("/")} />
  );
}
