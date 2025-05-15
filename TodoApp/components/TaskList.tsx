import React, { useState } from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';
import ModalTaskDetail from './ModalTaskDetail';
import type { Task } from '../context/TaskContext';

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  getCategoryColor: (category: string) => string;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  getCategoryColor,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            {...item}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            onShowDetail={setSelectedTask}
            categoryColor={getCategoryColor(item.category)}
          />
        )}
      />
      <ModalTaskDetail
        visible={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </>
  );
};

export default TaskList;