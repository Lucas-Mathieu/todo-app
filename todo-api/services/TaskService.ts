import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskService {
  // CREATE : Ajouter une tâche
  static async createTask(data: { title: string; description?: string; category: string }) {
    return prisma.task.create({ data });
  }

  // READ : Récupérer toutes les tâches
  static async getAllTasks() {
    return prisma.task.findMany();
  }

  // READ : Récupérer une tâche par ID
  static async getTaskById(id: number) {
    return prisma.task.findUnique({ where: { id } });
  }

  // UPDATE : Modifier une tâche
  static async updateTask(
    id: number,
    data: { title?: string; description?: string; completed?: boolean; category?: string }
  ) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  // DELETE : Supprimer une tâche
  static async deleteTask(id: number) {
    return prisma.task.delete({ where: { id } });
  }
}
