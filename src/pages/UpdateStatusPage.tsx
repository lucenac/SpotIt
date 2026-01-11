import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { itemService } from '../services/itemService';
import type { Item, UpdateStatusDTO } from '../services/itemService';
import { CheckCircle, Loader2, ArrowLeft, Mail, Phone, User, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

const updateStatusSchema = z.object({
  resolvedBy: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  resolvedContactType: z.enum(['email', 'phone']).refine(val => val, {
    message: 'Selecione o tipo de contato',
  }),
  resolvedContact: z.string().min(1, 'Contato é obrigatório'),
  resolvedNotes: z.string().optional(),
}).refine((data) => {
  if (data.resolvedContactType === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.resolvedContact);
  }
  return true;
}, {
  message: 'Email inválido',
  path: ['resolvedContact'],
});

type UpdateStatusFormData = z.infer<typeof updateStatusSchema>;

export function UpdateStatusPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateStatusFormData>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: {
      resolvedContactType: 'email',
    },
  });

  const contactType = watch('resolvedContactType');

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await itemService.getItemById(id);
      setItem(data);
      
      // Se o item já estiver resolvido, redirecionar
      if (data.status === 'resolved') {
        toast.error('Este item já está marcado como resolvido');
        navigate(`/items/${id}`);
      }
    } catch (error) {
      console.error('Erro ao carregar item:', error);
      toast.error('Erro ao carregar o item');
      navigate('/my-items');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: UpdateStatusFormData) => {
    if (!id || !item) return;

    setSubmitting(true);
    try {
      const updateData = {
        status: 'resolved',
        type: 'found',
        resolved_by: data.resolvedBy,
        resolved_contact: data.resolvedContact,
        resolved_contact_type: data.resolvedContactType,
        resolved_notes: data.resolvedNotes,
      };

      await itemService.markAsResolved(id, updateData as any);
      
      toast.success('Status atualizado com sucesso!', {
        description: 'O item foi marcado como resolvido.',
      });
      
      navigate(`/items/${id}`);
    } catch (error) {
      console.log("O QUE O DJANGO NÃO GOSTOU:", error.response?.data);
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar o status do item');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Item não encontrado</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(`/items/${id}`)}
        className="mb-6 -ml-2 dark:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          <h1 className="text-gray-900 dark:text-white">Marcar como Resolvido</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Informe os dados da pessoa que recebeu o item
        </p>
      </div>

      {/* Item Summary Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Item</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Você está marcando este item como resolvido
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  item.type === 'lost'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                }`}
              >
                {item.type === 'lost' ? 'Perdido' : 'Encontrado'}
              </span>
            </div>
            <h3 className="text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Resolution Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Dados da Resolução</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Registre os dados da pessoa que {item.type === 'lost' ? 'encontrou' : 'perdeu'} o item
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nome da pessoa */}
            <div className="space-y-2">
              <Label htmlFor="resolvedBy" className="text-gray-700 dark:text-gray-300">
                <User className="w-4 h-4 inline mr-2" />
                Nome Completo *
              </Label>
              <Input
                id="resolvedBy"
                placeholder="Digite o nome da pessoa"
                {...register('resolvedBy')}
                className={errors.resolvedBy ? 'border-red-500' : ''}
              />
              {errors.resolvedBy && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.resolvedBy.message}
                </p>
              )}
            </div>

            {/* Tipo de contato */}
            <div className="space-y-3">
              <Label className="text-gray-700 dark:text-gray-300">
                Tipo de Contato *
              </Label>
              <RadioGroup
                defaultValue="email"
                onValueChange={(value) => setValue('resolvedContactType', value as 'email' | 'phone')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email" className="font-normal cursor-pointer text-gray-700 dark:text-gray-300">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone" className="font-normal cursor-pointer text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Telefone
                  </Label>
                </div>
              </RadioGroup>
              {errors.resolvedContactType && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.resolvedContactType.message}
                </p>
              )}
            </div>

            {/* Campo de contato */}
            <div className="space-y-2">
              <Label htmlFor="resolvedContact" className="text-gray-700 dark:text-gray-300">
                {contactType === 'email' ? (
                  <>
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4 inline mr-2" />
                    Telefone *
                  </>
                )}
              </Label>
              <Input
                id="resolvedContact"
                type={contactType === 'email' ? 'email' : 'tel'}
                placeholder={
                  contactType === 'email'
                    ? 'exemplo@email.com'
                    : '(11) 98765-4321'
                }
                {...register('resolvedContact')}
                className={errors.resolvedContact ? 'border-red-500' : ''}
              />
              {errors.resolvedContact && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.resolvedContact.message}
                </p>
              )}
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="resolvedNotes" className="text-gray-700 dark:text-gray-300">
                <FileText className="w-4 h-4 inline mr-2" />
                Observações (opcional)
              </Label>
              <Textarea
                id="resolvedNotes"
                placeholder="Adicione observações sobre como o item foi devolvido/encontrado..."
                rows={4}
                {...register('resolvedNotes')}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/items/${id}`)}
                className="flex-1 border-gray-300 hover:bg-red-700 dark:border-gray-700 dark:text-white"
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar como Resolvido
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}