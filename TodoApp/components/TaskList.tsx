import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}) => (
  <FlatList
    data={tasks}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => (
      <TaskItem
        id={item.id}
        title={item.title}
        description={item.description}
        completed={item.completed}
        onToggleComplete={onToggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )}
  />
);

export default TaskList;
