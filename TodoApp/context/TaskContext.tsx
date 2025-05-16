import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { TaskApiService } from '@/services/TaskApiService';
import { Category } from '@/types';

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  category: Category;
  dueDate?: string;
};

type Action =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK'; payload: number };

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

// Planification notification
async function scheduleNotification(task: Task) {
  if (!task.dueDate) {
    console.log('[TaskProvider] No dueDate, skipping notification for task:', task);
    return;
  }

  const triggerDate = new Date(task.dueDate);

  if (triggerDate.getTime() < Date.now()) {
    console.warn('[TaskProvider] Due date is in the past, skipping notification:', triggerDate);
    return;
  }

  console.log('[TaskProvider] Scheduling notification for:', task);

  await Notifications.scheduleNotificationAsync({
    identifier: task.id.toString(),
    content: {
      title: task.title,
      body: task.description || 'Rappel de tâche',
      data: { taskId: task.id },
    },
    trigger: {
      type: 'date',
      date: triggerDate,
    },
  });
}

// Annulation notification
async function cancelNotification(taskId: number) {
  try {
    await Notifications.cancelScheduledNotificationAsync(taskId.toString());
  } catch {}
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    TaskApiService.fetchTasks()
      .then(fetchedTasks => {
        dispatch({ type: 'SET_TASKS', payload: fetchedTasks });
      })
      .catch(err => {
        console.error('[TaskProvider] Erreur lors du chargement des tâches', err);
      });
  }, []);

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const created = await TaskApiService.addTask(task);
      dispatch({ type: 'ADD_TASK', payload: created });
      if (created.dueDate) await scheduleNotification(created);
    } catch (err) {
      console.error('[TaskProvider] Erreur lors de l\'ajout', err);
    }
  };

  const editTask = async (task: Task) => {
    try {
      const previousTask = tasks.find(t => t.id === task.id);
      if (previousTask?.dueDate) await cancelNotification(task.id);
      const updated = await TaskApiService.updateTask(task.id, task);
      dispatch({ type: 'EDIT_TASK', payload: updated });
      if (updated.dueDate) await scheduleNotification(updated);
    } catch (err) {
      console.error('[TaskProvider] Erreur lors de la modification', err);
    }
  };

  const deleteTask = async (id: number) => {
    const previous = tasks;
    dispatch({ type: 'DELETE_TASK', payload: id });
    try {
      await TaskApiService.deleteTask(id);
      await cancelNotification(id);
    } catch (err) {
      dispatch({ type: 'SET_TASKS', payload: previous });
      console.error('[TaskProvider] Erreur lors de la suppression', err);
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updated = { ...task, completed: !task.completed };
    dispatch({ type: 'EDIT_TASK', payload: updated });
    try {
      await TaskApiService.updateTask(id, updated);
    } catch (err) {
      dispatch({ type: 'EDIT_TASK', payload: task });
      console.error('[TaskProvider] Erreur lors du toggle', err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
