import React, { useState } from "react";

const Register = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    senha: "",
    confirmaSenha: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmaSenha) {
      alert("Senhas não coincidem");
      return;
    }
    console.log("Register:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 relative">
      {/* Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl px-8 py-6 w-full max-w-md border border-white/50">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar</h1>
          <p className="text-gray-600 text-sm mt-1">
            Crie sua conta gratuitamente
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="nomeCompleto"
            placeholder="Nome completo"
            value={formData.nomeCompleto}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex">
            <select className="bg-gray-100 border border-gray-300 border-r-0 rounded-l-xl px-3 text-sm">
              <option>+55</option>
              <option>+1</option>
              <option>+44</option>
            </select>
            <input
              type="tel"
              name="telefone"
              placeholder="(DD) 90000-0000"
              value={formData.telefone}
              onChange={handleChange}
              className="flex-1 p-3 border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="confirmaSenha"
            placeholder="Confirmar senha"
            value={formData.confirmaSenha}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            Cadastrar
          </button>
        </form>
      </div>

      {/* Link fora do card */}
      <button
        onClick={onToggle}
        className="mt-6 text-white text-sm hover:underline"
      >
        ← Voltar para a página inicial
      </button>
    </div>
  );
};

export default Register;
