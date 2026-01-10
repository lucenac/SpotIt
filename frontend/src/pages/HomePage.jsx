import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER PADRÃO (COM SOL / LUA) */}
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-20">
        <h1 className="text-sm mb-3 opacity-90">
          Encontre o que você perdeu
        </h1>

        <p className="max-w-2xl mx-auto mb-8 text-sm opacity-90">
          SpotIt conecta pessoas que perderam objetos àquelas que os encontraram.
          Ajude a comunidade a reunir pertences perdidos.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/explorer"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
          >
            🔍 Buscar Itens
          </Link>

          <Link
            to="/login"
            className="bg-blue-500 px-6 py-3 rounded-lg font-semibold"
          >
            📦 Reportar Item
          </Link>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-white py-16">
        <h2 className="text-center text-lg font-semibold mb-12">
          Como funciona
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-6">
          <div>
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
              📦
            </div>
            <h3 className="font-semibold mb-2">1. Reporte</h3>
            <p className="text-sm text-gray-600">
              Cadastre o item que você perdeu ou encontrou com detalhes e localização
            </p>
          </div>

          <div>
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
              🔍
            </div>
            <h3 className="font-semibold mb-2">2. Busque</h3>
            <p className="text-sm text-gray-600">
              Explore o mural digital e encontre correspondências com seu item
            </p>
          </div>

          <div>
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center">
              ✔
            </div>
            <h3 className="font-semibold mb-2">3. Conecte</h3>
            <p className="text-sm text-gray-600">
              Entre em contato diretamente e recupere seu objeto perdido
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="max-w-5xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-blue-600 font-bold text-lg">1.234</p>
            <p className="text-sm text-gray-600">Itens Cadastrados</p>
          </div>

          <div>
            <p className="text-blue-600 font-bold text-lg">856</p>
            <p className="text-sm text-gray-600">Itens Recuperados</p>
          </div>

          <div>
            <p className="text-green-600 font-bold text-lg">2.100+</p>
            <p className="text-sm text-gray-600">Usuários Ativos</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="mb-4 text-blue-600 text-3xl">👥</div>

        <h3 className="font-semibold mb-2">
          Faça parte da comunidade
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          Juntos, podemos ajudar mais pessoas a encontrarem seus pertences perdidos.
          Comece agora mesmo!
        </p>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          📦 Reportar Primeiro Item
        </Link>
      </section>

    </div>
  );
}
