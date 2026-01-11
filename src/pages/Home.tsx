import { Link } from 'react-router-dom';
import { Search, Package, CheckCircle, Users } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-white mb-6">
              Encontre o que você perdeu
            </h1>
            <p className="text-xl text-blue-50 mb-8">
              SpotIt conecta pessoas que perderam objetos àquelas que os encontraram.
              Ajude a comunidade a reunir pertences perdidos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/items"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Search className="w-5 h-5" />
                Buscar Itens
              </Link>
              <Link
                to="/create"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-400 transition-colors border-2 border-white/20"
              >
                <Package className="w-5 h-5" />
                Reportar Item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-gray-900 dark:text-white mb-12">
            Como funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">1. Reporte</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cadastre o item que você perdeu ou encontrou com detalhes e localização
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">2. Busque</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore o mural digital e encontre correspondências com seu item
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">3. Conecte</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Entre em contato diretamente e recupere seu objeto perdido
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-blue-600 dark:text-blue-400 mb-2">1.234</div>
              <p className="text-gray-600 dark:text-gray-300">Itens Cadastrados</p>
            </div>
            <div>
              <div className="text-purple-600 dark:text-purple-400 mb-2">856</div>
              <p className="text-gray-600 dark:text-gray-300">Itens Recuperados</p>
            </div>
            <div>
              <div className="text-green-600 dark:text-green-400 mb-2">2.100+</div>
              <p className="text-gray-600 dark:text-gray-300">Usuários Ativos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h2 className="text-gray-900 dark:text-white mb-4">
            Faça parte da comunidade
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Juntos, podemos ajudar mais pessoas a encontrarem seus pertences perdidos.
            Comece agora mesmo!
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <Package className="w-5 h-5" />
            Reportar Primeiro Item
          </Link>
        </div>
      </section>
    </div>
  );
}