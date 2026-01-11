import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../services/itemService';
import type { CreateItemDTO } from '../services/itemService';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Schema de validação com Zod
const itemSchema = z.object({
  type: z.enum(['lost', 'found']).refine(val => val, {
    message: 'Selecione o tipo do item',
  }),
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  category: z.string().min(1, 'Selecione uma categoria'),
  location: z.string().min(3, 'Informe a localização'),
  date: z.string().min(1, 'Selecione a data'),
  contactName: z.string().min(2, 'Informe seu nome'),
  contactEmail: z.string().email('E-mail inválido'),
  contactPhone: z.string().optional(),
});

type ItemFormData = z.infer<typeof itemSchema>;

const categories = [
  'Carteira',
  'Chaves',
  'Celular',
  'Eletrônicos',
  'Bolsa/Mochila',
  'Joia/Relógio',
  'Animal de Estimação',
  'Documentos',
  'Roupas',
  'Outros',
];

export function CreateItemPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      type: 'lost',
      date: new Date().toISOString().split('T')[0],
    },
  });


const onSubmit = async (data: ItemFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        type: data.type,
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        date: data.date,

        contact_name: data.contactName,   
        contact_email: data.contactEmail,  
        contact_phone: data.contactPhone || null, 
        
        status: 'active' 
      };
      
      const newItem = await itemService.createItem(payload);
      
      alert('Item reportado com sucesso!');
      navigate(`/items/${newItem.id}`);
    } catch (error) {
      console.error('Erro ao criar item:', error);
      alert('Erro ao reportar item. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/items"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-gray-900">Reportar Item</h1>
          <p className="text-gray-600 mt-1">
            Preencha as informações abaixo para reportar um item perdido ou encontrado
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Type Selection */}
          <div>
            <label className="block text-gray-700 mb-2">Tipo do Item*</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="lost"
                  {...register('type')}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Perdi este item</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="found"
                  {...register('type')}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Encontrei este item</span>
              </label>
            </div>
            {errors.type && (
              <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Título do Item*
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              placeholder="Ex: Carteira de Couro Preta"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Descrição Detalhada*
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={4}
              placeholder="Forneça o máximo de detalhes possível para ajudar a identificar o item..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Categoria*
            </label>
            <select
              id="category"
              {...register('category')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-gray-700 mb-2">
              Localização*
            </label>
            <input
              type="text"
              id="location"
              {...register('location')}
              placeholder="Onde o item foi perdido/encontrado?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.location && (
              <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-gray-700 mb-2">
              Data*
            </label>
            <input
              type="date"
              id="date"
              {...register('date')}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && (
              <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Contact Info Header */}
          <div className="border-t pt-6">
            <h3 className="text-gray-900 mb-4">Informações de Contato</h3>
          </div>

          {/* Contact Name */}
          <div>
            <label htmlFor="contactName" className="block text-gray-700 mb-2">
              Seu Nome*
            </label>
            <input
              type="text"
              id="contactName"
              {...register('contactName')}
              placeholder="Nome completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.contactName && (
              <p className="text-red-600 text-sm mt-1">{errors.contactName.message}</p>
            )}
          </div>

          {/* Contact Email */}
          <div>
            <label htmlFor="contactEmail" className="block text-gray-700 mb-2">
              Seu E-mail*
            </label>
            <input
              type="email"
              id="contactEmail"
              {...register('contactEmail')}
              placeholder="seu.email@exemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.contactEmail && (
              <p className="text-red-600 text-sm mt-1">{errors.contactEmail.message}</p>
            )}
          </div>

          {/* Contact Phone (Optional) */}
          <div>
            <label htmlFor="contactPhone" className="block text-gray-700 mb-2">
              Telefone*
            </label>
            <input
              type="tel"
              id="contactPhone"
              {...register('contactPhone')}
              placeholder="(11) 98765-4321"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Link
              to="/items"
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Reportar Item'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
