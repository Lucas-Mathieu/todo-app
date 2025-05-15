const API_URL = 'http://192.168.1.205:3001/tasks';

import type { Task } from '@/context/TaskContext';

export const TaskApiService = {
  async fetchTasks(): Promise<Task[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erreur lors du chargement des tâches');
    return response.json();
  },

  async addTask(task: Omit<Task, 'id'>): Promise<Task> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Erreur lors de l\'ajout');
    return response.json();
  },

  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Erreur lors de la modification');
    return response.json();
  },

  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  },
};
