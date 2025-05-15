import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { TaskApiService } from '@/services/TaskApiService';

// Type d'une tâche
export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
};

// Actions possibles
type Action =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK'; payload: number };

// Reducer
function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'EDIT_TASK':
      return state.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
}

// Contexte
const TaskContext = createContext<{
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  editTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
}>({
  tasks: [],
  addTask: async () => {},
  editTask: async () => {},
  deleteTask: async () => {},
  toggleTask: async () => {},
});

// Provider
export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Chargement initial des tâches
  useEffect(() => {
    TaskApiService.fetchTasks()
      .then(fetchedTasks => dispatch({ type: 'SET_TASKS', payload: fetchedTasks }))
      .catch(err => {
        console.error('Erreur de chargement des tâches', err);
      });
  }, []);

  // Ajout d'une tâche
  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const created = await TaskApiService.addTask(task);
      dispatch({ type: 'ADD_TASK', payload: created });
    } catch (err) {
      console.error('Erreur lors de l\'ajout', err);
    }
  };

  // Edition d'une tâche
  const editTask = async (task: Task) => {
    try {
      const updated = await TaskApiService.updateTask(task.id, task);
      dispatch({ type: 'EDIT_TASK', payload: updated });
    } catch (err) {
      console.error('Erreur lors de la modification', err);
    }
  };

  // Suppression d'une tâche (optimiste)
  const deleteTask = async (id: number) => {
    const previous = tasks;
    dispatch({ type: 'DELETE_TASK', payload: id });
    try {
      await TaskApiService.deleteTask(id);
    } catch (err) {
      dispatch({ type: 'SET_TASKS', payload: previous }); // rollback
      console.error('Erreur lors de la suppression', err);
    }
  };

  // Toggle completed
  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updated = { ...task, completed: !task.completed };
    dispatch({ type: 'EDIT_TASK', payload: updated });
    try {
      await TaskApiService.updateTask(id, updated);
    } catch (err) {
      dispatch({ type: 'EDIT_TASK', payload: task }); // rollback
      console.error('Erreur lors du toggle', err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useTasks() {
  return useContext(TaskContext);
}
