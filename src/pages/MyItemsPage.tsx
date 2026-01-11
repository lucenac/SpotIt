import { useState, useEffect } from 'react';
import { itemService } from '../services/itemService';
import type { Item } from '../services/itemService';
import { ItemCard } from '../components/ItemCard';
import { Loader2, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MyItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyItems();
  }, []);

  const loadMyItems = async () => {
    setLoading(true);
    try {
      const data = await itemService.getMyItems();
      setItems(data);
    } catch (error) {
      console.error('Erro ao carregar meus itens:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-white mb-2">Meus Itens</h1>
        <p className="text-gray-600 dark:text-gray-400">Gerencie os itens que você reportou</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-gray-900 dark:text-white mb-2">Nenhum item reportado</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Você ainda não reportou nenhum item perdido ou encontrado.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Package className="w-5 h-5" />
            Reportar Primeiro Item
          </Link>
        </div>
      )}

      {/* Items Grid */}
      {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} showActions />
          ))}
        </div>
      )}
    </main>
  );
}