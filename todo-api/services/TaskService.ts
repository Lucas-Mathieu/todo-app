import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskService {
  // CREATE: Ajouter une tâche
  static async createTask(data: {
    title: string;
    description?: string;
    category: string;
    completed?: boolean;
    dueDate?: string;
  }) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        completed: data.completed ?? false,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });
  }

  // READ: Récupérer toutes les tâches
  static async getAllTasks() {
    return prisma.task.findMany();
  }

  // READ: Récupérer une tâche par ID
  static async getTaskById(id: number) {
    return prisma.task.findUnique({ where: { id } });
  }

  // UPDATE: Modifier une tâche
  static async updateTask(
    id: number,
    data: {
      title?: string;
      description?: string;
      completed?: boolean;
      category?: string;
      dueDate?: string | null;
    }
  ) {
    return prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        completed: data.completed,
        category: data.category,
        dueDate: data.dueDate ? new Date(data.dueDate) : data.dueDate === null ? null : undefined,
      },
    });
  }

  // DELETE: Supprimer une tâche
  static async deleteTask(id: number) {
    return prisma.task.delete({ where: { id } });
  }
}