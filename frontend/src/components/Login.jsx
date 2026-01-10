import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // futuramente aqui vai o login real
    navigate("/explore");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Entrar</h1>
          <p className="text-gray-600 mt-2">
            Entre para acessar sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-4 rounded-2xl font-semibold hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Não tem conta?{" "}
          <Link
            to="/register"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Cadastre-se
          </Link>
        </p>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:underline"
          >
            ← Voltar para a página inicial
          </Link>
        </div>

      </div>
    </div>
  );
}
