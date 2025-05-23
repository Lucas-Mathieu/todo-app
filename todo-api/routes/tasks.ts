import { Router, Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

const router = Router();

// GET all tasks
router.get('/', async (req: Request, res: Response) => {
  const tasks = await TaskService.getAllTasks();
  res.json(tasks);
});

// GET one task
router.get('/:id', async (req: Request, res: Response) => {
  const task = await TaskService.getTaskById(Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

// POST create task
router.post('/', async (req: Request, res: Response) => {
  const { title, description, category, completed, dueDate } = req.body;
  if (!title || !category) return res.status(400).json({ error: 'Missing fields' });
  try {
    const newTask = await TaskService.createTask({
      title,
      description,
      category,
      completed,
      dueDate,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT update task
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description, completed, category, dueDate } = req.body;
  try {
    const updated = await TaskService.updateTask(id, {
      title,
      description,
      completed,
      category,
      dueDate,
    });
    res.json(updated);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(404).json({ error: 'Not found' });
  }
});

// DELETE task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await TaskService.deleteTask(Number(req.params.id));
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(404).json({ error: 'Not found' });
  }
});

export default router;