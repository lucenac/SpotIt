import { useState, useEffect } from 'react';
import { itemService } from '../services/itemService';
import type { Item, SearchParams } from '../services/itemService';
import { ItemCard } from '../components/ItemCard';
import { SearchBar } from '../components/SearchBar';
import { Loader2 } from 'lucide-react';

export function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadItems();
    loadCategories();
  }, [activeTab, searchQuery, categoryFilter]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const params: SearchParams = {
        type: activeTab,
        q: searchQuery || undefined,
        category: categoryFilter !== 'all' ? categoryFilter : undefined,
      };
      
      const response = await itemService.getItems(params);

      if (Array.isArray(response)) {
          setItems(response);
      } else if (response.results && Array.isArray(response.results)) {
          setItems(response.results);
      } else if (response.items && Array.isArray(response.items)) {
          setItems(response.items);
      } else {
          setItems([]);
          console.warn("Formato de resposta inesperado:", response);
      }

    } catch (error) {
      console.error('Erro ao carregar itens:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await itemService.getCategories();
      setCategories(['all', ...cats]);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filter */}
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-white mb-6">Explorar Itens</h1>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b dark:border-gray-700">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'all'
              ? 'border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Todos os Itens
        </button>
        <button
          onClick={() => setActiveTab('lost')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'lost'
              ? 'border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Perdidos
        </button>
        <button
          onClick={() => setActiveTab('found')}
          className={`px-6 py-3 transition-colors ${
            activeTab === 'found'
              ? 'border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Encontrados
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
        </div>
      )}

      {/* Items List */}
      {!loading && items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Nenhum item encontrado com os filtros selecionados.</p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}