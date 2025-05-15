import { useTasks } from '../context/TaskContext';

export function useTaskActions() {
  const { addTask, editTask, deleteTask, toggleTask } = useTasks();

  return { addTask, editTask, deleteTask, toggleTask };
}