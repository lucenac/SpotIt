import { Link } from 'react-router-dom';
import type { Item } from '../services/itemService';
import { itemService } from '../services/itemService'; // Importe o serviço separado do tipo
import { MapPin, Calendar, Mail, User, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ItemCardProps {
  item: Item;
  showActions?: boolean;
  onDelete?: (id: string) => void;
}

export function ItemCard({ item, showActions = false, onDelete }: ItemCardProps) {
  
  const navigate = useNavigate();
  
  const userString = sessionStorage.getItem('user');
  const currentUser = userString ? JSON.parse(userString) : null;
  
  const canEdit = showActions || (currentUser && (currentUser.id === item.user_id || currentUser.email === item.contact_email));

  // Função de Editar
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    navigate(`/edit/${item.id}`); 
  };

  // Função de Deletar
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!window.confirm('Tem certeza que deseja excluir este item?')) {
      return;
    }

    try {
      await itemService.deleteItem(item.id);
      toast.success('Item excluído com sucesso');
      
      if (onDelete) {
        onDelete(item.id);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao excluir item');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <Link
        to={`/items/${item.id}`}
        className="block flex-1 p-4" // flex-1 faz o link ocupar o espaço disponível
      >
          {/* Status Badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                item.type === 'lost'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              }`}
            >
              {item.type === 'lost' ? 'Perdido' : 'Encontrado'}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(item.date).toLocaleDateString('pt-BR')}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-gray-900 dark:text-white mb-2 font-semibold">{item.title}</h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <Tag className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{item.category}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{item.location}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Contato:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">{item.contact_name}</span>
              </div>
            </div>
          </div>

          {/* Status Badge for Resolved Items */}
          {item.status === 'resolved' && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                Resolvido
              </span>
            </div>
          )}
      </Link>

      {/* --- BOTÕES COM ONCLICK --- */}
      {canEdit && (
        <div className="p-4 pt-0 mt-auto flex gap-2">
          <button 
            onClick={handleEdit} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors z-10 relative"
          >
            Editar
          </button>
          <button 
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors z-10 relative"
          >
            Deletar
          </button>
        </div>
      )}
    </div>
  );
}