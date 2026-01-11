import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { itemService } from '../services/itemService';
import { ArrowLeft, Save, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

// Reutilizando componentes UI (ajuste os imports conforme seu projeto)
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

// Schema de Validação (Idêntico ao de Criação)
const editItemSchema = z.object({
  type: z.enum(['lost', 'found']),
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  category: z.string().min(1, 'Selecione uma categoria'),
  location: z.string().min(3, 'Informe o local'),
  date: z.string().min(1, 'Informe a data'),
  contactName: z.string().min(3, 'Informe seu nome'),
  contactEmail: z.string().email('Email inválido'),
  contactPhone: z.string().optional(),
  imageUrl: z.string().optional(),
});

type EditItemFormData = z.infer<typeof editItemSchema>;

export function EditItemPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditItemFormData>({
    resolver: zodResolver(editItemSchema),
  });


  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const cats = await itemService.getCategories();
        setCategories(cats);

        const item = await itemService.getItemById(id);

        const formattedDate = item.date ? new Date(item.date).toISOString().split('T')[0] : '';

        reset({
          type: item.type,
          title: item.title,
          description: item.description,
          category: item.category,
          location: item.location,
          date: formattedDate,
          contactName: item.contact_name,
          contactEmail: item.contact_email,
          contactPhone: item.contact_phone || '',
          imageUrl: item.image_url || '',
        });

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar informações do item');
        navigate('/items');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate, reset]);

  const onSubmit = async (data: EditItemFormData) => {
    if (!id) return;

    try {
      // Mapeando de volta para o formato do Django (Camel -> Snake)
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
        image_url: data.imageUrl || null,
      };

      await itemService.updateItem(id, payload);
      
      toast.success('Item atualizado com sucesso!');
      navigate(`/items/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      toast.error('Erro ao salvar as alterações. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 -ml-2 text-gray-600 dark:text-gray-400"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Editar Item</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Atualize as informações do seu item reportado.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Card Principal */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          
          {/* Tipo do Item */}
          <div className="space-y-3">
            <Label>O que aconteceu?</Label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`
                relative flex items-center justify-center p-4 cursor-pointer rounded-lg border-2 transition-all
                ${watch('type') === 'lost' 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}
              `}>
                <input
                  type="radio"
                  value="lost"
                  className="sr-only"
                  {...register('type')}
                />
                <span className="font-medium">Perdi algo</span>
              </label>

              <label className={`
                relative flex items-center justify-center p-4 cursor-pointer rounded-lg border-2 transition-all
                ${watch('type') === 'found' 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}
              `}>
                <input
                  type="radio"
                  value="found"
                  className="sr-only"
                  {...register('type')}
                />
                <span className="font-medium">Achei algo</span>
              </label>
            </div>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title" className='dark: text-white'>Título do Anúncio</Label>
            <Input
              id="title"
              placeholder="Ex: iPhone 13 Preto, Chave de Honda Civic..."
              {...register('title')}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category" className='dark: text-white'>Categoria</Label>
            <Select 
              onValueChange={(val) => setValue('category', val)} 
              defaultValue={watch('category')}
            >
              <SelectTrigger className='dark: bg-white'>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem className='dark: bg-white' key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
          </div>

          {/* Local e Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className='dark: text-white'>Local </Label>
              <Input
                id="location"
                placeholder="Ex: Bloco B, Refeitório..."
                {...register('location')}
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className='dark: text-white'>Data</Label>
              <Input
                id="date"
                type="date"
                {...register('date')}
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description" className='dark: text-white'>Descrição Detalhada</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Descreva características únicas, estado de conservação..."
              {...register('description')}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Informações de Contato</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactName" className='dark: text-white'>Seu Nome</Label>
              <Input
                id="contactName"
                {...register('contactName')}
              />
              {errors.contactName && <p className="text-sm text-red-500">{errors.contactName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail" className='dark: text-white'>Email</Label>
              <Input
                id="contactEmail"
                type="email"
                {...register('contactEmail')}
              />
              {errors.contactEmail && <p className="text-sm text-red-500">{errors.contactEmail.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone" className='dark: text-white'>Telefone</Label>
              <Input
                id="contactPhone"
                placeholder="(00) 00000-0000"
                {...register('contactPhone')}
              />
            </div>
          </div>
        </div>

        {/* Botão de Submit */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className='dark: text-white hover:bg-red-700'
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
}