// src/components/TaskList.tsx
import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

type Task = {
  id: string;
  title: string;
  completed?: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onTaskPress?: (id: string) => void;
};

const TaskList = ({ tasks, onTaskPress }: TaskListProps) => (
  <FlatList
    data={tasks}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <TaskItem
        title={item.title}
        completed={item.completed}
        onPress={() => onTaskPress && onTaskPress(item.id)}
      />
    )}
  />
);

export default TaskList;
