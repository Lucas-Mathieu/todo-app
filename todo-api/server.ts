import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
