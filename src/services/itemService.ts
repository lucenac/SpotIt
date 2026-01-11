import { api } from './api';

export interface Item {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;

  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  image_url?: string;
  
  status: 'active' | 'resolved';

  user_id?: string; 
  
  created_at: string;
  updated_at: string;

  resolved_by?: string;
  resolved_contact?: string;
  resolved_contact_type?: 'email' | 'phone';
  resolved_notes?: string;
}

export interface CreateItemDTO {
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string | null;
  image_url?: string | null;
}

export interface UpdateStatusDTO {
  status: 'resolved';
  resolved_by: string;
  resolved_contact: string;
  resolved_contact_type: 'email' | 'phone';
  resolved_notes?: string;
}

export interface SearchParams {
  q?: string;
  type?: 'lost' | 'found' | 'all';
  category?: string;
  status?: 'active' | 'resolved';
  mine?: number;
  page?: number;
  limit?: number;
}

export interface UpdateItemDTO {
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  date?: string;
  type?: 'lost' | 'found';
  status?: 'active' | 'resolved';
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string | null;
}

class ItemService {
  // GET /api/items
  async getItems(params?: SearchParams): Promise<{ items: Item[]; total: number }> {
    const response = await api.get('/items/', { params });
    return response.data;
  }

  // GET /api/items/:id
  async getItemById(id: string): Promise<Item> {
    const response = await api.get(`/items/${id}/`);
    return response.data;
  }

  // POST /api/items
  async createItem(data: CreateItemDTO): Promise<Item> {
    const response = await api.post('/items/', data);
    return response.data;
  }

  // PUT /api/items/:id
  async updateItem(id: string, data: Partial<CreateItemDTO>): Promise<Item> {
    const response = await api.put(`/items/${id}/`, data);
    return response.data;
  }

  // DELETE /api/items/:id
  async deleteItem(id: string): Promise<void> {
    await api.delete(`/items/${id}/`);
  }

  // PATCH /api/items/:id
  async markAsResolved(id: string, data: UpdateStatusDTO): Promise<Item> {
    const response = await api.patch(`/items/${id}/`, data);
    return response.data;
  }

  // GET /api/items/my-items
  async getMyItems(): Promise<Item[]> {
    const response = await api.get('/items/', { params: { mine: 1 } });
    return response.data.items || response.data;
  }

  async getCategories(): Promise<string[]> {
    return ['Carteira', 'Eletrônicos', 'Chaves', 'Animal de Estimação', 'Bolsa/Mochila', 'Joia/Relógio', 'Acessório'];
  }


}

export const itemService = new ItemService();