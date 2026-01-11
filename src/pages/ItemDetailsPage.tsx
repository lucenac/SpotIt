import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { itemService } from '../services/itemService';
import type { Item } from '../services/itemService';
import { MapPin, Calendar, Mail, User, Tag, ArrowLeft, Phone, CheckCircle, Loader2 } from 'lucide-react';

export function ItemDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadItem(id);
    }
  }, [id]);

  const loadItem = async (itemId: string) => {
    setLoading(true);
    try {
      const data = await itemService.getItemById(itemId);
      setItem(data);
    } catch (error) {
      console.error('Erro ao carregar item:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Item não encontrado.</p>
        <Link to="/items" className="text-blue-600 dark:text-blue-400 hover:underline">
          Voltar para itens
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/items"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para itens
      </Link>

      {/* Item Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-4">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full ${
                item.type === 'lost'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              }`}
            >
              {item.type === 'lost' ? 'Perdido' : 'Encontrado'}
            </span>
            {item.status === 'resolved' && (
              <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                <CheckCircle className="w-4 h-4" />
                Resolvido
              </span>
            )}
          </div>
          <h1 className="text-gray-900 dark:text-white mb-2">{item.title}</h1>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Calendar className="w-5 h-5" />
            <span>Reportado em {new Date(item.date).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-gray-900 dark:text-white mb-2">Descrição</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Categoria</p>
                <p className="text-gray-900 dark:text-white">{item.category}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Localização</p>
                <p className="text-gray-900 dark:text-white">{item.location}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Informações de Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-900 dark:text-white">{item.contact_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <a
                  href={`mailto:${item.contact_email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {item.contact_email}
                </a>
              </div>
              {item.contact_phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <a
                    href={`tel:${item.contact_phone}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {item.contact_phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {item.status === 'active' && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <Link
                to={`/items/${item.id}/update-status`}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                Marcar como Resolvido
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Encontrou o dono ou recuperou o item? Marque como resolvido e registre os dados.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
