export enum Status {
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

export enum Category {
  TRAVAIL = 'Travail',
  PERSONNEL = 'Personnel',
  COURSES = 'Courses',
  AUTRE = 'Autre',
}

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  category: Category;
  dueDate?: string;
  notificationId?: string;
};
